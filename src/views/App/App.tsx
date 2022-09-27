import React from 'react'
import { useRef, useState, useEffect } from 'react'
import Weather from 'services/WeatherData/WeatherData.service'
import { WeatherCollection } from 'services/WeatherData/WeatherData'
import WeatherWidget from 'components/WeatherWidget/WeatherWidget'
import './App.sass'

type Position = {
  coords: {
    latitude: number
    longitude: number
  }
}

function App() {
  const weather = useRef<Weather|undefined>(undefined)
  const [lat, setLat] = useState<number>()
  const [long, setLong] = useState<number>()
  const [weatherData, setWeatherData] = useState<WeatherCollection|undefined>(undefined)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position: Position) => {
      setLat(position.coords.latitude)
      setLong(position.coords.longitude)
    })

    if (lat && long && typeof weather.current === 'undefined') {
      weather.current = new Weather(lat, long)
    } else if (typeof weather.current!.data !== 'undefined') {
      setWeatherData({
        data: weather.current!.data!,
        temp: weather.current!.temp!,
        meta: weather.current!.meta!,
      })
    }
  }, [lat, long])

  return (
    <div className="App">
      {(typeof weatherData != 'undefined') ? (
        <div>Loaded</div>
        // <WeatherWidget weatherData={WeatherData} />
      ): (
        <div>Please allow your browser to use geolocation services and then wait for data to load.</div>
      )}
    </div>
  )
}

export default App
