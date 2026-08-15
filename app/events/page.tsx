import { PageHero } from "@/components/page-hero";
import { getLocale, translations } from "@/lib/i18n";

export default async function Events({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const lang = getLocale(params.lang);
  const t = translations[lang].events;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <section className="section">
        <div className="container grid gap-5">
          <article className="card">
            <p className="eyebrow">12 сентября 2026 · Беловодск</p>
            <h2 className="mt-3 text-2xl font-bold">{t.openDay}</h2>
            <p>
              Для родителей и будущих студентов будет организован день знакомства с программами обучения,
              преподавателями и условиями поступления. Приглашаем всех заинтересованных.
            </p>
          </article>

          <article className="card">
            <p className="eyebrow">20 октября 2026 · Медресе</p>
            <h2 className="mt-3 text-2xl font-bold">{t.seminar}</h2>
            <p>
              Встреча с наставниками и родителями будет посвящена вопросам ответственности, дисциплины,
              духовного роста и семейного воспитания.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
