import axios from "axios";

const apiKey = "e9c68cb0dc647f98ff47816c1c688def";

export const getCityCoordinates = async (cityName) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct`,
      {
        params: {
          q: cityName,
          limit: 5,
          appid: apiKey,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getWeatherByCoordinates = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall`,
      {
        params: {
          lat: lat,
          lon: lon,
          units: "metric",
          appid: apiKey,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
