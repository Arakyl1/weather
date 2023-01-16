<template>
  <div v-if="dataForWeek" class="">
    <div class="p-8 backdrop-blur-md rounded-32px">
      <div class="">
        <h2 class="text-3xl font-bold text-yellow-300 mb-6">
          Weather forecast for the week
        </h2>
        <ul class="">
          <li
            v-for="(item, index) in dataForWeek"
            class="flex flex-nowrap py-3 items-center border-t border-gray-600"
            :key="item.time"
            :data-index="index"
            @click="updateIndexActiveDayInfo(index)"
          >
            <p class="grow text-3xl font-medium text-white">
              {{ formatter(option).format(new Date(item.time)) }}
            </p>
            <div class="text-center">
              <img
                :src="`./img/svg/wetherIcon/__${item.weathercode}.svg`"
                alt="icon"
                class="max-w-[2rem]"
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

