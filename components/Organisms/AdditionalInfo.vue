<template>
  <div v-if="APP_DATA.appData">
    <div class="rounded-32px backdrop-blur-md p-8 xs_3:p-6 xs_3:rounded-3xl xs_1:p-4">
      <div>
        <h2 class="text-3xl font-bold mb-4 dark:text-yellow-200 text-yellow-500 sm:text-2xl xs_2:text-xl xs_2:mb-2">
          Detailed information
        </h2>
        <div class="mb-3 xs_2:mb-1">
          <p class="text-2xl text-teal-100 dark:text-teal-400 font-semibold sm:text-xl xs_2:text-lg xs_1:text-base">
            {{ dataForDay ? formatterDate(dataForDay.time) : null }}
          </p>
        </div>
        <ul class="border-b border-gray-600 pb-6 xs_2:pd-4 xs_1:pb-3">
          <li class="text-2xl text-gray-800 dark:text-sky-100 font-semibold sm:text-xl xs_2:text-lg xs_1:text-base">
            Current weather:
            <span> {{ dataForDay ? CODE_WEATHER[dataForDay.weathercode as keyof typeof CODE_WEATHER] : null }}</span>
          </li>
          <li class="text-gray-800 dark:text-sky-100 text-2xl font-semibold sm:text-xl xs_2:text-lg xs_1:text-base"
            v-for="item in params" :key="item.key">
            {{ item.text }} :
            <span> {{ dataForDay ? dataForDay[item.key] : null }}</span>
            <span v-if="'temp' in item ? item.temp : false">&deg;</span>
          </li>
        </ul>
        <div class="py-2">
          <h3 class=" text-2xl font-semibold text-teal-100 dark:text-teal-400 sm:text-xl xs_1:text-base">Wind</h3>
          <div class="flex justify-between">
            <CreateIcon name="wind-1_16_16" :att="{ class: 'white' }" class="xs:w-12"/>
            <div class="text-right">
              <p
                class="text-yellow-100 dark:text-yellow-200 text-xl font-semibold mb-2 sm:text-lg xs_2:mb-0 xs_1:text-base xs:text-sm">
                Wind direction :
                <span class=" text-sky-100">{{
                 dataForDay ? windDirection(dataForDay.winddirection_10m_dominant) : null
                }}</span>
              </p>
              <p class="text-yellow-200 dark:text-yellow-20 text-xl font-semibold sm:text-lg xs_1:text-base xs:text-sm">
                Wind speed :
                <span class="text-sky-100">{{
                  dataForDay?.windspeed_10m_max
                }}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="">
          <AtomIconPositionSun class="translate-x-1" :offset="`-${infoForSun.offset}%`" />
          <div class="flex justify-between px-2">
            <p class="text-yellow-500 text-xl font-semibold xs_3:text-lg xs_2:text-base xs_1:text-sm">
              {{ formaterTime(infoForSun.sunrise) }}
            </p>
            <p class="text-yellow-500 text-xl font-semibold xs_3:text-lg xs_2:text-base xs_1:text-sm">
              {{ formaterTime(infoForSun.sunset) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { APP_DATA, DATA_FOR_DAY, DATA_FOR_WEEK } from "@/type/index";
import codeWeather from "@/utils/codeWeather";
import CreateIcon from "@/content/icons/create";


const APP_DATA = useState<APP_DATA>("APP_DATA")
const DATA_FOR_WEEK = useState<DATA_FOR_WEEK | null>("DATA_FOR_WEEK")
const INDEX_ACTIVE_DAY_INFO = useState<number>('INDEX_ACTIVE_DAY_INFO')

const params: { key: keyof DATA_FOR_DAY, text: string, temp?: boolean }[] = [
  { key: "precipitation_sum", text: "Precipitation amount" },
  { key: "temperature_2m_max", text: "Temperature max.", temp: true },
  { key: "temperature_2m_min", text: "Temperature min.", temp: true },
];
const CODE_WEATHER = codeWeather()

const dataForDay = computed<DATA_FOR_DAY | null>(() => DATA_FOR_WEEK.value ? DATA_FOR_WEEK.value[INDEX_ACTIVE_DAY_INFO.value] : null);

const infoForSun = computed<{ sunrise: string, sunset: string, offset: number }>(() => {
  if (dataForDay.value) {

    const sunrise = new Date(dataForDay.value.sunrise);
    const sunset = new Date(dataForDay.value.sunset);
    if (INDEX_ACTIVE_DAY_INFO.value !== 0) {
      return { sunrise: sunrise, sunset: sunset, offset: 140 };
    }
    const nowDate = new Date(APP_DATA.value.date).getHours();
    const offset =
      nowDate <= sunset.getHours() && nowDate >= sunrise.getHours()
        ? 140 -
        (140 / (sunset.getHours() - sunrise.getHours())) *
        (nowDate - sunrise.getHours())
        : 140;
    return { sunrise, sunset, offset };
  }
  return { sunrise: '', sunset: '', offset: 0 };
});

//methods
const formatterDate = (date: string | Date) => (new Intl.DateTimeFormat('en-US', (optionWeekMouthDaySecondary({}) as Intl.DateTimeFormatOptions))).format(new Date(date));
const formaterTime = (date: Date | string) => (new Intl.DateTimeFormat('en-US', (optionHoursMinute({}) as Intl.DateTimeFormatOptions))).format(new Date(date));

</script>