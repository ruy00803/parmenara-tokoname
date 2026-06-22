export type Category = "pasta" | "pizza" | "fritta" | "set" | "drink" | "kids";

export type Badge =
  | "人気NO.1"
  | "名物"
  | "定番"
  | "ペペロンチーノ"
  | "イタリア産トマト使用"
  | "愛され続けて30年"
  | "新登場"
  | "シナモン＆カスタード仕立て"
  | "小学生までのお子様限定"
  | "サクサク！"
  | "シャキッ！"
  | "サクふわっ！"
  | "名物（バケット）";

export interface MenuItem {
  id: string;
  name: string;
  nameEn: string;
  nameKo: string;
  nameZh: string;
  category: Category;
  /** イートイン税込価格（円）。セットは代表価格 */
  price: number;
  /** テイクアウト税込価格（円）。null = テイクアウト不可 */
  priceTO: number | null;
  description: string;
  descriptionEn: string;
  descriptionKo: string;
  descriptionZh: string;
  image: string;
  takeout: boolean;
  badges: Badge[];
  available: boolean;
  /** サイズ展開がある場合 */
  sizes?: { label: string; price: number }[];
}

export interface ToppingInfo {
  name: string;
  priceEatIn: number;
  priceTO: number;
}

// ─────────────────────────────────────────────
// トッピング情報（パスタ用）
// ─────────────────────────────────────────────
export const toppingsPasta: ToppingInfo[] = [
  { name: "モッツァレラトッピング",             priceEatIn: 150, priceTO: 147 },
  { name: "3種きのこトッピング",               priceEatIn: 150, priceTO: 147 },
  { name: "博多明太子トッピング",              priceEatIn: 137, priceTO: 147 },
  { name: "青唐辛子とチリペッパートッピング",   priceEatIn: 91,  priceTO: 98  },
];

// ─────────────────────────────────────────────
// トッピング情報（ピッツァ用）
// ─────────────────────────────────────────────
export const toppingsPizza: ToppingInfo[] = [
  { name: "チーズトッピング",       priceEatIn: 137, priceTO: 147 },
  { name: "モッツァレラトッピング", priceEatIn: 150, priceTO: 147 },
  { name: "3種きのこトッピング",   priceEatIn: 150, priceTO: 147 },
];

// 後方互換用
export const toppings = [...toppingsPasta, ...toppingsPizza];

export const noodleOptions = [
  { label: "麺 やや多め（無料）", price: 0 },
  { label: "麺 2倍",             price: 150 }, // 税込
];

// ─────────────────────────────────────────────
// フリッタまとめ買いセット（テイクアウト専用）
// ─────────────────────────────────────────────
export const frittaSets = [
  { count: 2, price: 800 },
  { count: 3, price: 1200 },
  { count: 5, price: 2000 },
];

