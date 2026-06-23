import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://parmenara-tokoname.vercel.app";
  const locales = ["ja", "en", "ko", "zh"];

  const routes: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: locale === "ja" ? 1 : 0.8,
    });
    routes.push({
      url: `${baseUrl}/${locale}/menu`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: locale === "ja" ? 0.9 : 0.7,
    });
  }

  return routes;
}
