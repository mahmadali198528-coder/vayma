import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, isAdminAuthenticatedToken } from "@/lib/auth/admin";
import { listStudents, deleteStudent } from "@/services/student-service";

export default async function AdminStudentsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!isAdminAuthenticatedToken(token)) {
    redirect("/admin/login");
  }

  const rows = listStudents();

  async function handleDelete(formData: FormData) {
    "use server";
    const id = String(formData.get("id") ?? "");
    deleteStudent(id);
  }

  return (
    <main className="container py-10">
      <p className="eyebrow">Администрирование</p>
      <h1 className="title">Студенты</h1>

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
              {rows.map((student) => (
                <tr key={student.id} className="border-b border-[var(--border)] align-top">
                  <td className="px-3 py-2">{student.fullName}</td>
                  <td className="px-3 py-2">{student.email}</td>
                  <td className="px-3 py-2">{student.phone}</td>
                  <td className="px-3 py-2">{student.code}</td>
                  <td className="px-3 py-2">{student.status}</td>
                  <td className="px-3 py-2">{new Date(student.createdAt).toLocaleString("ru-RU")}</td>
                  <td className="px-3 py-2">
                    <form action={handleDelete}>
                      <input type="hidden" name="id" value={student.id} />
                      <button type="submit" className="btn btn-dark text-xs">Удалить</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
