'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type ThreeBackgroundProps = {
  variant: 'nebula' | 'grid'
}

export default function ThreeBackground({ variant }: ThreeBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(variant === 'nebula' ? '#030712' : '#020617')

    const camera = new THREE.PerspectiveCamera(65, 1, 0.1, 100)
    camera.position.z = 6

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const ambient = new THREE.AmbientLight('#7dd3fc', 0.65)
    const point = new THREE.PointLight('#60a5fa', 1.1)
    point.position.set(4, 6, 6)
    scene.add(ambient, point)

    let mainMesh: THREE.Mesh
    let secondaryMesh: THREE.Mesh
    let stars: THREE.Points | null = null

    if (variant === 'nebula') {
      mainMesh = new THREE.Mesh(
        new THREE.TorusKnotGeometry(1.6, 0.34, 220, 24),
        new THREE.MeshStandardMaterial({
          color: '#38bdf8',
          emissive: '#1e3a8a',
          metalness: 0.4,
          roughness: 0.25,
        })
      )

      secondaryMesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.75, 1),
        new THREE.MeshStandardMaterial({
          color: '#f97316',
          emissive: '#7c2d12',
          roughness: 0.35,
          metalness: 0.2,
          wireframe: true,
        })
      )
      secondaryMesh.position.set(-2.5, 1.5, -1)

      const starsGeometry = new THREE.BufferGeometry()
      const starCount = 1000
      const starPositions = new Float32Array(starCount * 3)

      for (let i = 0; i < starCount; i += 1) {
        const i3 = i * 3
        starPositions[i3] = (Math.random() - 0.5) * 20
        starPositions[i3 + 1] = (Math.random() - 0.5) * 14
        starPositions[i3 + 2] = (Math.random() - 0.5) * 22
      }

      starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
      stars = new THREE.Points(
        starsGeometry,
        new THREE.PointsMaterial({ color: '#bfdbfe', size: 0.02 })
      )
      scene.add(stars)
    } else {
      mainMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(14, 10, 40, 30),
        new THREE.MeshStandardMaterial({
          color: '#22d3ee',
          wireframe: true,
          emissive: '#0f172a',
        })
      )
      mainMesh.rotation.x = -0.6
      mainMesh.position.y = -1.2

      secondaryMesh = new THREE.Mesh(
        new THREE.OctahedronGeometry(1.2, 0),
        new THREE.MeshStandardMaterial({
          color: '#f59e0b',
          roughness: 0.35,
          metalness: 0.35,
        })
      )
      secondaryMesh.position.set(0, 1, 0.8)
    }

    scene.add(mainMesh)
    scene.add(secondaryMesh)

    const resize = () => {
      const { clientWidth, clientHeight } = canvas
      if (clientWidth === 0 || clientHeight === 0) return

      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight, false)
    }

    resize()
    window.addEventListener('resize', resize)

    let frameId = 0
    const animate = () => {
      mainMesh.rotation.x += variant === 'nebula' ? 0.0028 : 0.0012
      mainMesh.rotation.y += variant === 'nebula' ? 0.0034 : 0.001

      secondaryMesh.rotation.y += 0.009
      secondaryMesh.rotation.x += 0.005

      if (stars) {
        stars.rotation.y += 0.0006
      }

      renderer.render(scene, camera)
      frameId = window.requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose())
          } else {
            object.material.dispose()
          }
        }
      })

      if (stars) {
        stars.geometry.dispose()
        if (stars.material instanceof THREE.Material) {
          stars.material.dispose()
        }
      }

      renderer.dispose()
    }
  }, [variant])

  return <canvas ref={canvasRef} className="h-full w-full" />
}
