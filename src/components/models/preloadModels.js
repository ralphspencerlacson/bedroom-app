import { useEnvironment, useGLTF } from '@react-three/drei'
import models from './index'

// Start requests before the canvas mounts, avoiding sequential Suspense loads.
Object.entries(models).forEach(([name, path]) => {
  if (name !== 'book_shelf') useGLTF.preload(path)
})
useEnvironment.preload({ files: '/environments/city.hdr' })
