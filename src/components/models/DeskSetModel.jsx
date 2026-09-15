import React from 'react'
import Model from '../common/Model'
import { desk_set } from './index.js'

export default function DeskSetModel(props) {
  return (
    <Model
      path={desk_set}
      align="floor"
      scale={68}
      rotation={[0, 0, 0]}
      {...props}
    />
  )
}
