import { PageHero } from "@/components/page-hero";
import { programs } from "@/data/public";
import Link from "next/link";
import { getLocale, translations } from "@/lib/i18n";

export default async function Education({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }> | { lang?: string };
}) {
  const params = await Promise.resolve(searchParams ?? {});
  const lang = getLocale(params.lang);
  const t = translations[lang].education;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <section className="section">
        <div className="container grid md:grid-cols-3">
          {programs.map((p) => (
            <article className="card" key={p.title}>
              <p className="eyebrow">{t.mainProgram}</p>
              <h2 className="mt-2 text-2xl font-bold">{p.title}</h2>
              <p className="text-[var(--muted)]">{p.description}</p>
              <dl className="mt-5 grid gap-2 text-sm">
                <div>
                  <b>{t.age}</b> {p.age}
                </div>
                <div>
                  <b>{t.duration}</b> {p.duration}
                </div>
                <div>
                  <b>{t.format}</b> {p.format}
                </div>
                <div>
                  <b>{t.teacher}</b> {p.teacher}
                </div>
              </dl>
              <Link className="btn btn-dark mt-5" href={`/admission?lang=${lang}`}>
                {t.more}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
