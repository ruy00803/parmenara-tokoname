import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { storeInfo } from "@/data/storeInfo";
import { type Locale } from "@/i18n/request";

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
        <div className="max-w-6xl mx-auto px-3 sm:px-4 flex items-center justify-between h-14 gap-2">
          <Link href="/" className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-base sm:text-xl font-extrabold tracking-tight text-stone-800 whitespace-nowrap">
              PARMENARA
            </span>
            <span className="hidden md:block text-xs text-stone-400 font-medium whitespace-nowrap">
              Aeon Mall Tokoname
            </span>
          </Link>

          <ul className="flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm font-medium text-stone-600 flex-shrink-0">
            <li>
              <Link href="/" className="px-1.5 sm:px-3 py-2 rounded hover:text-red-600 transition-colors whitespace-nowrap">
                {t("home")}
              </Link>
            </li>
            <li>
              <Link
                href="/menu"
                className="px-1.5 sm:px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors whitespace-nowrap"
              >
                {t("menu")}
              </Link>
            </li>
            <li>
              <Link href="/#store" className="px-1.5 sm:px-3 py-2 rounded hover:text-red-600 transition-colors whitespace-nowrap">
                {t("store")}
              </Link>
            </li>
            <li>
              <a
                href="https://www.instagram.com/parmenara_tokoname/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-1.5 sm:px-3 py-2 rounded hover:text-red-600 transition-colors whitespace-nowrap"
              >
                {t("instagram")}
              </a>
            </li>
          </ul>
        </div>

        {/* 言語切替バー */}
        <div className="bg-stone-800">
          <LanguageSwitcher lang={lang} />
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
  const store = storeInfo[lang];
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
            <li className="whitespace-pre-line">{store.addressVal}</li>
            <li>{store.hoursVal}</li>
            <li><a href={`tel:${store.telVal}`}>TEL: {store.telVal}</a></li>
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
