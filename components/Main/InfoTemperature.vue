<template>
  <div class="a4" v-if="dataForTwoDay">
    <B1BasicSlader :data="dataForTwoDay" :quantity="quantityItem">
      <template #item="{ elem }">
        <div class="a4__item --flex">
          <p class="a4__time --t-xl --500 --c-blue-1">
            {{ getHours(elem.time) }}
          </p>
          <img
            :src="`./img/svg/wetherIcon/__${getNameIcon(
              elem.weathercode,
              elem.time
            )}.svg`"
            alt="icon"
          />
          <p class="--t-2xl --700 --c-blue-1">
            {{ Math.round(elem.temperature_2m) }}&deg;
          </p>
        </div>
      </template>
      <template
        v-if="store.appScreenSize.width > 480"
        #additional="{ nextItems, prevItems }"
      >
        <div class="a4__bt-container --flex">
          <button @click="prevItems" class="a4__bt --st-bt">
            <I4IconArrow />
          </button>
          <button @click="nextItems" class="a4__bt --st-bt">
            <I4IconArrow />
          </button>
        </div>
      </template>
    </B1BasicSlader>
  </div>
</template>

<script setup>
import B1BasicSlader from "@/Componets/Basic/BasicSlader/B1-BasicSlader.vue";
import { store, dataForTwoDay } from "@/Store/Store";
import { computed } from "vue";
import { formatter, temp4 } from "@/baseLogicJs/Formatter/Formatter";
import I4IconArrow from "../Icon/I4-IconArrow.vue";

const option = temp4("ru");

const getNameIcon = (code, time) => {
  const getItemTime = new Date(time).getHours();
  switch (true) {
    case getItemTime === store.positionSun.sunrise:
      return "0_morning";
    case getItemTime === store.positionSun.sunset:
      return "0_evening";
    case getItemTime > store.positionSun.sunrise ||
      getItemTime < store.positionSun.sunset:
      return `${code}_night`;
    default:
      return code;
  }
};

const getTime = (time) => new Date(time);

const getHours = (time) => formatter(option).format(getTime(time));

const quantityItem = computed(() => {
  const size = store.appScreenSize.width;
  switch (true) {
    case size < 360:
      return 3;
    case size < 480:
      return 4;
    case size < 550:
      return 5;
    case size < 650:
      return 6;
    case size < 750:
      return 7;
    default:
      return 8;
  }
});
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
