import React from 'react'

export default function Floor({ 
    size = 320, 
    color = '#e0e0e0', 
    thickness = 10, 
    topY = -0.5,
    wireframe = false,
}) {
    // The group is positioned at the desired top Y; the box mesh is offset down by half thickness
    return (
        <group position={[0, topY, 0]}>
            <mesh position={[0, thickness / 2 * -1, 0]} receiveShadow>
                <boxGeometry args={[size, thickness, size]} />
                <meshStandardMaterial color={color} wireframe={wireframe} />
            </mesh>
        </group>
    )
}
