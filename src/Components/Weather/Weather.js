import React, { useState, useEffect } from "react";
import { Button, TextWrapper } from "./Style"; // Assuming you have a Button component

import { CurrentTemp } from "./Temperature/CurrentTemp";
import { HourlyTemp } from "./Temperature/HourlyTemp";
import { DailyTemp } from "./Temperature/DailyTemp";

import { WeatherGif } from "../Gif/Gif";

import { TailSpin } from "react-loader-spinner"; // Or your preferred loading indicator

import { SpinWrapper, TemperatureWrapper, ButtonWrapper } from "./Style";

import { WeatherLink } from "../../config";

export function Weather({ currentCity }) {
  const [chosenCity, setChosenCity] = useState(currentCity || "Warsaw");
  const [isLoading, setIsLoading] = useState(false);
  const [style, setStyle] = useState(-1);
  const [weatherData, setWeatherData] = useState({
    cityW: "",
    currentTemp: 0,
    currentCondition: "",
    currentIcon: "",

    dailyTemp: [0, 0, 0],
    dailyCondition: ["", "", ""],
    dailyMaxTemp: [0, 0, 0],
    dailyMinTemp: [0, 0, 0],
    dailyNiceweather: [0, 0, 0],
    dailyIcon: ["", "", ""],

    hourlyTemp: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    hourlyCondition: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    hourlyIcon: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
  });

  const componentMap = {
    0: CurrentTemp,
    1: HourlyTemp,
    2: DailyTemp,
  };

  const MergedComponent = componentMap[style];

  useEffect(() => {
    const fetchWeather = async (city) => {
      if (!city) return;
      setIsLoading(true);

      try {
        const response = await fetch(`${WeatherLink(city)}`);
        const data = await response.json();
        console.log(data);

        const cityW = data.location.name;
        console.log(cityW);
        const currentTemp = data.current.temp_c;
        const currentCondition = data.current.condition.text;
        const currentIcon = data.current.condition.icon;

        let hourlyTemp = [];
        let hourlyCondition = [];
        let hourlyIcon = [];
        for (let i = 0; i < 24; i++) {
          hourlyTemp.push(data.forecast.forecastday[0].hour[i].temp_c);
          hourlyCondition.push(
            data.forecast.forecastday[0].hour[i].condition.text
          );
          hourlyIcon.push(data.forecast.forecastday[0].hour[i].condition.icon);
        }

        let dailyTemp = [];
        let dailyCondition = [];
        let dailyMaxTemp = [];
        let dailyMinTemp = [];
        let dailyIcon = [];
        for (let i = 0; i < 3; i++) {
          dailyTemp.push(data.forecast.forecastday[i].day.avgtemp_c);
          dailyCondition.push(data.forecast.forecastday[i].day.condition.text);
          dailyMaxTemp.push(data.forecast.forecastday[i].day.maxtemp_c);
          dailyMinTemp.push(data.forecast.forecastday[i].day.mintemp_c);
          dailyIcon.push(data.forecast.forecastday[i].day.condition.icon);
        }

        let dailyNiceweather = [];
        let points = [0, 0, 0];
        for (let i = 0; i < 3; i++) {
          if (dailyTemp[i] >= 18 && dailyTemp[i] <= 25) points[i] += 1;
          if (dailyMinTemp[i] >= 15 && dailyMaxTemp[i] <= 30) points[i] += 1;
          if (
            !dailyCondition[i].includes("rain") &&
            !dailyCondition[i].includes("snow") &&
            !dailyCondition[i].includes("storm")
          )
            points[i] += 1;
          if (points[i] === 3) {
            dailyNiceweather[i] = "nice";
          } else if (points[i] === 2) {
            dailyNiceweather[i] = "passable";
          } else {
            dailyNiceweather[i] = "not nice";
          }
        }
        setWeatherData({
          cityW,
          currentTemp,
          currentCondition,
          currentIcon,
          hourlyTemp,
          hourlyCondition,
          hourlyIcon,
          dailyTemp,
          dailyCondition,
          dailyMaxTemp,
          dailyMinTemp,
          dailyNiceweather,
          dailyIcon,
        });
        if (style === -1 && dailyIcon !== "") setStyle(0);
      } catch (error) {
        console.error("Error getting weather:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWeather(chosenCity);
  }, [chosenCity, style]);

  useEffect(() => {
    setChosenCity(currentCity);
  }, [currentCity]);

  const handleShowCurrentWeather = () => {
    setStyle(0);
  };

  const handleShowHourlyWeather = () => {
    setStyle(1);
  };

  const handleShowDailyWeather = () => {
    setStyle(2);
  };

  return (
    <div>
      <ButtonWrapper>
        <Button onClick={handleShowCurrentWeather}>Show current weather</Button>
        <Button onClick={handleShowHourlyWeather}>Show hourly weather</Button>
        <Button onClick={handleShowDailyWeather}>Show daily weather</Button>
      </ButtonWrapper>
      {isLoading ? (
        <SpinWrapper>
          <TailSpin />
        </SpinWrapper>
      ) : (
        <div>
          {style !== null && style !== -1 && (
            <div>
              <TextWrapper>
                <h1>{weatherData.cityW}</h1>
              </TextWrapper>
              <TemperatureWrapper>
                <MergedComponent weatherData={weatherData} />
                <WeatherGif condition={weatherData.currentCondition} />
              </TemperatureWrapper>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
