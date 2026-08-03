import { Doctor, Specialty, Article, MainMenuCategory, ServiceProduct, BrandingPackage, AppUser, AppointmentOrder } from '../types';

export const SPECIALTIES: Specialty[] = [
  { id: 'skin', name: 'پوست، مو و زیبایی', iconName: 'Sparkles', doctorCount: 48, description: 'تزریق ژل و بوتاکس، کاشت مو، لیزر دیود و جوانسازی' },
  { id: 'heart', name: 'قلب و عروق', iconName: 'HeartPulse', doctorCount: 32, description: 'آنژیوگرافی، اکوکاردیوگرافی، تست ورزش و نوار قلب' },
  { id: 'brain', name: 'مغز و اعصاب (نورولوژی)', iconName: 'Brain', doctorCount: 25, description: 'درمان سردرد، نوار مغز، دیسک کمر و ستون فقرات' },
  { id: 'dentist', name: 'دندان‌پزشکی و ایمپلنت', iconName: 'Smile', doctorCount: 64, description: 'کامپوزیت ونیر، ایمپلنت دیجیتال، ارتودنسی و بلیچینگ' },
  { id: 'women', name: 'زنان، زایمان و نازایی', iconName: 'Baby', doctorCount: 40, description: 'سونوگرافی بارداری، مراقبت‌های دوره بارداری و جراحی' },
  { id: 'orthopedics', name: 'ارتوپدی و مفاصل', iconName: 'Activity', doctorCount: 29, description: 'جراحی زانو و شانه، تعویض مفصل، آرتروسکوپی' },
  { id: 'eyes', name: 'چشم‌پزشکی و لیزیک', iconName: 'Eye', doctorCount: 22, description: 'عمل فمتولیزیک، آب مروارید، تعیین شماره چشم' },
  { id: 'general', name: 'پزشک عمومی و چکاپ', iconName: 'Stethoscope', doctorCount: 55, description: 'چکاپ کامل، نسخه الکترونیک، گواهی سلامت و مشاوره' },
];

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'دکتر محمدرضا صادقی',
    title: 'متخصص برجسته پوست، مو و زیبایی',
    specialtyId: 'skin',
    specialtyName: 'پوست و زیبایی',
    medicalCouncilNumber: '۱۳۴۵۸۹',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    city: 'تهران',
    address: 'تهران، جردن، بالاتر از میرداماد، بن‌بست آناهیتا، پلاک ۱۲',
    phone: '02188889900',
    rating: 4.9,
    reviewCount: 342,
    consultationFee: 450000,
    isBranded: true,
    brandingPackage: 'gold',
    bio: 'دارای بورد تخصصی بین‌المللی با بیش از ۱۵ سال تجربه موفق در جراحی‌های ترمیمی، کاشت مو به روش SUT و جوانسازی نخ‌های لیفت.',
    experienceYears: 16,
    availableSlots: ['امروز ساعت ۱۶:۳۰', 'امروز ساعت ۱۸:۰۰', 'فردا ساعت ۱۱:۰۰'],
    services: ['لیفت صورت با نخ', 'تزریق ژل لب و فیلر', 'کاشت موی طبیعی', 'لیزر هایفو آنی'],
    clinicImages: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'doc-2',
    name: 'دکتر مریم کاظمی',
    title: 'فوق تخصص قلب و عروق و آنژیوپلاستی',
    specialtyId: 'heart',
    specialtyName: 'قلب و عروق',
    medicalCouncilNumber: '۹۸۷۶۵۴',
    avatar: 'https://images.unsplash.com/photo-1594824813566-7885a3961d0d?auto=format&fit=crop&q=80&w=400',
    city: 'اصفهان',
    address: 'اصفهان، خیابان آمادگاه، مجتمع پزشکی اصفهان، طبقه ۳',
    phone: '03132221100',
    rating: 4.95,
    reviewCount: 512,
    consultationFee: 500000,
    isBranded: true,
    brandingPackage: 'gold',
    bio: 'عضو هیئت علمی دانشگاه علوم پزشکی، متخصص در درمان فشار خون بالا، آنژیوگرافی عروق کرونر و کنترل آریتمی‌های قلبی.',
    experienceYears: 20,
    availableSlots: ['فردا ساعت ۰۹:۳۰', 'فردا ساعت ۱۴:۰۰', 'پس‌فردا ساعت ۱۶:۰۰'],
    services: ['اکوکاردیوگرافی رنگی', 'تست ورزش کامپیوتر', 'هولتر مانیتورینگ فشارخون', 'آنژیوگرافی'],
    clinicImages: [
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'doc-3',
    name: 'دکتر امین رضایی',
    title: 'متخصص جراحی جراحی فک و دندان‌پزشک زیبایی',
    specialtyId: 'dentist',
    specialtyName: 'دندان‌پزشکی',
    medicalCouncilNumber: '۱۵۶۷۸۹',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    city: 'شیراز',
    address: 'شیراز، خیابان قصرالدشت، نبش کوچه ۶۲، ساختمانپزشکان ارم',
    phone: '07136280000',
    rating: 4.8,
    reviewCount: 210,
    consultationFee: 350000,
    isBranded: true,
    brandingPackage: 'silver',
    bio: 'مسترینگ ایمپلنت‌های فوری از سوئیس، متخصص اصلاح طرح لبخند با کامپوزیت لیرینگ و سرامیک ای‌مکس.',
    experienceYears: 12,
    availableSlots: ['امروز ساعت ۱۹:۰۰', 'فردا ساعت ۱۶:۰۰'],
    services: ['ایمپلنت سوئیسی فوری', 'کامپوزیت لیرینگ زیبایی', 'بلیچینگ آفیس', 'عصب‌کشی تخصصی'],
    clinicImages: [
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'doc-4',
    name: 'دکتر سارا شریفی',
    title: 'متخصص مغز و اعصاب و ستون فقرات',
    specialtyId: 'brain',
    specialtyName: 'مغز و اعصاب',
    medicalCouncilNumber: '۱۲۳۴۵۶',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    city: 'مشهد',
    address: 'مشهد، خیابان احمدآباد، عارف ۲، ساختمان پزشکان سپهر',
    phone: '05138400000',
    rating: 4.88,
    reviewCount: 189,
    consultationFee: 420000,
    isBranded: false,
    bio: 'درمان تخصصی میگرن مقاوم به درمان، اختلالات خواب، نوار عصب و عضله دقیق و کنترل حملات صرع.',
    experienceYears: 14,
    availableSlots: ['فردا ساعت ۱۰:۳۰', 'فردا ساعت ۱۷:۰۰'],
    services: ['نوار مغز آنلاین', 'نوار عصب و عضله (EMG)', 'تزریق بوتاکس میگرن', 'درمان سرگیجه'],
    clinicImages: []
  },
  {
    id: 'doc-5',
    name: 'دکتر علی اکبر حسینی',
    title: 'فوق تخصص جراحی زانو و تعویض مفاصل',
    specialtyId: 'orthopedics',
    specialtyName: 'ارتوپدی',
    medicalCouncilNumber: '۱۸۷۶۵۴',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    city: 'تهران',
    address: 'تهران، سعادت‌آباد، میدان کاج، سرو غربی، پلاک ۳۳',
    phone: '02122091122',
    rating: 4.92,
    reviewCount: 420,
    consultationFee: 480000,
    isBranded: true,
    brandingPackage: 'gold',
    bio: 'جراح برجسته ارتوپدی با انجام بیش از ۳۰۰۰ عمل موفق تعویض مفصل زانو و ران و بازسازی رباط صلیبی (ACL).',
    experienceYears: 18,
    availableSlots: ['امروز ساعت ۱۸:۳۰', 'فردا ساعت ۱۵:۰۰'],
    services: ['تعویض مفصل زانو', 'آرتروسکوپی آسیب‌های ورزشی', 'ترمیم رباط صلیبی', 'درمان پوکی استخوان'],
    clinicImages: []
  },
  {
    id: 'doc-6',
    name: 'دکتر نیلوفر امینی',
    title: 'متخصص زنان، زایمان و مراقبت‌های ویژه بارداری',
    specialtyId: 'women',
    specialtyName: 'زنان و زایمان',
    medicalCouncilNumber: '۱۴۳۲۱۰',
    avatar: 'https://images.unsplash.com/photo-1594824813566-7885a3961d0d?auto=format&fit=crop&q=80&w=400',
    city: 'کرج',
    address: 'کرج، جهانشهر، خیابان کسری، ساختمان پزشکان جهانشهر',
    phone: '02634400011',
    rating: 4.79,
    reviewCount: 165,
    consultationFee: 380000,
    isBranded: false,
    bio: 'مراقبت‌های دوره بارداری پرخطر، جراحی‌های زیبایی زنان با لیزر مونالیزا تاچ و درمان نازایی.',
    experienceYears: 11,
    availableSlots: ['فردا ساعت ۱۱:۳۰', 'پس‌فردا ساعت ۱۶:۳۰'],
    services: ['سونوگرافی غربالگری', 'جراحی لابیاپلاستی لیزری', 'مشاوره قبل بارداری', 'تست پاپ اسمیر'],
    clinicImages: []
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'راهنمای جامع برندسازی شخصی پزشکان در سال ۱۴۰۳ (تاثیر وب‌سایت و سئو)',
    slug: 'branding-guide-for-doctors',
    summary: 'چگونه پزشکان می‌توانند با استراتژی صحیح برندسازی دیجیتال، جذب بیمار هدفمند را ۳ برابر کنند و اعتبار حرفه‌ای خود را در فضای آنلاین ارتقا دهند.',
    content: `برندسازی پزشکی (Doctor Personal Branding) چیست و چرا امروزه به یک ضرورت بازاریابی خدمات سلامت تبدیل شده است؟

در دنیای امروز که بیش از ۸۰٪ بیماران پیش از مراجعه به مطب، نام پزشک را در گوگل جستجو می‌کنند یا ویدیوهای او را در شبکه‌های اجتماعی تماشا می‌کنند، عدم حضور حرفه‌ای به معنای واگذاری سهم بازار به رقبا است.

مزایای اصلی برندسازی پزشک برتر:
۱. افزایش اعتماد و پرستیژ حرفه‌ای پزشک
۲. جذب بیماران خصوصی با ارزش درمانی بالاتر
۳. تثبیت نام پزشک به عنوان مرجع علمی در حوزه تخصصی
۴. داشتن سامانه نوبت‌دهی اختصاصی و کاهش تلفن‌های مطب

تیم برندسازی پزشک برتر با ارائه خدمات طراحی سایت تخصصی پزشکی، سئوی محلی (Google Maps)، تولید ویدیوهای اینستاگرامی و ساخت هویت بصری، پزشکان را در این مسیر همراهی می‌کند.`,
    authorName: 'دکتر محمدرضا صادقی',
    authorRole: 'مشاور برندسازی و متخصص زیبایی',
    authorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150',
    category: 'برندسازی پزشکی',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    date: '۱۴۰۳/۰۵/۱۵',
    readTimeMinutes: 6,
    views: 3420,
    likes: 245,
    tags: ['برندسازی پزشک', 'سئو پزشکی', 'نوبت دهی آنلاین', 'مدیریت مطب']
  },
  {
    id: 'art-2',
    title: 'بهترین روش‌های جوانسازی پوست بدون جراحی (هایفو، میکرونیدلینگ و بوتاکس)',
    slug: 'non-surgical-skin-rejuvenation',
    summary: 'بررسی مقایسه‌ای تکنولوژی‌های جدید هایفوتراپی ۳ بعدی، آراف فرکشنال و هایدرودرمی برای رفع افتادگی و چروک‌های پوستی.',
    content: `جوانسازی پوست صورت یکی از پرطرفدارترین خدمات سلامت و زیبایی است. تکنولوژی‌های جدید امکان لیفت صورت و درمان چروک‌ها را بدون نیاز به تیغ جراحی و بیهوشی فراهم کرده‌اند.

۱. هایفوتراپی (HIFU):
استفاده از امواج متمرکز اولتراسونیک برای تحریک کلاژن‌سازی در لایه SMAS پوست. نتیجه آن لیفت ماندگار ۱ تا ۲ ساله است.

۲. آر اف فرکشنال (Fractional RF):
ترکیب سوزن‌های طلا و انرژی رادیوفرکانسی برای سفتی پوست، بستن منافذ باز و درمان اسکارهای آکنه.

۳. بوتاکس و فیلرهای اسید هیالورونیک:
ممانعت از انقباض عضلات میمیک صورت و جوانسازی سریع خط لبخند و گونه‌ها.`,
    authorName: 'دکتر محمدرضا صادقی',
    authorRole: 'متخصص پوست و زیبایی',
    authorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150',
    category: 'پوست و زیبایی',
    imageUrl: 'https://images.unsplash.com/photo-1512290900676-26c2a4d48dc1?auto=format&fit=crop&q=80&w=800',
    date: '۱۴۰۳/۰۵/۱۰',
    readTimeMinutes: 8,
    views: 2890,
    likes: 198,
    tags: ['هایفوتراپی', 'بوتاکس', 'پوست و زیبایی', 'جوانسازی']
  },
  {
    id: 'art-3',
    title: '۱۰ نشانه کلیدی مشکلات قلبی که هرگز نباید نادیده بگیرید',
    slug: 'heart-disease-warning-signs',
    summary: 'دردهای مبهم قفسه سینه، تنگی نفس هنگام فعالیت و درد انتشاریافته به فک و دست چپ از نشانه‌های حیاتی بررسی توسط متخصص قلب است.',
    content: `بیماری‌های عروق کرونر قلب علت اول مرگ‌ومیر در جهان هستند. آگاهی از نشانه‌های زودهنگام می‌تواند حیات فرد را نجات دهد.

علائم هشداردهنده:
- احساس فشار یا سنگینی در وسط قفسه سینه
- احساس تنگی نفس ناگهانی
- درد در دست چپ، شانه، فک یا پشت
- تعریق سرد ناگهانی و سرگیجه
- خستگی مفرط بدون دلیل مشخص

در صورت مشاهده این موارد حتماً نوبت اکوکاردیوگرافی و تست ورزش خود را ثبت کنید.`,
    authorName: 'دکتر مریم کاظمی',
    authorRole: 'فوق تخصص قلب و عروق',
    authorAvatar: 'https://images.unsplash.com/photo-1594824813566-7885a3961d0d?auto=format&fit=crop&q=80&w=150',
    category: 'سلامت قلب',
    imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
    date: '۱۴۰۳/۰۵/۰۴',
    readTimeMinutes: 5,
    views: 4120,
    likes: 310,
    tags: ['سلامت قلب', 'تست ورزش', 'آنژیوگرافی', 'پیشگیری']
  },
  {
    id: 'art-4',
    title: 'مقایسه ایمپلنت دیجیتال و سنت‌های قدیمی دندان‌پزشکی',
    slug: 'digital-implant-vs-traditional',
    summary: 'چگونه اسکنرهای ۳ بعدی و راهنماهای جراحی دیجیتال روند کاشت دندان را بدون درد، خونریزی و با دقت ۱۰۰٪ ممکن ساخته‌اند.',
    content: `ایمپلنت دیجیتال جدیدترین تحول در دندان‌پزشکی مدرن است. در این روش با استفاده از CBCT و اسکن نوری، مدل ۳ بعدی فک بیمار ساخته شده و بدون برش جراحی، پایه ایمپلنت قرار داده می‌شود.

مزایا:
- بدون نیاز به بخیه و برش وسیع
- زمان بهبود بسیار سریع‌تر
- کاهش احتمال عفونت
- تحویل روکش موقت در همان روز`,
    authorName: 'دکتر امین رضایی',
    authorRole: 'جراح فک و دندان‌پزشک',
    authorAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=150',
    category: 'دندان‌پزشکی',
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800',
    date: '۱۴۰۳/۰۴/۲۸',
    readTimeMinutes: 7,
    views: 1950,
    likes: 142,
    tags: ['ایمپلنت', 'دندانپزشکی دیجیتال', 'ترمیم دندان']
  }
];

