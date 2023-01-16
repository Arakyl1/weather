export default (temp: number): string => {
    switch (true) {
        case temp > 30:
          return 'red-500'
        case temp > 25 && temp <= 30:
          return 'orange-600'
        case temp > 20 && temp <= 25:
          return 'orange-500'
        case temp > 15 && temp <= 20:
            return 'orange-400'
        case temp > 10 && temp <= 15:
          return 'orange-300'
        case temp > 5 && temp <= 10:
          return 'orange-200'
        case temp > 0 && temp <= 5:
            return 'orange-100'
        case temp === 0:
          return 'text-white'
        case temp < -20:
          return 'sky-700'
        case temp < -10 && temp >= -20:
          return 'sky-500'
        case temp < 0 && temp >= -10:
          return 'sky-200'
        default:
          return 'text-white'
      }
}