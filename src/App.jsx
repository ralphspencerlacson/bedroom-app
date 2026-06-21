import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import './App.css'

import Scene from './components/Scene'
import CameraHudTracker from './components/camera/CameraHud'
import HudPanel from './components/common/HudPanel'
import { preload as preloadSofa } from './components/models/SofaModel'
import { preload as preloadTelevision } from './components/models/TelevisionModel'
import { preload as preloadDeskSet } from './components/models/DeskSetModel'
import { preload as preloadConsole } from './components/models/SonyConsoleModel'
import { preload as preloadDualSense1 } from './components/models/DualSenseModel1'
import { preload as preloadDualSense2 } from './components/models/DualSenseModel2'
import { preload as preloadGamingDesk } from './components/models/GamingDeskModel'
import { preload as preloadGamingChair } from './components/models/GamingChairModel'
import { preload as preloadMacLaptop } from './components/models/MacLaptopModel'

function App() {
    const [mode, setMode] = useState('day')
    const [lightsOn, setLightsOn] = useState(true)
    const [info, setInfo] = useState({ x: '0', y: '0', z: '0', fov: '0' })
    const isNight = mode === 'night'

    useEffect(() => {
    preloadSofa()
    preloadTelevision()
    preloadDeskSet()
    preloadConsole()
    preloadDualSense1()
    preloadDualSense2()
    preloadGamingDesk()
    preloadGamingChair()
    preloadMacLaptop()
  }, [])

  return (
    <>
      <Canvas shadows camera={{ position: [382, 400 , 362], fov: 36, far: 10000, near: 0.5 }} gl={{ toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.7 }}>
        <Scene isNight={isNight} lightsOn={lightsOn} />

        <OrbitControls target={[0, 0, 0]} />

        <CameraHudTracker updateRate={8} onInfo={setInfo} />
      </Canvas>

      <HudPanel info={info} mode={mode} lightsOn={lightsOn} onToggleMode={() => setMode(m => m === 'day' ? 'night' : 'day')} onToggleLights={() => setLightsOn(l => !l)} />
    </>
  )
}

export default App
