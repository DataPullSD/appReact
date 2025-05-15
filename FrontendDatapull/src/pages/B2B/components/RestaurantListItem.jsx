
import React from "react";
import { Star, Heart, Clock ,Sparkles } from "./Icons";
import Badge from "./Badge";

const RestaurantListItem = ({ restaurant, isHovered, isFavorite, onHover, onLeave, onClick, onFavoriteToggle, isDarkMode }) => {
  return (
    <div
      className={`restaurant-list-item ${isHovered ? "hovered" : ""} ${isDarkMode ? "dark" : ""}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <div className="restaurant-list-item-content">
        <div className="restaurant-info">
          <div className="restaurant-name-row">
            <h3 className="restaurant-name">{restaurant.name}</h3>
            <button
              className={`favorite-button ${isFavorite ? "is-favorite" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteToggle();
              }}
            >
              <Heart size={14} fill={isFavorite} className={isFavorite ? "text-red-500" : ""} />
            </button>
          </div>

          <div className="rating-row">
            <span className="rating-value">{restaurant.rating}</span>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={12}
                  fill={star <= Math.floor(restaurant.rating)}
                  className="text-amber-400"
                />
              ))}
            </div>
            <span className="review-count">({restaurant.reviews.toLocaleString()})</span>
          </div>

          <div className="delivery-info">
            <Clock size={10} className="delivery-icon" />
            <span className="delivery-time">{restaurant.deliveryTime}</span>
            <span className="separator">•</span>
            <span className="delivery-fee">{restaurant.deliveryFee}</span>
          </div>

          <div className="tags">
            <Badge variant="outline" className="cuisine-tag">
              {restaurant.cuisine}
            </Badge>
            <Badge variant="outline" className="price-tag">
              {restaurant.priceRange}
            </Badge>

            {restaurant.isNew && (
              <Badge className="new-tag">
                <Sparkles size={8} className="sparkle-icon" />
                New
              </Badge>
            )}
          </div>
        </div>

        <div className="thumbnail-container">
          <img
            src={restaurant.featuredImage || "/placeholder.svg"}
            alt={restaurant.name}
            className={`thumbnail ${isHovered ? "zoomed" : ""}`}
          />
          {isFavorite && (
            <div className="favorite-indicator">
              <Heart size={10} fill={true} className="text-red-500" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantListItem;