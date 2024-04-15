import React, { useState } from "react";

import { City } from "./Components/City/City";
import { Weather } from "./Components/Weather/Weather";
import { Location } from "./Components/Location/Location";
import { lightTheme, darkTheme, Switch } from "./Components/Theme/Theme";

import { createGlobalStyle, ThemeProvider } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.textColor};
    transition: all 1s ease;
  }
`;

export function App() {
  const [theme, setTheme] = useState("light");
  const isDarkTheme = theme === "dark";
  const toggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark");
  };
  const [city, setCity] = useState("");
  const handleCity = (cityArg) => {
    setCity(cityArg);
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyle />
      <City handleCityChange={handleCity} />
      <div>
        <Switch toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
        <Location handleCityChange={handleCity} />
      </div>
      <Weather currentCity={city} />
    </ThemeProvider>
  );
}
