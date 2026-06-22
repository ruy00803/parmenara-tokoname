"use client";

import Image from "next/image";
import { MenuItem } from "@/data/menuItems";

// ─── バッジの色マッピング ─────────────────────
const BADGE_STYLES: Record<string, string> = {
  "人気NO.1":             "bg-red-600 text-white",
  "名物":                 "bg-orange-500 text-white",
  "定番":                 "bg-green-700 text-white",
  "ペペロンチーノ":       "bg-red-500 text-white",
  "イタリア産トマト使用": "bg-red-100 text-red-700 border border-red-300",
  "愛され続けて30年":     "bg-amber-100 text-amber-800 border border-amber-300",
  "新登場":               "bg-yellow-400 text-yellow-900",
  "シナモン＆カスタード仕立て": "bg-amber-200 text-amber-900",
  "小学生までのお子様限定": "bg-blue-100 text-blue-700 border border-blue-300",
  "サクサク！":           "bg-orange-100 text-orange-700",
  "シャキッ！":           "bg-green-100 text-green-700",
  "サクふわっ！":         "bg-yellow-100 text-yellow-700",
  "名物（バケット）":     "bg-orange-500 text-white",
};

interface MenuCardProps {
  item: MenuItem;
  lang?: "ja" | "en" | "ko" | "zh";
}

function getLocalizedName(item: MenuItem, lang: MenuCardProps["lang"]) {
  switch (lang) {
    case "en": return item.nameEn;
    case "ko": return item.nameKo;
    case "zh": return item.nameZh;
    default:   return item.name;
  }
}

function getLocalizedDesc(item: MenuItem, lang: MenuCardProps["lang"]) {
  switch (lang) {
    case "en": return item.descriptionEn;
    case "ko": return item.descriptionKo;
    case "zh": return item.descriptionZh;
    default:   return item.description;
  }
}

export default function MenuCard({ item, lang = "ja" }: MenuCardProps) {
  const name = getLocalizedName(item, lang);
  const desc = getLocalizedDesc(item, lang);

  // 表示バッジ（最大2件）
  const visibleBadges = item.badges.slice(0, 2);

  return (
    <article className="group flex flex-col rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border border-stone-100">

      {/* ── 画像エリア（見切れ禁止・contain固定） ── */}
      <div className="relative w-full" style={{ paddingBottom: "100%" }}>
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={item.image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* TAKE OUT バッジ */}
        {item.takeout && (
          <span className="absolute bottom-2 right-2 bg-stone-700 text-white text-[10px] font-bold px-2 py-0.5 rounded">
            TAKE OUT OK
          </span>
        )}
      </div>

      {/* ── テキストエリア ── */}
      <div className="flex flex-col flex-1 p-3 gap-1.5">

        {/* バッジ行 */}
        {visibleBadges.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {visibleBadges.map((badge) => (
              <span
                key={badge}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${BADGE_STYLES[badge] ?? "bg-stone-200 text-stone-700"}`}
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* 商品名 */}
        <h3 className="text-sm font-bold text-stone-800 leading-snug line-clamp-2">
          {name}
        </h3>

        {/* 商品説明 */}
        <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 flex-1">
          {desc}
        </p>

        {/* 価格行 */}
        <div className="flex items-end justify-between mt-1 pt-1 border-t border-stone-100">
          <div>
            <span className="text-xs text-stone-400">
              {lang === "en" ? "Eat-in" : lang === "ko" ? "매장" : lang === "zh" ? "堂食" : "税込"}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold text-stone-800">
                ¥{item.price.toLocaleString()}
              </span>
              <span className="text-xs text-stone-400">
                {lang === "en" ? "(tax incl.)" : lang === "ko" ? "(세금포함)" : lang === "zh" ? "(含税)" : "（税込）"}
              </span>
            </div>
          </div>

          {/* テイクアウト価格（ある場合のみ） */}
          {item.priceTO && (
            <div className="text-right">
              <span className="text-xs text-stone-400">
                {lang === "en" ? "Takeout" : lang === "ko" ? "테이크아웃" : lang === "zh" ? "外带" : "テイクアウト"}
              </span>
              <div className="flex items-baseline gap-0.5 justify-end">
                <span className="text-sm font-bold text-amber-700">
                  ¥{item.priceTO.toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* サイズ展開（セットのみ） */}
        {item.sizes && item.sizes.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-0.5">
            {item.sizes.map((s) => (
              <span key={s.label} className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
                {s.label}：¥{s.price}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
