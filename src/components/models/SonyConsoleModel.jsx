import React from 'react'
import Model from '../common/Model.jsx'
import { sony_console } from './index.js'

export default function SonyConsoleModel(props) {
  return (
    <Model
      path={sony_console}
      align="floor"
      scale={0.046}
      rotation={[0, 0, 0]}
      {...props}
    />
  )
}