// Strictly generate 15 items per submenu category as requested by the user prompt!
const create15Products = (categoryName: string, prefix: string, basePrice: number): any[] => {
  const items = [];
  const titles = [
    `دستگاه و تجهیزات پیشرفته ${categoryName} مدل Alpha-100`,
    `پکیج تخصصی خدمات ${categoryName} ویژه مطب‌های ممتاز`,
    `دستگاه لیزر کلاژن‌ساز ${categoryName} پرو`,
    `کیت تشخیص هوشمند و تست ${categoryName}`,
    `سیستم نرم‌افزاری نوبت‌دهی و پرونده ${categoryName}`,
    `تجهیزات معاینه هوشمند دیجیتال ${categoryName}`,
    `پکیج تولید ویدیو و مستندسازی برای ${categoryName}`,
    `سیستم مانیتورینگ آنلاین بیماران ${categoryName}`,
    `ست ابزار جراحی استریل ${categoryName} آلمانی`,
    `مکمل تخصصی و دارویی تقویت ${categoryName}`,
    `دستگاه ضدعفونی‌کننده اتوماتیک مطب ${categoryName}`,
    `صندلی و یونیت ارگونومیک مخصوص ${categoryName}`,
    `پکیج سئو و صفحه اختصاصی گوگل ${categoryName}`,
    `سیستم پردازش هوش مصنوعی برای ${categoryName}`,
    `کارگاه آموزشی تخصصی ارتقای مهارتی ${categoryName}`
  ];

  for (let i = 1; i <= 15; i++) {
    items.push({
      id: `${prefix}-prod-${i}`,
      title: titles[i - 1],
      subtitle: `محصول/خدمت شماره ${i} در دسته ${categoryName}`,
      price: basePrice + i * 150000,
      originalPrice: basePrice + i * 150000 + 300000,
      rating: +(4.5 + (i % 5) * 0.1).toFixed(1),
      image: [
        'https://images.unsplash.com/photo-1583912267670-6575929239fb?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400'
      ][(i - 1) % 5],
      description: `این خدمت یا محصول عالی با استانداردهای بین‌المللی تجهیزات پزشکی و بازاریابی سلامت تهیه شده است و شامل ضمانت اصالت و پشتیبانی ۲۴ ساعته می‌باشد.`,
      badge: i % 3 === 0 ? 'ویژه پزشک برتر' : i % 4 === 0 ? 'پرفروش‌ترین' : undefined,
      features: [
        'دارای تأییدیه وزارت بهداشت و سازمان غذا و دارو',
        'پشتیبانی تخصصی و گارانتی ۱۲ ماهه',
        'امکان ارسال سریع و نصب در سراسر کشور',
        'ارائه مشاوره رایگان قبل از سفارش'
      ],
      stockOrSlots: 10 + i
    });
  }
  return items;
};

