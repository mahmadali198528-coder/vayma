import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, isAdminAuthenticatedToken } from "@/lib/auth/admin";

const applications = [
  {
    id: "app-1",
    name: "Айбек",
    age: 18,
    phone: "+996 555 123 456",
    program: "Коран и таджвид",
    comment: "Хочу поступить в медресе.",
    created_at: new Date().toISOString(),
  },
];

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!isAdminAuthenticatedToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const item = applications.find((entry) => entry.id === id);
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ data: item }, { status: 200 });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!isAdminAuthenticatedToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const index = applications.findIndex((entry) => entry.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  applications.splice(index, 1);
  return NextResponse.json({ ok: true }, { status: 200 });
}
