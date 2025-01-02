<script setup lang="ts">
import { WallSegment } from '@cctvplan/components'

defineModel<number>('distance')
defineModel<WallSegment['direction']>('direction')
</script>

<template>
  <div class="flex flex-col">
    <UInput v-model="distance" />
    <div>
      <URadio v-model="direction" value="up">Up</URadio>
      <URadio v-model="direction" value="down">Down</URadio>
      <URadio v-model="direction" value="left">Left</URadio>
      <URadio v-model="direction" value="right">Right</URadio>
    </div>
  </div>
</template>
