import { NextResponse } from "next/server";
import { site } from "@/data/public";

export async function GET() {
  return NextResponse.json(
    {
      data: {
        name: site.name,
        city: site.city,
        address: site.address,
        phone: site.phone,
        email: "info@medrese.kg",
      },
    },
    { status: 200 }
  );
}
