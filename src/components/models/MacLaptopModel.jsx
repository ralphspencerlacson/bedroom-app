import React from 'react'
import Model, { preload as modelPreload } from '../common/Model'
import { mac_laptop } from './index.js'

export default function MacLaptopModel(props) {
  return (
    <Model
      path={mac_laptop}
      align="floor"
      scale={340}
      rotation={[0, 0, 0]}
      {...props}
    />
  )
}

export function preload() {
  modelPreload(mac_laptop)
}
