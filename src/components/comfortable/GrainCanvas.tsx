'use client'

import { useLayoutEffect, useRef } from 'react'

const VS_SOURCE = `
attribute vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`

const FS_SOURCE = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = st;
    p.x *= u_resolution.x / u_resolution.y;

    vec2 center = vec2(0.5 * u_resolution.x / u_resolution.y, 0.5);
    float dist = distance(p, center);

    vec3 bgBlue = vec3(0.48, 0.60, 0.72);
    vec3 auraOrange = vec3(0.91, 0.36, 0.13);
    vec3 corePink = vec3(0.89, 0.29, 0.62);

    vec3 color = bgBlue;

    float orangeMask = smoothstep(0.65, 0.1, dist);
    color = mix(color, auraOrange, orangeMask * 0.85);

    float pinkMask = smoothstep(0.35, 0.0, dist);
    color = mix(color, corePink, pinkMask * 0.9);

    float grain = (hash(st + u_time * 0.0001) - 0.5) * 0.25;
    color += grain;

    float vignette = smoothstep(1.2, 0.4, dist);
    color *= vignette * 0.8 + 0.2;

    gl_FragColor = vec4(color, 1.0);
}
`

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export function GrainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useLayoutEffect(() => {
    const surface = canvasRef.current
    if (!surface) return

    const context = surface.getContext('webgl')
    if (!context) {
      surface.style.display = 'none'
      return
    }

    const canvas = surface
    const gl = context

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, VS_SOURCE)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FS_SOURCE)
    if (!vertexShader || !fragmentShader) {
      canvas.style.display = 'none'
      return
    }

    const program = gl.createProgram()
    if (!program) {
      canvas.style.display = 'none'
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      return
    }

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      canvas.style.display = 'none'
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      return
    }

    gl.useProgram(program)

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    )

    const positionLocation = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
    const timeLocation = gl.getUniformLocation(program, 'u_time')

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
      draw(0)
    }

    let frame = 0
    let disposed = false

    function draw(timeMs: number) {
      if (disposed) return
      const time = reduceMotion.matches ? 0 : timeMs * 0.001
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      gl.uniform1f(timeLocation, time)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    function render(timeMs: number) {
      draw(timeMs)
      if (!reduceMotion.matches) {
        frame = requestAnimationFrame(render)
      }
    }

    resize()
    window.addEventListener('resize', resize)
    frame = requestAnimationFrame(render)

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      gl.deleteBuffer(positionBuffer)
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
    }
  }, [])

  return <canvas ref={canvasRef} className="gl-canvas" aria-hidden />
}
