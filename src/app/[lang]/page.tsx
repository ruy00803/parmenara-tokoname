import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { storeInfo } from "@/data/storeInfo";
import { menuItems } from "@/data/menuItems";

type Lang = "ja" | "en" | "ko" | "zh";
const VALID_LANGS: Lang[] = ["ja", "en", "ko", "zh"];

export function generateStaticParams() {
  return VALID_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale = VALID_LANGS.includes(lang as Lang) ? lang : "ja";
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("siteTitle"),
    description: t("siteDescription"),
    alternates: { languages: { ja: "/ja", en: "/en", ko: "/ko", zh: "/zh" } },
  };
}

const T: Record<Lang, {
  heroEyebrow: string; heroTitle: string; heroSub: string; heroCta: string;
  featuredTitle: string; featuredSub: string; viewAll: string;
  conceptTitle: string; conceptBody: string;
  frittaTitle: string; frittaBody: string; frittaCta: string;
  storeTitle: string; address: string; addressVal: string;
  hours: string; hoursVal: string; holiday: string; holidayVal: string;
  tel: string; telVal: string;
  access: string; accessVal: string; mapCta: string;
  instaTitle: string; instaSub: string; instaFollow: string;
  taxIncl: string;
}> = {
  ja: {
    heroEyebrow: "イオンモール常滑店", heroTitle: "パルメナーラ", heroSub: "もちもちの生パスタ、石窯仕込みの自家製ブレンド生地ピッツァ。\nイタリア産完熟トマトを使った一皿をどうぞ。", heroCta: "メニューを見る",
    featuredTitle: "人気メニュー", featuredSub: "お客様に選ばれ続ける定番・看板メニューをご紹介します。", viewAll: "全メニューを見る →",
    conceptTitle: "パルメナーラのこだわり", conceptBody: "毎日仕込む自家製生パスタは、もちもちとした食感が自慢。ピッツァは独自のブレンド生地で、外はカリッ、中はふわっと焼き上げています。イタリア産完熟トマトを贅沢に使ったソースは、素材の旨味を最大限に引き出しています。",
    frittaTitle: "新感覚！揚げピッツァフリッタ", frittaBody: "カリッと揚がった新食感のピッツァフリッタ。お持ち帰り・食べ歩きもできます。梅ササミ・照りたま・じゃが明太・アップル（新登場）の4種類。", frittaCta: "フリッタを見る",
    storeTitle: "店舗情報",
    address: "住所", addressVal: storeInfo.ja.addressVal,
    hours: "営業時間", hoursVal: storeInfo.ja.hoursVal,
    holiday: "定休日", holidayVal: "不定休（イオンモールに準ずる）",
    tel: "電話番号", telVal: storeInfo.ja.telVal,
    access: "アクセス", accessVal: "りんくう常滑駅より徒歩約5分",
    mapCta: "Google Mapで見る",
    instaTitle: "Instagram", instaSub: "最新情報・フードフォトはInstagramでチェック", instaFollow: "フォローする",
    taxIncl: "税込",
  },
  en: {
    heroEyebrow: "Aeon Mall Tokoname", heroTitle: "PARMENARA", heroSub: "Chewy handmade pasta & crispy pizza on our original blend dough.\nMade with Italian ripened tomatoes.", heroCta: "View Menu",
    featuredTitle: "Popular Items", featuredSub: "Our most-loved signature dishes.", viewAll: "View Full Menu →",
    conceptTitle: "Our Commitment", conceptBody: "Our fresh pasta is made in-house daily for a wonderfully chewy texture. The pizza dough is our proprietary blend — crispy on the outside, fluffy inside. We use premium Italian ripened tomatoes to bring out the best flavors.",
    frittaTitle: "New! Fried Pizza Fritta", frittaBody: "A brand-new crispy fried pizza experience. Great for takeout and eating on the go. Four flavors: Ume Chicken, Teriyaki Egg, Potato Mentaiko & Apple (new!).", frittaCta: "See Fritta Menu",
    storeTitle: "Store Information",
    address: "Address", addressVal: storeInfo.en.addressVal,
    hours: "Hours", hoursVal: storeInfo.en.hoursVal,
    holiday: "Closed", holidayVal: "Irregular (follows Aeon Mall schedule)",
    tel: "Phone", telVal: storeInfo.en.telVal,
    access: "Access", accessVal: "Approx. 5 min walk from Rinku-Tokoname Station.",
    mapCta: "Open in Google Maps",
    instaTitle: "Instagram", instaSub: "Follow us for the latest news and food photos", instaFollow: "Follow",
    taxIncl: "tax incl.",
  },
  ko: {
    heroEyebrow: "이온몰 도코나메점", heroTitle: "파르메나라", heroSub: "쫄깃한 수제 생파스타, 독자 블렌드 도우의 피자.\n이탈리아산 완숙 토마토로 만든 한 접시를 즐겨보세요.", heroCta: "메뉴 보기",
    featuredTitle: "인기 메뉴", featuredSub: "고객님께 꾸준히 사랑받는 대표 메뉴를 소개합니다.", viewAll: "전체 메뉴 보기 →",
    conceptTitle: "파르메나라의 고집", conceptBody: "매일 담아내는 수제 생파스타는 쫄깃한 식감이 자랑입니다. 피자는 독자 블렌드 도우로 겉은 바삭, 속은 폭신하게 구워냅니다. 이탈리아산 완숙 토마토를 듬뿍 사용한 소스로 재료의 맛을 최대한 끌어냈습니다.",
    frittaTitle: "새로운 식감! 튀김 피자 프리타", frittaBody: "바삭하게 튀긴 새로운 식감의 피자 프리타. 포장 및 길거리 취식도 가능합니다. 매실 닭가슴살·데리타마·감자 명란·애플(신메뉴) 4종류.", frittaCta: "프리타 메뉴 보기",
    storeTitle: "매장 정보",
    address: "주소", addressVal: storeInfo.ko.addressVal,
    hours: "영업시간", hoursVal: storeInfo.ko.hoursVal,
    holiday: "정기 휴무", holidayVal: "부정기 휴무（이온몰 기준）",
    tel: "전화번호", telVal: storeInfo.ko.telVal,
    access: "오시는 길", accessVal: "린쿠토코나메역에서 도보 약 5분",
    mapCta: "Google Map으로 보기",
    instaTitle: "Instagram", instaSub: "최신 소식과 푸드 사진은 인스타그램에서 확인", instaFollow: "팔로우하기",
    taxIncl: "세금포함",
  },
  zh: {
    heroEyebrow: "永旺购物中心常滑店", heroTitle: "帕尔梅纳拉", heroSub: "劲道手工生意面、外酥里嫩的自制混合面团披萨。\n使用意大利熟番茄精心制作。", heroCta: "查看菜单",
    featuredTitle: "人气菜单", featuredSub: "深受顾客喜爱的招牌菜品介绍。", viewAll: "查看全部菜单 →",
    conceptTitle: "帕尔梅纳拉的坚持", conceptBody: "每日现制的手工生意面，口感劲道是我们的骄傲。披萨采用独家混合面团，外酥里嫩。使用大量意大利熟番茄制成的酱汁，将食材的鲜味发挥到极致。",
    frittaTitle: "全新体验！油炸披萨", frittaBody: "酥脆油炸披萨带来全新口感体验。可外带、边走边吃。梅子鸡胸肉、照烧鸡蛋、土豆明太子、苹果（新品）共4种。", frittaCta: "查看油炸披萨菜单",
    storeTitle: "店铺信息",
    address: "地址", addressVal: storeInfo.zh.addressVal,
    hours: "营业时间", hoursVal: storeInfo.zh.hoursVal,
    holiday: "休息日", holidayVal: "不定期休息（随永旺商场）",
    tel: "电话", telVal: storeInfo.zh.telVal,
    access: "交通", accessVal: "从临空常滑站步行约5分钟",
    mapCta: "在Google Maps中查看",
    instaTitle: "Instagram", instaSub: "最新资讯与美食照片请关注Instagram", instaFollow: "关注",
    taxIncl: "含税",
  },
};

