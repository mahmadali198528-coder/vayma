import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminSessionToken } from "@/lib/auth/admin";

export async function POST(request: Request) {
  const body = await request.json();
  const password = String(body.password ?? "");
  const secretPassword = process.env.ADMIN_PASSWORD ?? "admin123";

  if (password !== secretPassword) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, getAdminSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}
