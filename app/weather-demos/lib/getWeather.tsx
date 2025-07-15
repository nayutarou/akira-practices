"use server";
import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";

// Kuroshiroのインスタンスを保持するための変数
let kuroshiro: Kuroshiro | null = null;

// Kuroshiroの初期化を行う非同期関数
const initializeKuroshiro = async () => {
  if (kuroshiro) {
    return kuroshiro;
  }
  const instance = new Kuroshiro();
  await instance.init(new KuromojiAnalyzer());
  kuroshiro = instance;
  return kuroshiro;
};

export async function getWeatherData(city: string) {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new Error("OpenWeatherMap API key is not set.");
  }

  // Kuroshiroを初期化し、インスタンスを取得
  const kuroshiroInstance = await initializeKuroshiro();
  // 入力された日本語の都市名をローマ字に変換
  const romajiCity = await kuroshiroInstance.convert(city, { to: "romaji", romajiSystem: "passport" });

  // Geocoding APIを呼び出し、ローマ字の都市名で検索
  const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${romajiCity}&limit=1&appid=${apiKey}`;

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

    // 取得した緯度と経度を使用して、天気データを取得
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
