import { Matrix4, Quaternion, Vector3 } from 'three'

// The imported MacBook has yaw and tilt baked into its node transforms.
// Measured from the underside and front edge of its base housing, these axes
// straighten the base before it is positioned on a desk or tilted on a stand.
const up = new Vector3(0.1095618264, 0.9653546850, 0.2368259662).normalize()
const right = new Vector3(24.6785706349, -0.7175421139, -8.4920866644).normalize()
const forward = new Vector3().crossVectors(right, up).normalize()
right.crossVectors(up, forward).normalize()
const straighten = new Quaternion().setFromRotationMatrix(new Matrix4().makeBasis(right, up, forward)).invert()

export function prepareLaptop(scene) {
  scene.quaternion.premultiply(straighten)
}
