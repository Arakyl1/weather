<template>
  <div v-if="DATA_FOR_WEEK" class="">
    <div class="p-8 backdrop-blur-md rounded-32px xs_3:p-6 xs_3:rounded-3xl xs:p-4">
      <div class="">
        <h2 class="text-3xl font-bold text-yellow-500 dark:text-yellow-300 mb-6 sm:text-2xl xs_2:text-xl xs_2:mb-4">
          Weather forecast for the week
        </h2>
        <ul class="border-b border-gray-600">
          <li
            v-for="(item, index) in DATA_FOR_WEEK"
            class="flex flex-nowrap py-3 items-center border-t border-gray-600 cursor-pointer"
            :key="item.time"
            :data-index="index"
            @click="updateIndexActiveDayInfo(index)"
          >
            <p class="grow text-3xl font-medium text-gray-800 dark:text-white sm:text-2xl xs_2:text-xl xs_1:text-lg">
              {{ formaterDate(item.time) }}
            </p>
            <div class="text-center">
              <img
                :src="`./img/svg/wetherIcon/__${item.weathercode}.svg`"
                alt="icon"
                class="w-12 xs_3:w-10"
              />
            </div>
            <AtomOtherInfoTempMInMax
            :min="item.temperature_2m_min"
            :max="item.temperature_2m_max"
            class="max-w-[calc(100%/3)] grow"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { DATA_FOR_WEEK } from "@/type/index";

const DATA_FOR_WEEK = useState<DATA_FOR_WEEK | null>("DATA_FOR_WEEK")
const INDEX_ACTIVE_DAY_INFO = useState<number>('INDEX_ACTIVE_DAY_INFO')

function formaterDate(date:string | Date) {
  if (date instanceof Date) {
    return (new Intl.DateTimeFormat('en-US', (optionWeekMouthDay({}) as Intl.DateTimeFormatOptions))).format(date);
  } else {
    return (new Intl.DateTimeFormat('en-US', (optionWeekMouthDay({}) as Intl.DateTimeFormatOptions))).format(getTime(date));
  }
}
function updateIndexActiveDayInfo(newIndex:number) {
  if (isNumber(newIndex)) {
    INDEX_ACTIVE_DAY_INFO.value = newIndex
  }
}
</script>

