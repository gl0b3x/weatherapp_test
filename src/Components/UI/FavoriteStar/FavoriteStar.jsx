import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaRegStar } from "react-icons/fa";
import { addCity, removeCity } from "../../../Store/favoritesSlice.js";
import classes from "./FavoriteStar.module.css";

const FavoriteStar = ({ lat, lon, nameCity, nameCountry }) => {
  const dispatch = useDispatch();
  const favoriteCities = useSelector((state) => state.favorites.cities);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const isCityFavorite = favoriteCities.some(
      (city) => city.lat === lat && city.lon === lon,
    );
    setIsFavorite(isCityFavorite);
  }, [favoriteCities, lat, lon]);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeCity({ lat, lon }));
    } else {
      dispatch(addCity({ lat, lon, nameCity, nameCountry }));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <button className={classes.favoriteStar} onClick={toggleFavorite}>
      {isFavorite ? <FaStar /> : <FaRegStar />}
    </button>
  );
};

export default FavoriteStar;
