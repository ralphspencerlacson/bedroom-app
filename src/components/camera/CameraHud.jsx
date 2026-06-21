import { useRef } from 'react'
import { GizmoHelper, GizmoViewport } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

export default function CameraHudTracker({ updateRate = 10, onInfo }) {
    const { camera } = useThree()
    const counter = useRef(0)

    useFrame(() => {
        counter.current = (counter.current + 1) % Math.max(1, updateRate)
        if (counter.current !== 0) return
        onInfo({
            x: camera.position.x.toFixed(2),
            y: camera.position.y.toFixed(2),
            z: camera.position.z.toFixed(2),
            fov: camera.fov.toFixed(2),
        })
    })

    return (
        <GizmoHelper alignment="bottom-left" margins={[80, 80]}>
            <GizmoViewport axisColors={['#ff365c', '#00ff88', '#48a9ff']} labelColor="white" disabled />
        </GizmoHelper>
    )
}
