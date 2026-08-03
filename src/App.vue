<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import {
  PageRoute,
  Doctor,
  Article,
  SubMenuCategory,
  ServiceProduct,
  BrandingPackage
} from './types';
import { SPECIALTIES, DOCTORS, ARTICLES, SHOP_PRODUCTS } from './data/mockData';

import Header from './components/Header.vue';
import HeroSection from './components/HeroSection.vue';
import DoctorCard from './components/DoctorCard.vue';
import DoctorBookingModal from './components/DoctorBookingModal.vue';
import DoctorBrandingView from './components/DoctorBrandingView.vue';
import ArticlesSection from './components/ArticlesSection.vue';
import ArticleDetailModal from './components/ArticleDetailModal.vue';
import MegaMenuBoxModal from './components/MegaMenuBoxModal.vue';
import PaymentGatewayModal from './components/PaymentGatewayModal.vue';
import AISymptomCheckerModal from './components/AISymptomCheckerModal.vue';
import AdminPanel from './components/AdminPanel.vue';
import ProductsShopView from './components/ProductsShopView.vue';
import ContactUsView from './components/ContactUsView.vue';
import AboutUsView from './components/AboutUsView.vue';
import Footer from './components/Footer.vue';

import {
  Search,
  CheckCircle2,
  Stethoscope,
  ChevronLeft
} from 'lucide-vue-next';

const currentPage = ref<PageRoute>('home');
const doctorsList = ref<Doctor[]>(DOCTORS);
const articlesList = ref<Article[]>(ARTICLES);

// Search Filters
const searchQuery = ref('');
const selectedSpecialty = ref('all');
const selectedCity = ref('all');

// Modals State
const activeMegaSubmenu = ref<SubMenuCategory | null>(null);
const selectedDoctorForBooking = ref<Doctor | null>(null);
const selectedArticleForDetail = ref<Article | null>(null);
const showAiAssistant = ref(false);

// Payment Data State
const paymentTerminalData = ref<{
  title: string;
  amount: number;
  patientName: string;
  patientPhone: string;
  nationalId: string;
  timeSlot?: string;
  doctorId?: string;
  doctorName?: string;
} | null>(null);

// Toast Notification
const toastMessage = ref<string | null>(null);

const showToast = (msg: string) => {
  toastMessage.value = msg;
  setTimeout(() => {
    toastMessage.value = null;
  }, 4000);
};

// Fetch doctors from backend API
const fetchDoctors = async (query = '', specialty = 'all', city = 'all') => {
  try {
    const url = new URL('/api/doctors', window.location.origin);
    if (query) url.searchParams.append('query', query);
    if (specialty !== 'all') url.searchParams.append('specialty', specialty);
    if (city !== 'all') url.searchParams.append('city', city);

    const res = await fetch(url.toString());
    if (res.ok) {
      const data = await res.json();
      doctorsList.value = data.doctors;
    }
  } catch (err) {
    console.error(err);
  }
};

watch([searchQuery, selectedSpecialty, selectedCity], () => {
  fetchDoctors(searchQuery.value, selectedSpecialty.value, selectedCity.value);
});

onMounted(() => {
  fetchDoctors(searchQuery.value, selectedSpecialty.value, selectedCity.value);
});

