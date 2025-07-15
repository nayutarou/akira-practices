
export async function getWeatherData(city: string) {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new Error("OpenWeatherMap API key is not set.");
  }

  // ステップ1：Geocoding APIを使用して、都市名を緯度と経度に変換します。
  // これにより、日本語などの非ASCII文字を含む都市名も処理できます。
  const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

  try {
    const geoRes = await fetch(geocodingUrl);
    if (!geoRes.ok) {
      throw new Error(`Failed to fetch geocoding data: ${geoRes.statusText}`);
    }
    const geoData = await geoRes.json();

    if (!geoData || geoData.length === 0) {
      return null; // City not found
    }

    const { lat, lon } = geoData[0];

    // ステップ2：取得した緯度と経度を使用して、天気データを取得します。
    // 'lang=ja' パラメータにより、天気の説明が日本語になります。
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ja`;

    const weatherRes = await fetch(weatherUrl);
    if (!weatherRes.ok) {
      throw new Error(`Failed to fetch weather data: ${weatherRes.statusText}`);
    }
    return weatherRes.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}
