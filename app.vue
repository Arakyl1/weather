<template>
  <div>
    <div class="min-h-screen relative">
      <div class="fixed h-full top-0 left-0 w-full" >
        <img src="@/assets/img/background/__nigth.jpg" alt="" class="object-cover min-w-full min-h-full">
      </div>
      <div class="max-w-xl mx-auto border border-yellow-100 pt-24">
        <MainNowInfo/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { init } = useData()
init()
// import { _appData } from "@/pinia/store";

// const appDataFunc = _appData()
// const { store } = storeToRefs(appDataFunc)
// await appDataFunc.getLocalUser();

// const { appData } = store
// watch(() => appData, (newD) => {
//   console.log(newD);
  
// })
</script>