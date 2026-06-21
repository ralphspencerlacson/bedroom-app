import React, { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { Box3, Vector3 } from 'three'

export default function Model({
  path,
  align = 'floor',
  castShadow = true,
  receiveShadow = true,
  onLoad,
  ...props
}) {
  const { scene } = useGLTF(path)

  // clone + offset applied synchronously in one useMemo — never in useEffect
  const clone = useMemo(() => {
    if (!scene) return null

    const cloned = scene.clone(true)

    // shadows + z-fighting prevention
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = castShadow
        child.receiveShadow = receiveShadow
        if (child.material) {
          child.material.polygonOffset = true
          child.material.polygonOffsetFactor = -1
          child.material.polygonOffsetUnits = -1
        }
      }
    })

    // compute bounding box and apply centering offset directly on the clone
    const box = new Box3().setFromObject(cloned)
    const center = new Vector3()
    const size = new Vector3()
    box.getCenter(center)
    box.getSize(size)

    cloned.position.x -= center.x
    cloned.position.y -= align === 'floor' ? box.min.y : center.y
    cloned.position.z -= center.z

    if (typeof onLoad === 'function') onLoad({ size, center, box })

    return cloned
  }, [scene, align, castShadow, receiveShadow]) // onLoad intentionally omitted to avoid re-clone on every render

  if (!clone) return null

  // world transforms go on the outer group via spread props (position/rotation/scale)
  return (
    <group {...props}>
      <primitive object={clone} />
    </group>
  )
}

export function preload(path) {
  useGLTF.preload(path)
}