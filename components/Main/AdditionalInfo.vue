<template>
  <div v-if="appData.appData">
    <div class="rounded-32px backdrop-blur-md">
      <div class="p-8">
        <h2 class=" text-3xl font-bold text-yellow-200">
          Detailed information
        </h2>
        <div class="py-4">
          <p class="text-2xl text-teal-300 font-semibold">
            {{ formatterDate(dataForDay?.time) }}
          </p>
        </div>
        <ul class="border-b border-gray-900 pb-6">
          <li class="text-xl text-sky-100 font-semibold">
            Current weather :
            <span class="text-xl text-sky-100">
              {{ codeWeather()[dataForDay?.weathercode] }}
            </span>
          </li>
          <li
            class="text-sky-100 text-xl font-semibold"
            v-for="item in params"
            :key="item.key"
          >
            {{ item.text }} :
            <span class="text-xl text-sky-100"> {{ dataForDay[item.key] }}</span>
            <span v-if="item?.temp" class="text-sky-100">&deg;</span>
          </li>
        </ul>
        <div class="py-2">
          <h3 class=" text-2xl font-semibold text-teal-300">Wind</h3>
          <div class="flex justify-between">
            <IconWind class="group is-icon-white" />
            <div class="text-right">
              <p class="text-yellow-200 text-xl font-semibold mb-2">
                Wind direction :
                <span class="text-xl text-sky-100">{{
                  windDirection(dataForDay.winddirection_10m_dominant)
                }}</span>
              </p>
              <p class="text-yellow-200 text-xl font-semibold">
                Wind speed :
                <span class="text-sky-100 text-xl">{{
                  dataForDay?.windspeed_10m_max
                }}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="">
          <IconPositionSun
            class="translate-x-1"
            :offset="`-${infoForSun.offset}%`"
          />
          <div class="flex justify-between px-2">
            <p class="text-yellow-500 font-semibold">
              {{ formaterTime(infoForSun.sunrise) }}
            </p>
            <p class="text-yellow-500 font-semibold">
              {{ formaterTime(infoForSun.sunset) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  _appStore as appData,
  dataForWeek,
  indexActiveDayInfo
} from "@/utils/store";


// option formatter
const option = temp6("en-US");
const optionTime = temp4("en-US");
const params = [
  { key: "precipitation_sum", text: "Precipitation amount" },
  { key: "temperature_2m_max", text: "Temperature max.", temp: true },
  { key: "temperature_2m_min", text: "Temperature min.", temp: true },
];

const dataForDay = computed(() => dataForWeek.value[indexActiveDayInfo.value]);

const infoForSun = computed(() => {
  const sunrise = new Date(dataForDay.value?.sunrise);
  const sunset = new Date(dataForDay.value?.sunset);
  if (indexActiveDayInfo.value !== 0) {
    return { sunrise: sunrise, sunset: sunset, offset: 140 };
  }
  const nowDate = new Date(appData.value.date).getHours();
  const offset =
    nowDate <= sunset.getHours() && nowDate >= sunrise.getHours()
      ? 140 -
        (140 / (sunset.getHours() - sunrise.getHours())) *
          (nowDate - sunrise.getHours())
      : 140;
  return { sunrise: sunrise, sunset: sunset, offset: offset };
});

//methods
const formatterDate = (date) => formatter(option).format(new Date(date));
const formaterTime = (time) => formatter(optionTime).format(time);

</script>