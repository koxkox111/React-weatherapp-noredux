import React from 'react'
import { Box,  Container, Temperature, AvgTemp, WeatherInfo  } from './Style'

export function CurrentTemp( {weatherData} ) {
	return (
		<Box>
			<Container>
				<Temperature>
					<AvgTemp>{weatherData.currentTemp}°C</AvgTemp>
				</Temperature>
				<WeatherInfo>
					<p>{weatherData.currentCondition}</p>
					<img src={weatherData.currentIcon} alt="icon"/>
				</WeatherInfo>
				<h3>Weather is: {weatherData.dailyNiceweather[0]}</h3>
			</Container>
		</Box>
	)
}