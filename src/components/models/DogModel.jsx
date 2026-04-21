import React from 'react'
import Model, { preload as modelPreload } from '../common/Model'
import { dog } from './index.js'

export default function DogModel(props) {
  return (
    <Model
      path={dog}
      align="floor"
      scale={38}
      rotation={[0, 0, 0]}
      {...props}
    />
  )
}

export function preload() {
  modelPreload(dog)
}
