
import fetch from 'node-fetch';

const API_KEY = process.env.GOOGLE_PLACES_API_KEY; // 環境変数からAPIキーを取得
const BASE_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';

export interface Place {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  rating: number;
  photos?: { photo_reference: string }[];
  reviews?: { author_name: string; rating: number; text: string; }[];
  website?: string;
}

export const searchPlaces = async (query: string): Promise<Place[]> => {
  if (!API_KEY) {
    throw new Error('GOOGLE_PLACES_API_KEY is not defined');
  }

  const response = await fetch(
    `${BASE_URL}?query=${encodeURIComponent(query)}&language=ja&key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch places data');
  }

  const data = await response.json();
  return data.results;
};

export const getPlaceDetails = async (placeId: string): Promise<Place> => {
  if (!API_KEY) {
    throw new Error('GOOGLE_PLACES_API_KEY is not defined');
  }

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&language=ja&fields=name,formatted_address,geometry,rating,photos,reviews,website&key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch place details');
  }

  const data = await response.json();
  return data.result;
};
