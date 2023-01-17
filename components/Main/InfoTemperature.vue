<template>
  <div>
    <template v-if="dataForTwoDay">
      <Slader :data="dataForTwoDay" :container-class="containerClass">
        <template #header="{ prevItem, nextItem }"> <div>
          <div class="flex pb-4 sm:hidden">
            <div class="grow"></div>
            <div class="flex">
              <ButtomArround class="rounded-full backdrop-blur-md rotate-180"
              @click="prevItem"/>
              <ButtomArround class="rounded-full backdrop-blur-md ml-6"
              @click="nextItem"/>
            </div>
          </div>
        </div></template>
        <template #item="{ elem }">
          <div class="slader__item px-2 flex">
            <div class="py-6 px-3 w-full rounded-full backdrop-blur-md flex flex-col items-center justify-between">

              <p class="text-xl font-medium text-gray-800 dark:text-sky-100 mb-2">
                {{ getHours(elem.time) }}
              </p>
              <img
              :src="`./img/svg/wetherIcon/__${getNameIcon(elem.weathercode, elem.time)}.svg`"
              alt="icon" class="mb-3"
              />
              <p class="text-2xl font-bold"
              :class="[getColorByTemp(Math.round(elem.temperature_2m))]">
                {{ Math.round(elem.temperature_2m) }}&deg;
              </p>
            </div>
          </div>
        </template>
        <template #bottom> <div></div> </template>
      </Slader>
    </template>
  </div>
</template>

<script setup lang="ts">
import { _appStore as appData  } from "@/utils/store";

const option = temp4("ru");
const containerClass = ` -mx-2
  [grid-auto-columns:calc(100%/7)]
  xs_4:[grid-auto-columns:calc(100%/6)]
  xs_3:[grid-auto-columns:calc(100%/5)]
  xs_2:[grid-auto-columns:calc(100%/4)]
  xs:[grid-auto-columns:calc(100%/3)]`

//computed
const getHowHours = computed(() => new Date(appData.value.date).getHours());

const dataForTwoDay = computed(() =>{
  if (appData.value.appData) {
    return appData.value.appData?.hourly.time
    .map((el, index) => {
      const item = {};
      for (const elem in appData.value.appData.hourly) {
        const key = elem.replace(/_best_match/, "");
        item[key] = appData.value.appData.hourly[elem][index];
      }
      return item;
    })
    .slice(getHowHours.value, getHowHours.value + 48)
  } else {
    return null
  }
});

const getNameIcon = (code, time) => {
  const getItemTime = new Date(time).getHours();

  switch (true) {
    case getItemTime === appData.value.positionSun.sunrise:
      return "0_morning";
    case getItemTime === appData.value.positionSun.sunset:
      return "0_evening";
    case getItemTime > appData.value.positionSun.sunset || getItemTime < appData.value.positionSun.sunrise:
      return `${code}_night`;
    default:
      return code;
  }
};

const getTime = (time) => new Date(time);

const getHours = (time) => formatter(option).format(getTime(time));

</script>