export const MENU_CATEGORIES: MainMenuCategory[] = [
  {
    id: 'doctor-branding-menu',
    title: 'برندسازی پزشکان',
    submenus: [
      {
        id: 'sub-branding-web',
        title: 'طراحی سایت و سئو پزشکی',
        description: '۱۵ محصول و خدمت دیجیتال مارکتینگ و ساخت وبسایت مطب',
        icon: 'Globe',
        products: create15Products('طراحی سایت و سئو', 'web-seo', 2500000)
      },
      {
        id: 'sub-branding-media',
        title: 'تولید محتوا و اینستاگرام',
        description: '۱۵ خدمت ضبط ویدیو، ساخت ریلز و استراتژی محتوا',
        icon: 'Video',
        products: create15Products('تولید محتوای اینستاگرام', 'media', 1800000)
      },
      {
        id: 'sub-branding-system',
        title: 'سامانه‌های اختصاصی نوبت‌دهی',
        description: '۱۵ ابزار نرم‌افزاری مدیریت مطب و درگاه اختصاصی',
        icon: 'CalendarCheck',
        products: create15Products('سامانه نوبت‌دهی مطب', 'system', 3200000)
      }
    ]
  },
  {
    id: 'medical-equipment-menu',
    title: 'تجهیزات پزشکی و کلینیک',
    submenus: [
      {
        id: 'sub-equip-skin',
        title: 'دستگاه‌های پوست و زیبایی',
        description: '۱۵ دستگاه لیزر، هایفو و جوانسازی مجهز به استاندارد FDA',
        icon: 'Sparkles',
        products: create15Products('لیزر و زیبایی', 'equip-skin', 8500000)
      },
      {
        id: 'sub-equip-dental',
        title: 'تجهیزات دندان‌پزشکی',
        description: '۱۵ یونیت، توربین، موتور ایمپلنت و اسکنر نوری',
        icon: 'Smile',
        products: create15Products('تجهیزات دندان‌پزشکی', 'equip-dent', 12000000)
      },
      {
        id: 'sub-equip-diagnostic',
        title: 'ابزارهای تشخیصی و سونوگرافی',
        description: '۱۵ دستگاه نوار قلب، فشارسنج و سونو پرتابل',
        icon: 'Stethoscope',
        products: create15Products('ابزارهای تشخیصی', 'equip-diag', 4500000)
      }
    ]
  },
  {
    id: 'medical-services-menu',
    title: 'خدمات درمانی و نوبت‌دهی',
    submenus: [
      {
        id: 'sub-serv-consultation',
        title: 'مشاوره آنلاین و متنی',
        description: '۱۵ بسته مشاوره سریع آنلاین با برترین اساتید',
        icon: 'MessageSquare',
        products: create15Products('مشاوره آنلاین پزشکی', 'serv-consult', 200000)
      },
      {
        id: 'sub-serv-checkup',
        title: 'پکیج‌های چکاپ و آزمایشگاه',
        description: '۱۵ پکیج نمونه‌گیری در منزل و چکاپ سلامت کامل',
        icon: 'FlaskConical',
        products: create15Products('پکیج چکاپ سلامت', 'serv-checkup', 950000)
      },
      {
        id: 'sub-serv-homecare',
        title: 'خدمات پرستاری و درمان در منزل',
        description: '۱۵ خدمت تزریقات، سرم‌تراپی و مراقبت در منزل',
        icon: 'Home',
        products: create15Products('پرستاری در منزل', 'serv-home', 450000)
      }
    ]
  }
];

