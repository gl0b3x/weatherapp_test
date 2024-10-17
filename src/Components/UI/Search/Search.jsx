import classes from "./Search.module.css";
import { IoSearch } from "react-icons/io5";
import { MdPlace } from "react-icons/md";
import { useCallback, useEffect, useRef, useState } from "react";
import { getCityCoordinates } from "../../../Api/Api.js";
import { Link } from "react-router-dom";

const Search = ({ expanded, setExpanded }) => {
  const [searchValue, setSearchValue] = useState("Warsaw");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchRef = useRef(null);

  const toggleSearch = useCallback(() => {
    setExpanded((prev) => ({
      ...prev,
      Search: !prev.Search,
    }));
  }, []);

  useEffect(() => {
    const fetchCoordinates = async () => {
      setLoading(true);
      try {
        const results = await getCityCoordinates(searchValue);
        setCities(results);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (searchValue) {
      fetchCoordinates();
    }
  }, [searchValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setExpanded((prev) => ({
          ...prev,
          Search: false,
        }));
      }
    };

    if (expanded.Search) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expanded.Search]);

  return (
    <div
      className={`${classes.headerSearchContainer} ${expanded.Search ? classes.expanded : ""}`}
      ref={searchRef}
    >
      <button className={classes.headerSearchIcon} onClick={toggleSearch}>
        <IoSearch />
        {!expanded.Search && (
          <span className={classes.headerSearchText}>Search</span>
        )}
      </button>
      {expanded.Search && (
        <>
          <input
            type="text"
            className={classes.headerSearchInput}
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className={classes.headerResultSearch}>
            {loading ? (
              <div className={classes.headerResultLocation}>
                <div
                  className="loader"
                  style={{ width: "100%", opacity: 0.1 }}
                />
              </div>
            ) : (
              cities.map((city, index) => (
                <Link
                  to={`/${city.country}/${city.name}`}
                  key={index}
                  className={classes.headerResultLocation}
                >
                  <MdPlace />
                  <span>
                    {city.name}, {city.country}
                  </span>
                </Link>
              ))
            )}
            {cities.length === 0 && (
              <div className={classes.headerResultFailed}>
                Sorry, but we didn't find anything :(
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
