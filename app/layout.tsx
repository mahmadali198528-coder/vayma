import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: { default: "Медресе Таштан ажы", template: "%s | Медресе Таштан ажы" },
	description: "Официальный сайт медресе Таштан ажы в селе Беловодск, Кыргызстан.",
	keywords: ["медресе", "Таштан ажы", "Кыргызстан", "арабский язык"],
	openGraph: {
		type: "website",
		title: "Медресе Таштан ажы",
		description: "Знания. Воспитание. Традиция. Будущее.",
		url: siteUrl,
		siteName: "Медресе Таштан ажы",
		locale: "ru_RU",
		alternateLocale: ["ky"],
	},
	alternates: {
		canonical: siteUrl,
		languages: {
			ru: siteUrl,
			ky: `${siteUrl}/ky`,
		},
	},
	twitter: {
		card: "summary_large_image",
		title: "Медресе Таштан ажы",
		description: "Знания. Воспитание. Традиция. Будущее.",
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ru" dir="ltr">
			<body>
				<a className="skip-link" href="#content">Перейти к содержанию</a>
				<SiteHeader />
				<main id="content">{children}</main>
				<SiteFooter />
			</body>
		</html>
	);
}
