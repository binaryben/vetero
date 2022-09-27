export type WeatherTemp = {
  current: number
  feels_like: number
  min: number
  max: number
}

export type WeatherData = {
  pressure: number
  humidity: number
  sunrise: number
  sunset: number
}

export type WeatherMeta = {
  description: string
  areaName: string
  lastUpdated: number
}

export type WeatherConfig = {
  lat: number
  long: number
  units: 'metric'|'imperial'
  cacheTimeout: number
}
