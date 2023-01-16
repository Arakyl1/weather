<template>
  <div>
    <div class="min-h-screen relative">
      <div class="fixed h-full top-0 left-0 w-full z-0" >
        <img src="@/assets/img/background/__nigth.jpg" alt="" class="object-cover min-w-full min-h-full">
      </div>
      <div class="max-w-xl mx-auto border border-yellow-100 pt-24">
        <MainNowInfo class="mb-8"/>
        <MainInfoTemperature class="z-20 relative"/>
        <MainForWeek class="relative z-20 mb-12"/>
        <MainAdditionalInfo class="mb-16"/>
      </div>
    </div>
    <OtherAddStyle/>
  </div>
</template>

<script setup lang="ts">

const { init } = useData()
init()

</script>