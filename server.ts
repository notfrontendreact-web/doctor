import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import {
  DOCTORS,
  ARTICLES,
  MENU_CATEGORIES,
  INITIAL_ADMIN_STATS,
  INITIAL_ORDERS,
  INITIAL_USERS,
  SPECIALTIES,
  BRANDING_PACKAGES
} from './src/data/mockData.js';
import { AppointmentOrder, AppUser, Doctor, Article } from './src/types.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Mutable in-memory stores for runtime CRUD and admin interactions
let ordersStore: AppointmentOrder[] = [...INITIAL_ORDERS];
let usersStore: AppUser[] = [...INITIAL_USERS];
let doctorsStore: Doctor[] = [...DOCTORS];
let articlesStore: Article[] = [...ARTICLES];

// --- API ENDPOINTS ---

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Categories & Megamenu items (includes 15 products per submenu)
app.get('/api/categories', (req, res) => {
  res.json({ categories: MENU_CATEGORIES });
});

// Doctors API (Search & Filter)
app.get('/api/doctors', (req, res) => {
  const { query, specialty, city, isBranded } = req.query;
  let results = [...doctorsStore];

  if (query && typeof query === 'string') {
    const q = query.trim().toLowerCase();
    results = results.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.title.toLowerCase().includes(q) ||
        d.specialtyName.toLowerCase().includes(q) ||
        d.city.toLowerCase().includes(q) ||
        d.medicalCouncilNumber.includes(q)
    );
  }

  if (specialty && typeof specialty === 'string' && specialty !== 'all') {
    results = results.filter((d) => d.specialtyId === specialty);
  }

  if (city && typeof city === 'string' && city !== 'all') {
    results = results.filter((d) => d.city === city);
  }

  if (isBranded === 'true') {
    results = results.filter((d) => d.isBranded);
  }

  res.json({ doctors: results, total: results.length });
});

app.get('/api/doctors/:id', (req, res) => {
  const doctor = doctorsStore.find((d) => d.id === req.params.id);
  if (!doctor) {
    return res.status(404).json({ error: 'پزشک مورد نظر یافت نشد' });
  }
  res.json(doctor);
});

// Admin add/update doctor
app.post('/api/doctors', (req, res) => {
  const newDoctor: Doctor = {
    id: `doc-${Date.now()}`,
    name: req.body.name || 'پزشک جدید',
    title: req.body.title || 'متخصص',
    specialtyId: req.body.specialtyId || 'general',
    specialtyName: req.body.specialtyName || 'عمومی',
    medicalCouncilNumber: req.body.medicalCouncilNumber || `${Math.floor(100000 + Math.random() * 900000)}`,
    avatar: req.body.avatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    city: req.body.city || 'تهران',
    address: req.body.address || 'آدرس ثبت نشده',
    phone: req.body.phone || '02100000000',
    rating: 5.0,
    reviewCount: 1,
    consultationFee: req.body.consultationFee || 400000,
    isBranded: req.body.isBranded || false,
    brandingPackage: req.body.brandingPackage,
    bio: req.body.bio || 'توضیحات پزشک',
    experienceYears: req.body.experienceYears || 5,
    availableSlots: ['فردا ساعت ۱۰:۰۰', 'فردا ساعت ۱۶:۰۰'],
    services: req.body.services || ['مشاوره تخصصی'],
    clinicImages: []
  };
  doctorsStore.unshift(newDoctor);
  res.json({ success: true, doctor: newDoctor });
});

// Articles API
app.get('/api/articles', (req, res) => {
  const { category, search } = req.query;
  let results = [...articlesStore];

  if (category && typeof category === 'string' && category !== 'all') {
    results = results.filter((a) => a.category === category);
  }

  if (search && typeof search === 'string') {
    const s = search.toLowerCase();
    results = results.filter((a) => a.title.toLowerCase().includes(s) || a.summary.toLowerCase().includes(s));
  }

  res.json({ articles: results });
});

