import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/request";

const LANG_LABELS: Record<Locale, string> = {
  ja: "日本語",
  en: "English",
  ko: "한국어",
  zh: "简体中文",
};

export default function LangLayoutIntl({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Locale;
}) {
  const t = useTranslations("nav");

  return (
    <>
      {/* ── グローバルナビ ── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight text-stone-800">
              PARMENARA
            </span>
            <span className="hidden sm:block text-xs text-stone-400 font-medium">
              Aeon Mall Tokoname
            </span>
          </Link>

          <ul className="flex items-center gap-1 text-sm font-medium text-stone-600">
            <li>
              <Link href="/" className="px-3 py-2 rounded hover:text-red-600 transition-colors">
                {t("home")}
              </Link>
            </li>
            <li>
              <Link
                href="/menu"
                className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                {t("menu")}
              </Link>
            </li>
            <li>
              <Link href="/#store" className="px-3 py-2 rounded hover:text-red-600 transition-colors">
                {t("store")}
              </Link>
            </li>
            <li>
              <a
                href="https://www.instagram.com/parmenara_tokoname/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded hover:text-red-600 transition-colors"
              >
                {t("instagram")}
              </a>
            </li>
          </ul>
        </div>

        {/* 言語切替バー */}
        <div className="bg-stone-800">
          <div className="max-w-6xl mx-auto px-4 flex gap-0 text-xs">
            {locales.map((l) => (
              <Link
                key={l}
                href="/"
                locale={l}
                className={`px-4 py-2 font-medium transition-colors ${
                  l === lang
                    ? "bg-red-600 text-white"
                    : "text-stone-400 hover:text-white hover:bg-stone-700"
                }`}
              >
                {LANG_LABELS[l]}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {children}

      {/* ── グローバルフッター ── */}
      <LangFooter lang={lang} />
    </>
  );
}

function LangFooter({ lang }: { lang: Locale }) {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-stone-800 text-stone-300 py-10 mt-16">
      <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-3 gap-8 text-sm">
        <div>
          <p className="text-white font-extrabold text-lg mb-2">PARMENARA</p>
          <p className="text-xs text-stone-400">{t("storeName")}</p>
        </div>
        <div>
          <p className="text-white font-semibold mb-2">{t("storeInfo")}</p>
          <ul className="space-y-1 text-xs text-stone-400">
            <li>〒479-0882 愛知県常滑市りんくう町2-20-3</li>
            <li>イオンモール常滑 2F フードコート内</li>
            <li>10:00〜21:00</li>
            <li>TEL: 0569-89-7317</li>
          </ul>
        </div>
        <div>
          <p className="text-white font-semibold mb-2">SNS</p>
          <a
            href="https://www.instagram.com/parmenara_tokoname/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-stone-400 hover:text-white transition-colors"
          >
            Instagram →
          </a>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-stone-500">
        {`© ${year} Parmenara Aeon Mall Tokoname. All rights reserved.`}
      </div>
    </footer>
  );
}
