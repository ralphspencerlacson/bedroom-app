import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Color, MathUtils } from 'three'

const dayBackground = new Color('#e89962')
const nightBackground = new Color('#000000')

export default function RoomLighting({ isNight, lightsOn }) {
  const ambient = useRef()
  const sun = useRef()
  const fill = useRef()
  const ceiling = useRef()
  const desk = useRef()
  const consoleLight = useRef()
  useFrame(({ scene }, delta) => {
    const speed = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1000 : 4
    const approach = (ref, target) => {
      if (ref.current) ref.current.intensity = MathUtils.damp(ref.current.intensity, target, speed, delta)
    }
    approach(ambient, isNight ? 0.06 : 0.2)
    approach(sun, isNight ? 0 : 1.5)
    approach(fill, isNight ? 0.03 : 0.2)
    approach(ceiling, lightsOn ? (isNight ? 100 : 30) : 0)
    approach(desk, lightsOn ? (isNight ? 40 : 10) : 0)
    approach(consoleLight, lightsOn ? (isNight ? 70 : 10) : 0)
    scene.environmentIntensity = MathUtils.damp(scene.environmentIntensity, isNight ? 0.12 : 0.6, speed, delta)
    if (scene.background?.isColor) scene.background.lerp(isNight ? nightBackground : dayBackground, 1 - Math.exp(-speed * delta))
  })
  return <>
    <ambientLight ref={ambient} intensity={0.2} />
    <directionalLight ref={sun} position={[-100, 260, 100]} intensity={1.5} castShadow shadow-camera-left={-240} shadow-camera-right={240} shadow-camera-top={240} shadow-camera-bottom={-240} shadow-camera-far={700} shadow-normalBias={0.3} shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
    <directionalLight ref={fill} position={[80, 100, 100]} intensity={0.2} />
    <pointLight ref={ceiling} position={[0, 130, 0]} intensity={30} color="#ffdd99" distance={400} decay={1} castShadow shadow-normalBias={0.2} />
    <pointLight ref={desk} position={[-60, 90, -110]} intensity={10} color="#ffcc88" distance={160} decay={1} />
    <pointLight ref={consoleLight} position={[42, 35, -115]} intensity={10} color="#5599ff" distance={100} decay={2} />
  </>
}
