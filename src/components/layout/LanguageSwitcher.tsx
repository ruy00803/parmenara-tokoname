"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/request";

const labels: Record<Locale, string> = {
  ja: "日本語", en: "English", ko: "한국어", zh: "简体中文",
};

export default function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  return (
    <div className="max-w-6xl mx-auto px-4 flex gap-0 text-xs">
      {locales.map((locale) => (
        <Link key={locale} href={pathname} locale={locale}
          aria-label={labels[locale]} aria-current={locale === lang ? "true" : undefined}
          className={`px-4 py-2 font-medium transition-colors ${locale === lang ? "bg-red-600 text-white" : "text-stone-400 hover:text-white hover:bg-stone-700"}`}>
          {labels[locale]}
        </Link>
      ))}
    </div>
  );
}
