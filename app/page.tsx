import Link from "next/link";
import { programs, news } from "@/data/public";
import { getLocale, translations } from "@/lib/i18n";

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const lang = getLocale(params.lang);
  const t = translations[lang];

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow eyebrow-light">{t.home.eyebrow}</span>
            <h1>{lang === "ky" ? "Таштан ажы медресеси" : "Медресе Таштан ажы"}</h1>
            <p>{t.home.description}</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href={`/admission?lang=${lang}`}>
                {t.home.ctaPrimary}
              </Link>
              <Link className="btn btn-light-outline" href={`/education?lang=${lang}`}>
                {t.home.ctaSecondary}
              </Link>
            </div>
            <div className="hero-meta">
              <div>
                <strong>12+</strong>
                <span>{lang === "ky" ? "Окуу программалары" : "Программ обучения"}</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>{lang === "ky" ? "Тәрбия жана дисциплина" : "Воспитание и дисциплина"}</span>
              </div>
            </div>
          </div>

          <div className="hero-panel">
            <div className="hero-card">
              <span className="mini-tag">{lang === "ky" ? "Биздин миссия" : "Наша миссия"}</span>
              <h3>{lang === "ky" ? "Билим, тартип, негиз" : "Знания, дисциплина, основа"}</h3>
              <ul>
                <li>{lang === "ky" ? "Куран окуу жана тажвид" : "Чтение Корана и таджвид"}</li>
                <li>{lang === "ky" ? "Ислам билимдери" : "Основы ислама"}</li>
                <li>{lang === "ky" ? "Нравственное воспитание" : "Нравственное воспитание"}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">{t.home.sectionEducation}</span>
            <h2 className="title">{t.home.sectionEducationTitle}</h2>
          </div>
          <div className="program-grid">
            {programs.map((p) => (
              <article className="program-card" key={p.title}>
                <div className="program-topline">
                  <span className="program-badge">{p.age}</span>
                  <span className="program-badge muted">{p.duration}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="program-meta">
                  <span>{p.format}</span>
                  <span>{p.teacher}</span>
                </div>
                <Link href={`/education?lang=${lang}`}>{t.home.readMore}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">{t.home.sectionAdmission}</span>
            <h2 className="title">{t.home.sectionAdmissionTitle}</h2>
          </div>
          <div className="steps-grid">
            {t.home.applySteps.map((s, i) => (
              <div className="step-card" key={s}>
                <b>0{i + 1}</b>
                <p>{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">{t.home.sectionNews}</span>
            <h2 className="title">{t.home.sectionNewsTitle}</h2>
          </div>
          <div className="news-grid">
            {news.map((n) => (
              <article className="news-card" key={n.slug}>
                <p className="news-meta">{n.publishedAt} · {n.category}</p>
                <h3>{n.title}</h3>
                <p>{n.excerpt}</p>
                <Link href={`/news/${n.slug}?lang=${lang}`}>{t.news.readMore}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
