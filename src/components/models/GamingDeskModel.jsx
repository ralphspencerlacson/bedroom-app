import React from 'react'
import Model, { preload as modelPreload } from '../common/Model'
import { gaming_desk } from './index.js'

export default function GamingDeskModel(props) {
  return (
    <Model
      path={gaming_desk}
      align="floor"
      scale={0.06}
      rotation={[0, 0, 0]}
      {...props}
    />
  )
}

export function preload() {
  modelPreload(gaming_desk)
}
