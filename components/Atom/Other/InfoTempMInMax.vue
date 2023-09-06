<template>
    <div class="flex justify-end items-end">
      <p :class="[minCol, styleP]">
        {{ Math.round(min) }}&deg;
      </p>
      <p :class="[minCol, styleP]">..</p>
      <p :class="[maxCol, styleP]">.</p>
      <p :class="[maxCol, styleP]">
        {{ Math.round(max) }}&deg;
      </p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ min: number, max: number }>()

const styleP = 'text-3xl font-semibold sm:text-2xl xs_2:text-xl xs_1:text-lg'
const minCol = `text-${getColorByTemp(Math.round(props.min))}` 
const maxCol = `text-${getColorByTemp(Math.round(props.max))}`
</script>