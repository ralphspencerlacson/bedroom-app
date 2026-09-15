import React from 'react'
import Model from '../common/Model'
import { tv_shelf } from './index.js'

export default function TvShelfModel(props) {
  return (
    <Model
      path={tv_shelf}
      align="floor"
      scale={68}
      rotation={[0, 0, 0]}
      {...props}
    />
  )
}