export const BRANDING_PACKAGES: BrandingPackage[] = [
  {
    id: 'pkg-bronze',
    name: 'برنز',
    title: 'پکیج پایه راه‌اندازی حضور آنلاین',
    price: 8500000,
    color: 'from-amber-600 to-amber-800',
    features: [
      'صفحه رسمی پزشک در پلتفرم پزشک برتر',
      'سامانه آنلاین نوبت‌دهی با پیامک یادآوری',
      'ثبت لوکیشن مطب در گوگل مپس و بلد/نشان',
      'طراحی پروفایل کاربری و کارت ویزیت دیجیتال',
      'پشتیبانی فنی ۶ ماهه'
    ]
  },
  {
    id: 'pkg-gold',
    name: 'طلایی (پیشنهادی)',
    title: 'پکیج جامع برندسازی و سئوی اختصاصی',
    price: 24000000,
    isPopular: true,
    color: 'from-amber-400 via-amber-500 to-yellow-600',
    features: [
      'طراحی وب‌سایت اختصاصی با دامنه‌ .ir/.com',
      'سئوی کامل و کسب رتبه ۱ گوگل در تخصص و شهر شما',
      'سناریونویسی و ضبط ۴ ویدیو ریلیز اینستاگرام در ماه',
      'سامانه نوبت‌دهی اختصاصی بدون کارمزد',
      'تولید ۱۰ مقاله تخصصی و مجله سلامت با نام شما',
      'پشتیبانی VIP و مدیر اکانت اختصاصی'
    ]
  },
  {
    id: 'pkg-diamond',
    name: 'الماس VIP',
    title: 'پکیج کامل پرسنل برندینگ و تبلیغات محیطی',
    price: 49000000,
    color: 'from-teal-500 to-cyan-700',
    features: [
      'تمام امکانات پکیج طلایی با استراتژی رشد ۱ ساله',
      'مدیریت کامل اینستاگرام، آپارات و یوتیوب پزشک',
      'مصاحبه اختصاصی و انتشار در خبرگزاری‌های رسمی',
      'عکاسی حرفه‌ای تبلیغاتی از مطب و پرسنل',
      'کمپین تبلیغاتی با سلبریتی‌ها و بلاگرها',
      'پشتیبانی ۲۴/۷ همراه با گزارش دهی هفتگی'
    ]
  }
];

