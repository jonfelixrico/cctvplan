<script setup lang="ts">
import { Point } from '@/utils/geom.types'
import { computed } from 'vue'

interface Segment {
  direction: 'up' | 'down' | 'left' | 'right'
  distance: number
}

const props = defineProps<{
  segments: Segment[]
}>()

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
  return points.value.map(({ x, y }) => `L ${x},${y}`).join(' ')
})

const edges = computed(() => {
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
    min: { x: xMin, y: yMin },
    max: { x: xMax, y: yMax },
    width: xMax - xMin,
    height: yMax - yMin,
  }
})

const STROKE = 1
</script>

<template>
  <svg
    :width="edges.width + STROKE * 2"
    :height="edges.height + STROKE * 2"
    :viewBox="
      [
        edges.min.x - STROKE,
        edges.min.y - STROKE,
        edges.max.x + STROKE,
        edges.max.y + STROKE,
      ].join(' ')
    "
  >
    <path stroke="black" :stroke-width="STROKE" :d="svgPaths" />
  </svg>
</template>
