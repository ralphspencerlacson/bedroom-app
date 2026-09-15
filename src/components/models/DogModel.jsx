import { useMemo, useRef, useState } from 'react'
import { Html, useCursor, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Box3, MathUtils, Vector3 } from 'three'
import { dog } from './index.js'
import { convexHull, contactHeight } from './dogMotion'

const durations = { awake: 8, settling: 2.5, sleeping: 12, waking: 2.5 }
const nextPhase = { awake: 'settling', settling: 'sleeping', sleeping: 'waking', waking: 'awake' }

export default function DogModel(props) {
  const { scene: source } = useGLTF(dog)
  const { scene, hull } = useMemo(() => {
    const scene = source.clone(true)
    scene.updateMatrixWorld(true)
    const box = new Box3().setFromObject(scene)
    const center = box.getCenter(new Vector3())
    const points = []
    const vertex = new Vector3()
    scene.traverse(mesh => {
      if (!mesh.isMesh) return
      mesh.castShadow = true
      mesh.receiveShadow = true
      const positions = mesh.geometry.attributes.position
      for (let i = 0; i < positions.count; i++) {
        vertex.fromBufferAttribute(positions, i).applyMatrix4(mesh.matrixWorld)
        points.push([(vertex.x - center.x) * 38, (vertex.y - box.min.y) * 38])
      }
    })
    scene.position.sub(new Vector3(center.x, box.min.y, center.z))
    return { scene, hull: convexHull(points) }
  }, [source])
  const pose = useRef()
  const body = useRef()
  const motion = useRef({ phase: 'awake', elapsed: 0, rest: 0 })
  const [phase, setPhase] = useState('awake')
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)
  const resting = phase === 'sleeping' || phase === 'settling'

  function changePhase(next) {
    motion.current.phase = next
    motion.current.elapsed = 0
    setPhase(next)
  }
  function toggle(event) {
    event.stopPropagation()
    changePhase(resting ? 'waking' : 'settling')
  }

  useFrame(({ clock }, delta) => {
    if (!pose.current || !body.current) return
    const state = motion.current
    // Don't skip a whole pose after returning from a background tab.
    const dt = Math.min(delta, 0.1)
    state.elapsed += dt
    if (state.elapsed >= durations[state.phase]) changePhase(nextPhase[state.phase])
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const target = state.phase === 'settling' || state.phase === 'sleeping' ? 1 : 0
    state.rest = reduced ? target : MathUtils.damp(state.rest, target, 2.8, dt)
    const roll = -Math.PI / 2 * state.rest
    const breath = reduced ? 1 : 1 + Math.sin(clock.elapsedTime * 1.7) * 0.018 * state.rest
    body.current.scale.y = breath
    pose.current.rotation.z = roll
    // Use the mesh's silhouette so paws and body stay on the floor while rolling.
    pose.current.position.y = contactHeight(hull, roll, breath)
  })

  return <group {...props}>
    <group ref={pose} onClick={toggle} onPointerOver={event => { event.stopPropagation(); setHovered(true) }} onPointerOut={() => setHovered(false)}>
      <group ref={body}><primitive object={scene} scale={38} dispose={null} /></group>
    </group>
    <Html position={[0, 36, 0]} center zIndexRange={[20, 0]}>
      <button className={resting ? 'dog-action sleeping' : 'dog-action'} onClick={toggle}
        aria-label={resting ? 'Wake the dog' : 'Let the dog sleep'} title={resting ? 'Wake the dog' : 'Let the dog sleep'}>
        <span aria-hidden="true">{resting ? 'Zzz' : phase === 'waking' ? 'Good morning!' : 'Time for a nap?'}</span>
      </button>
    </Html>
  </group>
}
