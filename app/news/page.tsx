import { PageHero } from "@/components/page-hero";
import { news } from "@/data/public";
import Link from "next/link";
import { getLocale, translations } from "@/lib/i18n";

export const metadata = { title: "Новости" };

export default async function News({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const lang = getLocale(params.lang);
  const t = translations[lang].news;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <section className="section">
        <div className="container grid md:grid-cols-3">
          {news.map((item) => (
            <article className="card" key={item.slug}>
              <p className="eyebrow">
                {item.category} · {item.publishedAt}
              </p>
              <h2 className="mt-3 text-2xl font-bold">{item.title}</h2>
              <p className="text-[var(--muted)]">{item.excerpt}</p>
              <Link className="mt-5 inline-block font-bold text-[var(--secondary)]" href={`/news/${item.slug}?lang=${lang}`}>
                {t.readMore}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
