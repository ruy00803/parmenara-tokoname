import { menuItems } from "@/data/menuItems";
import MenuGridClient from "./MenuGridClient";

type Lang = "ja" | "en" | "ko" | "zh";

interface MenuGridProps {
  lang?: Lang;
}

export default function MenuGrid({ lang = "ja" }: MenuGridProps) {
  return <MenuGridClient items={menuItems} lang={lang} />;
}