const handleNavigate = (page: PageRoute) => {
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleHeroSearch = (q: string, s: string, c: string) => {
  searchQuery.value = q;
  selectedSpecialty.value = s;
  selectedCity.value = c;
  handleNavigate('search');
};

// Payment trigger for a product from the 15-item submenu
const handleSelectProductToPay = (product: ServiceProduct) => {
  paymentTerminalData.value = {
    title: product.title,
    amount: product.price,
    patientName: 'کاربر پزشک برتر',
    patientPhone: '09121112233',
    nationalId: '0012345678',
    timeSlot: 'تحویل / ارائه آنلاین'
  };
};

// Payment trigger for branding package
const handleSelectPackageToBuy = (pkg: BrandingPackage) => {
  paymentTerminalData.value = {
    title: `خرید پکیج ${pkg.name} برندسازی پزشکان`,
    amount: pkg.price,
    patientName: 'پزشک متقاضی',
    patientPhone: '09128889900',
    nationalId: '1289988771',
    timeSlot: 'تحویل ۱ ماهه'
  };
};

const handlePaymentSuccess = (receipt: any) => {
  showToast(`پرداخت با موفقیت انجام شد. کد پیگیری: ${receipt.paymentRefId}`);
};
</script>

<template>
  <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between selection:bg-teal-500 selection:text-white">
    
    <!-- Toast Notification Popup -->
    <div
      v-if="toastMessage"
      className="fixed bottom-6 left-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-teal-500 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 text-xs font-bold dir-rtl"
    >
      <CheckCircle2 className="w-5 h-5 text-teal-400" />
      <span>{{ toastMessage }}</span>
    </div>

    <!-- Main Header -->
    <Header
      v-if="currentPage !== 'admin'"
      :currentPage="currentPage"
      @navigate="handleNavigate"
      @openMegaCategory="(sub) => activeMegaSubmenu = sub"
      @openAiAssistant="showAiAssistant = true"
      @openAdmin="currentPage = 'admin'"
    />

    <!-- Main Body Routing -->
    <main className="flex-1">
      <AdminPanel v-if="currentPage === 'admin'" @close="currentPage = 'home'" />

      <template v-else>
        <!-- Home Page -->
        <div v-if="currentPage === 'home'" className="space-y-16">
          
          <!-- Hero Section -->
          <HeroSection
            :specialties="SPECIALTIES"
            @search="handleHeroSearch"
            @openBrandingPage="handleNavigate('doctor-branding')"
            @openAiAssistant="showAiAssistant = true"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            
            <!-- Specialties Grid -->
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">
                    تخصص‌های پزشکی
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 mt-1">
                    جستجو بر اساس تخصص پزشکی
                  </h2>
                </div>
                <button
                  @click="handleNavigate('search')"
                  className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>مشاهده همه</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                <div
                  v-for="spec in SPECIALTIES"
                  :key="spec.id"
                  @click="handleHeroSearch('', spec.id, 'all')"
                  className="bg-white p-4 rounded-2xl border border-slate-200/80 hover:border-teal-400 shadow-xs hover:shadow-lg transition cursor-pointer text-center space-y-2 group transform hover:-translate-y-1"
                >
                  <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mx-auto group-hover:bg-teal-600 group-hover:text-white transition">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs line-clamp-1">{{ spec.name }}</h4>
                  <span className="text-[10px] text-slate-400 block">{{ spec.doctorCount }} پزشک</span>
                </div>
              </div>
            </section>

            <!-- Top VIP Branded Doctors Showcase -->
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-400 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full">
                      VIP BRANDED
                    </span>
                    <span className="text-slate-400 text-xs">تحت پوشش خدمات برندسازی پزشک برتر</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mt-1">
                    پزشکان برجسته و برندهای پزشکی کشور
                  </h2>
                </div>

                <button
                  @click="handleNavigate('search')"
                  className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>لیست کامل پزشکان</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <DoctorCard
                  v-for="doc in doctorsList.slice(0, 3)"
                  :key="doc.id"
                  :doctor="doc"
                  @bookAppointment="(d) => selectedDoctorForBooking = d"
                />
              </div>
            </section>

            <!-- Doctor Branding Teaser Section -->
            <section className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-950 text-white rounded-3xl p-8 lg:p-12 border border-teal-500/30 shadow-2xl relative overflow-hidden">
              <div className="max-w-2xl space-y-4 relative z-10">
                <span className="bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full">
                  ویژه پزشکان و کلینیک‌ها
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  برندسازی شخصی پزشکان در «پزشک برتر»
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  با طراحی وب‌سایت تخصصی، سئوی رتبه ۱ گوگل، ساخت ویدیوهای اینستاگرامی و سامانه اختصاصی نوبت‌دهی بدون کارمزد، مطب خود را برند کنید.
                </p>
                <button
                  @click="handleNavigate('doctor-branding')"
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-6 py-3 rounded-2xl text-xs shadow-xl transition cursor-pointer"
                >
                  ورود به بخش برندسازی پزشکان
                </button>
              </div>
            </section>

            <!-- Shop Products Home Teaser -->
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="bg-amber-100 text-amber-900 text-xs font-black px-2.5 py-0.5 rounded-full">
                    فروشگاه سلامت
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 mt-1">
                    محصولات و تجهیزات پرفروش سلامت
                  </h2>
                </div>

                <button
                  @click="handleNavigate('shop')"
                  className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1 cursor-pointer bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200"
                >
                  <span>ورود به فروشگاه آنلاین</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div
                  v-for="prod in SHOP_PRODUCTS.slice(0, 4)"
                  :key="prod.id"
                  className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3 hover:border-amber-400 hover:shadow-lg transition flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <img :src="prod.image" :alt="prod.title" className="w-full h-40 object-cover rounded-2xl" />
                    <span v-if="prod.badge" className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      {{ prod.badge }}
                    </span>
                    <h4 className="font-bold text-slate-900 text-xs line-clamp-2">{{ prod.title }}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{{ prod.subtitle }}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-black text-teal-800 font-mono">
                      {{ prod.price.toLocaleString('fa-IR') }} تومان
                    </span>
                    <button
                      @click="handleSelectProductToPay(prod)"
                      className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      خرید سریع
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <!-- Articles Health Magazine -->

            <!-- Articles Health Magazine -->
            <ArticlesSection
              :articles="articlesList"
              @selectArticle="(art) => selectedArticleForDetail = art"
            />

          </div>
        </div>

        <!-- Doctor Search Page -->
        <div v-else-if="currentPage === 'search'" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
          
          <!-- Search Bar & Filters -->
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h1 className="text-2xl font-black text-slate-900">
              جستجوی آنلاین پزشکان و دریافت نوبت
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
                <input
                  type="text"
                  v-model="searchQuery"
                  placeholder="نام پزشک، بیماری یا کد نظام پزشکی..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-9 pl-3 py-2.5 text-xs focus:bg-white focus:outline-none"
                />
              </div>

              <select
                v-model="selectedSpecialty"
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs cursor-pointer"
              >
                <option value="all">همه تخصص‌ها</option>
                <option v-for="s in SPECIALTIES" :key="s.id" :value="s.id">{{ s.name }}</option>
              </select>

              <select
                v-model="selectedCity"
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs cursor-pointer"
              >
                <option value="all">همه شهرها</option>
                <option value="تهران">تهران</option>
                <option value="اصفهان">اصفهان</option>
                <option value="مشهد">مشهد</option>
                <option value="شیراز">شیراز</option>
                <option value="کرج">کرج</option>
              </select>
            </div>
          </div>

          <!-- Search Results -->
          <div className="space-y-4">
            <span className="text-xs font-bold text-slate-500">
              تعداد {{ doctorsList.length }} پزشک پیدا شد
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DoctorCard
                v-for="doc in doctorsList"
                :key="doc.id"
                :doctor="doc"
                @bookAppointment="(d) => selectedDoctorForBooking = d"
              />
            </div>
          </div>

        </div>

        <!-- Shop Products Page -->
        <div v-else-if="currentPage === 'shop'" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProductsShopView
            @buyProduct="handleSelectProductToPay"
          />
        </div>

        <!-- Doctor Branding Page -->
        <div v-else-if="currentPage === 'doctor-branding'" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DoctorBrandingView
            @selectPackageToBuy="handleSelectPackageToBuy"
            @navigateToContact="handleNavigate('contact')"
          />
        </div>

        <!-- Articles Page -->
        <div v-else-if="currentPage === 'articles'" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ArticlesSection
            :articles="articlesList"
            @selectArticle="(art) => selectedArticleForDetail = art"
          />
        </div>

        <!-- Contact Page -->
        <ContactUsView v-else-if="currentPage === 'contact'" />

        <!-- About Page -->
        <AboutUsView v-else-if="currentPage === 'about'" />
      </template>
    </main>

    <!-- Submenu Modal with 15 Products/Services -->
    <MegaMenuBoxModal
      :submenu="activeMegaSubmenu"
      @close="activeMegaSubmenu = null"
      @selectProductToPay="handleSelectProductToPay"
    />

    <!-- Doctor Booking Modal -->
    <DoctorBookingModal
      :doctor="selectedDoctorForBooking"
      @close="selectedDoctorForBooking = null"
      @proceedToPayment="(booking) => {
        selectedDoctorForBooking = null;
        paymentTerminalData = booking;
      }"
    />

    <!-- Article Detail Reader Modal -->
    <ArticleDetailModal
      :article="selectedArticleForDetail"
      @close="selectedArticleForDetail = null"
    />

    <!-- Iranian Shetab/ZarinPal Payment Gateway Modal -->
    <PaymentGatewayModal
      :paymentData="paymentTerminalData"
      @close="paymentTerminalData = null"
      @paymentSuccess="handlePaymentSuccess"
    />

    <!-- AI Symptom Checker Modal -->
    <AISymptomCheckerModal
      v-if="showAiAssistant"
      @close="showAiAssistant = false"
      @navigateToSearch="() => handleNavigate('search')"
    />

    <!-- Main Footer -->
    <Footer
      v-if="currentPage !== 'admin'"
      @navigate="handleNavigate"
      @openAdmin="currentPage = 'admin'"
    />

  </div>
</template>
