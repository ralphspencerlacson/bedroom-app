import { Suspense, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import Floor from './common/Floor'
import WindowedWall from './common/WindowedWall'
import SofaModel from './models/SofaModel'
import TelevisionModel from './models/TelevisionModel'
import DeskSetModel from './models/DeskSetModel'
import SonyConsoleModel from './models/SonyConsoleModel'
import DualSenseModel1 from './models/DualSenseModel1'
import DualSenseModel2 from './models/DualSenseModel2'
import DogModel from './models/DogModel'
import GamingDeskModel from './models/GamingDeskModel'
import GamingChairModel from './models/GamingChairModel'
import MacLaptopModel from './models/MacLaptopModel'
import LaptopStandModel from './models/LaptopStandModel'

export default function Scene({ isNight, lightsOn }) {
    const [isFloating, setIsFloating] = useState(false)
    const floatProgress = useRef(0)

    const tvRef = useRef()
    const c1Ref = useRef()
    const c2Ref = useRef()

    useFrame((state) => {
        const target = isFloating ? 1 : 0
        floatProgress.current += (target - floatProgress.current) * 0.03

        const p = floatProgress.current
        if (p < 0.001 && target === 0) return

        const t = state.clock.elapsedTime
        const bob = Math.sin(t * 2) * 3 * p
        const rise = 50 * p

        if (tvRef.current) {
            tvRef.current.position.y = rise + bob
            tvRef.current.rotation.z = Math.sin(t * 1.3) * 0.04 * p
            tvRef.current.rotation.x = Math.sin(t * 0.9) * 0.02 * p
        }
        if (c1Ref.current) {
            c1Ref.current.position.y = rise * 0.8 + bob * 0.7
            c1Ref.current.rotation.z = Math.sin(t * 1.7 + 1) * 0.08 * p
        }
        if (c2Ref.current) {
            c2Ref.current.position.y = rise * 0.8 + bob * 0.7
            c2Ref.current.rotation.z = Math.sin(t * 1.7 + 2) * 0.08 * p
        }
    })

    return (
        <>
            {isNight ? (
                <ambientLight intensity={0.03} />
            ) : (
                <>
                    <ambientLight intensity={0.15} />
                    <directionalLight position={[10, 10, 10]} intensity={0.7} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
                    <directionalLight position={[-8, 5, 8]} intensity={0.15} />
                    <directionalLight position={[0, -2, 10]} intensity={0.1} />
                </>
            )}

            {lightsOn && (
                <>
                    <pointLight position={[0, 130, 0]} intensity={isNight ? 3 : 0.8} color="#ffdd99" distance={300} decay={1} castShadow />
                    <pointLight position={[-60, 60, -136]} intensity={isNight ? 1.2 : 0.3} color="#ffcc88" distance={150} decay={1} />
                    <pointLight position={[42, 20, -128]} intensity={isNight ? 0.6 : 0.15} color="#5599ff" distance={100} decay={2} />
                </>
            )}

            <Suspense fallback={<mesh><boxGeometry /><meshStandardMaterial color="lightgray" /></mesh>}>
                {/* Entertainment area */}
                <DeskSetModel position={[82, -0.5, -64]} />
                <group ref={tvRef}>
                    <TelevisionModel
                        position={[88, 37.4, -132]}
                        onClick={() => setIsFloating(f => !f)}
                        onPointerOver={() => { document.body.style.cursor = 'pointer' }}
                        onPointerOut={() => { document.body.style.cursor = 'default' }}
                    />
                </group>
                <SofaModel position={[84, -0.5, 100]} />
                <SonyConsoleModel position={[42, 12, -128]} />
                <group ref={c1Ref}>
                    <DualSenseModel1 position={[74, 37.4, 2]} rotation={[0, 1, 0]} />
                </group>
                <group ref={c2Ref}>
                    <DualSenseModel2 position={[98, 37.4, 9]} rotation={[0, -0.5, 0]} />
                </group>

                <DogModel position={[-126, 0, 130]} rotation={[0, Math.PI / 8, 0]} />

                {/* Work desk area */}
                <GamingDeskModel position={[-86, -0.5, -84]} rotation={[0, 4.71, 0]} />
                <GamingChairModel position={[-46, -0.5, -80]} rotation={[0, 4.4, 0]} />
                <LaptopStandModel position={[-60, 43.2, -136]} rotation={[0, 5, 0]} />
                <MacLaptopModel position={[-60, 48.5, -136]} rotation={[0, 5, 0]} />

                {/* Floor and walls */}
                <Floor topY={-0.5} />
                <WindowedWall side="top" color="#f0f0f0" height={180} thickness={8} positionOffset={[0, 0, -312]} windowWidth={80} windowHeight={100} windowCenterX={-100} windowBottomY={60} />
                <WindowedWall side="left" color="#f0f0f0" height={180} thickness={8} positionOffset={[0, 0, 0]} windowWidth={180} windowHeight={100} windowCenterX={-60} windowBottomY={60} />

                <Environment preset={isNight ? 'night' : 'city'} background intensity={isNight ? 0.3 : 0.6} blur={0.3} />
            </Suspense>
        </>
    )
}
