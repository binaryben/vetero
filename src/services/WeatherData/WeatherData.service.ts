import { WeatherTemp, WeatherMeta, WeatherData, WeatherConfig } from './WeatherData'
import OpenWeatherMap from 'openweathermap-ts'

class Weather extends OpenWeatherMap {
  temp?: WeatherTemp
  data?: WeatherData
  meta?: WeatherMeta
  config: WeatherConfig

  constructor(lat: number, long: number) {
    super({
      apiKey: process.env.REACT_APP_WEATHER_API_KEY!,
      units: 'metric'
    })

    this.config = {
      lat,
      long,
      units: 'metric',
      cacheTimeout: process.env.REACT_APP_WEATHER_CACHE_TIMEOUT
        ? Number(process.env.REACT_APP_WEATHER_CACHE_TIMEOUT)
        : 10 * 60 * 1000 // default to 10 minutes in ms
    }

    this.update()
  }

  update() {
    this.getCurrentWeatherByGeoCoordinates(this.config.lat, this.config.long)
      .then((weather) => {
        if (weather.sys.country === 'US') { // There are other countries but this will do for now
          this.config.units = 'imperial' // TODO: let user configure this as well as auto-detect
        }
        this.temp = {
          current: weather.main.temp,
          feels_like: weather.main.feels_like,
          max: weather.main.temp_max,
          min: weather.main.temp_min,
        }
        this.data = {
          pressure: weather.main.pressure,
          humidity: weather.main.humidity,
          sunrise: weather.sys.sunrise,
          sunset: weather.sys.sunset,
        }
        this.meta = {
          areaName: weather.name,
          description: weather.weather[0].description,
          lastUpdated: Date.now(),
        }
        console.log('Weather object is', weather)
        console.log('Temp object is', this.temp)
        console.log('Data object is', this.data)
        console.log('Meta object is', this.meta)
      })
      .catch((error) => console.error('Something is probably missing')) 
  }
}

export default Weather
