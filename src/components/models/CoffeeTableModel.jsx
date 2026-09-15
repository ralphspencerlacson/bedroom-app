import React from 'react'
import Model from '../common/Model'
import { coffee_table } from './index.js'

export default function CoffeeTableModel(props) {
  return (
    <Model
      path={coffee_table}
      align="floor"
      scale={0.68}
      rotation={[0, -Math.PI, 0]}
      {...props}
    />
  )
}
