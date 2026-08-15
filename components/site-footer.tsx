"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getLocale, translations } from "@/lib/i18n";

export function SiteFooter() {
  const searchParams = useSearchParams();
  const lang = getLocale(searchParams.get("lang"));
  const t = translations[lang].footer;

  return (
    <footer className="site-footer">
      <div className="container">
        <div>
          <b>{t.title}</b>
          <p className="mt-3 text-sm">{t.description}</p>
        </div>
        <div>
          <b>{t.nav}</b>
          <div className="mt-3 grid gap-2 text-sm">
            <Link href={`/about?lang=${lang}`}>{lang === "ky" ? "Медресе жөнүндө" : "О медресе"}</Link>
            <Link href={`/education?lang=${lang}`}>{lang === "ky" ? "Окуу" : "Программы"}</Link>
            <Link href={`/admission?lang=${lang}`}>{lang === "ky" ? "Тиркемелер" : "Поступление"}</Link>
          </div>
        </div>
        <div>
          <b>{t.contacts}</b>
          <p className="mt-3 text-sm">
            +996 507 688 006
            <br />
            ул. Ишанкулова Момуна, 33
            <br />
            {lang === "ky" ? "Беловодск айыл, Кыргызстан" : "село Беловодск, Кыргызстан"}
          </p>
        </div>
      </div>
      <div className="container copyright">{t.rights}</div>
    </footer>
  );
}
