import React from 'react'
import Model from '../common/Model'
import { television } from './index.js'

export default function TelevisionModel(props) {
  return (
    <Model
      path={television}
      align="floor"
      scale={9}
      rotation={[0, 0, 0]}
      {...props}
    />
  )
}
