import { NAMEAPP } from "~~/type"

export function isNumber(elem: unknown): elem is number {
    return typeof unref(elem) === 'number'
}

export function isString(elem: unknown): elem is string {
    return typeof unref(elem) === 'string'
}

export function isBoolean(elem: unknown): elem is boolean {
    return typeof unref(elem) === 'boolean'
}

export function isObject(elem: unknown): elem is object {
    return typeof unref(elem) === 'object'
}

export function isNumeric(str: string): boolean {
    if (typeof str != "string") return false
    return !isNaN(str as never) && !isNaN(parseFloat(str))
}

export function test(...f:any) {
    console.log(...f);
}



export const sessionGet = (key: string) => sessionStorage.getItem(key)
export const sessionSet = (key: string, elem: any) => sessionStorage.setItem(key, JSON.stringify(elem))
export const sessionRemove = (key: string) => sessionStorage.removeItem(key)

type KeyLocalStorage = `${NAMEAPP}_${string}`
export const localGet = (key: KeyLocalStorage) => localStorage.getItem(key)
export const localSet = (key: KeyLocalStorage, elem: any) => localStorage.setItem(key, JSON.stringify(elem))
export const localRemove = (key: KeyLocalStorage) => localStorage.removeItem(key)


// export const GET_CONTENT_KEY = (key: CONTENT_KEY) => key
// export const GET_CUSTOM_EVENT_NAME = (key: CUSTOM_EVENT_NAME) => key

export const getLanguageUser = (locale: string) => locale.split(',').map(_ => _.split(';')).filter(_ => _.length > 1 && _[0].split('-').length === 1).map(_ => [_[0],parseFloat(_[1].replace('q=','')) ])//.map(_ => _[0])
export const getTime = (time: string) => new Date(time);

export function changeData<T extends { [k: string]: (string | number)[] }>(data: T, nowHours: number, length: number = 48): { [P in keyof T]: T[P][number] }[] {
    const returnData: { [P in keyof T]: T[P][number] }[]  = []
      for (let i = 0; i < length; i++) {
        let item = {} as { [P in keyof T]: T[P][number] }
        const index = i + nowHours
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const elem = data[key];
            const _key = key.replace(/_best_match/, "") as keyof T
            item[_key] = elem[index]
          }
        }
        returnData.push(item)
      }
      return returnData
  }