<script setup lang="ts">
import type { WallSegment } from '@cctvplan/components'

const distance = defineModel<number>('distance')
const direction = defineModel<WallSegment['direction']>('direction')
</script>

<template>
  <div
    class="grid grid-cols-subgrid col-span-3 row-span-2 items-center gap-x-2"
  >
    <div class="col-span-1 place-items-end">
      <slot name="left" />
    </div>

    <div class="grid grid-cols-subgrid row-span-2 gap-y-1">
      <UInput v-model.number="distance" type="number" />

      <div class="flex flex-row gap-2">
        <div class="flex flex-row items-center gap-1">
          <URadio v-model="direction" value="up" />
          Up
        </div>
        <div class="flex flex-row items-center gap-1">
          <URadio v-model="direction" value="down" />
          Down
        </div>
        <div class="flex flex-row items-center gap-1">
          <URadio v-model="direction" value="left" />
          Left
        </div>
        <div class="flex flex-row items-center gap-1">
          <URadio v-model="direction" value="right" />
          Right
        </div>
      </div>
    </div>

    <div class="col-span-1">
      <slot name="right" />
    </div>
  </div>
</template>
