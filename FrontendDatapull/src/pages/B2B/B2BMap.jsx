import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Search, MapPin, X, Plus, Minus } from "./components/Icons";
import Button from "./components/Button";
import RestaurantListItem from "./components/RestaurantListItem";
import RestaurantMapMarker from "./components/RestaurantMapMarker";
import Badge from "./components/Badge";
import { searchRestaurants } from "./api";
import "./style.css";

const FoodDeliveryPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState("nimes");
  const [category, setCategory] = useState("");
  const [hoveredRestaurant, setHoveredRestaurant] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [mapZoom, setMapZoom] = useState(13);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([1, 3]);
  const [allRestaurants, setAllRestaurants] = useState([]); // For the list
  const [restaurants, setRestaurants] = useState([]); // For the map
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const fetchRestaurants = async () => {
    try {
      setIsLoading(true);
      const filters = { name: searchQuery, city, query: category };
      const result = await searchRestaurants(filters, currentPage, pageSize);
      console.log("Raw API Response:", result);
      if (result && result.page && Array.isArray(result.page.content)) {
        const normalizedAllRestaurants = result.page.content.map(restaurant => ({
          ...restaurant,
          hours: Array.isArray(restaurant.hours)
            ? restaurant.hours
            : typeof restaurant.hours === "object" && restaurant.hours.times
            ? restaurant.hours.times
            : restaurant.hours || "Horaires non disponibles",
        }));

        const mapRestaurants = normalizedAllRestaurants.filter(restaurant =>
          typeof restaurant.latitude === "number" &&
          typeof restaurant.longitude === "number" &&
          !isNaN(restaurant.latitude) &&
          !isNaN(restaurant.longitude)
        );

        setAllRestaurants(normalizedAllRestaurants); // For the list
        setRestaurants(mapRestaurants); // For the map
        setTotalResults(result.totalResults || 0);
        console.log("All Restaurants (for list):", normalizedAllRestaurants);
        console.log("Map Restaurants (filtered):", mapRestaurants);
        if (mapRestaurants.length < normalizedAllRestaurants.length) {
          console.warn(
            `${normalizedAllRestaurants.length - mapRestaurants.length} restaurants filtered out due to invalid coordinates`
          );
        }
      } else {
        console.error("Invalid API response format:", result);
        setAllRestaurants([]);
        setRestaurants([]);
        setTotalResults(0);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      setIsLoading(false);
      setAllRestaurants([]);
      setRestaurants([]);
      setTotalResults(0);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleSearch = () => {
    setCurrentPage(0);
    fetchRestaurants();
  };

  useEffect(() => {
    fetchRestaurants();
  }, [currentPage, pageSize]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
    setCurrentPage(0);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const clearCityField = () => {
    setCity("");
  };

  const totalPages = Math.ceil(totalResults / pageSize);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, {
        center: [43.8367, 4.3601],
        zoom: mapZoom,
        zoomControl: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current);
    }

    mapInstanceRef.current.setZoom(mapZoom);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapZoom]);

  useEffect(() => {
    if (restaurants.length > 0 && mapInstanceRef.current) {
      const validCoordinates = restaurants
        .filter(r => typeof r.latitude === "number" && typeof r.longitude === "number" && !isNaN(r.latitude) && !isNaN(r.longitude))
        .map(r => [r.latitude, r.longitude]);
      if (validCoordinates.length > 0) {
        const bounds = L.latLngBounds(validCoordinates);
        mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
      } else {
        mapInstanceRef.current.setView([43.8367, 4.3601], 13); // Fallback to Nîmes
      }
    }
  }, [restaurants]);

  const handleZoomIn = () => setMapZoom((prev) => Math.min(prev + 1, 18));
  const handleZoomOut = () => setMapZoom((prev) => Math.max(prev - 1, 10));

  const toggleFilter = (filter) => {
    if (["American", "Italian", "Japanese", "Mexican"].includes(filter)) {
      if (category === filter) {
        setCategory("");
      } else {
        setCategory(filter);
      }
      handleSearch();
    } else {
      setActiveFilters((prev) =>
        prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
      );
    }
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

const handleShowDetails = (restaurant) => {
  setSelectedRestaurant(restaurant);
};

  return (
    <div className={`map-container ${isDarkMode ? "dark" : ""}`}>
      <div className={`sidebar ${isDarkMode ? "dark" : ""}`}>
        <div className={`search-container ${isDarkMode ? "dark" : ""}`}>
          <div className="search-input-container">
            <Search size={12} className={`search-icon ${isDarkMode ? "dark" : ""}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Rechercher par nom de restaurant"
              className={`search-input ${isDarkMode ? "dark" : ""}`}
            />
            <Button className="search-button" onClick={handleSearch} size="sm">
              Rechercher
            </Button>
          </div>
        </div>

        <div className={`location-container ${isDarkMode ? "dark" : ""}`}>
          <div className={`location-input ${isDarkMode ? "dark" : ""}`}>
            <div className="location-info">
              <MapPin size={16} className={`location-icon ${isDarkMode ? "dark" : ""}`} />
              <input
                type="text"
                value={city}
                onChange={handleCityChange}
                onKeyPress={handleKeyPress}
                placeholder="Ville"
                className={`location-text-input ${isDarkMode ? "dark" : ""}`}
              />
            </div>
            <button onClick={clearCityField} className={`clear-button ${isDarkMode ? "dark" : ""}`}>
              <X size={16} className={`clear-icon ${isDarkMode ? "dark" : ""}`} />
            </button>
          </div>
        </div>

        <div className={`filters-container ${isDarkMode ? "dark" : ""}`}>
          <button
            className={`filters-toggle ${isDarkMode ? "dark" : ""}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <span>Filtres</span>
            <span className={`toggle-icon ${showFilters ? "open" : ""}`}>▼</span>
          </button>
          {showFilters && (
            <div className="filters-content">
              <div className="filter-section">
                <p className="filter-label">Cuisine</p>
                <div className="filter-options">
                  {["American", "Italian", "Japanese", "Mexican"].map((cuisine) => (
                    <Badge
                      key={cuisine}
                      variant={category === cuisine ? "default" : "outline"}
                      className={`filter-badge ${category === cuisine ? "active" : ""} ${isDarkMode ? "dark" : ""}`}
                      onClick={() => toggleFilter(cuisine)}
                    >
                      {cuisine}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="filter-section">
                <p className="filter-label">Prix</p>
                <div className="filter-options">
                  {["$", "$$", "$$$", "$$$$"].map((price) => (
                    <Badge
                      key={price}
                      variant={activeFilters.includes(price) ? "default" : "outline"}
                      className={`filter-badge ${activeFilters.includes(price) ? "active" : ""} ${isDarkMode ? "dark" : ""}`}
                      onClick={() => toggleFilter(price)}
                    >
                      {price}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={`results-count ${isDarkMode ? "dark" : ""}`}>
          <span className="count-text">
            {isLoading ? "Loading..." : `${totalResults} Restaurants trouvés`}
          </span>
        </div>

        <div className="restaurant-list">
          {isLoading
            ? Array(4)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className={`skeleton-item ${isDarkMode ? "dark" : ""}`}>
                    <div className="skeleton-content">
                      <div className="skeleton-info">
                        <div className="skeleton-line-large"></div>
                        <div className="skeleton-line-small"></div>
                        <div className="skeleton-line-medium"></div>
                        <div className="skeleton-line-small"></div>
                      </div>
                      <div className="skeleton-image"></div>
                    </div>
                  </div>
                ))
            : allRestaurants.length === 0
            ? <div className="no-results">Aucun restaurant trouvé.</div>
            : allRestaurants.map((restaurant) => (
                <RestaurantListItem
                  key={restaurant.id}
                  restaurant={restaurant}
                  isFavorite={favorites.includes(restaurant.id)}
                  onFavoriteToggle={() => toggleFavorite(restaurant.id)}
                  onShowDetails={handleShowDetails}
                  isDarkMode={isDarkMode}
                />
              ))}
        </div>

        <div className={`pagination-container ${isDarkMode ? "dark" : ""}`}>
          <div className="pagination-controls">
            <Button
              onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              size="sm"
              variant={isDarkMode ? "outline" : "secondary"}
            >
              Précédent
            </Button>
            <div className="pagination-info">
              Page {currentPage + 1} sur {totalPages || 1}
            </div>
            <Button
              onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage >= totalPages - 1}
              size="sm"
              variant={isDarkMode ? "outline" : "secondary"}
            >
              Suivant
            </Button>
          </div>
          <div className="page-size-selector">
            <span>Résultats par page:</span>
            <select value={pageSize} onChange={handlePageSizeChange} className={isDarkMode ? "dark" : ""}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </div>

      <div className="map-view">
        <div className="map-content">
          <div
            ref={mapRef}
            className={`map-image-container ${isDarkMode ? "dark" : ""}`}
            style={{ height: "100%", width: "100%" }}
          />
          <div className={`map-controls ${isDarkMode ? "dark" : ""}`}>
            <button className={`zoom-button ${isDarkMode ? "dark" : ""}`} onClick={handleZoomIn}>
              <Plus size={18} />
            </button>
            <button className={`zoom-button ${isDarkMode ? "dark" : ""}`} onClick={handleZoomOut}>
              <Minus size={18} />
            </button>
          </div>
          {restaurants.map((restaurant) => (
            <RestaurantMapMarker
              key={restaurant.id}
              restaurant={restaurant}
              isHovered={hoveredRestaurant?.id === restaurant.id}
              isFavorite={favorites.includes(restaurant.id)}
              onHover={() => setHoveredRestaurant(restaurant)}
              onLeave={() => setHoveredRestaurant(null)}
              onShowDetails={handleShowDetails}
              onFavoriteToggle={() => toggleFavorite(restaurant.id)}
              isDarkMode={isDarkMode}
              map={mapInstanceRef.current}
            />
          ))}
        </div>
      </div>

      {selectedRestaurant && (
        <div className={`detail-overlay ${isDarkMode ? "dark" : ""}`} style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1000, background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.5)" }}>
          <h3>{selectedRestaurant.name}</h3>
          <p>Rating: {selectedRestaurant.rating} ({selectedRestaurant.ratingCount})</p>
          <p>Address: {selectedRestaurant.address}</p>
          <p>Hours: {Array.isArray(selectedRestaurant.hours) ? selectedRestaurant.hours.map(h => `${h.day}: ${h.times}`).join(", ") : selectedRestaurant.hours}</p>
          <p>Delivery Time: {selectedRestaurant.deliveryTime}</p>
          <p>Delivery Fee: {selectedRestaurant.deliveryFee}</p>
          <p>Price Range: {selectedRestaurant.priceRange}</p>
          <Button onClick={() => setSelectedRestaurant(null)} size="sm">Fermer</Button>
        </div>
      )}
    </div>
  );
};

export default FoodDeliveryPage;