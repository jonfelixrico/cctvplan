<script setup lang="ts">
import { FloorPlan, type WallSegment } from '@cctvplan/components'

const segments = ref<WallSegment[]>([])
</script>

<template>
  <div class="w-dvw h-dvh flex flex-row gap-2">
    <div class="grow">
      <FloorPlan :segments="segments" />
    </div>

    <div class="flex flex-col justify-end">
      <FloorPlanInputGroup v-model="segments" class="self-start" />
    </div>
  </div>
</template>
