import { listApplications } from "@/services/application-service";

export default async function AdminApplicationsPage() {
  let rows: Awaited<ReturnType<typeof listApplications>> = [];

  try {
    rows = await listApplications();
  } catch (error) {
    return (
      <main className="container py-10">
        <p className="eyebrow">Заявки</p>
        <h1 className="title">Не удалось загрузить заявки</h1>
        <p className="lead">{error instanceof Error ? error.message : "Неизвестная ошибка"}</p>
      </main>
    );
  }

  return (
    <main className="container py-10">
      <p className="eyebrow">Администрирование</p>
      <h1 className="title">Заявки</h1>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--line)] text-[var(--muted)]">
                <th className="px-3 py-2">Имя</th>
                <th className="px-3 py-2">Возраст</th>
                <th className="px-3 py-2">Телефон</th>
                <th className="px-3 py-2">Направление</th>
                <th className="px-3 py-2">Комментарий</th>
                <th className="px-3 py-2">Дата</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => (
                <tr key={item.id} className="border-b border-[var(--line)] align-top">
                  <td className="px-3 py-2">{item.name}</td>
                  <td className="px-3 py-2">{item.age}</td>
                  <td className="px-3 py-2">{item.phone}</td>
                  <td className="px-3 py-2">{item.program}</td>
                  <td className="px-3 py-2">{item.comment ?? "—"}</td>
                  <td className="px-3 py-2">{new Date(item.created_at).toLocaleString("ru-RU")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
