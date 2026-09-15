import React from 'react'
import Model from '../common/Model'
import { sofa } from './index.js'

export default function SofaModel(props) {
  return (
    <Model
      path={sofa}
      align="floor"
      scale={1.6}
      rotation={[0, -Math.PI / 2, 0]}
      {...props}
    />
  )
}
