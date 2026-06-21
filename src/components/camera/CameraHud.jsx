import React, { useState, useRef } from 'react'
import { GizmoHelper, GizmoViewport } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'

export default function CameraHUD({ updateRate = 10 }) {

    const { camera } = useThree();


    const [info, setInfo] = useState({
        x: camera.position.x.toFixed(2),
        y: camera.position.y.toFixed(2),
        z: camera.position.z.toFixed(2),
        fov: camera.fov.toFixed(2)
    });


    const counter = useRef(0);
    useFrame(() => {
        counter.current = (counter.current + 1) % Math.max(1, updateRate);

        if (counter.current !== 0) return;
        setInfo({
            x: camera.position.x.toFixed(2),
            y: camera.position.y.toFixed(2),
            z: camera.position.z.toFixed(2),
            fov: camera.fov.toFixed(2)
        })
    })

    return (
        <>
            <GizmoHelper alignment="bottom-left" margins={[80, 80]}>
                <GizmoViewport axisColors={['#ff365c', '#00ff88', '#48a9ff']} labelColor="white" disabled/>
            </GizmoHelper>

            <Html fullscreen transform={false}>
                <div className='bg-gray-600 p-4 m-4 w-42 rounded-lg font-mono text-xs pointer-events-none'>
                    <h1 className='text-white text-sm font-semibold mb-2 pointer-events-none'>Camera Position</h1>
                    <p className='pointer-events-none'>
                        <span className='text-white mr-2'>FOV:</span>
                        <span className='text-white'>{info.fov}</span>
                    </p>
                    <p className='pointer-events-none'>
                        <span className='text-red-400 mr-2'>X:</span>
                        <span className='text-white'>{info.x}</span>
                    </p>
                    <p className='pointer-events-none'>
                        <span className='text-green-400 mr-2'>Y:</span>
                        <span className='text-white'>{info.y}</span>
                    </p>
                    <p className='pointer-events-none'>
                        <span className='text-blue-400 mr-2'>Z:</span>
                        <span className='text-white'>{info.z}</span>
                    </p>
                </div>
            </Html>
        </>
    )
}