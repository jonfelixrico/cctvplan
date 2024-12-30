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

function getLeftRightPoints(distance: number): LeftRightPoints {
  const { viewingAngle, rotation, origin } = props

  const leftAngle = rotation - viewingAngle / 2
  const rightAngle = rotation + viewingAngle / 2

  const left = {
    x: origin.x + distance * Math.cos(leftAngle * (Math.PI / 180)),
    y: origin.y + distance * Math.sin(leftAngle * (Math.PI / 180)),
  }

  const right = {
    x: origin.x + distance * Math.cos(rightAngle * (Math.PI / 180)),
    y: origin.y + distance * Math.sin(rightAngle * (Math.PI / 180)),
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
