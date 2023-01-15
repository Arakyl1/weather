// export const _appStore = ref<object>({})

// export function updateStore(data:object ) {
//   _appStore.value = data
// }
// export const _appData = defineStore('appData', () => {
//     const { getCordsUser, getAppData } = useData()

//     const store = reactive({
//         URl: '',
//         appData: null,
//         date: null,
//         appScreenSize: null,
//         cords: { lat: null, lon: null, timezone: null, city: null },
//         positionSun: { sunrise: 0, sunset: 0 },
//         indexActiveInfoDay: 0,
//       });

//     //computed
//     const index = computed(() => store.date ? new Date(store.date).getHours() : 0);

//     const dataForWeek = computed(() => {
//         if (store.appData) {
//             store.appData.daily.time.map((el, index) => {
//               const item = {};
//               for (const key in store.appData.daily) {
//                 item[key] = store.appData.daily[key][index];
//               }
//               return item;
//             })
//         }
//     });

//     const dataForTwoDay = computed(() => {
//         if (store.appData) {
//             store.appData.hourly.time
//             .map((el, index) => {
//               const item:any = {};
//               if (store.appData) {
//                 for (const elem in store.appData.hourly) {
//                   const key = elem.replace(/_best_match/, "");
//                   item[key] = store.appData.hourly[elem][index];
//                 }
//               }

//               return item;
//             })
//             .slice(index.value, index.value + 48)
//         }
//     });


//     // methods
//     async function addSearchParams() {
//         const url = new URL("/v1/forecast", baseURL())

//         const locatitioParams = {
//           latitude: store.cords.lat,
//           longitude: store.cords.lon,
//           timezone: store.cords.timezone,
//         };

//         const params = Object.assign(locatitioParams, paramsForSearch());
//         for (const key in params) {
//           let elem = params[key];
//           if (Array.isArray(elem)) {
//             elem = elem.join();           
//           }
//           url.searchParams.append(key, elem);
//           store.URl = url.href
//         }
//     }

//     async function getData() {
//       store.appData = await getAppData(store.URl);
      
//       checkPositionSun();
//       setTimeout(getData, 300000);
//     }
      
//     const getNowDate = async () => {
//       const option = temp1("en-US", store.cords.timezone);
//       store.date = new Date(formatter(option).format(new Date()));
//       setTimeout(getNowDate, 500);
//     };
    
//     const checkPositionSun = () => {
//       store.positionSun.sunrise = new Date(
//         store.appData?.daily.sunrise[0]
//       ).getHours();
//       store.positionSun.sunset = new Date(
//         store.appData?.daily.sunset[0]
//       ).getHours();
//     };
      
//     async function getLocalUser() {
//       const data = await getCordsUser();
//       store.cords.timezone = data.timezone;
//       store.cords.city = data.city;
//       const loc = data.loc.split(",");
//       store.cords.lat = loc[0];
//       store.cords.lon = loc[1];
      
//     }
    
//     async function init() {
//       await addSearchParams();
//       await getNowDate();
     
      
//       getData();
//     }
    
//     watch(
//       () => store.cords.timezone,
//       (stait) => (stait ? init() : "")
//     );

//     return {
//         store,
//         dataForTwoDay,
//         dataForWeek,
//         getLocalUser
//     }
// })