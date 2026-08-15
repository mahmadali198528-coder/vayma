import { NextResponse } from "next/server";
import { registerStudentWithCode } from "@/services/student-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const student = registerStudentWithCode({
      code: String(body.code ?? ""),
      fullName: String(body.fullName ?? ""),
      email: String(body.email ?? ""),
      phone: String(body.phone ?? ""),
      password: String(body.password ?? ""),
    });

    return NextResponse.json({ data: student }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          code: "REGISTRATION_ERROR",
          message: error instanceof Error ? error.message : "Не удалось зарегистрировать ученика",
        },
      },
      { status: 400 }
    );
  }
}