// ─────────────────────────────────────────────
// メニューデータ
// ─────────────────────────────────────────────
export const menuItems: MenuItem[] = [
  // ── 自家製生パスタ ──────────────────────────
  {
    id: "tomato-mozzarella",
    name: "トマトモッツァレラ",
    nameEn: "Tomato Mozzarella",
    nameKo: "토마토 모차렐라",
    nameZh: "番茄马苏里拉",
    category: "pasta",
    price: 730,
    priceTO: 757,
    description: "イタリア産完熟トマトを使用した、人気No.1の生パスタ。とろけるモッツァレラとの絶妙なハーモニー。",
    descriptionEn: "Our most popular fresh pasta with Italian ripened tomatoes and melting mozzarella.",
    descriptionKo: "이탈리아산 완숙 토마토를 사용한 인기 No.1 생파스타.",
    descriptionZh: "使用意大利熟番茄制作的人气No.1新鲜意面。",
    image: "/images/menu/tomato-mozzarella.png",
    takeout: true,
    badges: ["人気NO.1", "イタリア産トマト使用"],
    available: true,
  },
  {
    id: "kobore-bacon-parmenara",
    name: "こぼれベーコンのパルメナーラ",
    nameEn: "Overflowing Bacon Parmenara",
    nameKo: "넘쳐나는 베이컨 파르메나라",
    nameZh: "满溢培根帕尔梅纳拉",
    category: "pasta",
    price: 970,
    priceTO: 992,
    description: "こぼれるほどたっぷりのベーコンをのせた名物パスタ。濃厚なクリームソースと卵黄が絡み合う。",
    descriptionEn: "A signature dish piled high with bacon in a rich cream sauce with egg yolk.",
    descriptionKo: "넘쳐흐르는 베이컨이 올라간 명물 파스타.",
    descriptionZh: "铺满培根的招牌意面，浓厚奶油酱与蛋黄完美融合。",
    image: "/images/menu/kobore-bacon-parmenara.png",
    takeout: true,
    badges: ["名物"],
    available: true,
  },
  {
    id: "tuna-mushroom-mentaiko",
    name: "ツナとキノコの和風明太子",
    nameEn: "Tuna & Mushroom Mentaiko",
    nameKo: "참치와 버섯의 일본식 명란",
    nameZh: "金枪鱼蘑菇明太子和风意面",
    category: "pasta",
    price: 760,
    priceTO: 786,
    description: "ツナと3種きのこに、ピリ辛明太子をあわせた和風生パスタ。",
    descriptionEn: "Fresh pasta with tuna, three kinds of mushrooms, and spicy mentaiko.",
    descriptionKo: "참치와 버섯, 매콤한 명란을 곁들인 일본식 생파스타.",
    descriptionZh: "金枪鱼与三种菇类搭配辛辣明太子的和风生意面。",
    image: "/images/menu/tuna-mushroom-mentaiko.png",
    takeout: true,
    badges: [],
    available: true,
  },
  {
    id: "bacon-mushroom-parmenara",
    name: "ベーコンとマッシュルームのパルメナーラ",
    nameEn: "Bacon & Mushroom Parmenara",
    nameKo: "베이컨과 버섯 파르메나라",
    nameZh: "培根蘑菇帕尔梅纳拉",
    category: "pasta",
    price: 820,
    priceTO: 845,
    description: "定番の濃厚クリームパスタ。ベーコンとマッシュルームが絶妙にマッチ。",
    descriptionEn: "A classic rich cream pasta with bacon and mushrooms.",
    descriptionKo: "베이컨과 버섯이 어우러진 정통 크림 파스타.",
    descriptionZh: "经典浓郁奶油意面，培根与蘑菇完美搭配。",
    image: "/images/menu/bacon-mushroom-parmenara.png",
    takeout: true,
    badges: ["定番"],
    available: true,
  },
  {
    id: "creamy-tomato-nara",
    name: "とろ〜りモッツァレラ クリーミートマトナーラ",
    nameEn: "Melty Mozzarella Creamy Tomato-nara",
    nameKo: "녹아드는 모차렐라 크리미 토마토나라",
    nameZh: "浓滑马苏里拉奶油番茄拿拉",
    category: "pasta",
    price: 840,
    priceTO: null,
    description: "とろけるモッツァレラとクリーミーなトマトソースが絡んだ贅沢な一皿。",
    descriptionEn: "A luxurious pasta with melting mozzarella and creamy tomato sauce.",
    descriptionKo: "녹아드는 모차렐라와 크리미한 토마토소스가 어우러진 풍성한 파스타.",
    descriptionZh: "融化的马苏里拉与浓郁奶油番茄酱交融的奢华意面。",
    image: "/images/menu/creamy-tomato-nara.png",
    takeout: false,
    badges: [],
    available: true,
  },
  {
    id: "spicy-garlic-tomato",
    name: "旨辛！ニンニクトマト",
    nameEn: "Spicy Garlic Tomato",
    nameKo: "매콤 마늘 토마토",
    nameZh: "鲜辣蒜香番茄意面",
    category: "pasta",
    price: 720,
    priceTO: 747,
    description: "ピリリと辛いニンニクと完熟トマトのソースが食欲をそそる一品。",
    descriptionEn: "Appetite-whetting pasta with spicy garlic and ripe tomato sauce.",
    descriptionKo: "알싸한 마늘과 완숙 토마토 소스로 식욕을 자극하는 파스타.",
    descriptionZh: "辛辣大蒜与熟番茄酱令人食欲大开的意面。",
    image: "/images/menu/spicy-garlic-tomato.png",
    takeout: true,
    badges: [],
    available: true,
  },
  {
    id: "shirasu-peperoncino",
    name: "シラスの和風ペペロンチーノ",
    nameEn: "Shirasu Japanese-style Peperoncino",
    nameKo: "뱅어포 일본식 페페론치노",
    nameZh: "白饭鱼和风香辣意面",
    category: "pasta",
    price: 740,
    priceTO: null,
    description: "シラスと和の食材をペペロンチーノに合わせた、さっぱりした和風パスタ。",
    descriptionEn: "A refreshing Japanese-style peperoncino with shirasu whitebait.",
    descriptionKo: "뱅어포와 일본식 재료를 페페론치노에 곁들인 산뜻한 화풍 파스타.",
    descriptionZh: "白饭鱼与和风食材搭配香辣意面，清爽可口。",
    image: "/images/menu/shirasu-peperoncino.png",
    takeout: false,
    badges: ["ペペロンチーノ"],
    available: true,
  },
  {
    id: "ebi-ika-peperoncino",
    name: "ぷりぷり海老とイカのペペロンチーノ",
    nameEn: "Plump Shrimp & Squid Peperoncino",
    nameKo: "탱글탱글 새우와 오징어 페페론치노",
    nameZh: "弹嫩虾仁鱿鱼香辣意面",
    category: "pasta",
    price: 810,
    priceTO: null,
    description: "ぷりぷりの海老とイカをたっぷり使ったペペロンチーノ。",
    descriptionEn: "Generously topped with plump shrimp and squid peperoncino.",
    descriptionKo: "탱글탱글한 새우와 오징어가 가득한 페페론치노.",
    descriptionZh: "大量弹嫩虾仁与鱿鱼制作的香辣意面。",
    image: "/images/menu/ebi-ika-peperoncino.png",
    takeout: false,
    badges: ["ペペロンチーノ"],
    available: true,
  },

  // ── ピッツァ ──────────────────────────────────
  {
    id: "half-and-half-pizza",
    name: "よくばりピッツァ ハーフ＆ハーフ",
    nameEn: "Greedy Pizza Half & Half",
    nameKo: "욕심쟁이 피자 하프&하프",
    nameZh: "贪心披萨 半半",
    category: "pizza",
    price: 930,
    priceTO: 953,
    description: "好きなピッツァを2種類選べるよくばりな一枚。組み合わせは自由！",
    descriptionEn: "Choose any two pizzas on one pie — the ultimate greedy pizza experience!",
    descriptionKo: "좋아하는 피자 두 가지를 하나로! 조합은 자유롭게.",
    descriptionZh: "可以选择两种口味的贪心披萨，组合随心所欲！",
    image: "/images/menu/half-and-half-pizza.png",
    takeout: true,
    badges: ["人気NO.1"],
    available: true,
  },
  {
    id: "italian-tomato-margherita",
    name: "イタリアントマトのマルゲリータ",
    nameEn: "Italian Tomato Margherita",
    nameKo: "이탈리아 토마토 마르게리타",
    nameZh: "意大利番茄玛格丽特",
    category: "pizza",
    price: 760,
    priceTO: 786,
    description: "イタリア産完熟トマト使用。自家製ブレンド生地に相性抜群のマルゲリータ。",
    descriptionEn: "Classic margherita with Italian ripened tomatoes on our original blend dough.",
    descriptionKo: "이탈리아산 완숙 토마토를 사용한 정통 마르게리타.",
    descriptionZh: "使用意大利熟番茄，搭配自制混合面团的玛格丽特披萨。",
    image: "/images/menu/italian-tomato-margherita.png",
    takeout: true,
    badges: ["人気NO.1", "イタリア産トマト使用"],
    available: true,
  },
  {
    id: "three-mushroom-cream-pizza",
    name: "3種きのこのクリームピッツァ",
    nameEn: "Three Mushroom Cream Pizza",
    nameKo: "세 가지 버섯 크림 피자",
    nameZh: "三种菇类奶油披萨",
    category: "pizza",
    price: 790,
    priceTO: 816,
    description: "3種のきのこをたっぷりのせたクリームベースのピッツァ。",
    descriptionEn: "Cream-based pizza generously topped with three kinds of mushrooms.",
    descriptionKo: "세 가지 버섯을 듬뿍 올린 크림 베이스 피자.",
    descriptionZh: "铺满三种菇类的奶油底披萨。",
    image: "/images/menu/three-mushroom-cream-pizza.png",
    takeout: true,
    badges: [],
    available: true,
  },
  {
    id: "sausage-bacon-pizza",
    name: "ソーセージとベーコン",
    nameEn: "Sausage & Bacon Pizza",
    nameKo: "소시지와 베이컨 피자",
    nameZh: "香肠培根披萨",
    category: "pizza",
    price: 790,
    priceTO: 816,
    description: "ジューシーなソーセージとベーコンが食欲を刺激するボリューム満点ピッツァ。",
    descriptionEn: "A hearty pizza packed with juicy sausage and bacon.",
    descriptionKo: "육즙 넘치는 소시지와 베이컨이 듬뿍 올라간 피자.",
    descriptionZh: "多汁香肠与培根令人食欲大开的丰盛披萨。",
    image: "/images/menu/sausage-bacon-pizza.png",
    takeout: true,
    badges: [],
    available: true,
  },
  {
    id: "corn-cream-pizza",
    name: "コーンのクリームピッツァ",
    nameEn: "Corn Cream Pizza",
    nameKo: "옥수수 크림 피자",
    nameZh: "玉米奶油披萨",
    category: "pizza",
    price: 790,
    priceTO: 816,
    description: "甘みのあるコーンをたっぷり使ったクリームベースのピッツァ。",
    descriptionEn: "Cream-based pizza generously topped with sweet corn.",
    descriptionKo: "달콤한 옥수수가 듬뿍 올라간 크림 베이스 피자.",
    descriptionZh: "铺满甜玉米的奶油底披萨。",
    image: "/images/menu/corn-cream-pizza.png",
    takeout: true,
    badges: [],
    available: true,
  },
  {
    id: "shirayuki-honey",
    name: "白雪はちみつ",
    nameEn: "Shirayuki Honey Pizza",
    nameKo: "시라유키 꿀 피자",
    nameZh: "白雪蜂蜜披萨",
    category: "pizza",
    price: 760,
    priceTO: 786,
    description: "愛され続けて30年。チーズにはちみつをかけた甘じょっぱいロングセラーピッツァ。",
    descriptionEn: "A 30-year bestseller — cheese pizza drizzled with honey for a sweet-salty harmony.",
    descriptionKo: "30년간 사랑받아온 치즈에 꿀을 뿌린 달콤 짭짤한 스테디셀러 피자.",
    descriptionZh: "30年长销款。芝士配蜂蜜，咸甜交融的经典披萨。",
    image: "/images/menu/shirayuki-honey.png",
    takeout: true,
    badges: ["愛され続けて30年"],
    available: true,
  },

  // ── 揚げピッツァフリッタ ─────────────────────
  {
    id: "ume-sasami-fritta",
    name: "梅ササミ",
    nameEn: "Ume Chicken Fritta",
    nameKo: "매실 닭가슴살 프리타",
    nameZh: "梅子鸡胸肉油炸披萨",
    category: "fritta",
    price: 450,
    priceTO: 460, // +¥10 包装代
    description: "梅とさっぱりしたササミが入ったカリッと揚げたピッツァフリッタ。",
    descriptionEn: "Crispy fried pizza filled with plum and tender chicken breast.",
    descriptionKo: "매실과 담백한 닭가슴살이 들어간 바삭하게 튀긴 피자 프리타.",
    descriptionZh: "酥脆油炸披萨，内馅为梅子与清淡鸡胸肉。",
    image: "/images/menu/ume-sasami-fritta.png",
    takeout: true,
    badges: [],
    available: true,
  },
  {
    id: "apple-fritta",
    name: "アップル",
    nameEn: "Apple Fritta",
    nameKo: "애플 프리타",
    nameZh: "苹果油炸披萨",
    category: "fritta",
    price: 450,
    priceTO: 460,
    description: "新登場！シナモン＆カスタード仕立てのアップルフリッタ。デザート感覚で楽しめる。",
    descriptionEn: "New! Apple fritta with cinnamon & custard — enjoy it like a dessert.",
    descriptionKo: "신메뉴! 시나몬 & 커스터드 풍미의 애플 프리타. 디저트처럼 즐기세요.",
    descriptionZh: "新品！肉桂卡仕达风味苹果油炸披萨，可当甜品享用。",
    image: "/images/menu/apple-fritta.png",
    takeout: true,
    badges: ["新登場", "シナモン＆カスタード仕立て"],
    available: true,
  },
  {
    id: "teriyaki-egg-fritta",
    name: "照りたま",
    nameEn: "Teriyaki Egg Fritta",
    nameKo: "데리타마 프리타",
    nameZh: "照烧鸡蛋油炸披萨",
    category: "fritta",
    price: 410,
    priceTO: 420,
    description: "照り焼きチキンと半熟卵が入ったボリューム満点のフリッタ。",
    descriptionEn: "Hearty fritta filled with teriyaki chicken and soft-boiled egg.",
    descriptionKo: "데리야키 치킨과 반숙 달걀이 들어간 든든한 프리타.",
    descriptionZh: "照烧鸡肉与溏心蛋的丰盛油炸披萨。",
    image: "/images/menu/teriyaki-egg-fritta.png",
    takeout: true,
    badges: [],
    available: true,
  },
  {
    id: "jaga-mentai-fritta",
    name: "じゃが明太",
    nameEn: "Potato Mentaiko Fritta",
    nameKo: "감자 명란 프리타",
    nameZh: "土豆明太子油炸披萨",
    category: "fritta",
    price: 410,
    priceTO: 420,
    description: "じゃがいもとピリ辛明太子が入った和風フリッタ。",
    descriptionEn: "Japanese-style fritta filled with potato and spicy mentaiko.",
    descriptionKo: "감자와 매콤한 명란이 들어간 일본식 프리타.",
    descriptionZh: "土豆与辛辣明太子的和风油炸披萨。",
    image: "/images/menu/jaga-mentai-fritta.png", // ※個別画像なし・フリッタ.jpgを代用
    takeout: true,
    badges: [],
    available: true,
  },

  // ── セット ───────────────────────────────────
  {
    id: "potato-set",
    name: "ポテトセット",
    nameEn: "Potato Set",
    nameKo: "포테이토 세트",
    nameZh: "薯条套餐",
    category: "set",
    price: 370,
    priceTO: null,
    description: "サクサクのフライドポテト＋ドリンクのセット。Lサイズは+¥90（税込¥100）。",
    descriptionEn: "Crispy fries + drink combo. L size +¥100 (tax incl.).",
    descriptionKo: "바삭한 감자튀김 + 음료 세트. L사이즈 +¥100(세금 포함).",
    descriptionZh: "酥脆薯条 + 饮料套餐。L号 +¥100（含税）。",
    image: "/images/menu/potato-set.png",
    takeout: false,
    badges: ["サクサク！"],
    available: true,
    sizes: [
      { label: "M", price: 370 },
      { label: "L", price: 460 },
    ],
  },
  {
    id: "salad-set",
    name: "生野菜サラダセット",
    nameEn: "Fresh Salad Set",
    nameKo: "생야채 샐러드 세트",
    nameZh: "新鲜蔬菜沙拉套餐",
    category: "set",
    price: 370,
    priceTO: null,
    description: "シャキシャキの生野菜サラダ（和風 or オリーブ）＋ドリンクのセット。",
    descriptionEn: "Crisp fresh salad (Japanese or olive dressing) + drink.",
    descriptionKo: "아삭한 생야채 샐러드(일본식 또는 올리브) + 음료 세트.",
    descriptionZh: "清脆新鲜蔬菜沙拉（和风或橄榄）+ 饮料套餐。",
    image: "/images/menu/salad-set.png",
    takeout: false,
    badges: ["シャキッ！"],
    available: true,
  },
  {
    id: "baguette-tower-set",
    name: "バケットタワーセット",
    nameEn: "Baguette Tower Set",
    nameKo: "바게트 타워 세트",
    nameZh: "法棍塔套餐",
    category: "set",
    price: 370,
    priceTO: null,
    description: "サクふわっ！名物のバケットタワー（ガーリック or はちみつ）＋ドリンクのセット。",
    descriptionEn: "The signature baguette tower (garlic or honey) + drink.",
    descriptionKo: "명물 바게트 타워(갈릭 또는 꿀) + 음료 세트.",
    descriptionZh: "招牌法棍塔（蒜香或蜂蜜）+ 饮料套餐。",
    image: "/images/menu/baguette-tower-set.png",
    takeout: false,
    badges: ["サクふわっ！", "名物（バケット）"],
    available: true,
  },
  {
    id: "kids-set",
    name: "キッズセット",
    nameEn: "Kids Set",
    nameKo: "키즈 세트",
    nameZh: "儿童套餐",
    category: "kids",
    price: 390,
    priceTO: null,
    description: "小学生までのお子様限定。フライドポテト＋ドリンク2杯のセット。",
    descriptionEn: "For children up to elementary school age. Fries + two drinks.",
    descriptionKo: "초등학생까지 한정. 감자튀김 + 음료 2잔 세트.",
    descriptionZh: "仅限小学生及以下儿童。薯条 + 两杯饮料套餐。",
    image: "/images/menu/kids-set.png",
    takeout: false,
    badges: ["小学生までのお子様限定"],
    available: true,
  },

  // ── ドリンク ─────────────────────────────────
  {
    id: "drink-m",
    name: "ドリンク Mサイズ",
    nameEn: "Drink M Size",
    nameKo: "음료 M사이즈",
    nameZh: "饮料 M号",
    category: "drink",
    price: 170,
    priceTO: null,
    description: "ジンジャーエール・コーラ・メロンソーダ・アイスコーヒー・リンゴ・ウーロン茶",
    descriptionEn: "Ginger ale, cola, melon soda, iced coffee, apple, oolong tea",
    descriptionKo: "진저에일, 콜라, 멜론소다, 아이스커피, 사과, 우롱차",
    descriptionZh: "姜汁汽水、可乐、蜜瓜苏打、冰咖啡、苹果汁、乌龙茶",
    image: "/images/menu/drink-m.png",
    takeout: false,
    badges: [],
    available: true,
  },
  {
    id: "drink-mega",
    name: "ドリンク メガサイズ",
    nameEn: "Drink 3x M Size",
    nameKo: "음료 3배 M사이즈",
    nameZh: "饮料 3倍M号",
    category: "drink",
    price: 280,
    priceTO: null,
    description: "Mサイズ3杯分のビッグドリンク。",
    descriptionEn: "A big drink equivalent to three M-size cups.",
    descriptionKo: "M사이즈 3잔 분량의 빅 드링크.",
    descriptionZh: "相当于三杯M号的超大饮料。",
    image: "/images/menu/drink-m.png",
    takeout: false,
    badges: [],
    available: true,
  },
  {
    id: "soda-gelato",
    name: "ソーダジェラート",
    nameEn: "Soda Gelato",
    nameKo: "소다 젤라토",
    nameZh: "苏打冰淇淋",
    category: "drink",
    price: 350,
    priceTO: null,
    description: "北海道まろやかバニラのソーダジェラート。メロン・コーラ・アイスコーヒーの3種。セットドリンクを+¥150でソーダジェラートに変更可。",
    descriptionEn: "Hokkaido vanilla soda gelato in melon, cola, or iced coffee. Add ¥150 to upgrade your set drink.",
    descriptionKo: "홋카이도 부드러운 바닐라 소다 젤라토. 멜론·콜라·아이스커피 3종. 세트 음료를 +¥150으로 변경 가능.",
    descriptionZh: "北海道柔滑香草苏打冰淇淋。蜜瓜·可乐·冰咖啡三种口味。套餐饮料可加¥150升级。",
    image: "/images/menu/soda-gelato.png",
    takeout: false,
    badges: [],
    available: true,
  },
];

// カテゴリ別フィルタ用ヘルパー
export const getByCategory = (category: Category) =>
  menuItems.filter((item) => item.category === category);
