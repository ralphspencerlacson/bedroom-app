import { MeshStandardMaterial } from 'three'

// Shared, application-lifetime finishes. The GLB contains gray placeholders.
const oak = new MeshStandardMaterial({ color: '#b88854', roughness: 0.66 })
oak.onBeforeCompile = shader => {
  shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 woodPosition;')
    .replace('#include <begin_vertex>', '#include <begin_vertex>\nwoodPosition = position;')
  shader.fragmentShader = shader.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 woodPosition;')
    .replace('#include <color_fragment>', `#include <color_fragment>
      float grain = sin(woodPosition.y * 0.24 + sin(woodPosition.x * 0.009) * 3.0);
      float fineGrain = sin(woodPosition.y * 1.8 + sin(woodPosition.x * 0.018));
      diffuseColor.rgb *= 0.91 + 0.07 * grain + 0.02 * fineGrain;
    `)
}
oak.customProgramCacheKey = () => 'desk-oak-v1'
const frame = new MeshStandardMaterial({ color: '#282b30', roughness: 0.42, metalness: 0.65 })
const hardware = new MeshStandardMaterial({ color: '#bfc6ce', roughness: 0.26, metalness: 0.85 })
const preparedGeometry = new WeakMap()

export function prepareDesk(scene) {
  scene.traverse(mesh => {
    if (!mesh.isMesh) return
    const name = mesh.material.name
    if (name === 'wire_206206206') {
      // Separate the desktop from the frame in the source's Z-up coordinates.
      let geometry = preparedGeometry.get(mesh.geometry)
      if (!geometry) {
        geometry = mesh.geometry.clone()
        const positions = geometry.attributes.position
        const index = geometry.index
        const count = index ? index.count : positions.count
        geometry.clearGroups()
        let start = 0
        let previous = -1
        for (let i = 0; i < count; i += 3) {
          const top = [0, 1, 2].every(offset => positions.getZ(index ? index.getX(i + offset) : i + offset) < -725)
          const material = top ? 0 : 1
          if (material !== previous) {
            if (previous !== -1) geometry.addGroup(start, i - start, previous)
            start = i
            previous = material
          }
        }
        geometry.addGroup(start, count - start, previous)
        preparedGeometry.set(mesh.geometry, geometry)
      }
      mesh.geometry = geometry
      mesh.material = [oak, frame]
    } else {
      mesh.material = name === 'wire_255255255' ? hardware : oak
    }
  })
}
