<script setup lang="ts">
import { type WallSegment } from '@cctvplan/components'

const segments = defineModel<WallSegment[]>({
  default: [],
})

const innerModel = reactive<WallSegment>({
  direction: 'up',
  distance: 5,
})

watch(
  () => segments.value?.[segments.value.length - 1],
  (lastSegment) => {
    if (!lastSegment) {
      innerModel.distance = 5
      innerModel.direction = 'up'
      return
    }

    const { direction, distance } = lastSegment
    innerModel.direction = direction
    innerModel.distance = distance
  },
  {
    immediate: true,
  },
)

function setSegment(index: number, forPatch: Partial<WallSegment>) {
  const clone = [...segments.value]
  clone[index] = { ...clone[index], ...forPatch }
  segments.value = clone
}
</script>

<template>
  <div class="flex flex-col">
    <!-- Using index as key seems to be fucked with this rule -->
    <!-- eslint-disable-next-line vue/valid-v-for -->
    <div v-for="(segment, idx) of segments" :key="idx">
      <FloorPlanInput
        :distance="segment.distance"
        :direction="segment.direction"
        @update:distance="setSegment(idx, { distance: $event })"
        @update:direction="setSegment(idx, { direction: $event })"
      />
    </div>

    <FloorPlanInput
      v-model:distance="innerModel.distance"
      v-model:direction="innerModel.direction"
    />
  </div>
</template>
