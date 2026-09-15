import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, useProgress } from '@react-three/drei'
import { ACESFilmicToneMapping } from 'three'
import './models/preloadModels'
import Scene from './Scene'
import CameraRig from './CameraRig'
import CameraHud from './camera/CameraHud'

function LoadingRoom() {
  const { progress } = useProgress()
  return <Html fullscreen><div className="loading-screen" role="status"><div className="loading-card"><span className="eyebrow">A space to unwind</span><h2>Setting up your room</h2><p>Bringing the furniture and little details into place.</p><progress aria-label="Room loading" value={progress} max="100" /><span className="loading-percent">{Math.round(progress)}%</span></div></div></Html>
}

export default function RoomCanvas({ mode, lightsOn, isFloating, onToggleFloat, view, debug }) {
  return <Canvas shadows dpr={[1, 1.5]} camera={{ position: [344, 250, 350], fov: 40, far: 4000, near: 0.5 }} gl={{ toneMapping: ACESFilmicToneMapping, toneMappingExposure: 0.9 }} fallback={<div className="loading-screen">Your browser needs WebGL to display this room.</div>}>
    <color attach="background" args={['#e89962']} />
    <Suspense fallback={<LoadingRoom />}><Scene isNight={mode === 'night'} lightsOn={lightsOn} isFloating={isFloating} onToggleFloat={onToggleFloat} /></Suspense>
    <CameraRig view={view} />
    {debug && <CameraHud />}
  </Canvas>
}
