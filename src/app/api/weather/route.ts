import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "lat and lon parameters are required" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch weather" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({
      temperature: data.current.temperature_2m,
      weatherCode: data.current.weather_code,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
