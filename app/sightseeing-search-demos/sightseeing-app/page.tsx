
'use client';

import { useState, useEffect } from 'react';
import { searchPlaces, Place } from '../lib/getSightseeingData';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('../ui/MapView'), { ssr: false });

const SightseeingApp = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('東京 観光'); // Default search term

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await searchPlaces(searchTerm);
      setPlaces(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // Fetch initial data on component mount
  useEffect(() => {
    const form = document.getElementById('search-form') as HTMLFormElement;
    if (form) {
      form.requestSubmit();
    }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-800">観光地検索</h1>
        </div>
      </header>
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">検索条件</h2>
              <form id="search-form" onSubmit={handleSearch}>
                <label htmlFor="search" className="block text-gray-700 font-bold mb-2">キーワード</label>
                <input
                  id="search"
                  type="text"
                  placeholder="例: 京都 寺"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-blue-700">
                  検索
                </button>
              </form>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <MapView spots={places.map(p => ({ resourceName: p.name, latitude: p.geometry.location.lat, longitude: p.geometry.location.lng, resourceCode: p.place_id, cityName: p.formatted_address, broadName: '', detailName: ''}))} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              {loading ? (
                <div className="text-center">
                  <p className="text-gray-600">読み込み中...</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {places.map(place => (
                    <li key={place.place_id} className="py-4">
                      <Link href={`/sightseeing-search-demos/sightseeing-app/${place.place_id}`}>
                        <a className="hover:underline">
                          <h3 className="text-xl font-semibold text-gray-800">{place.name}</h3>
                          <p className="text-gray-600">{place.formatted_address}</p>
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SightseeingApp;
