"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import LanguageSwitcher from "./language-switcher";

const navItems = [
  { href: "/about", ru: "О медресе", ky: "Медресе жөнүндө" },
  { href: "/education", ru: "Обучение", ky: "Окуу" },
  { href: "/admission", ru: "Поступление", ky: "Тиркемелер" },
  { href: "/teachers", ru: "Преподаватели", ky: "Мугалимдер" },
  { href: "/schedule", ru: "Расписание", ky: "Жоспор" },
  { href: "/news", ru: "Новости", ky: "Жаңылыктар" },
  { href: "/contacts", ru: "Контакты", ky: "Байланыш" },
] as const;

function withLang(href: string, searchParams: URLSearchParams, locale: "ru" | "ky") {
  const params = new URLSearchParams(searchParams.toString());

  if (locale === "ru") {
    params.delete("lang");
  } else {
    params.set("lang", locale);
  }

  const queryString = params.toString();
  return `${href}${queryString ? `?${queryString}` : ""}`;
}

export function SiteHeader() {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const locale = searchParams?.get("lang") === "ky" ? "ky" : "ru";

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur">
      <nav className="container flex min-h-16 items-center justify-between gap-4" aria-label="Основная навигация">
        <Link href={withLang("/", new URLSearchParams(searchParams?.toString() ?? ""), locale)} className="font-bold text-[var(--primary)]">◒ <span>Медресе Таштан ажы</span></Link>

        <div className="hidden items-center gap-4 text-xs font-bold lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={withLang(item.href, new URLSearchParams(searchParams?.toString() ?? ""), locale)}
              className="hover:text-[var(--secondary)]"
            >
              {locale === "ky" ? item.ky : item.ru}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link href={withLang("/admission", new URLSearchParams(searchParams?.toString() ?? ""), locale)} className="btn btn-dark text-sm">
            {locale === "ky" ? "Тиркеме" : "Подать заявку"}
          </Link>
        </div>
      </nav>
    </header>
  );
}