app.get('/api/articles/:id', (req, res) => {
  const article = articlesStore.find((a) => a.id === req.params.id);
  if (!article) {
    return res.status(404).json({ error: 'مقاله مورد نظر یافت نشد' });
  }
  // increment views
  article.views += 1;
  res.json(article);
});

app.post('/api/articles', (req, res) => {
  const newArt: Article = {
    id: `art-${Date.now()}`,
    title: req.body.title || 'مقاله پزشکی جدید',
    slug: `article-${Date.now()}`,
    summary: req.body.summary || 'خلاصه مقاله پزشکی',
    content: req.body.content || 'متن کامل مقاله...',
    authorName: req.body.authorName || 'تیم تحریریه پزشک برتر',
    authorRole: 'کارشناس ارشد سلامت',
    authorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150',
    category: req.body.category || 'پوست و زیبایی',
    imageUrl: req.body.imageUrl || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    date: new Date().toLocaleDateString('fa-IR'),
    readTimeMinutes: 5,
    views: 1,
    likes: 0,
    tags: ['پزشک برتر', 'سلامت']
  };
  articlesStore.unshift(newArt);
  res.json({ success: true, article: newArt });
});

// Branding Packages API
app.get('/api/branding-packages', (req, res) => {
  res.json({ packages: BRANDING_PACKAGES });
});

