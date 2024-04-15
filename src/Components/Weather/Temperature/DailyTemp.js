import React from 'react'
import { Box, Container, Temperature, MinTemp, AvgTemp, MaxTemp, WeatherInfo  } from './Style'


export function DailyTemp( {weatherData} ) {

	return (
		<Box>
			{weatherData.dailyTemp.map((temp, index) => (
			<Container key={index}>
				<Temperature>
					<MinTemp>{weatherData.dailyMinTemp[index]}°C</MinTemp>
					<AvgTemp>{temp}°C</AvgTemp>
					<MaxTemp>{weatherData.dailyMaxTemp[index]}°C</MaxTemp>
				</Temperature>
				<WeatherInfo>
					<p>{weatherData.dailyCondition[index]}</p>
					<img src={weatherData.dailyIcon[index]} alt="icon"/>
				</WeatherInfo>
				<p>Weather is: {weatherData.dailyNiceweather[index]}</p>
			</Container>
			))
			}
		</Box>
	)
}