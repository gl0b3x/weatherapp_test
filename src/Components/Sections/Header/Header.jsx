import classes from "./Header.module.css";
import { IoCloseSharp, IoMenu } from "react-icons/io5";
import { useCallback, useState } from "react";
import Search from "../../UI/Search/Search.jsx";
import { Link } from "react-router-dom";

const Header = () => {
  const [expanded, setExpanded] = useState({
    Search: false,
    Menu: false,
  });

  const toggleMenu = useCallback(() => {
    setExpanded((prev) => ({
      ...prev,
      Menu: !prev.Menu,
    }));
  }, []);

  return (
    <header className={classes.headerWrapper}>
      <Link to="/" className={classes.headerLogo}>
        WeatherApp
      </Link>
      <div className={classes.headerTools}>
        <Search expanded={expanded} setExpanded={setExpanded} />
        <button className={classes.headerMenuButton} onClick={toggleMenu}>
          <IoMenu />
          <span className={classes.title}>Menu</span>
        </button>
      </div>
      {expanded.Menu && (
        <div className={classes.headerMenuExpanded} onClick={toggleMenu}>
          <div
            className={classes.headerMenuContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={classes.headerMenuClose} onClick={toggleMenu}>
              <IoCloseSharp />
            </button>
            <ol className={classes.headerNavMenu}>
              <li>About Us</li>
              <li>Popular Cities</li>
              <li>Weather Warnings</li>
              <li>Help</li>
              <li>Contact Us</li>
            </ol>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
