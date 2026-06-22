# パルメナーラ イオンモール常滑店 公式サイト

**Parmenara Aeon Mall Tokoname** の公式ホームページ。  
自家製生パスタ・ピッツァ・フリッタの4言語対応レストランサイトです。

---

## 技術スタック

| 項目 | 技術 |
|---|---|
| フレームワーク | Next.js 15 (App Router) |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS |
| 多言語対応 | next-intl |
| CMS | microCMS（フォールバック：静的データ） |
| ホスティング | Vercel |
| リポジトリ | GitHub |

---

## 対応言語・URL

| 言語 | トップ | メニュー |
|---|---|---|
| 日本語 | `/ja` | `/ja/menu` |
| English | `/en` | `/en/menu` |
| 한국어 | `/ko` | `/ko/menu` |
| 简体中文 | `/zh` | `/zh/menu` |

---

## ディレクトリ構成

```
parmenara/
├── messages/               # 多言語テキスト
│   ├── ja.json
│   ├── en.json
│   ├── ko.json
│   └── zh.json
├── public/
│   ├── images/
│   │   ├── menu/           # 商品画像（英語スラグ）
│   │   ├── store/          # 店舗写真
│   │   └── events/         # イベント画像
│   └── qr/                 # 多言語メニューQRコード
│       ├── qr-ja.png
│       ├── qr-en.png
│       ├── qr-ko.png
│       └── qr-zh.png
├── src/
│   ├── app/
│   │   ├── layout.tsx      # ルートレイアウト
│   │   ├── page.tsx        # / → /ja リダイレクト
│   │   └── [lang]/
│   │       ├── layout.tsx  # 言語別レイアウト（ナビ・フッター）
│   │       ├── page.tsx    # トップページ
│   │       └── menu/
│   │           └── page.tsx # メニューページ
│   ├── components/
│   │   ├── layout/
│   │   │   └── LangLayoutIntl.tsx
│   │   └── menu/
│   │       ├── MenuCard.tsx
│   │       ├── MenuGrid.tsx
│   │       ├── MenuGridClient.tsx
│   │       └── MenuGridServer.tsx
│   ├── data/
│   │   └── menuItems.ts    # 静的メニューデータ（CMSフォールバック）
│   ├── i18n/
│   │   ├── request.ts
│   │   └── navigation.ts
│   ├── lib/
│   │   └── microcms.ts     # CMS連携
│   └── types/
│       └── microcms.ts     # CMS型定義
├── docs/
│   └── microcms-schema.md  # CMSスキーマ設計書
├── middleware.ts            # next-intl ルーティング
├── next.config.ts
├── .env.example
├── .env.local              # ← GitHubにpushしない（.gitignore済み）
└── .gitignore
```

---

## セットアップ手順

### 1. リポジトリをクローン

```bash
git clone https://github.com/YOUR_USERNAME/parmenara-tokoname.git
cd parmenara-tokoname
```

### 2. 依存パッケージをインストール

```bash
npm install
# または
yarn install
```

必要なパッケージ一覧：

```bash
npm install next react react-dom typescript
npm install next-intl
npm install tailwindcss postcss autoprefixer
npm install @types/node @types/react @types/react-dom
```

### 3. 環境変数を設定

`.env.example` をコピーして `.env.local` を作成：

```bash
cp .env.example .env.local
```

`.env.local` を編集：

```env
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

> **注意：** microCMS未設定でも静的データでサイトは動作します。

### 4. 開発サーバーを起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開く（自動的に `/ja` へリダイレクト）。

---

## 商品画像の配置方法

`public/images/menu/` に以下のファイル名で画像を配置してください。

### 画像ファイル名一覧（英語スラグ）

#### パスタ
| 元ファイル名 | 配置ファイル名 |
|---|---|
| トマトモッツァ.png | `tomato-mozzarella.png` |
| こぼれベーコン.png | `kobore-bacon-parmenara.png` |
| ツナとキノコ.png | `tuna-mushroom-mentaiko.png` |
| 定番ベーコン.png | `bacon-mushroom-parmenara.png` |
| トマトなーら.png | `creamy-tomato-nara.png` |
| にんにくトマト.png | `spicy-garlic-tomato.png` |
| しらすねぎ.png | `shirasu-peperoncino.png` |
| エビとイカ.png | `ebi-ika-peperoncino.png` |

#### ピッツァ
| 元ファイル名 | 配置ファイル名 |
|---|---|
| ハーフ_ハーフ.png | `half-and-half-pizza.png` |
| マルゲリータ.png | `italian-tomato-margherita.png` |
| きのこピザ.png | `three-mushroom-cream-pizza.png` |
| ソーセージベーコン.png | `sausage-bacon-pizza.png` |
| コーンのクリームピッツァ.png | `corn-cream-pizza.png` |
| 白雪はちみつ.png | `shirayuki-honey.png` |

#### フリッタ
| 元ファイル名 | 配置ファイル名 |
|---|---|
| 梅ささみ.PNG | `ume-sasami-fritta.png` |
| アップル.PNG | `apple-fritta.png` |
| てりたま.PNG | `teriyaki-egg-fritta.png` |
| シャカイモ.PNG | `jaga-mentai-fritta.png` ※フリッタ.jpg代用 |

#### セット
| 元ファイル名 | 配置ファイル名 |
|---|---|
| ポテトセット.png | `potato-set.png` |
| サラダセット.png | `salad-set.png` |
| バケットセット.png | `baguette-tower-set.png` |
| キッズセット.png | `kids-set.png` |

> ドリンク（`drink-placeholder.png`）は後から差し替えてください。

---

## QRコードの生成・配置

各言語メニューページへのQRコードを生成し、`public/qr/` に配置してください。

| ファイル名 | URL |
|---|---|
| `qr-ja.png` | `https://your-domain.com/ja/menu` |
| `qr-en.png` | `https://your-domain.com/en/menu` |
| `qr-ko.png` | `https://your-domain.com/ko/menu` |
| `qr-zh.png` | `https://your-domain.com/zh/menu` |

