import React, { useState, useEffect } from 'react';
import { Form, Input, Suggestions, SuggestionItem } from './Style';

import { AutoComplLink } from '../../config';

export function City( {handleCityChange} ) {
  const [cityName, setCityName] = useState('');
  const [listOfSuggestions, setListOfSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchData = async (char) => {
    if (char.trim() === '') {
      setListOfSuggestions([]);
      return;
    }

    try {
      const url = AutoComplLink(char);
      const response = await fetch(url);
      const data = await response.json();
      setListOfSuggestions(data);
    } catch (error) {
      console.error('Error getting city suggestions:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let cityToSubmit = cityName;
    // dispatch(setCurrentSearch(cityToSubmit)); // Assuming you have a separate function to handle search updates
    // setShowSuggestions(false);
    console.log(cityToSubmit);
    handleCityChange(cityToSubmit);
  };

  const inputFunction = (e) => {
    setCityName(e.target.value);
    setShowSuggestions(true);
    fetchData(e.target.value);
  };

  useEffect(() => {
    const timeout = setTimeout(() => setShowSuggestions(false), 3000); // Debounce effect
    return () => clearTimeout(timeout);
  }, [cityName]);

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="Search a location..."
        value={cityName}
        onChange={inputFunction}
      />
      {listOfSuggestions && showSuggestions && (
        <Suggestions>
          {listOfSuggestions.slice(0, 5).map((item) => (
            <SuggestionItem key={item.id} onClick={() => handleSubmit(item.name, item.country)}>
              {item.name}, {item.country}
            </SuggestionItem>
          ))}
        </Suggestions>
      )}
    </Form>
  );
}
