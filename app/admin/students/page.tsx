import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { deleteStudentAction, generateStudentRegistrationCode } from "@/actions/student-management";
import { ADMIN_COOKIE_NAME, isAdminAuthenticatedToken } from "@/lib/auth/admin";
import { listRegistrationCodes, listStudents } from "@/services/student-service";

export default async function AdminStudentsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!isAdminAuthenticatedToken(token)) {
    redirect("/admin/login");
  }

  const rows = listStudents();
  const registrationCodes = listRegistrationCodes();

  return (
    <main className="container py-10">
      <p className="eyebrow">Администрирование</p>
      <h1 className="title">Студенты</h1>

      <div className="card mb-6">
        <h2 className="mb-4 text-xl font-bold">Создать код регистрации</h2>
        <form action={generateStudentRegistrationCode} className="grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            type="text"
            name="studentName"
            required
            placeholder="Имя нового ученика"
            className="rounded-xl border border-[var(--border)] bg-white p-3"
          />
          <button type="submit" className="btn btn-primary">
            Создать код
          </button>
        </form>

        {registrationCodes.length > 0 ? (
          <div className="mt-4 grid gap-2">
            {registrationCodes.slice(0, 6).map((code) => (
              <div key={code.code} className="rounded-xl border border-[var(--border)] bg-[#f8faf7] p-3 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold text-[var(--primary)]">{code.studentName}</span>
                  <span className="rounded-full bg-[var(--primary)] px-2 py-1 text-xs text-white">
                    {code.used ? "Использован" : "Активен"}
                  </span>
                </div>
                <div className="mt-2 text-[var(--muted)]">Код: {code.code}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-[var(--muted)]">Коды ещё не создавались.</p>
        )}
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--muted)]">
                <th className="px-3 py-2">Имя</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Телефон</th>
                <th className="px-3 py-2">Код</th>
                <th className="px-3 py-2">Статус</th>
                <th className="px-3 py-2">Дата</th>
                <th className="px-3 py-2">Действия</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-3 py-6 text-[var(--muted)]">
                    Пока никто не зарегистрировался.
                  </td>
                </tr>
              ) : (
                rows.map((student) => (
                  <tr key={student.id} className="border-b border-[var(--border)] align-top">
                    <td className="px-3 py-2">{student.fullName}</td>
                    <td className="px-3 py-2">{student.email}</td>
                    <td className="px-3 py-2">{student.phone}</td>
                    <td className="px-3 py-2">{student.code}</td>
                    <td className="px-3 py-2">{student.status}</td>
                    <td className="px-3 py-2">{new Date(student.createdAt).toLocaleString("ru-RU")}</td>
                    <td className="px-3 py-2">
                      <form action={deleteStudentAction}>
                        <input type="hidden" name="id" value={student.id} />
                        <button type="submit" className="btn btn-dark text-xs">
                          Удалить
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
