'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function TunnelViewport() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      })
    } catch {
      return
    }
    renderer.setPixelRatio(window.devicePixelRatio)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000)
    camera.position.z = 10

    const group = new THREE.Group()
    scene.add(group)

    const material = new THREE.LineBasicMaterial({
      color: 0xf0f0f0,
      linewidth: 1,
      transparent: true,
      opacity: 0.6,
    })

    const disposables: Array<THREE.BufferGeometry | THREE.Material> = [material]
    const ringCount = 20
    const size = 15

    for (let i = 0; i < ringCount; i++) {
      const geometry = new THREE.BufferGeometry()
      const z = -i * 2
      geometry.setFromPoints([
        new THREE.Vector3(-size, -size, z),
        new THREE.Vector3(size, -size, z),
        new THREE.Vector3(size, size, z),
        new THREE.Vector3(-size, size, z),
        new THREE.Vector3(-size, -size, z),
      ])
      disposables.push(geometry)
      group.add(new THREE.Line(geometry, material))
    }

    for (let corner = 0; corner < 4; corner++) {
      const x = corner % 2 === 0 ? -size : size
      const y = corner < 2 ? -size : size
      const lineGeo = new THREE.BufferGeometry()
      lineGeo.setFromPoints([
        new THREE.Vector3(x, y, 0),
        new THREE.Vector3(x, y, -(ringCount - 1) * 2),
      ])
      disposables.push(lineGeo)
      group.add(new THREE.Line(lineGeo, material))
    }

    const coreGeo = new THREE.OctahedronGeometry(2, 0)
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    })
    const core = new THREE.Mesh(coreGeo, coreMat)
    core.position.z = -5
    scene.add(core)
    disposables.push(coreGeo, coreMat)

    const setSize = () => {
      const width = parent.clientWidth
      const height = parent.clientHeight
      if (width === 0 || height === 0) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    }

    setSize()

    const observer = new ResizeObserver(setSize)
    observer.observe(parent)

    let time = 0
    let frame = 0
    const animate = () => {
      frame = requestAnimationFrame(animate)
      time += 0.01
      group.position.z = (time * 5) % 2
      core.rotation.y += 0.005
      core.rotation.x += 0.002
      renderer.render(scene, camera)
    }
    animate()

    window.addEventListener('resize', setSize)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', setSize)
      disposables.forEach((item) => item.dispose())
      renderer.dispose()
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="tunnel-canvas" />
      <svg className="tunnel-reticle" viewBox="0 0 100 100">
        <path
          d="M50 10 L90 50 L50 90 L10 50 Z"
          fill="none"
          stroke="var(--fg)"
          strokeWidth="4"
        />
        <circle cx="50" cy="50" r="15" fill="var(--fg)" />
      </svg>
    </>
  )
}
