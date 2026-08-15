import { NextResponse } from "next/server";
import { applicationSchema } from "@/schemas/application";
import { createApplication } from "@/services/application-service";
import { rateLimit } from "@/lib/security/rate-limit";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "anonymous";

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: { code: "RATE_LIMITED", message: "Слишком много запросов. Повторите позже." } },
      { status: 429 }
    );
  }

  try {
    const parsed = applicationSchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Проверьте данные",
            fields: parsed.error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      );
    }

    const result = await createApplication(parsed.data);
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error) {
    console.error("Application submission failed:", error);
    return NextResponse.json(
      { error: { code: "SERVICE_UNAVAILABLE", message: "Сервис заявок пока не настроен" } },
      { status: 503 }
    );
  }
}
