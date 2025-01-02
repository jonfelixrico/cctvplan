<script setup lang="ts">
import {
  convertSegmentsToPoints,
  getPointsOverview,
  WallSegment,
} from './utils'
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

const points = computed(() => convertSegmentsToPoints(props.segments))

const svgPaths = computed(() => {
  const commands: string[] = ['M 0 0']

  for (const { x, y } of points.value) {
    commands.push(`L ${x},${y}`)
  }

  commands.push('Z')

  return commands.join(' ')
})

const viewBoxData = computed(() =>
  getPointsOverview(points.value, props.strokeWidth),
)

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
