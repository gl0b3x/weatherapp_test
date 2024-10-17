import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cities: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addCity: (state, action) => {
      const exists = state.cities.some(
        (city) =>
          city.lat === action.payload.lat && city.lon === action.payload.lon,
      );
      if (!exists) {
        state.cities.push(action.payload);
      }
    },
    removeCity: (state, action) => {
      state.cities = state.cities.filter(
        (city) =>
          city.lat !== action.payload.lat || city.lon !== action.payload.lon,
      );
    },
  },
});

export const selectFavoriteCities = (state) => state.favorites.cities;

export const memoizedFavoriteCities = selectFavoriteCities;

export const { addCity, removeCity } = favoritesSlice.actions;

export default favoritesSlice.reducer;
