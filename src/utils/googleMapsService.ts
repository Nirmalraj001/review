export const openGoogleMapsReview = (): void => {
  const placeId = import.meta.env.VITE_GOOGLE_MAPS_PLACE_ID || "ChIJa7BADqbFADsRSxwRukOolHs";
  
  if (!placeId) {
    console.warn('Google Maps Place ID not configured');
    // Fallback to search-based URL
    const businessName = 'N2H ENTERPRISES';
    const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(businessName)}`;
    window.open(searchUrl, '_blank');
    return;
  }

  // Direct review URL using Place ID
  const reviewUrl = `https://www.google.com/maps/place/?q=place_id:${placeId}&hl=en`;
  window.open(reviewUrl, '_blank');
};

export const openGoogleMapsLocation = (): void => {
  const placeId = import.meta.env.VITE_GOOGLE_MAPS_PLACE_ID || "ChIJa7BADqbFADsRSxwRukOolHs";
  
  if (!placeId) {
    // Fallback to coordinates or address
    const coordinates = import.meta.env.VITE_BUSINESS_COORDINATES || '-33.8688,151.2195'; // Default to Bangalore
    const locationUrl = `https://www.google.com/maps/@${coordinates},15z`;
    window.open(locationUrl, '_blank');
    return;
  }

  const locationUrl = `https://www.google.com/maps/place/?q=place_id:${placeId}`;
  window.open(locationUrl, '_blank');
};

export const getGoogleMapsEmbedUrl = (): string => {
  const placeId = import.meta.env.VITE_GOOGLE_MAPS_PLACE_ID || "ChIJa7BADqbFADsRSxwRukOolHs";
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  if (!placeId || !apiKey) {
    return '';
  }

  return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${placeId}`;
};