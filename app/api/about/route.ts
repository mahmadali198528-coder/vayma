import { NextResponse } from "next/server";
import { site } from "@/data/public";

export async function GET() {
  return NextResponse.json(
    {
      data: {
        name: site.name,
        description: site.description,
        city: site.city,
        address: site.address,
        mission: "Передавать знания, воспитывать характер и сохранять традиции исламского образования.",
      },
    },
    { status: 200 }
  );
}
