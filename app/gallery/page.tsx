import { PageHero } from "@/components/page-hero";
import { getLocale, translations } from "@/lib/i18n";

export default async function Gallery({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }> | { lang?: string };
}) {
  const params = await Promise.resolve(searchParams ?? {});
  const lang = getLocale(params.lang);
  const t = translations[lang].gallery;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <section className="section">
        <div className="container grid grid-cols-2 md:grid-cols-3">
          {t.labels.map((label) => (
            <div key={label} className="card grid h-52 place-items-center bg-[#dce8e0] text-center text-sm font-bold text-[var(--muted)]">
              {t.photo}
              <br />
              {label}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
