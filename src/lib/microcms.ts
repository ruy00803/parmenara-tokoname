import {
  CMSMenuItem,
  CMSStoreInfo,
  CMSEvent,
  CMSNotice,
  MicroCMSListResponse,
} from "@/types/microcms";
import { MenuItem, Category, Badge } from "@/data/menuItems";

// ─────────────────────────────────────────────
// 設定
// ─────────────────────────────────────────────
const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN ?? "";
const API_KEY        = process.env.MICROCMS_API_KEY ?? "";

if (!SERVICE_DOMAIN || !API_KEY) {
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "MICROCMS_SERVICE_DOMAIN と MICROCMS_API_KEY を環境変数に設定してください。"
    );
  }
}

const BASE_URL = `https://${SERVICE_DOMAIN}.microcms.io/api/v1`;

// ─────────────────────────────────────────────
// 汎用フェッチ
// ─────────────────────────────────────────────
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit & { next?: NextFetchRequestConfig } = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    headers: {
      "X-MICROCMS-API-KEY": API_KEY,
      "Content-Type": "application/json",
    },
    // ISR: 60秒ごとに再検証
    next: { revalidate: 60, ...options.next },
    ...options,
  });

  if (!res.ok) {
    throw new Error(
      `microCMS fetch failed: ${endpoint} → ${res.status} ${res.statusText}`
    );
  }
  return res.json() as Promise<T>;
}

// ─────────────────────────────────────────────
// メニュー取得
// ─────────────────────────────────────────────
export async function getMenuItems(): Promise<MenuItem[]> {
  const data = await fetchAPI<MicroCMSListResponse<CMSMenuItem>>(
    "menu?limit=100&orders=createdAt"
  );
  return data.contents.map(cmsToMenuItem);
}

export async function getMenuItemsByCategory(category: Category): Promise<MenuItem[]> {
  const data = await fetchAPI<MicroCMSListResponse<CMSMenuItem>>(
    `menu?limit=100&filters=category[equals]${category}&orders=createdAt`
  );
  return data.contents.map(cmsToMenuItem);
}

// ─────────────────────────────────────────────
// 店舗情報取得（シングルコンテンツ想定）
// ─────────────────────────────────────────────
export async function getStoreInfo(): Promise<CMSStoreInfo> {
  return fetchAPI<CMSStoreInfo>("store");
}

// ─────────────────────────────────────────────
// イベント取得（active=true のみ）
// ─────────────────────────────────────────────
export async function getActiveEvents(): Promise<CMSEvent[]> {
  const data = await fetchAPI<MicroCMSListResponse<CMSEvent>>(
    "events?filters=active[equals]true&orders=-startDate&limit=5"
  );
  return data.contents;
}

// ─────────────────────────────────────────────
// お知らせ取得
// ─────────────────────────────────────────────
export async function getNotices(): Promise<CMSNotice[]> {
  const data = await fetchAPI<MicroCMSListResponse<CMSNotice>>(
    "notices?filters=active[equals]true&orders=-createdAt&limit=5"
  );
  return data.contents;
}

// ─────────────────────────────────────────────
// CMS → アプリ型変換
// ─────────────────────────────────────────────
function cmsToMenuItem(cms: CMSMenuItem): MenuItem {
  // バッジ配列をキャスト
  const badges = (cms.badges ?? []) as Badge[];

  // サイズ展開
  const sizes =
    cms.sizeMLabel
      ? [
          { label: cms.sizeMLabel, price: cms.sizeMPrice ?? 0 },
          ...(cms.sizeLLabel
            ? [{ label: cms.sizeLLabel, price: cms.sizeLPrice ?? 0 }]
            : []),
        ]
      : undefined;

  return {
    id:             cms.id,
    name:           cms.name,
    nameEn:         cms.nameEn,
    nameKo:         cms.nameKo,
    nameZh:         cms.nameZh,
    category:       (cms.category?.[0]?.fieldId ?? "pasta") as Category,
    price:          cms.price,
    priceTO:        cms.priceTO ?? null,
    description:    cms.description,
    descriptionEn:  cms.descriptionEn,
    descriptionKo:  cms.descriptionKo,
    descriptionZh:  cms.descriptionZh,
    // CMS画像があればそちらを優先、なければ静的パスへフォールバック
    image:          cms.image?.url ?? `/images/menu/${cms.id}.png`,
    takeout:        cms.takeout ?? false,
    badges,
    available:      cms.available ?? true,
    sizes,
  };
}

// ─────────────────────────────────────────────
// フォールバック付きデータ取得
// （CMSが未設定の場合は静的データを返す）
// ─────────────────────────────────────────────
export async function getMenuItemsWithFallback(): Promise<MenuItem[]> {
  // CMS未設定（開発環境）は静的データを使用
  if (!SERVICE_DOMAIN || !API_KEY) {
    const { menuItems } = await import("@/data/menuItems");
    return menuItems;
  }
  try {
    return await getMenuItems();
  } catch (err) {
    console.warn("[CMS] フォールバック: 静的データを使用します", err);
    const { menuItems } = await import("@/data/menuItems");
    return menuItems;
  }
}
