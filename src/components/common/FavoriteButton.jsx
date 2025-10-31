// src/components/common/FavoriteButton.jsx
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

/**
 * FavoriteButton Component
 * Toggles favorite status with localStorage support (now stores full recipe)
 */
export default function FavoriteButton({
  recipeId,
  recipeData = null, // optional: full recipe object
  onToggle,
  showCount = false,
  initialCount = 0,
  size = 'md'
}) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(initialCount);
  const [isAnimating, setIsAnimating] = useState(false);

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorited(favorites.some(f => f.id === recipeId));
  }, [recipeId]);

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const exists = favorites.some(f => f.id === recipeId);
    let updatedFavorites;

    if (exists) {
      // remove
      updatedFavorites = favorites.filter(f => f.id !== recipeId);
      setFavoriteCount(prev => Math.max(0, prev - 1));
      setIsFavorited(false);
    } else {
      // add
      const dataToStore = recipeData
        ? recipeData // full data if provided
        : { id: recipeId }; // fallback to ID only
      updatedFavorites = [...favorites, dataToStore];
      setFavoriteCount(prev => prev + 1);
      setIsFavorited(true);
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    if (onToggle) onToggle(recipeId, !exists);
  };

  return (
    <button
      onClick={handleToggle}
      className={`
        ${sizes[size]} rounded-full flex items-center justify-center gap-1.5
        transition-all duration-200 
        ${isFavorited 
          ? 'bg-red-500 hover:bg-red-600 text-white' 
          : 'bg-white/90 hover:bg-white text-slate-700 hover:text-red-500'
        }
        backdrop-blur-sm shadow-md hover:shadow-lg
        ${isAnimating ? 'scale-125' : 'scale-100'}
      `}
      title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart 
        className={`${iconSizes[size]} transition-all duration-200 ${isFavorited ? 'fill-current' : ''}`} 
      />
      {showCount && favoriteCount > 0 && (
        <span className="text-xs font-semibold">
          {favoriteCount > 999 ? '999+' : favoriteCount}
        </span>
      )}
    </button>
  );
}