**QRコード生成ツール（無料）：**
- [QR Code Generator](https://www.qr-code-generator.com/)
- [goqr.me](https://goqr.me/)

---

## GitHubへのpush手順

### 初回

```bash
# リポジトリを初期化（新規の場合）
git init
git add .
git commit -m "initial commit"

# GitHubにリポジトリを作成後
git remote add origin https://github.com/YOUR_USERNAME/parmenara-tokoname.git
git branch -M main
git push -u origin main
```

### 2回目以降

```bash
git add .
git commit -m "更新内容を記載"
git push origin main
```

> **⚠️ 必ず確認：** `.env.local` がpushされていないことを確認してください。

---

## Vercelへのデプロイ手順

### 1. Vercelアカウント作成・ログイン

https://vercel.com にアクセスし、GitHubアカウントでログイン。

### 2. プロジェクトをインポート

1. Vercelダッシュボードで「Add New → Project」
2. GitHubリポジトリ `parmenara-tokoname` を選択
3. 「Import」をクリック

### 3. 環境変数を設定

「Environment Variables」セクションで以下を追加：

| Name | Value |
|---|---|
| `MICROCMS_SERVICE_DOMAIN` | your-service-domain |
| `MICROCMS_API_KEY` | your-api-key |

> microCMS未設定の場合は追加不要（静的データで動作）。

### 4. デプロイ

「Deploy」ボタンをクリック。  
数分後に `https://parmenara-tokoname.vercel.app` で公開されます。

### 5. カスタムドメインの設定（任意）

Vercelダッシュボード → Settings → Domains で独自ドメインを設定できます。

---

## mainブランチへのpushで自動デプロイ

GitHubの `main` ブランチにpushすると、Vercelが自動的にビルド・デプロイを実行します。

```bash
git push origin main  # → Vercelが自動デプロイ
```

---

## microCMS連携手順

詳細は `docs/microcms-schema.md` を参照してください。

### 簡易手順

1. [microCMS](https://microcms.io/) にアカウントを作成
2. 新しいサービスを作成
3. `docs/microcms-schema.md` のスキーマ通りにAPIを作成：
   - `menu`（リスト形式）
   - `store`（オブジェクト形式）
   - `events`（リスト形式）
   - `notices`（リスト形式）
4. APIキーを取得し `.env.local` に設定
5. Vercelの環境変数にも同じ値を設定
6. 初期データを `src/data/menuItems.ts` を参考に入力

---

## CMSで更新できる項目

| 項目 | 更新方法 |
|---|---|
| 商品名・価格・説明（4言語） | microCMS `menu` API |
| 商品画像 | microCMS `menu` API の画像フィールド |
| テイクアウト可否 | microCMS `menu` API |
| バッジ（人気NO.1 / 名物 / 定番） | microCMS `menu` API |
| 販売中 / 販売停止 | microCMS `menu` API の `available` フィールド |
| 営業時間・店舗情報 | microCMS `store` API |
| 期間限定・イベント情報 | microCMS `events` API |
| お知らせ | microCMS `notices` API |

---

## 注意事項

- `.env.local` は絶対にGitHubにpushしないでください
- 日本語ファイル名の画像は英語スラグにリネームしてから `public/images/menu/` に配置してください
- `じゃが明太` の個別画像がない場合は `フリッタ.jpg`（全体メニュー画像）を `jaga-mentai-fritta.png` としてコピーして使用してください
- ドリンクは画像なし（テキストのみ）での掲載です。後から画像を追加する場合は `drink-placeholder.png` を差し替えてください

---

## ライセンス

このリポジトリはパルメナーラ イオンモール常滑店の内部利用を目的としています。
