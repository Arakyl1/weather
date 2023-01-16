export const _appStore = ref<object>({})

export function updateStore(data:object ) {
  _appStore.value = data
}

export const dataForWeek = computed(() =>{
  if (_appStore.value.appData) {
    return _appStore.value.appData?.daily.time.map((el, index) => {
      const item = {};
      for (const key in _appStore.value.appData.daily) {
        item[key] =  _appStore.value.appData.daily[key][index];
      }
      return item;
    })
  } else {
    return null
  }
});

export const indexActiveDayInfo = ref<number>(0)

export const updateIndexActiveDayInfo = (index: number) => indexActiveDayInfo.value = index

// // computed
// const index = computed(() => store.date ? new Date(store.date).getHours() : 0);

// export const dataForWeek = computed(() => {
//     if (store.appData) {
//         store.appData.daily.time.map((el, index) => {
//           const item = {};
//           for (const key in store.appData.daily) {
//             item[key] = store.appData.daily[key][index];
//           }
//           return item;
//         })
//     }
// });

// export const dataForTwoDay = computed(() => {
//     if (store.appData) {
//         store.appData.hourly.time
//         .map((el, index) => {
//           const item:any = {};
//           if (store.appData) {
//             for (const elem in store.appData.hourly) {
//               const key = elem.replace(/_best_match/, "");
//               item[key] = store.appData.hourly[elem][index];
//             }
//           }
          
//           return item;
//         })
//         .slice(index.value, index.value + 48)
//     }
// });

// // methods

// // export function updateIndexActiveInfoDay(index) {
// //   store.indexActiveInfoDay = index;
// // }
// async function addSearchParams() {
//   const locatitioParams = {
//     latitude: store.cords.lat,
//     longitude: store.cords.lon,
//     timezone: store.cords.timezone,
//   };
//   const params = Object.assign(locatitioParams, paramsForSearch());
//   for (const key in params) {
//     let elem = params[key];
//     if (Array.isArray(elem)) {
//       elem = elem.join();
//     }
//     store.URl.searchParams.append(key, elem);
//   }
// }

// async function getData() {
//   store.appData = await getAppData();
//   checkPositionSun();
//   setTimeout(getData, 300000);
// }

// const getNowDate = () => {
//   const option = temp1("en-US", store.cords.timezone);
//   store.date = new Date(formatter(option).format(new Date()));
//   setTimeout(getNowDate, 500);
// };

// const checkPositionSun = () => {
//   store.positionSun.sunrise = new Date(
//     store.appData?.daily.sunrise[0]
//   ).getHours();
//   store.positionSun.sunset = new Date(
//     store.appData?.daily.sunset[0]
//   ).getHours();
// };

// export async function getLocalUser() {
//   const data = await getCordsUser();
//   store.cords.timezone = data.timezone;
//   store.cords.city = data.city;
//   const loc = data.loc.split(",");
//   store.cords.lat = loc[0];
//   store.cords.lon = loc[1];
  
// }

// async function init() {
//   getNowDate();
//   addSearchParams();
  
//   getData();
// }

// watch(
//   () => store.cords.timezone,
//   (stait) => (stait ? init() : "")
// );

