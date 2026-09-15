// A small convex silhouette makes exact floor contact inexpensive per frame.
export function convexHull(points) {
  const sorted = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1])
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
  const half = values => {
    const result = []
    for (const point of values) {
      while (result.length >= 2 && cross(result[result.length - 2], result[result.length - 1], point) <= 0) result.pop()
      result.push(point)
    }
    result.pop()
    return result
  }
  return [...half(sorted), ...half([...sorted].reverse())]
}

export function contactHeight(hull, roll, breath) {
  const sin = Math.sin(roll)
  const cos = Math.cos(roll)
  let lowest = Infinity
  for (const [x, y] of hull) lowest = Math.min(lowest, x * sin + y * breath * cos)
  return Number.isFinite(lowest) ? -lowest : 0
}
