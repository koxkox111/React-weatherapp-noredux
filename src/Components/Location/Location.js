import React, { useState } from "react";
import { Button } from "./Style";

export function Location() {
  const [currentLocation, setCurrentLocation] = useState("");

  const getLocation = async () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
          setCurrentLocation(
            `${position.coords.latitude}, ${position.coords.longitude}`
          );
        });
      } else {
        console.log("Geolocation not supported");
      }
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const handleShowCurrentLocation = () => {
    // handleSetSearchLocation(currentLocation);
    getLocation();
    console.log("Current location:", currentLocation);
  };

  return (
    <Button onClick={handleShowCurrentLocation}>Show current location</Button>
  );
}
