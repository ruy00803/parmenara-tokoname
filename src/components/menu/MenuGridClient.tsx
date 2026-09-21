"use client";

import { useState } from "react";
import { MenuItem, toppingsPasta, toppingsPizza, frittaSets, Category } from "@/data/menuItems";

// トッピング名の多言語マッピング
const TOPPING_NAMES: Record<string, Record<string, string>> = {
  "モッツァレラトッピング":           { en: "Mozzarella Topping",            ko: "모차렐라 토핑",      zh: "马苏里拉配料" },
  "3種きのこトッピング":             { en: "3 Mushroom Topping",             ko: "3종 버섯 토핑",     zh: "三种菇类配料" },
  "博多明太子トッピング":             { en: "Hakata Mentaiko Topping",        ko: "하카타 명란 토핑",   zh: "博多明太子配料" },
  "青唐辛子とチリペッパートッピング":  { en: "Green Chili & Chili Pepper",     ko: "청고추 & 칠리페퍼", zh: "青辣椒辣椒配料" },
  "チーズトッピング":                { en: "Cheese Topping",                 ko: "치즈 토핑",         zh: "芝士配料" },
};

function getTopName(name: string, lang: string): string {
  if (lang === "ja") return name;
  return TOPPING_NAMES[name]?.[lang] ?? name;
}
import MenuCard from "./MenuCard";

type Lang = "ja" | "en" | "ko" | "zh";

const CATEGORIES: { key: Category | "all"; label: Record<Lang, string> }[] = [
  { key: "all",    label: { ja: "すべて",   en: "All",    ko: "전체",   zh: "全部"   } },
  { key: "pasta",  label: { ja: "パスタ",   en: "Pasta",  ko: "파스타", zh: "意面"   } },
  { key: "pizza",  label: { ja: "ピッツァ", en: "Pizza",  ko: "피자",   zh: "披萨"   } },
  { key: "fritta", label: { ja: "フリッタ", en: "Fritta", ko: "프리타", zh: "油炸披萨"} },
  { key: "set",    label: { ja: "セット",   en: "Sets",   ko: "세트",   zh: "套餐"   } },
  { key: "drink",  label: { ja: "ドリンク", en: "Drinks", ko: "음료",   zh: "饮料"   } },
];

const SECTION_TITLES: Record<Lang, Record<string, string>> = {
  ja: {
    topping:     "トッピング",
    toppingNote: "パスタ・ピッツァに追加できます",
    frittaSet:   "フリッタまとめ買いセット（テイクアウト専用）",
    eatIn:       "イートイン",
    to:          "テイクアウト",
    count:       "個セット",
    noodle:      "麺オプション",
    noodleExtra: "麺やや多め 無料 ／ 麺2倍 +¥150（税込）",
    noItems:     "このカテゴリの商品はありません。",
  },
  en: {
    topping:     "Toppings",
    toppingNote: "Can be added to pasta & pizza",
    frittaSet:   "Fritta Bundle Sets (Takeout only)",
    eatIn:       "Eat-in",
    to:          "Takeout",
    count:       "-piece set",
    noodle:      "Noodle Options",
    noodleExtra: "Extra noodles free / Double noodles +¥150",
    noItems:     "No items in this category.",
  },
  ko: {
    topping:     "토핑",
    toppingNote: "파스타·피자에 추가 가능",
    frittaSet:   "프리타 묶음 세트（테이크아웃 전용）",
    eatIn:       "매장",
    to:          "테이크아웃",
    count:       "개 세트",
    noodle:      "면 옵션",
    noodleExtra: "면 조금 더 무료 / 면 2배 +¥150",
    noItems:     "이 카테고리에 상품이 없습니다.",
  },
  zh: {
    topping:     "追加配料",
    toppingNote: "可加入意面·披萨",
    frittaSet:   "油炸披萨组合（外带专用）",
    eatIn:       "堂食",
    to:          "外带",
    count:       "个套餐",
    noodle:      "面条选项",
    noodleExtra: "面条稍多免费 / 双倍面条 +¥150",
    noItems:     "该分类暂无商品。",
  },
};

interface MenuGridClientProps {
  items: MenuItem[];
  lang?: Lang;
}

