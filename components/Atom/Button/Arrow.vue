<template>
    <AtomButtonStandart class="aspect-square py-4 rounded-full flex items-center ">
        <slot>
            <CreateIcon name="arrow-1_14_16" :att="{ class: 'fill-white'}"/>
        </slot>
    </AtomButtonStandart>
</template>

<script setup lang="ts">
import CreateIcon from "@/content/icons/create";
</script>
