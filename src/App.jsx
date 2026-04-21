import { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import './App.css'

import Floor from './components/common/Floor'
import Wall from './components/common/Wall'
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
    <Canvas shadows camera={{ position: [300, 220, 300], fov: 60 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={1} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />

      <Suspense fallback={<mesh><boxGeometry /><meshStandardMaterial color="lightgray" /></mesh>}>

        {/* Entertainment area */}
        <SofaModel position={[66, -0.5, 100]} />
        <TelevisionModel position={[39, -33.6, 46]} />
        <DeskSetModel position={[56, -0.5, -40]} />
        <SonyConsoleModel position={[22, 2.4, -116]} />
        <DualSenseModel1 position={[60, 29.6, 22]} rotation={[0, 1, 0]} />
        <DualSenseModel2 position={[82, 29.6, 20]} rotation={[0, -0.5, 0]} />

        <DogModel position={[-126, 14, 130]} rotation={[0, Math.PI / 8, 0]} />

        {/* Work desk area: desk + chair + laptop on desk */}
        <GamingDeskModel position={[-84, -0.5, -80]} rotation={[0, 4.71, 0]} />
        <GamingChairModel position={[56, -0.5, -20]} rotation={[0, Math.PI, 0]} />
        <MacLaptopModel position={[56, -0.2, -40]} />

        {/* Floor and walls */}
        <Floor topY={-0.5} />
        <Wall side="top" color="#f0f0f0" height={140} thickness={8} positionOffset={[0, 0, -292]} />
        <Wall side="left" color="#f0f0f0" height={140} thickness={8} positionOffset={[0, 0, 0]} />
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
