<template>
    <div class="flex justify-end items-end">
      <p class="text-2xl font-semibold"
      :class="[minCol]">
        {{ Math.round(min) }}&deg;
      </p>
      <p class="text-2xl font-semibold" :class="[minCol]">..</p>
      <p class="text-2xl font-semibold" :class="[maxCol]">.</p>
      <p class="text-2xl font-semibold"
      :class="[maxCol]">
        {{ Math.round(max) }}&deg;
      </p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ min: number, max: number }>()

const minCol = getColorByTemp(Math.round(props.min))
const maxCol = getColorByTemp(Math.round(props.max))
</script>