// CMS連携版 MenuGrid ラッパー
// サーバーサイドでメニューデータを取得し、クライアントGridへ渡す

import { getMenuItemsWithFallback } from "@/lib/microcms";
import MenuGridClient from "./MenuGridClient";

type Lang = "ja" | "en" | "ko" | "zh";

interface MenuGridProps {
  lang?: Lang;
}

export default async function MenuGrid({ lang = "ja" }: MenuGridProps) {
  // CMSまたは静的データからメニューを取得（ISR: 60秒）
  const items = await getMenuItemsWithFallback();

  return <MenuGridClient items={items} lang={lang} />;
}
