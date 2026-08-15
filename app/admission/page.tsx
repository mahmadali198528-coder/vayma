import { PageHero } from "@/components/page-hero";
import { ApplicationForm } from "@/components/application-form";
import { getLocale, translations } from "@/lib/i18n";

export default async function Admission({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }> | { lang?: string };
}) {
  const params = await Promise.resolve(searchParams ?? {});
  const lang = getLocale(params.lang);
  const t = translations[lang].admission;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <section className="section">
        <div className="container">
          <div className="grid mb-10 md:grid-cols-4">
            {t.steps.map((item, index) => (
              <div className="card" key={item}>
                <b className="text-3xl text-[var(--accent)]">0{index + 1}</b>
                <p className="font-bold">{item}</p>
              </div>
            ))}
          </div>
          <h2 className="title">{t.formTitle}</h2>
          <ApplicationForm />
        </div>
      </section>
    </>
  );
}
