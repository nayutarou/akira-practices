
export async function getWeatherData(city: string) {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new Error("OpenWeatherMap API key is not set.");
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } }); // Revalidate every hour
    if (!res.ok) {
      if (res.status === 404) {
        return null; // City not found
      }
      throw new Error(`Failed to fetch weather data: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}
