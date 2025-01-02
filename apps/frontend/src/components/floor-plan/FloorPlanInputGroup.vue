<script setup lang="ts">
import { type WallSegment } from '@cctvplan/components'

const segments = defineModel<WallSegment[]>({
  required: true,
})

const innerModel = reactive<WallSegment>({
  direction: 'up',
  distance: 5,
})

function setSegment(index: number, forPatch: Partial<WallSegment>) {
  const clone = [...segments.value]
  clone[index] = { ...clone[index], ...forPatch }
  segments.value = clone
}

function addSegment() {
  segments.value.push({ ...innerModel })
}

function removeSegment(index: number) {
  segments.value.splice(index, 1)
}
</script>

<template>
  <div class="grid grid-cols-[auto_1fr_auto] gap-y-3">
    <FloorPlanInput
      v-model:distance="innerModel.distance"
      v-model:direction="innerModel.direction"
    >
      <template #right>
        <UButton block @click="addSegment">Add</UButton>
      </template>

      <template #left>
        <div>New</div>
      </template>
    </FloorPlanInput>

    <FloorPlanInput
      v-for="(segment, idx) of segments"
      :key="idx"
      :distance="segment.distance"
      :direction="segment.direction"
      @update:distance="setSegment(idx, { distance: $event })"
      @update:direction="setSegment(idx, { direction: $event })"
    >
      <template #left>
        <div>{{ idx + 1 }}</div>
      </template>

      <template #right>
        <UButton block @click="removeSegment(idx)">Remove</UButton>
      </template>
    </FloorPlanInput>
  </div>
</template>
