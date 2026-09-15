import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, useCursor } from '@react-three/drei'
import RoomLighting from './RoomLighting'
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
import LaptopSetup from './models/LaptopSetup'

export default function Scene({ isNight, lightsOn, isFloating, onToggleFloat }) {
    const [hovered, setHovered] = useState(false)
    useCursor(hovered)
    const floatProgress = useRef(0)

    const tvRef = useRef()
    const c1Ref = useRef()
    const c2Ref = useRef()

    useFrame((state, delta) => {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const target = isFloating ? 1 : 0
        if (reducedMotion) floatProgress.current = target
        floatProgress.current += (target - floatProgress.current) * (1 - Math.exp(-1.8 * delta))

        const p = floatProgress.current < 0.001 && target === 0 ? 0 : floatProgress.current

        const t = reducedMotion ? 0 : state.clock.elapsedTime
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
            <RoomLighting isNight={isNight} lightsOn={lightsOn} />
            <group>
                {/* Entertainment area */}
                <DeskSetModel position={[82, -0.5, -64]} />
                <group ref={tvRef}>
                    <TelevisionModel
                        position={[88, 37.4, -132]}
                        onClick={event => { event.stopPropagation(); onToggleFloat() }}
                        onPointerOver={event => { event.stopPropagation(); setHovered(true) }}
                        onPointerOut={() => setHovered(false)}
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
                {/* Face the chair at [-46, -80] from the laptop's [-60, -136]. */}
                <LaptopSetup position={[-60, 43.2, -136]} rotation={[0, Math.atan2(14, 56), 0]} />

                {/* Floor and walls */}
                <Floor topY={-0.5} />
                <WindowedWall side="top" color="#f0f0f0" height={180} thickness={8} positionOffset={[0, 0, -312]} windowWidth={80} windowHeight={100} windowCenterX={-100} windowBottomY={60} />
                <WindowedWall side="left" color="#f0f0f0" height={180} thickness={8} positionOffset={[0, 0, 0]} windowWidth={180} windowHeight={100} windowCenterX={-60} windowBottomY={60} />

                <Environment files="/environments/city.hdr" environmentIntensity={0.6} />
            </group>
        </>
    )
}
