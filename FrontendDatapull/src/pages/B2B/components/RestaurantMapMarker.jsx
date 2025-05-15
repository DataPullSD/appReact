import React, { useEffect, useRef } from "react";
import L from "leaflet";

const RestaurantMapMarker = ({
  restaurant,
  isFavorite,
  onFavoriteToggle,
  isDarkMode,
  map,
}) => {
  const markerRef = useRef(null);

  useEffect(() => {
    // Validate latitude and longitude before creating the marker
    if (
      map &&
      typeof restaurant.latitude === "number" &&
      typeof restaurant.longitude === "number" &&
      !isNaN(restaurant.latitude) &&
      !isNaN(restaurant.longitude)
    ) {
      markerRef.current = L.marker([restaurant.latitude, restaurant.longitude], {
        icon: L.divIcon({
          className: `map-marker ${isFavorite ? "favorite" : ""} ${isDarkMode ? "dark" : ""}`,
          html: `<span class="marker-label">${restaurant.name[0]}</span>`,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        }),
      }).addTo(map);

      return () => {
        if (markerRef.current) {
          map.removeLayer(markerRef.current);
        }
      };
    } else {
      console.warn(`Invalid coordinates for restaurant ${restaurant.name}: latitude=${restaurant.latitude}, longitude=${restaurant.longitude}`);
    }
  }, [map, restaurant.latitude, restaurant.longitude, isFavorite, isDarkMode, restaurant.name]);

  return null; // No JSX returned, as the marker is handled by Leaflet
};

export default RestaurantMapMarker;