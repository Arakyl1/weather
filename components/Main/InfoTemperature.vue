<template>
  <div>
    <template v-if="dataForTwoDay">
      <Slader :data="dataForTwoDay" :container-class="'[grid-auto-columns:calc(100%/7)] mx-2'">
        <template #header> <div></div> </template>
        <template #item="{ elem }">
          <div class="slader__item px-2 flex">
            <div class="py-6 px-3 w-full rounded-full backdrop-blur-md flex flex-col items-center">

              <p class="text-xl text-sky-100 mb-2">
                {{ getHours(elem.time) }}
              </p>
              <img
              :src="`./img/svg/wetherIcon/__${getNameIcon(elem.weathercode, elem.time)}.svg`"
              alt="icon" class="mb-3"
              />
              <p class="text-2xl font-bold text-sky-300">
                {{ Math.round(elem.temperature_2m) }}&deg;
              </p>
            </div>
          </div>
        </template>
        <template #bottom> <div></div> </template>
      </Slader>
    </template>
  </div>
</template>

<script setup lang="ts">
import { _appStore as appData  } from "@/utils/store";

const option = temp4("ru");

//computed
const getHowHours = computed(() => new Date(appData.value.date).getHours());

const dataForTwoDay = computed(() =>{
  if (appData.value.appData) {
    return appData.value.appData?.hourly.time
    .map((el, index) => {
      const item = {};
      for (const elem in appData.value.appData.hourly) {
        const key = elem.replace(/_best_match/, "");
        item[key] = appData.value.appData.hourly[elem][index];
      }
      return item;
    })
    .slice(getHowHours.value, getHowHours.value + 48)
  } else {
    return null
  }
});

const getNameIcon = (code, time) => {
  const getItemTime = new Date(time).getHours();
  switch (true) {
    case getItemTime === appData.value.positionSun.sunrise:
      return "0_morning";
    case getItemTime === appData.value.positionSun.sunset:
      return "0_evening";
    case getItemTime > appData.value.positionSun.sunrise ||
      getItemTime < appData.value.positionSun.sunset:
      return `${code}_night`;
    default:
      return code;
  }
};

const getTime = (time) => new Date(time);

const getHours = (time) => formatter(option).format(getTime(time));

</script>

<!-- <style lang="scss">
.a4 {
  position: relative;
  &__item {
    padding: 1.5rem 0;
    flex-flow: column;
    align-items: center;
    border-radius: 50px;
    transition: all 0.4s ease-in-out;
    @extend %background-blur;
    &:hover {
      background: hsla(var(--blue) 65% / 0.5);
    }
    & > img {
      margin-bottom: 1rem;
      width: 30px;
      aspect-ratio: 1;
    }
  }
  &__time {
    margin-bottom: 0.5rem;
  }
  &__bt-container {
    justify-content: flex-end;
    padding-top: 1rem;
    & > button:first-child {
      transform: rotate(-90deg);
    }
    & > button:last-child {
      margin-left: 1rem;
      transform: rotate(90deg);
    }
  }
  &__bt {
    width: 40px;
    height: 40px;
    & > svg {
      filter: none;
      path {
        fill: hsla(var(--blue) 95%/ 0.8);
      }
    }
  }
}
</style> -->
