import classes from "../CitySection.module.css";

const WeatherInfoBlock = ({ icon, label, value }) => (
  <div>
    <span className={classes.leftBlockTitleSpan}>
      {icon} {label}
    </span>
    <span className={classes.leftBlockInfoSpan}>{value}</span>
  </div>
);

export default WeatherInfoBlock;
