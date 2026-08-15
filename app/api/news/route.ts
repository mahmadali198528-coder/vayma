import { NextResponse } from "next/server";
import { createContent, listContent } from "@/services/content-service";

export async function GET() {
  return NextResponse.json({ data: listContent("news") }, { status: 200 });
}

export async function POST(request: Request) {
  const body = await request.json();
  const item = createContent("news", body);
  return NextResponse.json({ data: item }, { status: 201 });
}
