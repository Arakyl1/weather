<template>
  <div class="" v-if="dataWeather">
    <div class="px-8 pb-12 pt-8 bg-gradient-to-br
    from-teal-100 dark:from-sky-500 to-sky-400 dark:to-violet-600
    rounded-32px xs_3:text-px-6 xs_3:pt-6 xs_3:pb-8 xs_3:rounded-3xl xs_1:px-4 xs_1:pt-4 xs_1:pb-4">
      <div class="">
        <div class="flex items-end mb-4">
          <div class="w-[180px]  xs_3:w-[120px] relative">
            <img :src="`./img/svg/wetherIcon/__${nameImage}.svg`" alt="#" 
            class="w-full  absolute bottom-0 left-0 -translate-y-8 xs_1:-translate-y-4 "/>
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
            <IconMarker class="h-5 group is-icon-black mr-4 "/>
            <p class="text-gray-900 dark:text-white text-2xl xs_3:text-xl xs_1:text-lg"
            >{{ appData.cords.city }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { _appStore as appData  } from "@/utils/store";
import { ComputedRef } from "@vue/reactivity";

const optionWeekday = temp2("en-US");
const optionHoursMinute = temp4("ru");
const numderDayMount = temp3("en-US");

const nameImage = computed(() => {
  if (appData.value.appData) {

    const data = appData.value.appData
    const nameCode = data.current_weather.weathercode;
    const nowTime = new Date(data.current_weather.time).getHours();

    switch (true) {
      case appData.value.positionSun.sunrise === nowTime && nameCode === 0:
        return `${nameCode}_morning`;
      case appData.value.positionSun.sunset === nowTime && nameCode === 0:
        return `${nameCode}_evening`;
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
  const date = appData.value.date
  if (date) {
    const min = formatter(optionHoursMinute).format(date);
    const day = formatter(numderDayMount).format(date);
    const weekday = formatter(optionWeekday).format(date);
    return { min: min, day: day, weekday: weekday };
  }
});

const dataWeather = computed(() => appData.value ? appData.value.appData : null)
</script>
