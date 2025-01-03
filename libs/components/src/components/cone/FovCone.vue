<script setup lang="ts">
import { computed } from 'vue'
import { Point } from '@/utils/geom.types'
import { DistanceSegment } from './types'

const props = defineProps<{
  segments: DistanceSegment[]
  viewingAngle: number
  rotation: number
  origin: Point
}>()

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

type ComputedSegment = LeftRightPoints & { distance: number }

const computedSegments = computed(() => {
  const distances = props.segments.map((s) => s.distance)

  const segments: ComputedSegment[] = []

  let distanceSum = 0
  for (const distance of distances) {
    distanceSum += distance
    segments.push({
      ...getLeftRightPoints(distanceSum),
      distance: distanceSum,
    })
  }

  return segments
})

function getInitialPath({ left, right, distance }: ComputedSegment): string {
  const { origin } = props

  return [
    `M ${origin.x} ${origin.y}`,
    `L ${left.x} ${left.y}`,
    `A ${distance} ${distance} 0 0 1 ${right.x} ${right.y}`,
    'Z',
  ].join('')
}

function getSucceedingPath(prev: ComputedSegment, current: ComputedSegment) {
  return [
    `M ${prev.left.x} ${prev.left.y}`,
    `L ${current.left.x} ${current.left.y}`,
    `A ${current.distance} ${current.distance} 0 0 1 ${current.right.x} ${current.right.y}`,
    `L ${prev.right.x} ${prev.right.y}`,
    `A ${prev.distance} ${prev.distance} 0 0 0 ${prev.left.x} ${prev.left.y}`,
    'Z',
  ].join('')
}
</script>

<template>
  <template v-for="(segment, index) in computedSegments" :key="index">
    <path
      v-if="index === 0"
      :d="getInitialPath(segment)"
      :fill="segments[index].color"
    />

    <path
      v-else
      :d="getSucceedingPath(computedSegments[index - 1], segment)"
      :fill="segments[index].color"
    />
  </template>
</template>
