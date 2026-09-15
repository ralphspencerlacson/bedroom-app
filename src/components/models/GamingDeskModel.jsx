import React from 'react'
import Model from '../common/Model'
import { prepareDesk } from './deskMaterials'
import { gaming_desk } from './index.js'

export default function GamingDeskModel(props) {
  return (
    <Model
      path={gaming_desk}
      prepare={prepareDesk}
      align="floor"
      scale={0.068}
      rotation={[0, 0, 0]}
      {...props}
    />
  )
}