export const INITIAL_ADMIN_STATS = {
  totalRevenue: 184500000,
  totalAppointments: 1280,
  totalDoctors: 48,
  totalUsers: 3450,
  totalArticles: 24,
  monthlyRevenueChart: [
    { month: 'فروردین', amount: 12000000 },
    { month: 'اردیبهشت', amount: 22000000 },
    { month: 'خرداد', amount: 31000000 },
    { month: 'تیر', amount: 45000000 },
    { month: 'مرداد', amount: 74500000 }
  ]
};

export const INITIAL_ORDERS: AppointmentOrder[] = [
  {
    id: 'ord-101',
    trackingCode: 'PB-982341',
    patientName: 'علی محمدی',
    patientPhone: '09121112233',
    patientNationalId: '0012345678',
    doctorId: 'doc-1',
    doctorName: 'دکتر محمدرضا صادقی',
    productTitle: 'نوبت مشاوره پوست و زیبایی',
    amount: 450000,
    date: '۱۴۰۳/۰۵/۲۰',
    timeSlot: 'ساعت ۱۶:۳۰',
    status: 'paid',
    createdAt: '۱۴۰۳/۰۵/۱۸',
    paymentRefId: 'ZP-8849201',
    gateway: 'zarinpal'
  },
  {
    id: 'ord-102',
    trackingCode: 'PB-982342',
    patientName: 'زهرا احمدی',
    patientPhone: '09359998877',
    patientNationalId: '0087654321',
    doctorId: 'doc-2',
    doctorName: 'دکتر مریم کاظمی',
    productTitle: 'اکوکاردیوگرافی رنگی',
    amount: 500000,
    date: '۱۴۰۳/۰۵/۲۱',
    timeSlot: 'ساعت ۱۰:۰۰',
    status: 'paid',
    createdAt: '۱۴۰۳/۰۵/۱۹',
    paymentRefId: 'SH-442109',
    gateway: 'shetab'
  },
  {
    id: 'ord-103',
    trackingCode: 'PB-982343',
    patientName: 'حسین کاظمی (پزشک)',
    patientPhone: '09123334455',
    patientNationalId: '1289988771',
    productTitle: 'پکیج طلایی برندسازی پزشکان',
    amount: 24000000,
    date: '۱۴۰۳/۰۵/۱۵',
    timeSlot: 'تحویل ۱ ماهه',
    status: 'paid',
    createdAt: '۱۴۰۳/۰۵/۱۵',
    paymentRefId: 'ZP-100293',
    gateway: 'zarinpal'
  }
];

