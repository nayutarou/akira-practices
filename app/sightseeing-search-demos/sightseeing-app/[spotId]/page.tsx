
'use client';

import { useState, useEffect } from 'react';
import { getPlaceDetails, Place } from '../../lib/getSightseeingData';
import { useParams } from 'next/navigation';

const SpotDetailPage = () => {
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const placeId = params.spotId as string;

  useEffect(() => {
    const fetchDetails = async () => {
      if (!placeId) return;

      setLoading(true);
      try {
        const details = await getPlaceDetails(placeId);
        setPlace(details);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchDetails();
  }, [placeId]);

  if (loading) {
    return <div className="text-center py-10"><p>読み込み中...</p></div>;
  }

  if (!place) {
    return <div className="text-center py-10"><p>場所が見つかりませんでした。</p></div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-800">{place.name}</h1>
          <p className="text-gray-600">{place.formatted_address}</p>
        </div>
      </header>
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">写真</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {place.photos && place.photos.map((photo, index) => (
                  <img 
                    key={index} 
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`}
                    alt={place.name}
                    className="rounded-lg shadow-md"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">情報</h2>
              <p><strong>評価:</strong> {place.rating} / 5</p>
              {place.website && (
                <p><strong>ウェブサイト:</strong> <a href={place.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{place.website}</a></p>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-2xl font-semibold mb-4">レビュー</h2>
          <ul className="divide-y divide-gray-200">
            {place.reviews && place.reviews.map((review, index) => (
              <li key={index} className="py-4">
                <p><strong>{review.author_name}</strong> (評価: {review.rating})</p>
                <p className="text-gray-600">{review.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default SpotDetailPage;
