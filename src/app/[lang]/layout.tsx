import Document from "@/components/layout/Document";
export { metadata } from "@/components/layout/Document";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { locales, type Locale } from "@/i18n/request";
import LangLayoutIntl from "@/components/layout/LangLayoutIntl";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (locales.includes(lang as Locale) ? lang : "ja") as Locale;
  const messages = await getMessages({ locale });

  return (
    <Document locale={locale}>
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LangLayoutIntl lang={locale}>
        {children}
      </LangLayoutIntl>
    </NextIntlClientProvider>
    </Document>
  );
}
