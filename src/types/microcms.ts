// ─────────────────────────────────────────────
// microCMS レスポンス型定義
// ─────────────────────────────────────────────

export interface MicroCMSImage {
  url: string;
  height: number;
  width: number;
}

export interface MicroCMSBase {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

// ── メニューアイテム ──────────────────────────
export interface CMSMenuItem extends MicroCMSBase {
  name: string;
  nameEn: string;
  nameKo: string;
  nameZh: string;
  category: { fieldId: string }[];   // セレクトフィールド
  price: number;
  priceTO: number | null;
  description: string;
  descriptionEn: string;
  descriptionKo: string;
  descriptionZh: string;
  image: MicroCMSImage | null;
  takeout: boolean;
  badges: string[];                  // 複数チェックボックス
  available: boolean;
  sizeMLabel?: string;
  sizeMPrice?: number;
  sizeLLabel?: string;
  sizeLPrice?: number;
}

// ── 店舗情報 ─────────────────────────────────
export interface CMSStoreInfo extends MicroCMSBase {
  name: string;
  address: string;
  hours: string;
  holiday: string;
  access: string;
  tel: string;
  instagramUrl: string;
  googleMapsUrl: string;
  googleMapsEmbed: string;  // iframe src
}

// ── イベント情報 ──────────────────────────────
export interface CMSEvent extends MicroCMSBase {
  title: string;
  titleEn: string;
  titleKo: string;
  titleZh: string;
  description: string;
  descriptionEn: string;
  descriptionKo: string;
  descriptionZh: string;
  image: MicroCMSImage | null;
  startDate: string;
  endDate: string;
  active: boolean;
}

// ── お知らせ ──────────────────────────────────
export interface CMSNotice extends MicroCMSBase {
  title: string;
  body: string;
  active: boolean;
}

// microCMS リスト取得レスポンス
export interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}
