import { createClient } from "@supabase/supabase-js";
import { applicationSchema, type ApplicationInput } from "@/schemas/application";
import { db, isPrismaReady } from "@/lib/db/prisma";

const developmentInbox: ApplicationInput[] = [];

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function reportFallback(label: string, error: unknown) {
  console.warn(`${label}:`, error instanceof Error ? error.message : error);
}

export async function createApplication(input: ApplicationInput) {
  const data = applicationSchema.parse(input);

  if (process.env.DATABASE_URL && db && isPrismaReady()) {
    try {
      const program =
        (await db.program.findFirst({ where: { title: data.program } })) ??
        (await db.program.upsert({
          where: { title: data.program },
          update: {},
          create: {
            title: data.program,
            description: "Автоматически создано из заявки на поступление.",
            published: true,
          },
        }));

      const created = await db.application.create({
        data: {
          name: data.name,
          age: data.age,
          phone: data.phone,
          programId: program.id,
          comment: data.comment ?? null,
          status: "NEW",
        },
      });

      return { id: created.id, source: "prisma" as const };
    } catch (error) {
      reportFallback("Prisma application save failed; falling back to local storage", error);
    }
  }

  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data: created, error } = await supabase
        .from("medrese2")
        .insert([
          {
            name: data.name,
            age: data.age,
            phone: data.phone,
            program: data.program,
            comment: data.comment ?? null,
          },
        ])
        .select("id")
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return { id: created.id, source: "supabase" as const };
    } catch (error) {
      reportFallback("Supabase application save failed; falling back to local storage", error);
    }
  }

  developmentInbox.push(data);
  return { id: `local-${developmentInbox.length}`, source: "local" as const };
}

export async function listApplications() {
  if (process.env.DATABASE_URL && db && isPrismaReady()) {
    try {
      const items = await db.application.findMany({
        orderBy: { createdAt: "desc" },
        include: { program: true },
      });

      return items.map((item) => ({
        id: item.id,
        name: item.name,
        age: item.age,
        phone: item.phone,
        program: item.program?.title ?? "Без программы",
        comment: item.comment,
        created_at: item.createdAt.toISOString(),
      }));
    } catch (error) {
      reportFallback("Prisma application listing failed; returning empty list", error);
      return [];
    }
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("medrese2")
      .select("id, name, age, phone, program, comment, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []).map((item) => ({
      id: item.id,
      name: item.name,
      age: item.age,
      phone: item.phone,
      program: item.program,
      comment: item.comment,
      created_at: item.created_at,
    }));
  } catch (error) {
    reportFallback("Supabase application listing failed; returning empty list", error);
    return [];
  }
}
