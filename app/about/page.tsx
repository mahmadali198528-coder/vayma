import { PageHero } from "@/components/page-hero";
import { getLocale, translations } from "@/lib/i18n";

export default async function About({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const lang = getLocale(params.lang);
  const t = translations[lang].about;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <section className="section">
        <div className="container grid gap-5 md:grid-cols-2">
          <article className="card">
            <h2 className="text-2xl font-bold">{t.history}</h2>
            <p>{t.historyText}</p>
          </article>

          <article className="card">
            <h2 className="text-2xl font-bold">{t.method}</h2>
            <p>{t.methodText}</p>
          </article>
        </div>
      </section>

      <section className="section bg-[#f7f3e9]">
        <div className="container">
          <h2 className="title">{t.valuesTitle}</h2>
          <div className="grid md:grid-cols-3">
            {t.values.map((value) => (
              <article className="card" key={value}>
                <h3 className="text-xl font-bold">{value}</h3>
                <p className="text-sm text-[var(--muted)]">{t.valuesText}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
