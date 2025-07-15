"use server";

export async function getHotelData(keyword: string) {
  const appId = process.env.RAKUTEN_TRAVEL_API_APP_ID;
  if (!appId) {
    throw new Error("Rakuten Travel API Application ID is not set.");
  }

  const url = `https://app.rakuten.co.jp/services/api/Travel/KeywordHotelSearch/20170426?format=json&keyword=${keyword}&applicationId=${appId}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch hotel data: ${res.statusText}`);
    }
    const data = await res.json();

    if (data.hotels && data.hotels.length > 0) {
      return data.hotels;
    } else {
      return []; // No hotels found
    }
  } catch (error) {
    console.error("Error fetching hotel data:", error);
    throw error;
  }
}
