<template>
  <div>
    <template v-if="dataForTwoDay">
      <MoleculesSladerBase :data="dataForTwoDay" :container-class="containerClass">
        <template #header="{ prevItem, nextItem }">
          <div>
            <div class="flex pb-4 sm:hidden">
              <div class="grow"></div>
              <div class="flex">
                <AtomButtonArrow class="backdrop-blur-md rotate-180" @click="prevItem" />
                <AtomButtonArrow class="backdrop-blur-md ml-6" @click="nextItem" />
              </div>
            </div>
          </div>
        </template>
        <template #item="{ elem }">
          <div class="flex">
            <div class="py-6 px-3 w-full rounded-full backdrop-blur-md flex flex-col items-center justify-between">
              <p class="text-xl font-medium text-gray-800 dark:text-sky-100 mb-2">
                {{ getHours(elem.time) }}
              </p>
              <img :src="`./img/svg/wetherIcon/__${getNameIcon(elem.weathercode, elem.time)}.svg`" alt="icon"
                class="mb-3" />
              <p class="text-2xl font-bold" :class="[`text-${getColorByTemp(Math.round(elem.temperature_2m))}`]">
                {{ Math.round(elem.temperature_2m) }}&deg;
              </p>
            </div>
          </div>
        </template>
        <template #bottom>
          <div></div>
        </template>
      </MoleculesSladerBase>
    </template>
  </div>
</template>

<script setup lang="ts">
import { APP_DATA } from "@/type/index";

const APP_DATA = useState<APP_DATA>("APP_DATA")
const containerClass = ` -mx-2
  [grid-auto-columns:calc(100%/7)]
  xs_4:[grid-auto-columns:calc(100%/6)]
  xs_3:[grid-auto-columns:calc(100%/5)]
  xs_2:[grid-auto-columns:calc(100%/4)]
  xs:[grid-auto-columns:calc(100%/3)]`

//computed
const getHowHours = computed(() => new Date(APP_DATA.value.date).getHours());

const dataForTwoDay = computed(() => {
  if (APP_DATA.value.appData) {
    return changeData<NonNullable<APP_DATA['appData']>['hourly']>(APP_DATA.value.appData.hourly, getHowHours.value)
  } else {
    return null
  }
});



const getNameIcon = (code: string | number, time: string) => {
  const getItemTime = new Date(time).getHours();
  if (APP_DATA.value.positionSun) {
    const positionSun = { ...APP_DATA.value.positionSun }
    switch (true) {
      case getItemTime === positionSun.sunrise:
        return "0_morning";
      case getItemTime === positionSun.sunset:
        return "0_evening";
      case getItemTime > positionSun.sunset || getItemTime < positionSun.sunrise:
        return `${code}_night`;
      default:
        return code;
    }
  }

};

const getHours = (time: string) => (new Intl.DateTimeFormat('ru', (optionHoursMinute({}) as Intl.DateTimeFormatOptions))).format(getTime(time));

</script>
