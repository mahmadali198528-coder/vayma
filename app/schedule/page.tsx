import { PageHero } from "@/components/page-hero";
import { getLocale, translations } from "@/lib/i18n";

export default async function Schedule({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const lang = getLocale(params.lang);
  const t = translations[lang].schedule;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <section className="section">
        <div className="container">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{t.day}</th>
                  <th>{t.time}</th>
                  <th>{t.subject}</th>
                  <th>{t.group}</th>
                  <th>{t.teacher}</th>
                  <th>{t.room}</th>
                </tr>
              </thead>
              <tbody>
                {[t.monday, t.wednesday, t.friday].map((day) => (
                  <tr key={day}>
                    <td>{day}</td>
                    <td>—</td>
                    <td>{t.placeholder}</td>
                    <td>[Группа]</td>
                    <td>[Преподаватель]</td>
                    <td>{t.room}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
