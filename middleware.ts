import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./src/i18n/request";

export default createMiddleware({
  // サポートする言語
  locales,
  // デフォルト言語（/にアクセスしたとき/jaへ）
  defaultLocale,
  // URLにロケールを常に含める（/ja, /en, /ko, /zh）
  localePrefix: "always",
});

export const config = {
  // /_next/ や /api/ などは除外
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|qr).*)"],
};