// Iranian Shetab / ZarinPal Payment Gateway API Simulation
app.post('/api/payment/request', (req, res) => {
  const { amount, description, mobile, callbackUrl, title, doctorId, timeSlot } = req.body;

  if (!amount || amount < 1000) {
    return res.status(400).json({ error: 'مبلغ پرداختی معتبر نیست' });
  }

  const authority = `ZP-AUTH-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const trackingCode = `PB-${Math.floor(100000 + Math.random() * 900000)}`;

  // Create pending order
  const newOrder: AppointmentOrder = {
    id: `ord-${Date.now()}`,
    trackingCode,
    patientName: req.body.patientName || 'کاربر مهمان',
    patientPhone: mobile || '09120000000',
    patientNationalId: req.body.nationalId || '0012345678',
    doctorId: doctorId,
    doctorName: req.body.doctorName,
    productTitle: title || description || 'خدمات پزشک برتر',
    amount: Number(amount),
    date: new Date().toLocaleDateString('fa-IR'),
    timeSlot: timeSlot || 'نوبت آنلاین',
    status: 'pending',
    createdAt: new Date().toLocaleDateString('fa-IR'),
    paymentRefId: authority,
    gateway: 'zarinpal'
  };

  ordersStore.unshift(newOrder);

  res.json({
    success: true,
    authority,
    trackingCode,
    orderId: newOrder.id,
    paymentUrl: `/payment-gateway?authority=${authority}&amount=${amount}`
  });
});

app.post('/api/payment/verify', (req, res) => {
  const { authority, orderId, cardNumber } = req.body;

  const order = ordersStore.find((o) => o.paymentRefId === authority || o.id === orderId);
  if (!order) {
    return res.status(404).json({ error: 'سفارش یا تراکنش معتبر یافت نشد' });
  }

  // Complete payment simulation
  order.status = 'paid';
  const refId = `REF-${Math.floor(10000000 + Math.random() * 90000000)}`;
  order.paymentRefId = refId;

  res.json({
    success: true,
    message: 'پرداخت با موفقیت انجام شد',
    refId,
    trackingCode: order.trackingCode,
    order
  });
});

// Admin Stats & Management APIs
app.get('/api/admin/stats', (req, res) => {
  const totalRevenue = ordersStore
    .filter((o) => o.status === 'paid')
    .reduce((sum, o) => sum + o.amount, 0);

  res.json({
    ...INITIAL_ADMIN_STATS,
    totalRevenue: totalRevenue > 0 ? totalRevenue : INITIAL_ADMIN_STATS.totalRevenue,
    totalAppointments: ordersStore.length,
    totalDoctors: doctorsStore.length,
    totalUsers: usersStore.length,
    totalArticles: articlesStore.length,
    recentOrders: ordersStore.slice(0, 10)
  });
});

app.get('/api/admin/orders', (req, res) => {
  res.json({ orders: ordersStore });
});

app.put('/api/admin/orders/:id', (req, res) => {
  const order = ordersStore.find((o) => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'سفارش یافت نشد' });

  if (req.body.status) order.status = req.body.status;
  res.json({ success: true, order });
});

app.get('/api/admin/users', (req, res) => {
  res.json({ users: usersStore });
});

app.put('/api/admin/users/:id', (req, res) => {
  const user = usersStore.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'کاربر یافت نشد' });

  if (req.body.status) user.status = req.body.status;
  if (req.body.role) user.role = req.body.role;
  res.json({ success: true, user });
});

// AI Medical Symptom Checker Endpoint using Gemini API
app.post('/api/ai/symptom-checker', async (req, res) => {
  const { symptoms, age, gender } = req.body;

  if (!symptoms) {
    return res.status(400).json({ error: 'لطفا علائم یا سوال خود را وارد کنید' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `شما یک دستیار هوشمند پزشکی متخصص در پلتفرم "پزشک برتر" هستید.
کاربر علائم یا سوال زیر را مطرح کرده است:
علائم: "${symptoms}"
سن: ${age || 'نامشخص'}
جنسیت: ${gender || 'نامشخص'}

لطفاً پاسخی دقیق، محترمانه و کاربردی به زبان فارسی و با لحن گرم و حرفه‌ای ارائه دهید:
۱. تحلیل احتمالی علائم به زبان ساده
۲. کدام تخصص پزشکی (مثلا متخصص پوست، قلب، مغز و اعصاب، عمومی و...) مناسب‌ترین گزینه برای مراجعه است
۳. نکات مراقبتی اولیه و حیاتی
۴. سلب مسئولیت پزشکی (توصیه به مراجعه فوری به پزشک برتر در صورت وجود علائم خطر)
پاسخ را در قالب چند بخش کوتاه با ایموجی‌های مناسب فرمت‌بندی کنید.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      return res.json({ answer: response.text });
    } else {
      // Fallback rule-based response
      return res.json({
        answer: `👨‍⚕️ **تحلیل اولیه علائم بر اساس هوش مصنوعی پزشک برتر**

بر اساس توضیحات شما: "${symptoms}"

🔍 **توصیه تخصصی:**
- جهت بررسی دقیق‌تر پیشنهاد می‌شود با یک **متخصص پزشکی عمومی** یا **تخصص مربوطه** در سامانه پزشک برتر نوبت دریافت کنید.
- علائم شما نیاز به ارزیابی بالینی، معاینه فیزیکی و در صورت لزوم آزمایش‌های تکمیلی دارد.

⚡ **اقدامات اولیه پیشنهادی:**
- استراحت کافی و مصرف مایعات
- اجتناب از خوددرمانی و مصرف بدون نسخه داروها

⚠️ **تذکر مهم:** این پاسخ صرفاً جنبه راهنمایی دارد و جایگزین تشخیص مستقیم پزشک نیست. در صورت داشتن علائم شدید (مانند درد شدید قفسه سینه، تنگی نفس شدید یا بی‌حسی ناگهانی) فوراً به اورژانس مراجعه فرمایید.`
      });
    }
  } catch (err: any) {
    console.error('Gemini AI Error:', err);
    res.json({
      answer: `پاسخ پیشنهادی پزشک برتر: علائم شما جهت تشخیص دقیق نیازمند رزرو نوبت آنلاین و مشاوره با پزشکان متخصص ما می‌باشد.`
    });
  }
});

// --- VITE / STATIC SERVING SETUP ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
