import { _appStore as appStore } from "@/utils/store";
export default () => {

    const init = async() => {
        await getCordsUser()
        addSearchParams()
        await getNowDate()
        await getAppData()
        checkPosotionSun()
    }

    const getCordsUser = async() => {
        try {
            const res = await $fetch("https://ipinfo.io/json?token=0a0ea1de3bda2b")
            appStore.value.cords = transformDataCorc(res)
        } catch (err) {
            console.log(err);
        }
    }

    const transformDataCorc = (data: object) => {
        const loc = data.loc.split(',')
        return {
            city: data.city,
            lat: loc[0],
            lon: loc[1],
            timezone: data.timezone
        }
    }
    
    const getNowDate = async() => {
        const timezone = appStore.value.cords.timezone
        const option = temp1("en-US", timezone);
        
        function updateDate() {
            appStore.value.date = new Date(formatter(option).format(new Date()));
            setTimeout(updateDate, 500);
        }
        updateDate()
    }

    const addSearchParams = () => {
        const URl = new URL("/v1/forecast", baseURL())
        
        const locatitioParams = {
            latitude: appStore.value.cords.lat,
            longitude: appStore.value.cords.lon,
            timezone: appStore.value.cords.timezone,
        };

        
        const params = Object.assign(locatitioParams, paramsForSearch());

        for (const key in params) {
            let elem = params[key];
            if (Array.isArray(elem)) {
              elem = elem.join();           
            }
            URl.searchParams.append(key, elem);
            appStore.value.URl = URL.href
        }
        appStore.value.URL = URl.href
    }

    const getAppData = async () => {
        let href = appStore.value.URL.replace(/%2C/g, ",").replace(/,(?=&)/, "");
        try {
            appStore.value.appData = await $fetch(href)
        
        } catch (err) {
            console.log(err);
        }
    }

    const checkPosotionSun = async() => {
        appStore.value.positionSun.sunrise = new Date(
            appStore.value.appData?.daily.sunrise[0]
        ).getHours();
        appStore.value.positionSun.sunset = new Date(
            appStore.value.appData?.daily.sunset[0]
        ).getHours();
    }

    return { getCordsUser, getAppData, init }
}

  
  