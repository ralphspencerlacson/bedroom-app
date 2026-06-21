import React from 'react'
import { DoubleSide } from 'three'

function Seg({ pos, args, color }) {
  return (
    <mesh position={pos} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

export default function WindowedWall({
  size = 320,
  height = 180,
  thickness = 8,
  color = '#f0f0f0',
  topY = -0.5,
  side = 'top',
  positionOffset = [0, 0, 0],
  windowWidth = 80,
  windowHeight = 100,
  windowCenterX = 0,
  windowBottomY = 50,
}) {
  const half = size / 2

  const wallBottom = topY + positionOffset[1]
  const wallTop = wallBottom + height

  let wallLeft, wallRight, wallZ
  if (side === 'top') {
    wallLeft = -half + positionOffset[0]
    wallRight = half + positionOffset[0]
    wallZ = half - thickness / 2 + positionOffset[2]
  } else {
    wallLeft = -half + positionOffset[2]
    wallRight = half + positionOffset[2]
    wallZ = 0 // unused for left wall below
  }

  const winLeft = windowCenterX - windowWidth / 2
  const winRight = windowCenterX + windowWidth / 2
  const winBottom = wallBottom + windowBottomY
  const winTop = winBottom + windowHeight
  const winCenterY = (winBottom + winTop) / 2

  if (side === 'top') {
    const winCenterXW = (winLeft + winRight) / 2 + positionOffset[0]
    return (
      <group>
        {winLeft > wallLeft && (
          <Seg pos={[(wallLeft + winLeft + positionOffset[0]) / 2, (wallBottom + wallTop) / 2, wallZ]} args={[winLeft - wallLeft, height, thickness]} color={color} />
        )}
        {winRight < wallRight && (
          <Seg pos={[(winRight + wallRight + positionOffset[0]) / 2, (wallBottom + wallTop) / 2, wallZ]} args={[wallRight - winRight, height, thickness]} color={color} />
        )}
        {winTop < wallTop && (
          <Seg pos={[winCenterXW, (winTop + wallTop) / 2, wallZ]} args={[windowWidth, wallTop - winTop, thickness]} color={color} />
        )}
        {winBottom > wallBottom && (
          <Seg pos={[winCenterXW, (wallBottom + winBottom) / 2, wallZ]} args={[windowWidth, winBottom - wallBottom, thickness]} color={color} />
        )}
        <mesh position={[winCenterXW, winCenterY, wallZ]} receiveShadow>
          <planeGeometry args={[windowWidth, windowHeight]} />
          <meshPhysicalMaterial color="#b0d4f1" transparent opacity={0.35} roughness={0} metalness={0.05} side={DoubleSide} />
        </mesh>
        <mesh position={[winCenterXW, winBottom, wallZ]}>
          <boxGeometry args={[windowWidth + 4, 2, 2]} />
          <meshStandardMaterial color="#e8e0d0" />
        </mesh>
        <mesh position={[winCenterXW, winTop, wallZ]}>
          <boxGeometry args={[windowWidth + 4, 2, 2]} />
          <meshStandardMaterial color="#e8e0d0" />
        </mesh>
        <mesh position={[winCenterXW - windowWidth / 2 - 1, winCenterY, wallZ]}>
          <boxGeometry args={[2, windowHeight + 2, 2]} />
          <meshStandardMaterial color="#e8e0d0" />
        </mesh>
        <mesh position={[winCenterXW + windowWidth / 2 + 1, winCenterY, wallZ]}>
          <boxGeometry args={[2, windowHeight + 2, 2]} />
          <meshStandardMaterial color="#e8e0d0" />
        </mesh>
      </group>
    )
  }

  if (side === 'left') {
    const wallX = -half + thickness / 2 + positionOffset[0]
    const winCenterZW = (winLeft + winRight) / 2 + positionOffset[2]
    return (
      <group>
        {winLeft > wallLeft && (
          <Seg pos={[wallX, (wallBottom + wallTop) / 2, (wallLeft + winLeft + positionOffset[2]) / 2]} args={[thickness, height, winLeft - wallLeft]} color={color} />
        )}
        {winRight < wallRight && (
          <Seg pos={[wallX, (wallBottom + wallTop) / 2, (winRight + wallRight + positionOffset[2]) / 2]} args={[thickness, height, wallRight - winRight]} color={color} />
        )}
        {winTop < wallTop && (
          <Seg pos={[wallX, (winTop + wallTop) / 2, winCenterZW]} args={[thickness, wallTop - winTop, windowWidth]} color={color} />
        )}
        {winBottom > wallBottom && (
          <Seg pos={[wallX, (wallBottom + winBottom) / 2, winCenterZW]} args={[thickness, winBottom - wallBottom, windowWidth]} color={color} />
        )}
        <mesh position={[wallX, winCenterY, winCenterZW]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[windowWidth, windowHeight]} />
          <meshPhysicalMaterial color="#b0d4f1" transparent opacity={0.35} roughness={0} metalness={0.05} side={DoubleSide} />
        </mesh>
        <mesh position={[wallX, winBottom, winCenterZW]}>
          <boxGeometry args={[2, 2, windowWidth + 4]} />
          <meshStandardMaterial color="#e8e0d0" />
        </mesh>
        <mesh position={[wallX, winTop, winCenterZW]}>
          <boxGeometry args={[2, 2, windowWidth + 4]} />
          <meshStandardMaterial color="#e8e0d0" />
        </mesh>
        <mesh position={[wallX, winCenterY, winCenterZW - windowWidth / 2 - 1]}>
          <boxGeometry args={[2, windowHeight + 2, 2]} />
          <meshStandardMaterial color="#e8e0d0" />
        </mesh>
        <mesh position={[wallX, winCenterY, winCenterZW + windowWidth / 2 + 1]}>
          <boxGeometry args={[2, windowHeight + 2, 2]} />
          <meshStandardMaterial color="#e8e0d0" />
        </mesh>
      </group>
    )
  }

  return null
}
