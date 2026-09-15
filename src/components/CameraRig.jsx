import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Vector3 } from 'three'

const presets = {
  room: { position: new Vector3(344, 250, 350), target: new Vector3(-20, 35, -20) },
  workspace: { position: new Vector3(110, 160, 95), target: new Vector3(-75, 45, -90) },
  gaming: { position: new Vector3(260, 150, 240), target: new Vector3(80, 45, -50) },
}

export default function CameraRig({ view }) {
  const controls = useRef()
  const moving = useRef(false)
  const { camera, size } = useThree()
  const destination = useRef(new Vector3())
  useEffect(() => { moving.current = true }, [view, size.width, size.height])
  useFrame((_, delta) => {
    if (!moving.current || !controls.current) return
    const preset = presets[view.name] || presets.room
    const fit = Math.max(1.1, Math.min(3, 1.3 / camera.aspect))
    destination.current.copy(preset.position).sub(preset.target).multiplyScalar(fit).add(preset.target)
    const factor = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 1 - Math.exp(-5 * delta)
    camera.position.lerp(destination.current, factor)
    controls.current.target.lerp(preset.target, factor)
    if (camera.position.distanceTo(destination.current) < 0.1 && controls.current.target.distanceTo(preset.target) < 0.1) {
      camera.position.copy(destination.current)
      controls.current.target.copy(preset.target)
      moving.current = false
    }
    controls.current.update()
  })
  return <OrbitControls
    ref={controls}
    makeDefault
    target={[-20, 35, -20]}
    enablePan={false}
    minDistance={100}
    maxDistance={2000}
    // Stay between the two open sides, with a margin from either wall.
    minAzimuthAngle={0.08}
    maxAzimuthAngle={Math.PI / 2 - 0.08}
    // Keep the view looking into the room rather than down over its walls.
    minPolarAngle={Math.PI / 3}
    maxPolarAngle={Math.PI / 2 - 0.06}
    enableDamping
    dampingFactor={0.08}
    onStart={() => { moving.current = false }}
  />
}
