import React from 'react'
import Model from '../common/Model'
import { mac_laptop_stand } from './index.js'

export default function LaptopStandModel(props) {
  return (
    <Model
      path={mac_laptop_stand}
      align="floor"
      scale={0.06}
      rotation={[0, 0, 0]}
      {...props}
    />
  )
}
