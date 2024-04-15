import React from 'react'
import { Box, InnerBox, Container, Temperature, AvgTemp, WeatherInfo  } from './Style'

export function HourlyTemp( {weatherData} ) {

	return (
		<Box>
			<InnerBox>
				{weatherData.hourlyTemp.map((temp, index) => (
					<Container key={index}>
					<Temperature>
						<AvgTemp>{temp}°C</AvgTemp>
					</Temperature>
						<WeatherInfo>
							<p>{weatherData.hourlyCondition[index]}</p>
							<img src={weatherData.hourlyIcon[index]} alt="icon"/>
						</WeatherInfo>
						<p>{index}:00</p>
					</Container>
				))
				}
			</InnerBox>
		</Box>
	)
}