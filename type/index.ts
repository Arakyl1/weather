export type NAMEAPP = 'NFT_MARKET'

export type Enumerable<T> = T | Array<T>;
export type checkArray<T> = T extends any[] ? T[number] : T
export type CookieKey = 'refrech_token'
export type RecordOption<T extends PropertyKey, U> = { [K in T]: U }
export type Cached<T extends (...args: any) => any> = ReturnType<T> extends Promise<infer Y> ? Y : ReturnType<T>
export type KeysMatchingWrite<T extends object, V> = {
    [K in keyof T]-?: [V] extends [T[K]] ? K : never
}[keyof T]

export type KeysMatchingWriteOuther<T extends object, V> = {
    [K in keyof T]-?: [V] extends [T[K]] ? never : K
}[keyof T]


export type MethodError = { messadge: string, type: string, [x: string]: any }

export interface RESPONSE_DATA_CORDS {
    ip: string,
    city: string,
    region: string,
    country: string,
    loc: string,
    org: string,
    postal: string,
    timezone: string
}

export interface RESPONSE_DATA_WEATHER {
    "latitude": number,
    "longitude": number,
    "generationtime_ms": number,
    "utc_offset_seconds": number,
    "timezone": string,
    "timezone_abbreviation": `${'-'|'+'}${'00'|'01'|'02'|'03'|'04'|'05'|'06'|'07'|'08'|'09'|'10'|'11'|'12'|'13'|'14'}`,
    "elevation": number,
    "current_weather": {
        "temperature": number,
        "windspeed": number,
        "winddirection": number,
        "weathercode": number,
        "is_day": number,
        "time": string
    },
    "hourly_units": {
        "time": "iso8601",
        "temperature_2m": "°C"|'°F'|'K',
        "precipitation": "mm",
        "snowfall": "cm",
        "weathercode": "wmo code",
        "windspeed_10m": "km/h",
        "winddirection_10m": "°"
    },
    "hourly": {
        "time": string[],
        "temperature_2m": number[],
        "precipitation": number[],
        "snowfall": number[],
        "weathercode": number[],
        "windspeed_10m": number[],
        "winddirection_10m": number[]
    },
    "daily_units": {
        "time": "iso8601",
        "weathercode": "wmo code",
        "temperature_2m_max": "°C"|'°F'|'K',
        "temperature_2m_min": "°C"|'°F'|'K',
        "sunset": "iso8601",
        "sunrise": "iso8601",
        "windspeed_10m_max": "km/h",
        "winddirection_10m_dominant": "°",
        "precipitation_sum": "mm"
    },
    "daily": {
        "time": string[],
        "weathercode": number[],
        "temperature_2m_max": number[],
        "temperature_2m_min": number[],
        "sunset": string[],
        "sunrise": string[],
        "windspeed_10m_max": number[],
        "winddirection_10m_dominant": number[],
        "precipitation_sum": number[]
    }
}

// export type keyResponse_Data_Weather = keyof RESPONSE_DATA_WEATHER | `_best_match${keyof RESPONSE_DATA_WEATHER}`
export interface APP_DATA {
    appData: RESPONSE_DATA_WEATHER | null,
    date: string | Date,
    cords: (RESPONSE_DATA_CORDS & { lat: string, lon: string }) | null,
    positionSun: { sunrise: number, sunset: number } | null,
}
export type DATA_FOR_DAY = {
    [P in keyof NonNullable<APP_DATA['appData']>['daily']]: NonNullable<APP_DATA['appData']>['daily'][P][number]
}
export type DATA_FOR_WEEK = DATA_FOR_DAY[]