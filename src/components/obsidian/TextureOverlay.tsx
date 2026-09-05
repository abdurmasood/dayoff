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
  uniform float time;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float grain = hash(uv * time * 0.5);

    float scratchX = uv.x * 200.0 + sin(time * 0.1) * 10.0;
    float scratch = step(0.998, hash(vec2(floor(scratchX), floor(time * 2.0))));
    float dust = step(0.9995, hash(uv * 100.0 + time));

    vec4 color = vec4(0.0);

    if (grain > 0.5) {
      color += vec4(vec3(0.05), 0.1);
    }
    if (scratch > 0.0) {
      color += vec4(vec3(0.8), 0.4);
    }
    if (dust > 0.0) {
      color += vec4(vec3(1.0), 0.8);
    }

    vec2 aspectUv = uv;
    aspectUv.x *= resolution.x / resolution.y;

    vec2 blobCenter = vec2((resolution.x / resolution.y) * 0.9, 0.9);
    vec2 buv = aspectUv - blobCenter;

    float dist = length(buv);
    float n = noise(buv * 10.0 + time * 2.0);
    float r = 0.15 + n * 0.1;

    if (dist < r) {
      float innerNoise = hash(buv * 50.0 + time);
      vec3 blobCol = mix(vec3(1.0, 0.1, 0.0), vec3(1.0, 0.8, 0.0), innerNoise);
      float glitch = step(0.8, sin(uv.y * 200.0 + time * 10.0));
      if (glitch > 0.0) blobCol = mix(blobCol, vec3(1.0), 0.5);
      color = vec4(blobCol, 0.9);
    }

    float vignette = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
    vignette = clamp(pow(16.0 * vignette, 0.25), 0.0, 1.0);

    if (dist >= r) {
      color.a += (1.0 - vignette) * 0.3;
    }

    gl_FragColor = color;
  }
`

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return shader
}

export function TextureOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useLayoutEffect(() => {
    const surface = canvasRef.current
    if (!surface) return

    const context = surface.getContext('webgl')
    if (!context) return

    const canvas = surface
    const gl = context

    const program = gl.createProgram()
    if (!program) return

    const vs = compileShader(gl, gl.VERTEX_SHADER, VS_SOURCE)
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FS_SOURCE)
    if (!vs || !fs) return

    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    )

    const posLoc = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const resLoc = gl.getUniformLocation(program, 'resolution')
    const timeLoc = gl.getUniformLocation(program, 'time')
    const startTime = Date.now()
    let frame = 0
    let disposed = false

    function draw(timeMs: number) {
      if (disposed) return
      gl.uniform2f(resLoc, canvas.width, canvas.height)
      gl.uniform1f(timeLoc, timeMs * 0.001)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
      draw(0)
    }

    function render() {
      draw(Date.now() - startTime)
      frame = requestAnimationFrame(render)
    }

    resize()
    window.addEventListener('resize', resize)
    frame = requestAnimationFrame(render)

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [])

  return <canvas ref={canvasRef} className="texture-overlay" />
}
