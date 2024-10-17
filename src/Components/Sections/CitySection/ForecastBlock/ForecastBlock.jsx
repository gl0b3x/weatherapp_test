import classes from "../CitySection.module.css";
import Skeleton from "../../../Tools/Skeleton.jsx";

const ForecastBlock = ({
  title,
  data,
  timezone,
  formatString,
  isDaily,
  formatTime,
}) => (
  <div className={classes.Temperature}>
    <p className={classes.rightBlockTitle}>{title}</p>
    <div className={classes.temperatureFlexBox}>
      {data
        ? data.map((item, index) => (
            <div key={index} className={classes.temperatureBox}>
              <p className={classes.timeSpan}>
                {formatTime(item.dt, timezone, formatString)}
              </p>
              {isDaily ? (
                <p className={classes.temperatureSpanDaily}>
                  Min: {item.temp.min}° <br /> Max: {item.temp.max}°
                </p>
              ) : (
                <p className={classes.temperatureSpan}>{item.temp}°</p>
              )}
              <p className={classes.iconSpan}>{item.weather[0].main}</p>
            </div>
          ))
        : Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className={classes.temperatureBox}
                style={{ padding: "1px" }}
              >
                <Skeleton height="100%" minHeight="75px" width="100%" />
              </div>
            ))}
    </div>
  </div>
);

export default ForecastBlock;
