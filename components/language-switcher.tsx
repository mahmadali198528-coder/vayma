"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

function buildLocaleHref(pathname: string, searchParams: URLSearchParams, locale: "ru" | "ky") {
  const cleanPath = pathname.startsWith("/ky") ? pathname.replace(/^\/ky/, "") || "/" : pathname;
  const params = new URLSearchParams(searchParams.toString());

  if (locale === "ru") {
    params.delete("lang");
  } else {
    params.set("lang", locale);
  }

  const queryString = params.toString();
  return `${cleanPath}${queryString ? `?${queryString}` : ""}`;
}

export default function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const current = searchParams?.get("lang") === "ky" ? "ky" : "ru";
  const locales = [
    { code: "ru", label: "Рус" },
    { code: "ky", label: "Кыргыз" },
  ] as const;

  return (
    <div className="flex items-center gap-2">
      {locales.map((l) => (
        <Link
          key={l.code}
          href={buildLocaleHref(pathname, new URLSearchParams(searchParams?.toString() ?? ""), l.code)}
          className={`px-2 py-1 rounded text-xs font-bold ${current === l.code ? "bg-[var(--primary)] text-white" : "hover:bg-[var(--background)]"}`}
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}
