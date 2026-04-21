import React from 'react'
import Model, { preload as modelPreload } from '../common/Model'
import { gaming_chair } from './index.js'

export default function GamingChairModel(props) {
  return (
    <Model
      path={gaming_chair}
      align="floor"
      scale={1}
      rotation={[0, 0, 0]}
      {...props}
    />
  )
}

export function preload() {
  modelPreload(gaming_chair)
}
