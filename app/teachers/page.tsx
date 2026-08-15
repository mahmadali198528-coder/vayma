import { PageHero } from "@/components/page-hero";
import { getLocale, translations } from "@/lib/i18n";

const teachers = [
  ["Бахадыр устаз", "Коран и таджвид"],
  ["Тир дамла", "Фикх и акида"],
  ["Малавидин устаз", "Иджаза"],
  ["Ибрагим дамла", "Основы ислама"],
];

export default async function Teachers({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const lang = getLocale(params.lang);
  const t = translations[lang].teachers;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <section className="section">
        <div className="container grid md:grid-cols-3">
          {teachers.map(([name, subject]) => (
            <article className="card" key={name}>
              <div className="grid h-48 place-items-center rounded-lg bg-[#dce8e0] text-xs font-bold text-[var(--muted)]">
                {t.cardLabel}
              </div>
              <h2 className="mt-4 text-xl font-bold">{name}</h2>
              <p className="text-sm">{t.role} {subject}</p>
              <p className="text-sm text-[var(--muted)]">{t.shortBio}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
