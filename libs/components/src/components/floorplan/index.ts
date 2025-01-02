import { getPointsOverview } from '@/components/floorplan/utils'

import {
  convertSegmentsToPoints,
  WallSegment,
} from '@/components/floorplan/utils'

export { default as FloorPlan } from './FloorPlan.vue'
export { type WallSegment } from './utils'

export function getDimensionsFromSegments(
  segments: WallSegment[],
  strokeWidth: number,
) {
  const points = convertSegmentsToPoints(segments)
  const { width, height } = getPointsOverview(points, strokeWidth)

  return { width, height }
}
