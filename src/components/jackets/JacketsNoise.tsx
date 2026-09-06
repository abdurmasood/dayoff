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
uniform vec2 resolution;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float noise = random(uv * vec2(1000.0, 1000.0));
    noise = step(0.6, noise);
    gl_FragColor = vec4(vec3(1.0 - (noise * 0.5)), 1.0);
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

export function JacketsNoise() {
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

    const resolutionLocation = gl.getUniformLocation(program, 'resolution')

    function draw() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    draw()
    window.addEventListener('resize', draw)

    return () => {
      window.removeEventListener('resize', draw)
      gl.deleteBuffer(positionBuffer)
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
    }
  }, [])

  return <canvas ref={canvasRef} className="gl-canvas" aria-hidden />
}
