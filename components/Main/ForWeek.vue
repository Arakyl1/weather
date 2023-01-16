<template>
  <div v-if="dataForWeek" class="">
    <div class="p-8 backdrop-blur-md rounded-32px xs_3:p-6 xs_3:rounded-3xl xs:p-4">
      <div class="">
        <h2 class="text-3xl font-bold text-yellow-500 dark:text-yellow-300 mb-6 sm:text-2xl xs_2:text-xl xs_2:mb-4">
          Weather forecast for the week
        </h2>
        <ul class="border-b border-gray-600">
          <li
            v-for="(item, index) in dataForWeek"
            class="flex flex-nowrap py-3 items-center border-t border-gray-600 cursor-pointer"
            :key="item.time"
            :data-index="index"
            @click="updateIndexActiveDayInfo(index)"
          >
            <p class="grow text-3xl font-medium text-gray-800 dark:text-white sm:text-2xl xs_2:text-xl xs_1:text-lg">
              {{ formatter(option).format(new Date(item.time)) }}
            </p>
            <div class="text-center">
              <img
                :src="`./img/svg/wetherIcon/__${item.weathercode}.svg`"
                alt="icon"
                class="w-12 xs_3:w-10"
              />
            </div>
            <OtherInfoTempMInMax
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
import { dataForWeek, updateIndexActiveDayInfo } from "@/utils/store";

const option = temp5("en-US");

</script>