export const INITIAL_USERS: AppUser[] = [
  { id: 'usr-1', fullName: 'علی محمدی', phone: '09121112233', email: 'ali@example.com', role: 'user', createdAt: '۱۴۰۳/۰۱/۱۰', status: 'active', totalOrdersCount: 4 },
  { id: 'usr-2', fullName: 'زهرا احمدی', phone: '09359998877', email: 'zahra@example.com', role: 'user', createdAt: '۱۴۰۳/02/15', status: 'active', totalOrdersCount: 2 },
  { id: 'usr-3', fullName: 'دکتر محمدرضا صادقی', phone: '09128889900', email: 'dr.sadeghi@pezeshkbartar.com', role: 'doctor', createdAt: '۱۴۰۲/۱۱/۰۱', status: 'active', totalOrdersCount: 154 },
  { id: 'usr-admin', fullName: 'مدیر کل سیستم (پزشک برتر)', phone: '09120000000', email: 'admin@pezeshkbartar.com', role: 'admin', createdAt: '۱۴۰۲/۰۱/۰۱', status: 'active', totalOrdersCount: 0 }
];

export const SHOP_PRODUCTS: ServiceProduct[] = [
  {
    id: 'prod-101',
    title: 'دستگاه فشارسنج دیجیتال بازویی سخنگو امرن (Omron M3)',
    subtitle: 'سنجش دقیق فشارخون و ضربان قلب با حافظه ذخیره‌سازی ۲ کاربره',
    price: 3450000,
    originalPrice: 3900000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600',
    description: 'فشارسنج سنجش بازویی ژاپنی هلمت با نمایشگر بزرگ و خوانا، قابلیت تشخیص آریتمی قلبی و اعلان هشدار سخنگو به زبان فارسی.',
    badge: 'پرفروش‌ترین تجهیزات خانگی',
    features: [
      'دارای گارانتی ۵ ساله شرکت بازرگانی',
      'کاف فشارسنج استاندارد ۲۲ تا ۴۲ سانتی‌متر',
      'ذخیره ۶۰ نتیجه اندازه‌گیری اخیر',
      'کارکرد با برق و باتری قلمی'
    ],
    stockOrSlots: 24
  },
  {
    id: 'prod-102',
    title: 'پالس اکسی‌متر انگشتی دیجیتال بیورر (Beurer PO30)',
    subtitle: 'سنجش اکسیژن خون (SpO2) و نرخ ضربان قلب لحظه‌ای',
    price: 1250000,
    originalPrice: 1500000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600',
    description: 'دستگاه اندازه گیری میزان اکسیژن اشباع خون شریانی به همراه نرخ ضربان با صفحه نمایش OLED رنگی دو حالته.',
    badge: 'تخفیف ویژه پزشک برتر',
    features: [
      'صفحه نمایش صریح OLED رنگی با تنظیم روشنایی',
      'تأییدیه پزشکی اروپایی CE',
      'خاموشی خودکار پس از ۸ ثانیه عدم استفاده',
      'همراه با بند آویز و کیف برزنتی محافظ'
    ],
    stockOrSlots: 40
  },
  {
    id: 'prod-103',
    title: 'دستگاه ماساژور تفنگی (Masseur Gun) هوشمند ضربه‌ای',
    subtitle: 'رفع گرفتگی عضلانی و ماساژ عمقی با ۶ سری تخصصی و ۳۰ سرعت',
    price: 2850000,
    originalPrice: 3300000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=600',
    description: 'ماساژور شارژی موتور بی‌صدا بدون لرزش دست جهت ریلکسیشن، کاهش دردهای ورزشی و تسکین فیبرومیالژیا.',
    badge: 'گارانتی ۱ ساله طلایی',
    features: [
      'باتری لیتیومی ۲۵۰۰ میلی‌آمپر با شارژدهی ۵ ساعته',
      'نمایشگر لمسی LCD جهت تنظیم سرعت',
      'دارای کیف چمدانی ضدضربه سفری',
      '۶ سری متنوع برای تمام نقاط بدن'
    ],
    stockOrSlots: 18
  },
  {
    id: 'prod-104',
    title: 'سرم جوانساز صورت هیالورونیک اسید آلیکین فرام',
    subtitle: 'آبرسانی عمیق لایه‌های اپیدرم، رفع خطوط ریز و شفاف‌کننده پوست',
    price: 890000,
    originalPrice: 1100000,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600',
    description: 'فرمولاسیون اختصاصی حاوی ویتامین B5 و هیالورونیک اسید با وزن مولکولی سه گانه جهت جذب سریع در کلینیک‌های پوست.',
    badge: 'مورد تایید متخصصین پوست',
    features: [
      'حجم ۵۰ میلی‌لیتر بدون پارابن و الکل',
      'مناسب انواع پوست حساس و دهیدراته',
      'افزایش الاستیسیته و شادابی پوست',
      'ساخت فرانسه با مجوز رسمی سازمان غذا و دارو'
    ],
    stockOrSlots: 55
  },
  {
    id: 'prod-105',
    title: 'دستگاه تست قند خون اکیوچک اینستنت (Accu-Chek Instant)',
    subtitle: 'اندازه‌گیری قند خون در کمتر از ۴ ثانیه بدون نیاز به کدگذاری',
    price: 980000,
    originalPrice: 1200000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600',
    description: 'کیت کامل تست قند خون آلمانی شامل دستگاه، قلم لنست، ۱۰ عدد نوار تست قند خون و کیف محافظ.',
    badge: 'کیت کامل',
    features: [
      'پشتیبانی کامل از نوار قند خون در تمام داروخانه‌ها',
      'اتصال بلوتوث به اپلیکیشن موبایل کنترل دیابت',
      'نیاز به نمونه خون بسیار کم (۰.۶ میکرولیتر)',
      'صفحه نمایش بزرگ با نشانگر محدوده هدف رنگی'
    ],
    stockOrSlots: 32
  },
  {
    id: 'prod-106',
    title: 'بخور سرد و گرم اولتراسونیک دیجیتال ۴.۵ لیتری',
    subtitle: 'تنظیم رطوبت هوای اتاق، کاهش حساسیت فصلی و بهبود تنفس',
    price: 2100000,
    originalPrice: 2500000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=600',
    description: 'دستگاه بخور دوکاره با محفظه معطرکننده، فیلتر ضد رسوب صخره‌ای و خاموشی خودکار پس از اتمام آب.',
    badge: 'ارسال رایگان',
    features: [
      'کنترل از راه دور و ریموت دیجیتال',
      'خروجی ۳۶۰ درجه بخار با ۳ درجه تنظیم شدت',
      'مخزن بزرگ ۴.۵ لیتری با کارکرد مداوم ۱۵ ساعته',
      'صدای فوق‌العاده کم کمتر از ۳۰ دسی‌بل'
    ],
    stockOrSlots: 15
  },
  {
    id: 'prod-107',
    title: 'ترازو و آنالیزور هوشمند ترکیب بدن (Smart BMI Scale)',
    subtitle: 'سنجش درصد چربی، جرم استخوان، میزان آب بدن و متابولیسم پایه',
    price: 1750000,
    originalPrice: 2100000,
    rating: 4.85,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600',
    description: 'ترازوی دیجیتال شیشه‌ای مقاوم با سنسورهای BIA شش‌گانه، اتصال اتوماتیک به اپلیکیشن هوشمند iOS و Android.',
    badge: 'هوشمند',
    features: [
      'سنجش ۱۳ شاخص مختلف سلامتی و آنالیز بدن',
      'ذخیره پرونده برای ۱۶ کاربر مختلف',
      'دقت تا ۵۰ گرم و تحمل وزن تا ۱۸۰ کیلوگرم',
      'نمایشگر مخفی LED روی شیشه سکوریت'
    ],
    stockOrSlots: 28
  },
  {
    id: 'prod-108',
    title: 'بالش طبی هوشمند هوشمند مجهز به مموری فوم پرمیوم',
    subtitle: 'تسکین آرتروز گردن، اصلاح فرم ستون فقرات و خواب آرام',
    price: 1450000,
    originalPrice: 1700000,
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600',
    description: 'بالش ارگونومیک طبی با روکش کتانی ضدآلرژی، منفذدار خنک‌کننده و ژل خنک کننده گردن جهت خوابی با کیفیت.',
    badge: 'توصیه فیزیوتراپ‌ها',
    features: [
      'طراحی موج‌دار ۲ طرفه متناسب با انحنای گردن',
      'روکش قابل شستشو در ماشین لباسشویی',
      'عدم تغییر شکل مموری فوم در استفاده طولانی',
      'ضد آلرژی و ضد باکتری'
    ],
    stockOrSlots: 22
  }
];
