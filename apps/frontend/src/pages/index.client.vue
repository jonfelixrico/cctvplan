<script setup lang="ts">
import { FloorPlan, type WallSegment } from '@cctvplan/components'
import { useLocalStorage } from '@vueuse/core'

const segments = useLocalStorage<WallSegment[]>('segments', [])
const SCALE = 50
const scaledSegments = computed(() =>
  segments.value.map(({ direction, distance }) => ({
    direction,
    distance: distance * SCALE,
  })),
)
</script>

<template>
  <div class="w-dvw h-dvh flex flex-row gap-2">
    <div class="grow overflow-auto">
      <FloorPlan :segments="scaledSegments" />
    </div>

    <div class="flex flex-col justify-end">
      <FloorPlanInputGroup v-model="segments" class="self-start" />
    </div>
  </div>
</template>
