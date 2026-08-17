"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
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
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur">
      <nav className="container site-nav" aria-label="Основная навигация">
        <Link href={withLang("/", new URLSearchParams(searchParams?.toString() ?? ""), locale)} className="brand-mark">
          <span className="brand-icon">◒</span>
          <span>Медресе Таштан ажы</span>
        </Link>

        <div className="desktop-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={withLang(item.href, new URLSearchParams(searchParams?.toString() ?? ""), locale)}
              className={pathname === item.href ? "nav-link active" : "nav-link"}
            >
              {locale === "ky" ? item.ky : item.ru}
            </Link>
          ))}
        </div>

        <div className="header-actions">
          <div className="desktop-language">
            <LanguageSwitcher />
          </div>
          <Link href={withLang("/admission", new URLSearchParams(searchParams?.toString() ?? ""), locale)} className="btn btn-dark header-cta">
            {locale === "ky" ? "Тиркеме" : "Подать заявку"}
          </Link>
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={withLang(item.href, new URLSearchParams(searchParams?.toString() ?? ""), locale)}
              className="mobile-link"
              onClick={() => setMobileOpen(false)}
            >
              {locale === "ky" ? item.ky : item.ru}
            </Link>
          ))}
          <div className="mobile-language">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
