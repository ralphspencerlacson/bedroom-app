import React from 'react'

export default function Wall({
  size = 320,
  height = 60,
  thickness = 2,
  color = '#ffffff',
  topY = -0.5,
  side = 'top', // 'top'|'bottom'|'left'|'right'
  positionOffset = [0, 0, 0],
  wireframe = false,
}) {
  const half = size / 2
  let pos = [0, topY + height / 2, 0]
  let geomArgs = [size, height, thickness]
  let rot = [0, 0, 0]

  if (side === 'top') {
    pos = [0 + positionOffset[0], topY + height / 2 + positionOffset[1], half - thickness / 2 + positionOffset[2]]
    geomArgs = [size, height, thickness]
    rot = [0, 0, 0]
  } else if (side === 'bottom') {
    pos = [0 + positionOffset[0], topY + height / 2 + positionOffset[1], -half + thickness / 2 + positionOffset[2]]
    geomArgs = [size, height, thickness]
    rot = [0, 0, 0]
  } else if (side === 'left') {
    pos = [-half + thickness / 2 + positionOffset[0], topY + height / 2 + positionOffset[1], 0 + positionOffset[2]]
    geomArgs = [thickness, height, size]
    rot = [0, 0, 0]
  } else if (side === 'right') {
    pos = [half - thickness / 2 + positionOffset[0], topY + height / 2 + positionOffset[1], 0 + positionOffset[2]]
    geomArgs = [thickness, height, size]
    rot = [0, 0, 0]
  }

  return (
    <mesh position={pos} rotation={rot} castShadow receiveShadow>
      <boxGeometry args={geomArgs} />
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </mesh>
  )
}
