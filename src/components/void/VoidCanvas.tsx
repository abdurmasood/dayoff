'use client'

import { useEffect, useRef } from 'react'

const VS_SOURCE = `
    attribute vec4 aVertexPosition;
    varying vec2 vUv;
    void main() {
        gl_Position = aVertexPosition;
        vUv = aVertexPosition.xy * 0.5 + 0.5;
    }
`

const FS_SOURCE = `
    precision highp float;
    varying vec2 vUv;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uMouse;

    // Random function
    float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
    }

    // 2D Noise based on Morgan McGuire @morgan3d
    float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0,0.0)),
                       hash(i + vec2(1.0,0.0)), u.x),
                   mix(hash(i + vec2(0.0,1.0)),
                       hash(i + vec2(1.0,1.0)), u.x), u.y);
    }

    // Fractal Brownian Motion
    float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100.0);
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        for (int i = 0; i < 5; ++i) {
            v += a * noise(p);
            p = rot * p * 2.0 + shift;
            a *= 0.5;
        }
        return v;
    }

    void main() {
        // Aspect ratio correction
        vec2 uv = gl_FragCoord.xy / uResolution.xy;
        vec2 p = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.y, uResolution.x);

        // Add slight mouse parallax/distortion
        vec2 mouseOffset = (uMouse / uResolution - 0.5) * 0.1;
        p += mouseOffset;

        // 1. Create a chunky, blocky base structure (like a degraded QR code/barcode)
        // We use quantization to create blocks
        float scale = 15.0; // Size of the chunks
        vec2 qUv = floor(p * scale) / scale;

        // Add movement to the blocks over time
        float blockNoise = noise(qUv * 2.0 + uTime * 0.1);

        // 2. Add organic distortion to simulate ink bleed/paper warp
        // This warps the UVs before sampling the finer noise
        vec2 warp = vec2(fbm(p * 3.0 + uTime * 0.05), fbm(p * 3.0 - uTime * 0.05)) * 0.2;
        vec2 warpedP = p + warp;

        // 3. Generate the actual "ink" density
        // Mix the blocky structure with organic flow
        float inkDensity = fbm(warpedP * 5.0) * 0.6 + blockNoise * 0.4;

        // 4. Apply heavy degradation/noise (photocopy grain)
        float grain = hash(uv * uTime * 10.0);
        inkDensity += (grain - 0.5) * 0.4; // Add noise to the edges of the ink

        // 5. Harsh Thresholding to create pure black/white with soft-ish bloated edges
        // The smoothstep creates the "bleed" effect where edges aren't perfectly sharp
        float threshold = 0.5;
        float edgeSoftness = 0.05; // Controls the "bloat" of the ink
        float finalInk = smoothstep(threshold - edgeSoftness, threshold + edgeSoftness, inkDensity);

        // 6. Colors based on the inventory
        vec3 paperColor = vec3(0.95, 0.95, 0.95); // #f0f0f0 approx
        vec3 inkColor = vec3(0.08, 0.08, 0.08); // #141414 approx

        // 7. Add global static/grain to the whole image
        float globalGrain = hash(gl_FragCoord.xy * 0.01 + uTime) * 0.1;

        // Mix colors based on calculated ink pattern
        vec3 color = mix(inkColor, paperColor, finalInk);
        color -= globalGrain; // darken slightly with grain

        // Output, setting alpha to 1.0
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

export function VoidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
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
      new Float32Array([-1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0]),
      gl.STATIC_DRAW,
    )

    const vertexPosition = gl.getAttribLocation(program, 'aVertexPosition')
    gl.enableVertexAttribArray(vertexPosition)
    gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0)

    const timeLocation = gl.getUniformLocation(program, 'uTime')
    const resolutionLocation = gl.getUniformLocation(program, 'uResolution')
    const mouseLocation = gl.getUniformLocation(program, 'uMouse')

    let mouseX = 0
    let mouseY = 0
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    function onMouseMove(event: MouseEvent) {
      mouseX = event.clientX
      mouseY = window.innerHeight - event.clientY
    }

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
      if (reduceMotion.matches) {
        draw(0)
      }
    }

    let frame = 0
    let disposed = false
    const startTime = Date.now()

    function draw(timeMs: number) {
      if (disposed) return
      const time = reduceMotion.matches ? 0 : timeMs * 0.001
      gl.uniform1f(timeLocation, time)
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      gl.uniform2f(
        mouseLocation,
        reduceMotion.matches ? 0 : mouseX,
        reduceMotion.matches ? 0 : mouseY,
      )
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    function render() {
      draw(Date.now() - startTime)
      if (!reduceMotion.matches) {
        frame = requestAnimationFrame(render)
      }
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    frame = requestAnimationFrame(render)

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      gl.deleteBuffer(positionBuffer)
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
    }
  }, [])

  return <canvas ref={canvasRef} className="gl-canvas" aria-hidden />
}
