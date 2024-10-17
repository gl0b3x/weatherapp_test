import classes from "./Locationds.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FavoriteStar from "../../UI/FavoriteStar/FavoriteStar.jsx";
import { memoizedFavoriteCities } from "../../../Store/favoritesSlice.js";
import { useEffect, useState } from "react";
import { getWeatherByCoordinates } from "../../../Api/Api.js";

const Locations = () => {
  const favoriteCities = useSelector(memoizedFavoriteCities);
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsLoading(true);
      const weatherPromises = favoriteCities.map(async (city) => {
        if (city.lat && city.lon) {
          try {
            const weather = await getWeatherByCoordinates(city.lat, city.lon);
            return { ...city, weather };
          } catch (err) {
            console.error(
              `Помилка отримання погоди для ${city.nameCity}:`,
              err,
            );
          }
        }
      });

      const results = await Promise.all(weatherPromises);
      setWeatherData(results.filter(Boolean));
      setIsLoading(false);
    };

    if (favoriteCities.length > 0) {
      fetchWeatherData();
    } else {
      setIsLoading(false);
    }
  }, [favoriteCities]);

  return (
    <main className={classes.locationsImage}>
      <div className={classes.locationsWrapper}>
        <p className={classes.locationsArticle}>My Locations</p>
        <div className={classes.locations}>
          <div className={classes.locationBlock} style={{ border: "none" }}>
            <span className={classes.addFavorite} style={{ cursor: "default" }}>
              Favorite
            </span>
            <span className={classes.nameLocation}>City</span>
            <span className={classes.infoBlock}>Weather</span>
            <span className={classes.infoBlock}>Temperature</span>
            <span className={classes.infoBlockDesktop}>Feels like</span>
            <span className={classes.infoBlockDesktop}>Wind Speed</span>
          </div>

          {isLoading ? (
            <>
              {[1, 2, 3].map((index) => (
                <div key={index} className={classes.locationBlock}>
                  <div
                    className="loader"
                    style={{ width: "100%", opacity: 0.1 }}
                  />
                </div>
              ))}
            </>
          ) : weatherData.length > 0 ? (
            weatherData.map(({ lat, lon, nameCity, nameCountry, weather }) => (
              <Link
                key={`${lat}-${lon}`}
                to={`/${nameCountry}/${nameCity}`}
                className={classes.locationBlock}
              >
                <div
                  onClick={(event) => event.preventDefault()}
                  className={classes.addFavorite}
                >
                  <FavoriteStar
                    lat={lat}
                    lon={lon}
                    nameCity={nameCity}
                    nameCountry={nameCountry}
                  />
                </div>
                <span className={classes.nameLocation}>
                  {nameCity}, {nameCountry}
                </span>
                <span className={classes.infoBlock}>
                  {weather.current.weather[0].main}
                </span>
                <span className={classes.infoBlock}>
                  {Math.round(weather.current.temp)}°
                </span>
                <span className={classes.infoBlockDesktop}>
                  {Math.round(weather.current.feels_like)}°
                </span>
                <span className={classes.infoBlockDesktop}>
                  {weather.current.wind_speed} m/s
                </span>
              </Link>
            ))
          ) : (
            <p className={classes.noFavorites}>No favorite locations yet</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Locations;
