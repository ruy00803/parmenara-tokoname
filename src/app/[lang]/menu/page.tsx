import { Metadata } from "next";
import MenuGrid from "@/components/menu/MenuGrid";

type Lang = "ja" | "en" | "ko" | "zh";

const VALID_LANGS: Lang[] = ["ja", "en", "ko", "zh"];

// ─── 静的パラメータ生成 ───────────────────────
export function generateStaticParams() {
  return VALID_LANGS.map((lang) => ({ lang }));
}

// ─── メタデータ ───────────────────────────────
const META: Record<Lang, { title: string; description: string }> = {
  ja: {
    title: "メニュー | パルメナーラ イオンモール常滑店",
    description: "自家製生パスタ・ピッツァ・フリッタなど、パルメナーラ イオンモール常滑店の全メニューをご覧いただけます。",
  },
  en: {
    title: "Menu | Parmenara Aeon Mall Tokoname",
    description: "Browse the full menu of Parmenara Aeon Mall Tokoname — fresh pasta, pizza, fritta and more.",
  },
  ko: {
    title: "메뉴 | 파르메나라 이온몰 도코나메점",
    description: "파르메나라 이온몰 도코나메점의 전체 메뉴를 확인하세요.",
  },
  zh: {
    title: "菜单 | 帕尔梅纳拉 永旺购物中心常滑店",
    description: "查看帕尔梅纳拉永旺购物中心常滑店的完整菜单。",
  },
};

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang = (VALID_LANGS.includes(params.lang as Lang) ? params.lang : "ja") as Lang;
  return {
    title: META[lang].title,
    description: META[lang].description,
    alternates: {
      languages: {
        ja: "/ja/menu",
        en: "/en/menu",
        ko: "/ko/menu",
        zh: "/zh/menu",
      },
    },
  };
}

// ─── ページ見出しテキスト ─────────────────────
const HEADINGS: Record<Lang, { title: string; subtitle: string; note: string }> = {
  ja: {
    title: "メニュー",
    subtitle: "自家製生パスタ・ピッツァ・フリッタ",
    note: "表示価格はすべて税込です。写真はイメージです。",
  },
  en: {
    title: "Menu",
    subtitle: "Fresh Pasta · Pizza · Fritta",
    note: "All prices include tax. Photos are for reference only.",
  },
  ko: {
    title: "메뉴",
    subtitle: "수제 생파스타 · 피자 · 프리타",
    note: "표시 가격은 모두 세금 포함입니다. 사진은 이미지입니다.",
  },
  zh: {
    title: "菜单",
    subtitle: "自制生意面 · 披萨 · 油炸披萨",
    note: "所有价格均含税。图片仅供参考。",
  },
};

// ─── テイクアウト注意書き ─────────────────────
const TO_NOTES: Record<Lang, string> = {
  ja: "テイクアウトの場合、容器代¥40（税込）が別途かかります。TAKE OUT OKマークの商品のみお持ち帰り可能です。",
  en: "Takeout orders include a container fee of ¥40 (tax incl.). Only items marked TAKE OUT OK are available for takeout.",
  ko: "테이크아웃의 경우 용기 대금 ¥40(세금 포함)이 별도로 부과됩니다. TAKE OUT OK 표시 상품만 포장 가능합니다.",
  zh: "外带需另收容器费¥40（含税）。仅标有TAKE OUT OK的商品可外带。",
};

// ─── ページ本体 ───────────────────────────────
export default async function MenuPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langParam } = await params;
  const lang = (VALID_LANGS.includes(langParam as Lang) ? langParam : "ja") as Lang;
  const h = HEADINGS[lang];

  return (
    <main className="min-h-screen bg-[#faf8f5]">

      {/* ── ページヘッダー ── */}
      <header className="bg-white border-b border-stone-200 py-8 px-4 text-center">
        <p className="text-xs font-semibold tracking-widest text-red-600 uppercase mb-1">
          Parmenara Aeon Mall Tokoname
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-800 mb-1">
          {h.title}
        </h1>
        <p className="text-sm text-stone-500">{h.subtitle}</p>
      </header>

      {/* ── 言語切替バー ── */}
      <nav className="bg-stone-800 text-white">
        <div className="max-w-6xl mx-auto px-4 flex gap-0 text-sm">
          {(["ja", "en", "ko", "zh"] as Lang[]).map((l) => (
            <a
              key={l}
              href={`/${l}/menu`}
              className={`px-4 py-3 font-medium transition-colors ${
                l === lang
                  ? "bg-red-600 text-white"
                  : "text-stone-300 hover:text-white hover:bg-stone-700"
              }`}
            >
              {l === "ja" ? "日本語" : l === "en" ? "English" : l === "ko" ? "한국어" : "简体中文"}
            </a>
          ))}
        </div>
      </nav>

      {/* ── テイクアウト注意書き ── */}
      <div className="max-w-6xl mx-auto px-4 mt-4">
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-xs text-amber-800">
          {TO_NOTES[lang]}
        </div>
      </div>

      {/* ── メニューグリッド ── */}
      <MenuGrid lang={lang} />

      {/* ── フッター注記 ── */}
      <footer className="max-w-6xl mx-auto px-4 pb-12 text-center">
        <p className="text-xs text-stone-400">{h.note}</p>
      </footer>
    </main>
  );
}
