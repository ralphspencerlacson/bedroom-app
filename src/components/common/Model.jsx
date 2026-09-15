import { useEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { Box3, Vector3 } from 'three'

export default function Model({ path, align = 'floor', anchor, castShadow = true, receiveShadow = true, onLoad, prepare, ...props }) {
  const { scene } = useGLTF(path)
  const { clone, bounds } = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse(child => {
      if (!child.isMesh) return
      child.castShadow = castShadow
      child.receiveShadow = receiveShadow
    })
    prepare?.(clone)
    clone.updateMatrixWorld(true)
    const box = new Box3().setFromObject((anchor && clone.getObjectByName(anchor)) || clone)
    const center = box.getCenter(new Vector3())
    const size = box.getSize(new Vector3())
    clone.position.x -= center.x
    clone.position.y -= align === 'floor' ? box.min.y : center.y
    clone.position.z -= center.z
    return { clone, bounds: { box, center, size } }
  }, [scene, align, anchor, castShadow, receiveShadow, prepare])

  useEffect(() => { onLoad?.(bounds) }, [onLoad, bounds])
  return <group {...props}><primitive object={clone} dispose={null} /></group>
}
