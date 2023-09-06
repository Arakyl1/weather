<template>
  <div>
    <div class="min-h-screen relative">
      <div class="fixed h-screen bottom-0 left-0 w-screen z-0">
        <img :src="`./img/background/__${stateOfDay}.jpg`" alt="" class="object-cover min-w-full min-h-full">
      </div>
      <div class="max-w-xl mx-auto pt-24 sm:px-4 xs_2:px-2">
        <OrganismsNowInfo class="mb-8 relative z-20" />
        <OrganismsInfoTemperature class="z-20 relative mb-8" />
        <OrganismsForWeek class="relative z-20 mb-12" />
        <OrganismsAdditionalInfo class="mb-16" />
      </div>
    </div>
    <AtomOtherStyle />
  </div>
</template>

<script setup lang="ts">
import { APP_DATA, RESPONSE_DATA_CORDS, RESPONSE_DATA_WEATHER, DATA_FOR_WEEK } from "@/type/index";


useHead({
  titleTemplate: () => 'Weather'
})

const APP_DATA = useState<APP_DATA>("APP_DATA", () => ({
  'appData': null,
  'cords': null,
  'date': new Date(),
  'positionSun': null,
}))

const DATA_FOR_WEEK = useState<DATA_FOR_WEEK | null>("DATA_FOR_WEEK", () => null)
const INDEX_ACTIVE_DAY_INFO = useState<number>('INDEX_ACTIVE_DAY_INFO', () => 0)

const stateOfDay = computed(() => {
  if (APP_DATA.value.appData && APP_DATA.value.positionSun) {
    const nowDate = APP_DATA.value.date instanceof Date ? APP_DATA.value.date.getHours() : (new Date(APP_DATA.value.date)).getHours();
    switch (true) {
      case nowDate > APP_DATA.value.positionSun.sunset ||
        nowDate < APP_DATA.value.positionSun.sunrise:
        return 'nigth';
      default:
        return 'day';
    }
  } else {
    return 'default'
  }
});

async function initDataApp() {
  const { data, error } = await useAsyncData<NonNullable<APP_DATA['cords']>>('cords_user' + Date.now(), () => $fetch("https://ipinfo.io/json?token=0a0ea1de3bda2b"), {
    transform: (data: RESPONSE_DATA_CORDS) => {
      const loc = data.loc.split(',')
      return ({ ...data, lat: loc[0], lon: loc[1] })
    }
  })
  if (data.value && !error.value) {
    APP_DATA.value.cords = data.value
    initUserDate(APP_DATA.value.cords.timezone)
    const config = useRuntimeConfig()
    const URlResponse = initURLForGetMetionData(config.URL_API_METIO, APP_DATA.value.cords)
    const { refresh: weatherRefresh } = await useAsyncData<RESPONSE_DATA_WEATHER>('getWeatherData', () => $fetch<RESPONSE_DATA_WEATHER>(URlResponse, {
      onResponse({ response, error }) {
        if (response.status < 400) {
          APP_DATA.value.appData = response._data
          const positionSun: APP_DATA['positionSun'] = { sunrise: 0, sunset: 0 }
          const data = APP_DATA.value.appData as RESPONSE_DATA_WEATHER
          positionSun.sunrise = getTime(data.daily.sunrise[0]).getHours()
          positionSun.sunset = getTime(data.daily.sunset[0]).getHours()
          APP_DATA.value.positionSun = { ...positionSun }
          DATA_FOR_WEEK.value = changeData<NonNullable<APP_DATA['appData']>['daily']>(
            APP_DATA.value.appData!.daily, 0, 7)
        }
      },
    }))
  }
}
onBeforeMount(() => {
  initDataApp()
})

function initURLForGetMetionData(baseURL: string, cordData: NonNullable<APP_DATA['cords']>): string {
  const URl = new URL("/v1/forecast", baseURL)

  const locatitioParams = {
    latitude: cordData.lat,
    longitude: cordData.lon,
    timezone: cordData.timezone,
  };
  const params = Object.assign(locatitioParams, paramsForSearch());
  for (const key in params) {
    let _key = key as keyof typeof params
    let elem = params[_key];
    if (Array.isArray(elem)) {
      elem = elem.join(',');
    }
    URl.searchParams.append(_key, elem);
  }
  return URl.href
}

function initUserDate(timezone: NonNullable<APP_DATA['cords']>['timezone']) {
  const option = temp1({ timeZone: timezone });

  function updateDate() {
    APP_DATA.value.date = getTime((new Intl.DateTimeFormat('en-US', (option as Intl.DateTimeFormatOptions))).format(new Date()));
    setTimeout(updateDate, 500);
  }
  updateDate()
}



watch(() => stateOfDay.value, () => {
  useHead({
    htmlAttrs() {
      return {
        class: stateOfDay.value === 'nigth' ? 'dark' : 'light'
      }
    },
  })
})
</script>