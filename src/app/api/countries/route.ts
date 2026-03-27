import { NextResponse } from "next/server";

const CORE_FIELDS =
  "name,cca2,capital,population,area,region,subregion,flags,latlng";
const DETAIL_FIELDS = "name,cca2,currencies,languages";

export async function GET() {
  try {
    const [coreRes, detailRes] = await Promise.all([
      fetch(`https://restcountries.com/v3.1/all?fields=${CORE_FIELDS}`, {
        next: { revalidate: 86400 },
      }),
      fetch(`https://restcountries.com/v3.1/all?fields=${DETAIL_FIELDS}`, {
        next: { revalidate: 86400 },
      }),
    ]);

    if (!coreRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch countries" },
        { status: coreRes.status }
      );
    }

    const coreData = await coreRes.json();

    // Merge detail fields if available
    if (detailRes.ok) {
      const detailData = await detailRes.json();
      const detailMap = new Map(
        detailData.map((d: { cca2: string }) => [d.cca2, d])
      );
      for (const country of coreData) {
        const detail = detailMap.get(country.cca2) as
          | { currencies?: unknown; languages?: unknown }
          | undefined;
        if (detail) {
          country.currencies = detail.currencies;
          country.languages = detail.languages;
        }
      }
    }

    return NextResponse.json(coreData);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
