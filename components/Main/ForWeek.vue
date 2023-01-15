<template>
  <div class="a2" v-if="store.appData?.daily">
    <div class="--container">
      <div class="a2__cont">
        <h2 class="a2__title --t-3xl --700 --c-yellow-12">
          Weather forecast for the week
        </h2>
        <ul class="a2__list" @click="getElem($event)">
          <li
            v-for="(item, index) in dataForWeek"
            class="a2__item --flex"
            :key="item.time"
            :data-index="index"
          >
            <p class="a2__date --t-2xl --500 --c-blue-1">
              {{ formatter(option).format(new Date(item.time)) }}
            </p>
            <div class="a2__img">
              <img
                :src="`./img/svg/wetherIcon/__${item.weathercode}.svg`"
                alt="icon"
              />
            </div>

            <div class="a2__min-max-temp --flex">
              <p class="--t-2xl --600 --c-blue-1">
                {{ Math.round(item.temperature_2m_min) }}&deg;
              </p>
              <p class="a2__circle --700 --c-blue-1">...</p>
              <p class="--t-2xl --600 --c-blue-1">
                {{ Math.round(item.temperature_2m_max) }}&deg;
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import { formatter, temp5 } from "@/baseLogicJs/Formatter/Formatter";
import { store, dataForWeek, updateIndexActiveInfoDay } from "@/Store/Store";

const option = temp5("en-US");

function getElem(event) {
  const elem = event.target.closest(".a2__item ").dataset.index;
  updateIndexActiveInfoDay(elem);
}
</script>

<!-- <style lang="scss">
.a2 {
  @extend %background-blur;
  border-radius: var(--border-radius-15);
  &__title.--t-3xl {
    margin-bottom: 1rem;
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
  &__item {
    flex-wrap: nowrap;
    align-items: center;
    padding: 0.75rem 0;
    border-top: 1px solid hsl(var(--green) 90%);
    @include media-style(
      (
        480: (
          padding: 0.625rem 0,
        ),
        360: (
          padding: 0.5rem 0,
        ),
      )
    );
    p.--t-2xl {
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
  }
  &__img {
    text-align: center;
    & > img {
      max-width: 30px;
      width: 100%;
    }
  }
  &__date {
    flex-grow: 2;
  }
  &__min-max-temp {
    flex-grow: 2;
    max-width: 30%;
    justify-content: flex-end;
    align-items: flex-end;
  }
  &__circle {
    margin: 0 0.5rem;
  }
}
</style> -->