export default function MenuGridClient({ items, lang = "ja" }: MenuGridClientProps) {
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const t = SECTION_TITLES[lang];

  const filtered =
    activeCategory === "all"
      ? items.filter((i) => i.available)
      : items.filter((i) => i.available && i.category === activeCategory);

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-8">

      {/* カテゴリタブ */}
      <div className="flex overflow-x-auto gap-2 pb-2 mb-6 scrollbar-hide">
        {CATEGORIES.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
              activeCategory === key
                ? "bg-red-600 text-white shadow"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            {label[lang]}
          </button>
        ))}
      </div>

      {/* 麺オプション */}
      {(activeCategory === "pasta" || activeCategory === "all") && (
        <div className="mb-4 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
          <span className="font-bold">{t.noodle}：</span>{t.noodleExtra}
        </div>
      )}

      {/* メニューグリッド */}
      {filtered.length === 0 ? (
        <p className="text-center text-stone-400 py-16">{t.noItems}</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <MenuCard key={item.id} item={item} lang={lang} />
          ))}
        </div>
      )}

      {/* トッピング一覧（パスタ用） */}
      {(activeCategory === "all" || activeCategory === "pasta") && (
        <div className="mt-10">
          <h3 className="text-base font-bold text-stone-700 mb-1">
            {lang === "ja" ? "パスタ用トッピング" : lang === "en" ? "Pasta Toppings" : lang === "ko" ? "파스타 토핑" : "意面配料"}
          </h3>
          <p className="text-xs text-stone-400 mb-3">{t.toppingNote}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-stone-100 text-stone-600 text-xs">
                  <th className="text-left px-3 py-2 font-semibold rounded-tl-lg">
                    {lang === "ja" ? "トッピング名" : lang === "en" ? "Topping" : lang === "ko" ? "토핑명" : "配料名"}
                  </th>
                  <th className="text-center px-3 py-2 font-semibold">{t.eatIn}</th>
                  <th className="text-center px-3 py-2 font-semibold rounded-tr-lg">{t.to}</th>
                </tr>
              </thead>
              <tbody>
                {toppingsPasta.map((top, i) => (
                  <tr key={top.name} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                    <td className="px-3 py-2 text-stone-700">{getTopName(top.name, lang)}</td>
                    <td className="px-3 py-2 text-center text-stone-600">+¥{top.priceEatIn}</td>
                    <td className="px-3 py-2 text-center text-stone-600">+¥{top.priceTO}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* トッピング一覧（ピッツァ用） */}
      {(activeCategory === "all" || activeCategory === "pizza") && (
        <div className="mt-6">
          <h3 className="text-base font-bold text-stone-700 mb-1">
            {lang === "ja" ? "ピッツァ用トッピング" : lang === "en" ? "Pizza Toppings" : lang === "ko" ? "피자 토핑" : "披萨配料"}
          </h3>
          <p className="text-xs text-stone-400 mb-3">{t.toppingNote}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-stone-100 text-stone-600 text-xs">
                  <th className="text-left px-3 py-2 font-semibold rounded-tl-lg">
                    {lang === "ja" ? "トッピング名" : lang === "en" ? "Topping" : lang === "ko" ? "토핑명" : "配料名"}
                  </th>
                  <th className="text-center px-3 py-2 font-semibold">{t.eatIn}</th>
                  <th className="text-center px-3 py-2 font-semibold rounded-tr-lg">{t.to}</th>
                </tr>
              </thead>
              <tbody>
                {toppingsPizza.map((top, i) => (
                  <tr key={top.name} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                    <td className="px-3 py-2 text-stone-700">{getTopName(top.name, lang)}</td>
                    <td className="px-3 py-2 text-center text-stone-600">+¥{top.priceEatIn}</td>
                    <td className="px-3 py-2 text-center text-stone-600">+¥{top.priceTO}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* フリッタまとめ買いセット */}
      {(activeCategory === "all" || activeCategory === "fritta") && (
        <div className="mt-8">
          <h3 className="text-base font-bold text-stone-700 mb-3">{t.frittaSet}</h3>
          <div className="flex flex-wrap gap-3">
            {frittaSets.map(({ count, price }) => (
              <div
                key={count}
                className="flex flex-col items-center justify-center bg-orange-50 border border-orange-200 rounded-xl px-6 py-4 min-w-[100px]"
              >
                <span className="text-2xl font-extrabold text-orange-600">{count}</span>
                <span className="text-xs text-stone-500">{t.count}</span>
                <span className="text-lg font-bold text-stone-800 mt-1">¥{price.toLocaleString()}</span>
                <span className="text-[10px] text-stone-400">{lang === "ja" ? "税込" : lang === "ko" ? "세금포함" : lang === "zh" ? "含税" : "tax incl."}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-stone-400 mt-2">
            {lang === "ja" ? "※お持ち帰りは包装代として1品あたり¥10いただきます。" :
             lang === "en" ? "※Takeout packaging fee: ¥10 per item." :
             lang === "ko" ? "※테이크아웃 포장비: 1개당 ¥10." :
             "※外带包装费：每件¥10。"}
          </p>
        </div>
      )}
    </section>
  );
}
