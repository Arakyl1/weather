<template>
  <div class="" v-if="dataWeather">
    <div class="px-8 pb-12 pt-8 bg-gradient-to-br
    from-teal-100 dark:from-sky-500 to-sky-400 dark:to-violet-600
    rounded-32px xs_3:text-px-6 xs_3:pt-6 xs_3:pb-8 xs_3:rounded-3xl xs_1:px-4 xs_1:pt-4 xs_1:pb-4">
      <div class="">
        <div class="flex items-end mb-4">
          <div class="w-[180px] xs_3:w-[120px] relative">
            <img :src="`./img/svg/wetherIcon/__${nameImage}.svg`" alt="#" 
            class="w-full  absolute bottom-0 left-0 -translate-y-4 xs:-translate-y-2 "/>
          </div>
          <div class="grow text-right">
              <p class="relative text-sky-700 dark:text-sky-200 text-6xl font-bold xs_3:text-5xl xs_1:text-4xl">
                {{ Math.round(dataWeather.current_weather.temperature) }}&deg;
              </p>
          </div>
        </div>
        <template v-if="infoDate">
          <div class="flex">
          <div class="grow">
            <p class="text-sky-700 font-semibold text-4xl dark:text-sky-200 xs_3:text-3xl xs_1:text-2xl">
              {{ infoDate.weekday }}
            </p>
            <p class="text-sky-700 font-semibold text-4xl dark:text-sky-200 xs_3:text-3xl xs_1:text-2xl">
              {{ infoDate.day }}
            </p>
          </div>
          <div class="">
            <p class="text-6xl font-bold text-sky-900 dark:text-sky-100 xs_3:text-5xl xs_1:text-4xl">
              {{ infoDate.min }}
            </p>
          </div>
        </div>
        </template>
        <div class="text-right">
          <div class="flex items-center justify-end">
            <CreateIcon name="marker-1_20_20" :att="{ class: 'fill-white' }" class="mr-4"/>
            <p class="text-gray-900 dark:text-white text-2xl xs_3:text-xl xs_1:text-lg"
            >{{ APP_DATA.cords ? APP_DATA.cords.city : '' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { APP_DATA } from "@/type/index";
import { ComputedRef } from "@vue/reactivity";
import CreateIcon from "@/content/icons/create";

const APP_DATA = useState<APP_DATA>("APP_DATA")


const nameImage = computed(() => {
  if (APP_DATA.value.appData && APP_DATA.value.positionSun) {

    const data = APP_DATA.value.appData
    const nameCode = data.current_weather.weathercode;
    const nowTime = new Date(data.current_weather.time).getHours();

    switch (true) {
      case APP_DATA.value.positionSun.sunrise === nowTime && nameCode === 0:
        return `${nameCode}_morning`;
      case APP_DATA.value.positionSun.sunset === nowTime && nameCode === 0:
        return `${nameCode}_evening`;
      case APP_DATA.value.positionSun.sunrise > nowTime || APP_DATA.value.positionSun.sunset < nowTime:
        return `${nameCode}_night`;
      default:
        return nameCode;
    }
  }
});

const infoDate:ComputedRef<{
  min: string;
  day: string;
  weekday: string;
} | undefined> = computed(() => {
  const date = APP_DATA.value.date
  if (date && date instanceof Date) {
    const min = (new Intl.DateTimeFormat('ru', (optionHoursMinute({}) as Intl.DateTimeFormatOptions))).format(date);
    const day = (new Intl.DateTimeFormat('en-US', (numderDayMount({}) as Intl.DateTimeFormatOptions))).format(date);
    const weekday = (new Intl.DateTimeFormat('en-US', (optionWeekday({}) as Intl.DateTimeFormatOptions))).format(date);
    return { min: min, day: day, weekday: weekday };
  }
});

const dataWeather = computed(() => APP_DATA.value ? APP_DATA.value.appData : null)
</script>
