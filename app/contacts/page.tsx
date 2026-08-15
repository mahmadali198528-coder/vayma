import { PageHero } from "@/components/page-hero";
import { getLocale, translations } from "@/lib/i18n";

export default async function Contacts({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }> | { lang?: string };
}) {
  const params = await Promise.resolve(searchParams ?? {});
  const lang = getLocale(params.lang);
  const t = translations[lang].contacts;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <section className="section">
        <div className="container grid gap-6 md:grid-cols-2">
          <article className="card">
            <h2 className="text-2xl font-bold">{t.cardTitle}</h2>
            <p>
              {t.address}
              <br />
              {t.address2}
            </p>
            <p>
              <a className="font-bold text-[var(--secondary)]" href="tel:+996507688006">
                +996 507 688 006
              </a>
            </p>
            <p>
              <a className="font-bold text-[var(--secondary)]" href="https://wa.me/996507688006">
                {t.writeWhatsapp}
              </a>
            </p>
            <p>{t.workHours}</p>
          </article>

          <div className="card grid min-h-72 place-items-center bg-[#dce8e0] text-center text-sm font-bold text-[var(--muted)]">
            {t.mapLabel}
            <br />
            {t.mapAddress}
          </div>
        </div>
      </section>
    </>
  );
}
