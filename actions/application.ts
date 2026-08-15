"use server";
import { applicationSchema } from "@/schemas/application";
import { createApplication } from "@/services/application-service";

export type ApplicationState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitApplication(_: ApplicationState, formData: FormData): Promise<ApplicationState> {
  const parsed = applicationSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      status: "error",
      message: "Проверьте заполнение формы.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await createApplication(parsed.data);

    if (result.source === "supabase") {
      return {
        status: "success",
        message: "Заявка отправлена. Мы сохранили её в онлайн-таблице Supabase.",
      };
    }

    return {
      status: "success",
      message: "Заявка отправлена. Локальная копия сохранена на сервере.",
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Не удалось сохранить заявку. Попробуйте позже.",
    };
  }
}
