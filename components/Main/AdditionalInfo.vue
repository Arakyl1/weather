<template>
  <div class="a3" v-if="store.appData">
    <div class="--container">
      <div class="a3__cont">
        <h2 class="a3__title --t-3xl --700 --c-yellow-12">
          Detailed information
        </h2>
        <div class="a3__day">
          <p class="--t-2xl --c-green-4 --600">
            {{ formatterDate(dataForDay?.time) }}
          </p>
        </div>
        <div class="a3__info">
          <p class="--t-xl --c-blue-1 --600">
            Current weather :
            <span class="--t-xl --c-init">
              {{ codeWeather[dataForDay?.weathercode] }}
            </span>
          </p>
          <p
            class="--c-blue-1 --t-xl --600"
            v-for="item in params"
            :key="item.key"
          >
            {{ item.text }} :
            <span class="--t-xl --c-init"> {{ dataForDay[item.key] }}</span>
            <span v-if="item?.temp" class="--c-blue-1 --c-init">&deg;</span>
          </p>
        </div>
        <div class="a3__wind">
          <h3 class="--t-2xl --600 --c-green-4">Wind</h3>
          <div class="a3__wind-cont --flex">
            <I2IconWind class="a3__icon-wind" />
            <div class="a3__text">
              <p class="--c-blue-1 --t-xl --600">
                Wind direction :
                <span class="--t-xl --c-init">{{
                  windDirection(dataForDay.winddirection_10m_dominant)
                }}</span>
              </p>
              <p class="--c-blue-1 --t-xl --600">
                Wind speed :
                <span class="--t-xl --c-init">{{
                  dataForDay?.windspeed_10m_max
                }}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="a3__position-sun">
          <I3IconPositionSun
            class="a3__icon-position-sun"
            :offset="`-${infoForSun.offset}%`"
          />
          <div class="a3__sunrise-sunset --flex">
            <p class="--600 --c-yellow-12">
              {{ formaterTime(infoForSun.sunrise) }}
            </p>
            <p class="--600 --c-yellow-12">
              {{ formaterTime(infoForSun.sunset) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { dataForWeek, store } from "@/Store/Store";
import { codeWeather } from "@/Store/CodeWeather";
import { temp6, temp4, formatter } from "@/baseLogicJs/Formatter/Formatter";
import { computed, ref } from "vue";
import { windDirection } from "@/Store/WindDirection";
import I2IconWind from "@/Componets/Icon/I2-IconWind.vue";
import I3IconPositionSun from "@/Componets/Icon/I3-iconPositionSun.vue";

// option formatter
const option = temp6("en-US");
const optionTime = temp4("en-US");
const params = [
  { key: "precipitation_sum", text: "Precipitation amount" },
  { key: "temperature_2m_max", text: "Temperature max.", temp: true },
  { key: "temperature_2m_min", text: "Temperature min.", temp: true },
];

const dataForDay = computed(() => dataForWeek.value[store.indexActiveInfoDay]);

const infoForSun = computed(() => {
  const sunrise = new Date(dataForDay.value?.sunrise);
  const sunset = new Date(dataForDay.value?.sunset);
  if (store.indexActiveInfoDay !== 0) {
    return { sunrise: sunrise, sunset: sunset, offset: 140 };
  }
  const nowDate = new Date(store.date).getHours();
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

<!-- <style lang="scss">
.a3 {
  @extend %background-blur;
  border-radius: var(--border-radius-15);
  &__cont {
    padding: 1.5rem 0;
    @include media-style(
      (
        480: (
          padding: 1rem 0,
        ),
      )
    );
  }
  &__title.--t-3xl {
    filter: none;
    @include media-style(
      (
        480: (
          font-size: 1.5rem,
        ),
        360: (
          font-size: 1.25rem,
        ),
      )
    );
  }
  &__day {
    padding: 1rem 0;
  }
  &__info {
    border-bottom: 1px solid var(--col-gray-2);
    & > p {
      margin-bottom: 0.75rem;
    }
  }
  &__wind {
    padding: 0.5rem 0;
    & > h3 {
      margin-bottom: 1rem;
      text-align: right;
    }
  }
  &__wind-cont {
    justify-content: space-between;
  }
  &__text {
    text-align: right;
    & > p:first-child {
      margin-bottom: 0.5rem;
    }
  }
  &__icon-wind {
    path {
      stroke: var(--col-blue-5);
    }
  }
  :is(p, h2, h3, h4).--t-2xl {
    @include media-style(
      (
        480: (
          font-size: 1.25rem,
        ),
        360: (
          font-size: 1.125rem,
        ),
      )
    );
  }
  :is(p, h2, h3, h4, span).--t-xl {
    @include media-style(
      (
        480: (
          font-size: 1rem,
        ),
        360: (
          font-size: 0.875rem,
        ),
      )
    );
  }
  &__icon-position-sun {
    filter: none;
  }
  &__sunrise-sunset {
    justify-content: space-between;
    padding: 0 1rem;
    & > p {
      filter: none;
    }
    @include media-style(
      (
        480: (
          padding: 0,
        ),
      )
    );
  }
}
</style> -->
