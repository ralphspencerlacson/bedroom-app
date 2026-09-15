import MacLaptopModel from './MacLaptopModel'
import LaptopStandModel from './LaptopStandModel'

// Stand dimensions at scale 0.06: its support plane is tilted 17.92 degrees
// and crosses the centered depth axis 12.943 units above the desk.
const tilt = Math.asin(4 / 13)
const setback = 1.9

export default function LaptopSetup(props) {
  return <group {...props}>
    <LaptopStandModel rotation={[0, -Math.PI / 2, 0]} />
    {/* Keep the front edge behind the stand's retaining lip. */}
    <MacLaptopModel position={[0, 13.02 + Math.tan(tilt) * setback, -setback]} rotation={[tilt, 0, 0]} />
  </group>
}
