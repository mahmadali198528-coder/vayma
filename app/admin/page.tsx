import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, isAdminAuthenticatedToken } from "@/lib/auth/admin";
import { listStudents } from "@/services/student-service";

const items = [
  { label: "Главная", href: "/admin" },
  { label: "Заявки", href: "/admin/applications" },
  { label: "Ученики", href: "/admin/students" },
  { label: "Новости", href: "/admin" },
  { label: "Настройки", href: "/admin" },
];

export default async function Admin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!isAdminAuthenticatedToken(token)) {
    redirect("/admin/login");
  }

  const students = listStudents();
  const activeStudents = students.filter((item) => item.status === "ACTIVE").length;

  return (
    <div className="container grid gap-6 py-10 md:grid-cols-[230px_1fr]">
      <aside className="card">
        <b>Администрирование</b>
        <nav className="mt-4 grid gap-2 text-sm">
          {items.map((item) => (
            <a key={item.label} href={item.href} className="text-[var(--muted)] hover:text-[var(--foreground)]">
              {item.label}
            </a>
          ))}
        </nav>

        <form action="/api/admin/logout" method="post" className="mt-6">
          <button type="submit" className="btn btn-dark w-full">
            Выйти
          </button>
        </form>
      </aside>

      <section>
        <p className="eyebrow">Dashboard</p>
        <h1 className="title">Обзор платформы</h1>

        <div className="grid md:grid-cols-4">
          <div className="card">
            <b className="text-3xl text-[var(--accent)]">{students.length}</b>
            <p>Всего учеников</p>
          </div>
          <div className="card">
            <b className="text-3xl text-[var(--accent)]">{activeStudents}</b>
            <p>Активные</p>
          </div>
          <div className="card">
            <b className="text-3xl text-[var(--accent)]">{students.filter((item) => item.status === "INACTIVE").length}</b>
            <p>Неактивные</p>
          </div>
          <div className="card">
            <b className="text-3xl text-[var(--accent)]">{students.length}</b>
            <p>Зарегистрировано</p>
          </div>
        </div>

        <div className="card mt-8 overflow-hidden">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Список учеников</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] text-[var(--muted)]">
                  <th className="px-3 py-2">Имя</th>
                  <th className="px-3 py-2">Email</th>
                  <th className="px-3 py-2">Телефон</th>
                  <th className="px-3 py-2">Код</th>
                  <th className="px-3 py-2">Статус</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-3 py-6 text-[var(--muted)]">
                      Пока никто не зарегистрировался.
                    </td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr key={student.id} className="border-b border-[var(--border)]">
                      <td className="px-3 py-2">{student.fullName}</td>
                      <td className="px-3 py-2">{student.email}</td>
                      <td className="px-3 py-2">{student.phone}</td>
                      <td className="px-3 py-2">{student.code}</td>
                      <td className="px-3 py-2">{student.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