const FEATURED_IDS = ["tomato-mozzarella","kobore-bacon-parmenara","half-and-half-pizza","shirayuki-honey"];

export default async function TopPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langParam } = await params;
  const lang = (VALID_LANGS.includes(langParam as Lang) ? langParam : "ja") as Lang;
  const t = T[lang];
  const featured = FEATURED_IDS.map((id) => menuItems.find((m) => m.id === id && m.available)).filter(Boolean);
  const getName = (item: typeof menuItems[0]) => {
    switch (lang) { case "en": return item.nameEn; case "ko": return item.nameKo; case "zh": return item.nameZh; default: return item.name; }
  };

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative text-white overflow-hidden min-h-[520px] flex items-center">
        <div className="absolute inset-0">
          <Image src="/images/store.jpg" alt="パルメナーラ店舗" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
          <p className="text-xs font-bold tracking-widest text-red-400 uppercase mb-2">{t.heroEyebrow}</p>
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-3">{t.heroTitle}</h1>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed mb-8 max-w-md whitespace-pre-line">{t.heroSub}</p>
          <Link href={`/${lang}/menu`} className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-full transition-colors text-sm">{t.heroCta}</Link>
        </div>
      </section>

      {/* 人気メニュー */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="text-center mb-8">
          <p className="text-xs font-bold tracking-widest text-red-600 uppercase mb-1">Popular</p>
          <h2 className="text-2xl font-extrabold text-stone-800">{t.featuredTitle}</h2>
          <p className="text-sm text-stone-500 mt-1">{t.featuredSub}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {featured.map((item) => {
            if (!item) return null;
            return (
              <Link key={item.id} href={`/${lang}/menu`} className="group block rounded-2xl overflow-hidden bg-white shadow hover:shadow-lg transition-shadow border border-stone-100">
                <div className="relative w-full bg-[#fffaf3]" style={{ paddingBottom: "80%" }}>
                  <Image src={item.image} alt={getName(item)} fill sizes="(max-width:640px) 50vw, 25vw" className="object-contain p-2" />
                </div>
                <div className="p-3">
                  <p className="text-xs font-bold text-stone-700 leading-snug line-clamp-2 mb-1">{getName(item)}</p>
                  <p className="text-base font-extrabold text-stone-800">¥{item.price.toLocaleString()}<span className="text-xs font-normal text-stone-400 ml-1">{t.taxIncl}</span></p>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <Link href={`/${lang}/menu`} className="inline-block border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold px-8 py-3 rounded-full transition-colors text-sm">{t.viewAll}</Link>
        </div>
      </section>

      {/* こだわり */}
      <section className="bg-stone-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest text-red-400 uppercase mb-2">Our Story</p>
          <h2 className="text-2xl font-extrabold mb-4">{t.conceptTitle}</h2>
          <p className="text-sm text-stone-300 leading-relaxed">{t.conceptBody}</p>
        </div>
      </section>

      {/* フリッタ */}
      <section className="bg-orange-50 border-y border-orange-200 py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-8">
          <div className="relative w-full sm:w-64 h-48 flex-shrink-0 rounded-xl overflow-hidden bg-[#fffaf3]">
            <Image src="/images/menu/apple-fritta.png" alt={t.frittaTitle} fill className="object-contain p-3" />
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest text-orange-600 uppercase mb-1">Fritta</p>
            <h2 className="text-xl font-extrabold text-stone-800 mb-3">{t.frittaTitle}</h2>
            <p className="text-sm text-stone-600 leading-relaxed mb-4">{t.frittaBody}</p>
            <Link href={`/${lang}/menu`} className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-full transition-colors text-sm">{t.frittaCta}</Link>
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="max-w-6xl mx-auto px-4 py-14 text-center">
        <p className="text-xs font-bold tracking-widest text-red-600 uppercase mb-1">SNS</p>
        <h2 className="text-2xl font-extrabold text-stone-800 mb-1">{t.instaTitle}</h2>
        <p className="text-sm text-stone-500 mb-6">{t.instaSub}</p>
        <a href="https://www.instagram.com/parmenara_tokoname/" target="_blank" rel="noopener noreferrer" className="inline-block border-2 border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white font-bold px-8 py-3 rounded-full transition-colors text-sm">
          {t.instaFollow} @parmenara_tokoname
        </a>
      </section>

      {/* 店舗情報 */}
      <section id="store" className="bg-stone-50 border-t border-stone-200 py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-bold tracking-widest text-red-600 uppercase mb-1">Store</p>
            <h2 className="text-2xl font-extrabold text-stone-800">{t.storeTitle}</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-8 items-start">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-stone-200">
                {[
                  { label: t.address, val: t.addressVal },
                  { label: t.hours,   val: t.hoursVal },
                  { label: t.holiday, val: t.holidayVal },
                  { label: t.tel,     val: t.telVal },
                  { label: t.access,  val: t.accessVal },
                ].map(({ label, val }) => (
                  <tr key={label}>
                    <th className="py-3 pr-4 text-left font-bold text-stone-600 w-24 whitespace-nowrap align-top">{label}</th>
                    <td className="py-3 text-stone-700 whitespace-pre-line">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="rounded-xl overflow-hidden border border-stone-200 aspect-video bg-stone-200 flex flex-col items-center justify-center gap-3">
              <a href="https://maps.google.com/?q=パルメナーラ+イオンモール常滑" target="_blank" rel="noopener noreferrer" className="inline-block bg-stone-700 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-stone-800 transition-colors">{t.mapCta}</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
