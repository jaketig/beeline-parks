import { Builder, builder } from '@builder.io/react';
import {Card} from "@mui/material";
import classes from "./weatherForecast.module.css";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

builder.init(process.env.BUILDER_API_KEY)




export function WeatherForecast(props) {
  const days = props?.data?.list || [];

  return (
    <div className={classes.wrapper}>
      {days.map((day) =>
        <Card className={classes.card} key={day.dt}>
          <div className={classes.imgWrapper}>
            <img className={classes.img} src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}/>
          </div>
          <div className={classes.avg}>{Math.round(day.temp.day)}°</div>
          <div className={classes.highlow}>
            <ArrowCircleUpIcon sx={{marginLeft: "3px", marginRight: "3px"}} fontSize={"small"}/> {Math.round(day.temp.min)}°
            <ArrowCircleDownIcon sx={{marginLeft: "3px", marginRight: "3px"}} fontSize={"small"} /> {Math.round(day.temp.max)}°
          </div>
          <div className={classes.footer}>
            {new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: 'long' })}
          </div>
        </Card>
      )}
    </div>
  )
}

Builder.registerComponent(WeatherForecast, {
  name: 'WeatherForecast'
});