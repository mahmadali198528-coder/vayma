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

  const strengths = [
    {
      title: lang === "ky" ? "Исламий билим" : "Исламские знания",
      text:
        lang === "ky"
          ? "Куран жана фикх, хадис жана акыида боюнча системалуу окуу."
          : "Систематическое изучение Корана, фикха, хадисов и акыиды.",
    },
    {
      title: lang === "ky" ? "Тәрбия" : "Воспитание",
      text:
        lang === "ky"
          ? "Мораль, дисциплина жана урматты жогорулатуу."
          : "Воспитание характера, дисциплины и уважения к традициям.",
    },
    {
      title: lang === "ky" ? "Индивидуалдык мамиле" : "Индивидуальный подход",
      text:
        lang === "ky"
          ? "Ар бир окуучу менен жеке мамиле, түзөтүү жана ыкма."
          : "Поддержка каждого ученика с учетом уровня и темпа обучения.",
    },
  ];

  const statCards = [
    { value: "12+", label: lang === "ky" ? "Окуу багыты" : "Программ обучения" },
    { value: "100%", label: lang === "ky" ? "Тәрбия жана тартип" : "Воспитание и дисциплина" },
    { value: "4.9/5", label: lang === "ky" ? "Студенттердин баасы" : "Оценка студентов" },
  ];

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

            <div className="hero-stats">
              {statCards.map((item) => (
                <div key={item.label} className="stat-card">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-panel">
            <div className="hero-card">
              <span className="mini-tag">{lang === "ky" ? "Биздин миссия" : "Наша миссия"}</span>
              <h3>{lang === "ky" ? "Билим, тартип, негиз" : "Знания, дисциплина, основа"}</h3>
              <ul className="feature-list">
                <li>{lang === "ky" ? "Куран окуу жана тажвид" : "Чтение Корана и таджвид"}</li>
                <li>{lang === "ky" ? "Ислам билимдери" : "Основы ислама"}</li>
                <li>{lang === "ky" ? "Нравственное воспитание" : "Нравственное воспитание"}</li>
              </ul>

              <div className="hero-panel-grid">
                <div>
                  <span>{lang === "ky" ? "Окуу күнү" : "Уроки"}</span>
                  <strong>5 / неделя</strong>
                </div>
                <div>
                  <span>{lang === "ky" ? "Группа" : "Группы"}</span>
                  <strong>Small</strong>
                </div>
              </div>
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

          <div className="feature-grid">
            {strengths.map((item) => (
              <article className="feature-card" key={item.title}>
                <div className="feature-icon">✦</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
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
                <p className="news-meta">
                  {n.publishedAt} · {n.category}
                </p>
                <h3>{n.title}</h3>
                <p>{n.excerpt}</p>
                <Link href={`/news/${n.slug}?lang=${lang}`}>{t.news.readMore}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1.3fr 0.9fr;
          gap: 2rem;
          align-items: center;
        }

        .hero-copy {
          position: relative;
          z-index: 1;
        }

        .eyebrow-light {
          color: #f7d7a6;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 2rem;
        }

        .btn-light-outline {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
          margin-top: 2rem;
          width: min(100%, 560px);
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(6px);
          border-radius: 1rem;
          padding: 1rem;
          display: grid;
          gap: 0.35rem;
        }

        .stat-card strong {
          font-size: clamp(1.4rem, 2vw, 2.2rem);
          color: white;
        }

        .stat-card span {
          color: rgba(255, 255, 255, 0.75);
          font-size: 0.9rem;
        }

        .hero-panel {
          display: flex;
          justify-content: center;
        }

        .hero-card {
          width: min(100%, 430px);
          background: rgba(8, 22, 18, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 1.5rem;
          padding: 1.5rem;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
        }

        .mini-tag {
          display: inline-block;
          padding: 0.35rem 0.7rem;
          border-radius: 999px;
          background: rgba(203, 166, 106, 0.12);
          color: #f5d7a2;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .hero-card h3 {
          margin: 1rem 0 0.8rem;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          line-height: 1.15;
          color: white;
        }

        .feature-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 0.8rem;
          color: rgba(255, 255, 255, 0.82);
        }

        .feature-list li {
          position: relative;
          padding-left: 1.2rem;
        }

        .feature-list li::before {
          content: "•";
          position: absolute;
          left: 0;
          color: #cba66a;
          font-size: 1.4rem;
        }

        .hero-panel-grid {
          margin-top: 1.5rem;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.75rem;
        }

        .hero-panel-grid div {
          padding: 0.85rem 1rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 0.9rem;
          display: grid;
          gap: 0.25rem;
        }

        .hero-panel-grid span {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.76rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .hero-panel-grid strong {
          color: white;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.25rem;
          margin-top: 2rem;
        }

        .feature-card {
          background: white;
          border: 1px solid var(--border);
          border-radius: 1.2rem;
          padding: 1.5rem;
          box-shadow: 0 18px 34px rgba(7, 59, 49, 0.05);
        }

        .feature-icon {
          width: 2.5rem;
          height: 2.5rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.8rem;
          background: rgba(203, 166, 106, 0.12);
          color: var(--primary);
          font-size: 1.1rem;
          margin-bottom: 0.8rem;
        }

        .feature-card h3 {
          margin: 0 0 0.7rem;
          color: var(--primary);
          font-size: 1.2rem;
        }

        .feature-card p {
          margin: 0;
          color: var(--muted);
          line-height: 1.7;
        }

        @media (max-width: 900px) {
          .hero-grid,
          .feature-grid,
          .program-grid,
          .news-grid,
          .steps-grid {
            grid-template-columns: 1fr;
          }
        }

         @media (max-width: 640px) {
           .hero {
             padding-top: 5rem;
             padding-bottom: 4rem;
           }

          .hero-stats {
            grid-template-columns: 1fr;
          }

          .hero-card {
            padding: 1.15rem;
          }

          .hero-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .btn {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
