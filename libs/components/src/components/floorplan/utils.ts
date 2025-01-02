import { Point } from '@/utils/geom.types'

export interface WallSegment {
  direction: 'up' | 'down' | 'left' | 'right'
  distance: number
}

/**
 * @private
 */
export function convertSegmentsToPoints(segments: WallSegment[]) {
  const points: Point[] = []

  for (const { direction, distance } of segments) {
    const lastPoint = points[points.length - 1] ?? { x: 0, y: 0 }

    switch (direction) {
      case 'up':
        points.push({ x: lastPoint.x, y: lastPoint.y - distance })
        break
      case 'down':
        points.push({ x: lastPoint.x, y: lastPoint.y + distance })
        break
      case 'left':
        points.push({ x: lastPoint.x - distance, y: lastPoint.y })
        break
      case 'right':
        points.push({ x: lastPoint.x + distance, y: lastPoint.y })
        break
    }
  }

  return points
}

/**
 * @private
 */
export function getPointsOverview(points: Point[], strokeWidth: number) {
  let xMin = 0
  let xMax = 0
  let yMin = 0
  let yMax = 0

  for (const point of points) {
    if (point.x < xMin) {
      xMin = point.x
    }
    if (point.x > xMax) {
      xMax = point.x
    }
    if (point.y < yMin) {
      yMin = point.y
    }
    if (point.y > yMax) {
      yMax = point.y
    }
  }

  return {
    x: xMin - strokeWidth / 2,
    y: yMin - strokeWidth / 2,

    /*
     * We're doing STROKE instead of STROKE / 2 since we have to compensate for the TL offset
     * that we've done above
     */
    width: xMax - xMin + strokeWidth,
    height: yMax - yMin + strokeWidth,
  }
}
