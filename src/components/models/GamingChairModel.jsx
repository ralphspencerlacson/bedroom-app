import React from 'react'
import Model from '../common/Model'
import { gaming_chair } from './index.js'

export default function GamingChairModel(props) {
  return (
    <Model
      path={gaming_chair}
      align="floor"
      scale={3}
      rotation={[0, 0, 0]}
      {...props}
    />
  )
}
