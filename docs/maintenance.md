# 更新・運用ガイド

## 更新箇所

| 更新内容 | ファイル・設定先 |
|---|---|
| 静的メニュー・価格・商品名・説明 | `src/data/menuItems.ts` |
| メニューページの商品情報（CMS使用時） | microCMSの `menu` API |
| トップページの店舗情報・紹介文 | `src/app/[lang]/page.tsx` |
| メニューページの見出し・注意書き | `src/app/[lang]/menu/page.tsx` |
| カテゴリ・トッピング表示の翻訳 | `src/components/menu/MenuGridClient.tsx` |
| 商品カードの表示 | `src/components/menu/MenuCard.tsx` |
| ナビゲーション・フッター | `src/components/layout/LangLayoutIntl.tsx` |
| next-intl用メッセージ | `messages/ja.json`、`en.json`、`ko.json`、`zh.json` |
| 商品画像 | `public/images/menu/` |
| 店舗写真 | `public/images/store.jpg` |

翻訳は `messages/` だけでなく、ページやコンポーネント内にも定義されています。変更時は日本語・英語・韓国語・中国語の表示を確認してください。

## microCMSの設定

```bash
cp .env.example .env.local
```

`.env.local` に利用するサービスの値を設定します。

```dotenv
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

- サービスドメインには `https://` や `.microcms.io` を含めず、サービス名の部分を設定します。
- CMSを使わない場合は両項目を空欄にするか、`.env.local` を作成せず起動します。
- `.env.local` はGitの管理対象外です。APIキーをコードやREADMEへ記載しないでください。
- 必要なレスポンス形式は `src/types/microcms.ts`、変換処理は `src/lib/microcms.ts` にあります。CMS側の設定はこれらと合わせる必要があります。

### メニュー取得の流れ

`src/app/[lang]/menu/page.tsx` → `MenuGrid.tsx` → `getMenuItemsWithFallback()` → `MenuGridClient.tsx`

環境変数が設定されている場合、`menu` APIから最大100件を取得します。取得には60秒の再検証設定があります。未設定または取得失敗時は `src/data/menuItems.ts` を使用します。`available` がfalseの商品は一覧に表示しません。

トップページの人気メニュー、トッピング、フリッタのセット情報は静的データを使います。CMSでの商品更新とあわせて、必要に応じて静的データも変更してください。

### CMS拡張時の確認点

- `store`・`events`・`notices` は取得関数と型定義のみで、現在のページからは呼び出していません。
- `category` は現在の変換処理では `{ fieldId: string }[]` を想定しています。CMS側の実際のレスポンスとの整合性を確認してください。
- 店舗情報・イベント・お知らせの取得関数には、メニューのような静的データへの切替処理はありません。画面接続時に未設定・取得失敗・データなしの場合の表示を設計してください。

## 画像の更新

商品画像を `public/images/menu/` に配置し、メニューデータの `image` に `/images/menu/ファイル名` を指定します。CMS画像は `images.microcms-assets.io` が許可されています。

## 動作確認

```bash
npm run type-check
npm run build
```

4言語のトップ・メニュー、言語切替、カテゴリ切替、価格と画像、スマートフォン表示を確認します。CMSを利用する場合は取得成功時と静的データへの切替時の両方を確認します。

## Vercelでの公開

リポジトリをVercelに接続し、Next.jsプロジェクトとして設定します。CMSを使用する場合は、Vercel側にも同じ環境変数を登録します。自動デプロイの対象ブランチと有効・無効はVercelのプロジェクト設定で確認してください。

リポジトリに登録されているWebサイトURL： https://parmenara-tokoname.vercel.app
