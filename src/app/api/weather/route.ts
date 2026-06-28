import { NextResponse } from "next/server";

/** Rothfusz-style simplified heat index from temp (°C) + humidity */
function heatIndexC(tempC: number, humidity: number): number {
  const tempF = (tempC * 9) / 5 + 32;
  let hi =
    -42.379 +
    2.04901523 * tempF +
    10.14333127 * humidity -
    0.22475541 * tempF * humidity -
    0.00683783 * tempF * tempF -
    0.05481717 * humidity * humidity +
    0.00122874 * tempF * tempF * humidity +
    0.00085282 * tempF * humidity * humidity -
    0.00000199 * tempF * tempF * humidity * humidity;

  if (humidity < 13 && tempF >= 80 && tempF <= 112) {
    hi -= ((13 - humidity) / 4) * Math.sqrt((17 - Math.abs(tempF - 95)) / 17);
  }
  if (humidity > 85 && tempF >= 80 && tempF <= 87) {
    hi += ((humidity - 85) / 10) * ((87 - tempF) / 5);
  }

  return Math.round(((hi - 32) * 5) / 9);
}

export async function GET() {
  // Mumbai — demo city; swap lat/lng for your city in production
  const lat = 19.076;
  const lon = 72.8777;

  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m&timezone=auto`,
      { next: { revalidate: 900 } },
    );

    if (!res.ok) throw new Error("Weather fetch failed");

    const data = await res.json();
    const temperature = data.current.temperature_2m as number;
    const humidity = data.current.relative_humidity_2m as number;

    return NextResponse.json({
      temperature,
      humidity,
      heatIndex: heatIndexC(temperature, humidity),
      source: "Open-Meteo",
    });
  } catch {
    return NextResponse.json({
      temperature: 32,
      humidity: 78,
      heatIndex: 38,
      source: "fallback",
    });
  }
}
