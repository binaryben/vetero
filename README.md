# vetero

> The exercise is to build and style a page which displays the [current weather consumed from an API](http://api.openweathermap.org/data/2.5/weather?lat=-32.168841&lon=115.809106&units=metric&appid={key}) using [Create React App](https://create-react-app.dev/) and TypeScript. Please get the users location from the browser and use that and make it poll the weather api every minute.
> 
> No other rules, it just has to run in the browser (you can specify one browser). We’ll be looking for React / TypeScript skills, bonus points for styling.

**Expected duration:** 1 - 2 hours

## Quick start

```
git clone https://github.com/binaryben/vetero.git
cd vertero && touch .env
echo "REACT_APP_WEATHER_API_KEY={put_your_key_here}" > .env
npm i && npm start
```

## Decisions Log

Original request is to poll for changes every minute. The [OpenWeatherMap API docs](https://openweathermap.org/appid) (see under *API care recommendations* heading) explain that weather data doesn't change more than every 10 minutes and request that applications not poll more frequently than this. 

Because of this, I've chosen to set the default update period of the cache to 10 mins. This can be configured though using a `.env` file and setting `REACT_APP_WEATHER_CACHE_TIMEOUT` in microseconds.
