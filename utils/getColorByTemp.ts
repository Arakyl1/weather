export default (temp: number): string => {
    switch (true) {
        case temp > 30:
          return 'red-500'
        case temp > 15:
          return 'orange-500'
        case temp > 0:
            return 'orange-100'
        case temp === 0:
          return 'text-white'
        case temp < -20:
          return 'sky-700'
        case temp < -10:
          return 'sky-500'
        case temp < 0:
          return 'sky-200'
        default:
          return 'text-white'
      }
}