import { useRef } from 'react'
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function CameraHud() {
  const output = useRef()
  const elapsed = useRef(0)
  useFrame(({ camera }, delta) => {
    elapsed.current += delta
    if (elapsed.current < 0.2 || !output.current) return
    elapsed.current = 0
    const text = `X ${camera.position.x.toFixed(1)} · Y ${camera.position.y.toFixed(1)} · Z ${camera.position.z.toFixed(1)} · FOV ${camera.fov.toFixed(0)}`
    if (output.current.textContent !== text) output.current.textContent = text
  })
  return <Html fullscreen style={{ pointerEvents: 'none' }}><output className="camera-debug" ref={output} /></Html>
}
