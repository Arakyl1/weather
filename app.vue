<template>
  <div>
    <div class="min-h-screen relative">
      <div class="fixed h-full top-0 left-0 w-full z-0" >
        <img :src="`./img/background/__${stateOfDay}.jpg`" alt="" class="object-cover min-w-full min-h-full">
      </div>
      <div class="max-w-xl mx-auto pt-24 sm:px-4 xs_2:px-2">
        <MainNowInfo class="mb-8 relative z-20"/>
        <MainInfoTemperature class="z-20 relative mb-8"/>
        <MainForWeek class="relative z-20 mb-12"/>
        <MainAdditionalInfo class="mb-16"/>
      </div>
    </div>
    <OtherAddStyle/>
  </div>
</template>

<script setup lang="ts">
import { _appStore as appData } from "@/utils/store";

useHead({
  titleTemplate: () => 'Weather'
})

const { init } = useData()
init()

const stateOfDay = computed(() => {
  if (appData.value.appData) {
    const nowDate = appData.value.date.getHours();
    switch (true) {
      case nowDate > appData.value.positionSun.sunset ||
        nowDate < appData.value.positionSun.sunrise:
        return 'nigth';
      default:
        return 'day';
    }
  } else {
    return 'default'
  }
});

watch(() =>  stateOfDay.value, () => {
  useHead({
    htmlAttrs() {
      return {
        class: stateOfDay.value === 'nigth' ? 'dark' : 'light'
      }
    },
  })
})
</script>