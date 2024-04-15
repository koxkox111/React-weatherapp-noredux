import React, { useEffect, useState } from 'react';

import { GifLink } from '../../config';

import styled from 'styled-components';

const Image = styled.img`
    height: 400px;
    width: 400px;
    object-fit: fill;
    border-radius: 10px;
`

export const WeatherGif = ({ condition }) => {
  const [currentCondition, setCurrentCondition] = useState(condition || 'cloudy');
  const [imageUrls, setImageUrls] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const url = GifLink(currentCondition);
        console.log('currentCondition', currentCondition); 
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        const photos = data.results;
        const urls = photos.map((photo) => photo.media[0].gif.url);
        setImageUrls(urls);
        const randomIndex = Math.floor(Math.random() * urls.length);
        setCurrentImageIndex(randomIndex);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [currentCondition]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const newIndex = Math.floor(Math.random() * imageUrls.length);
        return newIndex !== prevIndex ? newIndex : (newIndex + 1) % imageUrls.length;
      });
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, [imageUrls]);

  useEffect(() => {
    console.log('useEffect', condition);
    if(condition)
      setCurrentCondition(condition);
  }, [condition]);

  return (
    <div>
      {imageUrls.length > 0 && <Image src={imageUrls[currentImageIndex]} alt={condition}/>}
    </div>
  );
};

