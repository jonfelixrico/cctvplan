<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  distances: number[]
  viewingAngle: number
  rotation: number
  origin: Point
}>()

interface Point {
  x: number
  y: number
}

interface LeftRightPoints {
  left: Point
  right: Point
}

/**
 * Converts degrees to radians.
 * JavaScript's Math.sin() and Math.cos() functions expect angles in radians,
 * but we use degrees in our API for better developer experience since degrees
 * are more intuitive to work with (0-360 vs 0-2π).
 */
function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

function getLeftRightPoints(distance: number): LeftRightPoints {
  const { viewingAngle, rotation, origin } = props

  // Subtract 90 degrees to align with SVG coordinate system where 0° points right
  const rightAngle = rotation - 90 + viewingAngle / 2
  const leftAngle = rotation - 90 - viewingAngle / 2

  const left = {
    x: origin.x + distance * Math.cos(degreesToRadians(leftAngle)),
    y: origin.y + distance * Math.sin(degreesToRadians(leftAngle)),
  }

  const right = {
    x: origin.x + distance * Math.cos(degreesToRadians(rightAngle)),
    y: origin.y + distance * Math.sin(degreesToRadians(rightAngle)),
  }

  return { left, right }
}

function getSvgPath(
  { left, right }: LeftRightPoints,
  distance: number,
): string {
  const { origin } = props

  return [
    `M ${origin.x} ${origin.y}`,
    `L ${left.x} ${left.y}`,
    `A ${distance} ${distance} 0 0 1 ${right.x} ${right.y}`,
    'Z',
  ].join('')
}

const leftRightPoints = computed(() => {
  const { distances } = props

  const pairs: LeftRightPoints[] = []

  let distanceSum = 0
  for (const distance of distances) {
    distanceSum += distance
    pairs.push(getLeftRightPoints(distanceSum))
  }

  return pairs
})
</script>

<template>
  <path
    v-for="(pair, index) in leftRightPoints"
    :key="index"
    :d="getSvgPath(pair, distances[index])"
    fill="gray"
  />
</template>
