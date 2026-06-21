import { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'
import './App.css'

import Floor from './components/common/Floor'
import WindowedWall from './components/common/WindowedWall'
import SofaModel, { preload as preloadSofa } from './components/models/SofaModel'
import TelevisionModel, { preload as preloadTelevision } from './components/models/TelevisionModel'
import DeskSetModel, { preload as preloadDeskSet } from './components/models/DeskSetModel'
import SonyConsoleModel, { preload as preloadConsole } from './components/models/SonyConsoleModel'
import DualSenseModel1, { preload as preloadDualSense1 } from './components/models/DualSenseModel1'
import DualSenseModel2, { preload as preloadDualSense2 } from './components/models/DualSenseModel2'
import CameraHUD from './components/camera/CameraHud'
import DogModel from './components/models/DogModel'
import GamingDeskModel, { preload as preloadGamingDesk } from './components/models/GamingDeskModel'
import GamingChairModel, { preload as preloadGamingChair } from './components/models/GamingChairModel'
import MacLaptopModel, { preload as preloadMacLaptop } from './components/models/MacLaptopModel'
import LaptopStandModel from './components/models/LaptopStandModel'

function App() {
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
    <Canvas shadows camera={{ position: [400, 260, 400], fov: 40 }} gl={{ toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.7 }}>
      <ambientLight intensity={0.15} />
      <directionalLight position={[10, 10, 10]} intensity={0.7} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <directionalLight position={[-8, 5, 8]} intensity={0.15} />
      <directionalLight position={[0, -2, 10]} intensity={0.1} />

      <Suspense fallback={<mesh><boxGeometry /><meshStandardMaterial color="lightgray" /></mesh>}>

        {/* Entertainment area */}
        <DeskSetModel position={[82, -0.5, -64]} />
        <TelevisionModel position={[88, 37.4, -132]} />
        <SofaModel position={[84, -0.5, 100]} />
        <SonyConsoleModel position={[42, 12, -128]} />
        <DualSenseModel1 position={[74, 37.4, 2]} rotation={[0, 1, 0]} />
        <DualSenseModel2 position={[98, 37.4, 9]} rotation={[0, -0.5, 0]} />

        <DogModel position={[-126, 0, 130]} rotation={[0, Math.PI / 8, 0]} />

        {/* Work desk area: desk + chair + laptop on desk */}
        <GamingDeskModel position={[-86, -0.5, -84]} rotation={[0, 4.71, 0]} />
        <GamingChairModel position={[-46, -0.5, -80]} rotation={[0, 4.4, 0]} />
        <LaptopStandModel position={[-60, 43.2, -136]} rotation={[0, 5, 0]} />
        <MacLaptopModel position={[-60, 53.4, -136]} rotation={[0, 0, 0]} />

        {/* Floor and walls */}
        <Floor topY={-0.5} />
        <WindowedWall side="top" color="#f0f0f0" height={180} thickness={8} positionOffset={[0, 0, -312]} windowWidth={80} windowHeight={100} windowCenterX={-100} windowBottomY={60} />
        <WindowedWall side="left" color="#f0f0f0" height={180} thickness={8} positionOffset={[0, 0, 0]} windowWidth={80} windowHeight={100} windowCenterX={-100} windowBottomY={60} />

        <Environment preset="studio" intensity={0.6} />
      </Suspense>

      <OrbitControls
        // enableRotate={false}
        // enableZoom={false}
        // enablePan={false}
        target={[0, 0, 0]}
      />

      <CameraHUD updateRate={8} />
    </Canvas>
  )
}

export default App
