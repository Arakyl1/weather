<template>
  <div class=" backdrop-blur" v-if="dataWeather">
    <div class="px-8 bg-gradient-to-b from-teal-100 to-sky-400 rounded-32px">
      <div class=" pb-12 pt-8">
        <div class="flex items-end mb-4">
          <div class="w-[180px] md:w-[150px] sm:w-[120px] xs:w-[90px] relative">
            <img :src="`./img/svg/wetherIcon/__${nameImage}.svg`" alt="#" 
            class="w-full  absolute bottom-0 left-0 -translate-y-8"/>
          </div>
          <div class="grow text-right">
              <p class="relative text-sky-700 text-6xl font-bold">
                {{ Math.round(dataWeather.current_weather.temperature) }}&deg;
              </p>
          </div>
        </div>
        <template v-if="infoDate">
          <div class="flex">
          <div class="grow">
            <p class="text-sky-700 font-semibold  text-4xl">
              {{ infoDate.weekday }}
            </p>
            <p class="text-sky-700 font-semibold text-4xl">
              {{ infoDate.day }}
            </p>
          </div>
          <div class="">
            <p class="text-blue-700 text-6xl font-bold">
              {{ infoDate.min }}
            </p>
          </div>
        </div>
        </template>
        <div class="text-right">
          <div class="flex items-center justify-end">
            <IconMarker class="h-5 group is-icon-white mr-4"/>
            <p class="text-white text-2xl">{{ appData.cords.city }}</p>
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

<!-- <style lang="scss">
-translate-y-24 sm:-translate-x-12
  &__time {
    flex-grow: 2;
    text-align: right;
    align-self: flex-end;
    & > p {
      font-size: 5rem;
      filter: none;
      @include media-style(
        (
          720: (
            font-size: 3.5rem,
          ),
          480: (
            font-size: 3rem,
          ),
          350: (
            font-size: 2.5rem,
          ),
        )
      );
    }
  }
  &__bottom {
    justify-content: flex-end;
  }
  &__local {
    align-items: center;
    & > svg {
      height: 15px;
      max-width: 15px;
      margin-right: 0.5rem;
      & > path {
        fill: var(--col-blue-2);
      }
    }
  }
}
</style> -->
