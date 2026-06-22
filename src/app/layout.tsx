import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "パルメナーラ イオンモール常滑店",
  description: "自家製生パスタ・ピッツァ・フリッタのイタリアンレストラン。愛知県常滑市イオンモール常滑内。",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} font-sans antialiased bg-[#faf8f5]`}>
        {children}
      </body>
    </html>
  );
}
