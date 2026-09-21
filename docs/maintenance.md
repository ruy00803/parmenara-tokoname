# 更新・運用ガイド

## 更新箇所

| 更新内容 | ファイル・設定先 |
|---|---|
| 静的メニュー・価格・商品名・説明 | `src/data/menuItems.ts` |
| トップページの店舗情報・紹介文 | `src/app/[lang]/page.tsx` |
| メニューページの見出し・注意書き | `src/app/[lang]/menu/page.tsx` |
| カテゴリ・トッピング表示の翻訳 | `src/components/menu/MenuGridClient.tsx` |
| 商品カードの表示 | `src/components/menu/MenuCard.tsx` |
| ナビゲーション・フッター | `src/components/layout/LangLayoutIntl.tsx` |
| next-intl用メッセージ | `messages/ja.json`、`en.json`、`ko.json`、`zh.json` |
| 商品画像 | `public/images/menu/` |
| 店舗写真 | `public/images/store.jpg` |

翻訳は `messages/` だけでなく、ページやコンポーネント内にも定義されています。変更時は日本語・英語・韓国語・中国語の表示を確認してください。

## メニューの更新

`src/data/menuItems.ts` の商品名・説明・価格・画像パスを編集します。商品名と説明は4言語分を更新してください。`available` がfalseの商品はメニュー一覧に表示しません。

メニューページでは `MenuGrid.tsx` が静的データを `MenuGridClient.tsx` に渡します。トップページの人気メニューも同じデータを参照し、表示対象はトップページ内の `FEATURED_IDS` で指定しています。

トッピングとフリッタのセット情報も `src/data/menuItems.ts` で管理します。変更を公開するには、更新したコードをデプロイしてください。環境変数の設定は不要です。

## 画像の更新

商品画像を `public/images/menu/` に配置し、メニューデータの `image` に `/images/menu/ファイル名` を指定します。

## 動作確認

```bash
npm run type-check
npm run build
```

4言語のトップ・メニュー、言語切替、カテゴリ切替、価格と画像、スマートフォン表示を確認します。

## Vercelでの公開

リポジトリをVercelに接続し、Next.jsプロジェクトとして設定します。自動デプロイの対象ブランチと有効・無効はVercelのプロジェクト設定で確認してください。

リポジトリに登録されているWebサイトURL： https://parmenara-tokoname.vercel.app
