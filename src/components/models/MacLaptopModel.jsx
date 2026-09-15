import React from 'react'
import Model from '../common/Model'
import { mac_laptop } from './index.js'
import { prepareLaptop } from './laptopAlignment'

export default function MacLaptopModel(props) {
  return (
    <Model
      path={mac_laptop}
      prepare={prepareLaptop}
      anchor="Rectangle003_02_-_Default_0"
      // Room-scale shadow maps produce self-shadow artifacts on the thin deck.
      // Keep casting onto the stand and desk, but shade the laptop directly.
      receiveShadow={false}
      align="floor"
      scale={340}
      rotation={[0, 0, 0]}
      {...props}
    />
  )
}
