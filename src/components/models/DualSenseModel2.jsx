import React from 'react'
import Model from '../common/Model'
import { dual_sense } from './index.js'

export default function DualSenseModel2(props) {
  return (
    <Model
      path={dual_sense}
      align="floor"
      scale={4}
      rotation={[0, 0, 0]}
      {...props}
    />
  )
}
