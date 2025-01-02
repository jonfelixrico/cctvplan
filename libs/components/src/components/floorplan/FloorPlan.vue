<script setup lang="ts">
import { WallSegment } from '@/components/floorplan/types'
import { Point } from '@/utils/geom.types'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    segments: WallSegment[]
    strokeWidth: number
  }>(),
  {
    strokeWidth: 1,
  },
)

const points = computed(() => {
  const points: Point[] = []

  for (const { direction, distance } of props.segments) {
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
})

const svgPaths = computed(() => {
  const commands: string[] = ['M 0 0']

  for (const { x, y } of points.value) {
    commands.push(`L ${x},${y}`)
  }

  commands.push('Z')

  return commands.join(' ')
})

const viewBoxData = computed(() => {
  let xMin = 0
  let xMax = 0
  let yMin = 0
  let yMax = 0

  for (const point of points.value) {
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
    x: xMin - props.strokeWidth / 2,
    y: yMin - props.strokeWidth / 2,

    /*
     * We're doing STROKE instead of STROKE / 2 since we have to compensate for the TL offset
     * that we've done above
     */
    width: xMax - xMin + props.strokeWidth,
    height: yMax - yMin + props.strokeWidth,
  }
})

const viewBox = computed(() => {
  const { x, y, width, height } = viewBoxData.value

  return [x, y, width, height].join(' ')
})
</script>

<template>
  <svg
    :viewBox="viewBox"
    :width="viewBoxData.width"
    :height="viewBoxData.height"
  >
    <path
      stroke="black"
      :stroke-width="strokeWidth"
      :d="svgPaths"
      fill="none"
    />
  </svg>
</template>
