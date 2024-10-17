import classes from "./CitySection.module.css";
import Skeleton from "../../Tools/Skeleton.jsx";
import WeatherInfoBlock from "./WeatherInfoBlock/WeatherInfoBlock.jsx";
import ForecastBlock from "./ForecastBlock/ForecastBlock.jsx";
import { getCityCoordinates, getWeatherByCoordinates } from "../../../Api/Api";
import { useEffect, useState } from "react";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { IoWaterOutline } from "react-icons/io5";
import { FaTemperatureHigh } from "react-icons/fa";
import { TbTemperatureSun } from "react-icons/tb";
import { LuWind } from "react-icons/lu";
import { format, fromUnixTime } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { useParams } from "react-router-dom";
import FavoriteStar from "../../UI/FavoriteStar/FavoriteStar.jsx";

const CitySection = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { country, city } = useParams();
  const [nameCity, setNameCity] = useState("");
  const [nameCountry, setNameCountry] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const cityCoordinates = await getCityCoordinates(`${city}, ${country}`);
        setNameCity(cityCoordinates[0].name);
        setNameCountry(cityCoordinates[0].country);
        if (cityCoordinates.length > 0) {
          const { lat, lon } = cityCoordinates[0];
          const weather = await getWeatherByCoordinates(lat, lon);
          setWeatherData(weather);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, country]);

  const formatTime = (timestamp, timezone, formatString = "HH:mm") => {
    return format(toZonedTime(fromUnixTime(timestamp), timezone), formatString);
  };

  return (
    <main className={classes.cityWrapper} id="product">
      <section className={classes.cityWrapperBlur}>
        <div className={classes.cityDetails}>
          <div className={classes.leftBlock}>
            <div className={classes.visualCityDetails}>
              <div className={classes.topPart}>
                <div className={classes.favoriteCity}>
                  {!loading && weatherData && (
                    <FavoriteStar
                      lat={weatherData.lat}
                      lon={weatherData.lon}
                      nameCity={nameCity}
                      nameCountry={nameCountry}
                    />
                  )}
                </div>
                {loading ? (
                  <div className={classes.loadingBlock}>
                    <Skeleton height={40} width={200} />
                    <Skeleton height={40} width={200} />
                    <Skeleton height={40} width={200} />
                  </div>
                ) : (
                  <>
                    <p className={classes.nameCity}>
                      {nameCity}, {nameCountry}
                    </p>
                    <p className={classes.temperature}>
                      {Math.round(weatherData.current.temp)}°
                    </p>
                    <p className={classes.dayDetails}>
                      {weatherData.current.weather[0].main}
                    </p>
                  </>
                )}
              </div>
              <div className={classes.bottomPart}>
                <WeatherInfoBlock
                  icon={<FiSunrise />}
                  label="Sunrise"
                  value={
                    loading ? (
                      <Skeleton height={30} width={75} />
                    ) : (
                      formatTime(
                        weatherData.current.sunrise,
                        weatherData.timezone,
                      )
                    )
                  }
                />
                <WeatherInfoBlock
                  icon={<FiSunset />}
                  label="Sunset"
                  value={
                    loading ? (
                      <Skeleton height={30} width={75} />
                    ) : (
                      formatTime(
                        weatherData.current.sunset,
                        weatherData.timezone,
                      )
                    )
                  }
                />
                <WeatherInfoBlock
                  icon={<IoWaterOutline />}
                  label="Humidity"
                  value={
                    loading ? (
                      <Skeleton height={30} width={75} />
                    ) : (
                      `${weatherData.current.humidity}%`
                    )
                  }
                />
                <WeatherInfoBlock
                  icon={<FaTemperatureHigh />}
                  label="Feels like"
                  value={
                    loading ? (
                      <Skeleton height={30} width={75} />
                    ) : (
                      `${Math.round(weatherData.current.feels_like)}°`
                    )
                  }
                />
              </div>
            </div>
          </div>
          <div className={classes.rightBlock}>
            <ForecastBlock
              title="Hourly Forecast"
              data={loading ? null : weatherData?.hourly}
              timezone={loading ? null : weatherData?.timezone}
              formatString="dd.MM HH:mm"
              formatTime={formatTime}
            />
            <ForecastBlock
              title="Day Forecast"
              data={loading ? null : weatherData?.daily}
              timezone={loading ? null : weatherData?.timezone}
              formatString="dd.MM"
              isDaily
              formatTime={formatTime}
            />
            <div className={classes.bottomPartRightBlock}>
              <WeatherInfoBlock
                icon={<TbTemperatureSun />}
                label="UV Index"
                value={
                  loading ? (
                    <Skeleton height={30} width={75} />
                  ) : (
                    <>
                      {weatherData.current.uvi}
                      <input
                        type="range"
                        max="10"
                        value={weatherData.current.uvi}
                        className="gradient-slider"
                        disabled
                      />
                    </>
                  )
                }
              />
              <WeatherInfoBlock
                icon={<LuWind />}
                label="Wind"
                value={
                  loading ? (
                    <Skeleton height={30} width={75} />
                  ) : (
                    `${weatherData.current.wind_speed} m/s`
                  )
                }
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CitySection;
