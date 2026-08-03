<script setup lang="ts">
import { ref, computed } from 'vue';
import { ShoppingCart, Search, Star, ShieldCheck, Truck, CreditCard, Sparkles, Check, ChevronLeft } from 'lucide-vue-next';
import { ServiceProduct } from '../types';
import { SHOP_PRODUCTS } from '../data/mockData';

const emit = defineEmits<{
  (e: 'buyProduct', product: ServiceProduct): void;
}>();

const searchQuery = ref('');
const selectedCategory = ref('all');
const selectedProductModal = ref<ServiceProduct | null>(null);

const categories = [
  { id: 'all', title: 'همه محصولات' },
  { id: 'monitoring', title: 'سنجش و پایش سلامت' },
  { id: 'beauty', title: 'مراقبت و زیبایی پوست' },
  { id: 'wellness', title: 'تجهیزات ماساژ و طبی' }
];

const filteredProducts = computed(() => {
  return SHOP_PRODUCTS.filter((prod) => {
    const matchesSearch =
      prod.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      prod.subtitle.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.value.toLowerCase());

    if (selectedCategory.value === 'all') return matchesSearch;
    if (selectedCategory.value === 'monitoring') {
      return matchesSearch && (prod.title.includes('فشارسنج') || prod.title.includes('اکسی‌متر') || prod.title.includes('تست قند') || prod.title.includes('ترازو'));
    }
    if (selectedCategory.value === 'beauty') {
      return matchesSearch && (prod.title.includes('سرم') || prod.title.includes('پوست') || prod.title.includes('بخور'));
    }
    if (selectedCategory.value === 'wellness') {
      return matchesSearch && (prod.title.includes('ماساژور') || prod.title.includes('بالش'));
    }
    return matchesSearch;
  });
});
</script>

<template>
  <div className="max-w-7xl mx-auto space-y-10 py-6 animate-in fade-in duration-300 dir-rtl">
    
    <!-- Hero Banner -->
    <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-8 lg:p-12 border border-teal-500/20 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black">
          <Sparkles className="w-3.5 h-3.5" />
          <span>فروشگاه آنلاین محصولات سلامت و تجهیزات</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          خرید تجهیزات سنجش سلامت، ماساژورها و محصولات زیبایی اصل
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          تمام محصولات دارای ضمانت اصالت کالا، گارانتی رسمی شرکت‌های معتبر تجهیزات پزشکی و ارسال سریع با درگاه آنلاین شتاب می‌باشند.
        </p>

        <!-- Guarantee Pills -->
        <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-teal-300">
          <div className="flex items-center gap-1.5 bg-teal-900/50 border border-teal-500/30 px-3 py-1.5 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>ضمانت اصالت و سلامت فیزیکی</span>
          </div>
          <div className="flex items-center gap-1.5 bg-teal-900/50 border border-teal-500/30 px-3 py-1.5 rounded-xl">
            <Truck className="w-4 h-4 text-teal-400" />
            <span>ارسال سریع سراسر کشور</span>
          </div>
          <div className="flex items-center gap-1.5 bg-teal-900/50 border border-teal-500/30 px-3 py-1.5 rounded-xl">
            <CreditCard className="w-4 h-4 text-teal-400" />
            <span>پرداخت امن درگاه بانکی</span>
          </div>
        </div>
      </div>

      <div className="w-full md:w-72 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center space-y-3 shrink-0">
        <ShoppingCart className="w-12 h-12 text-amber-300 mx-auto animate-bounce" />
        <h3 className="font-black text-white text-base">پشتیبانی خریداران محصولات</h3>
        <p className="text-xs text-slate-300">ارائه مشاوره تخصصی قبل از خرید دستگاه‌های پزشکی</p>
        <div className="text-amber-300 font-mono font-bold text-sm dir-ltr">۰۲۱-۸۸۸۸۹۹۰۰</div>
      </div>
    </div>

    <!-- Search & Filter Controls -->
    <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <!-- Category Filter Tabs -->
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="selectedCategory = cat.id"
            :class="[
              'px-4 py-2.5 rounded-2xl font-bold text-xs transition cursor-pointer',
              selectedCategory === cat.id
                ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            ]"
          >
            {{ cat.title }}
          </button>
        </div>

        <!-- Search Input -->
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
          <input
            type="text"
            v-model="searchQuery"
            placeholder="جستجوی نام محصول، برند یا کاربرد..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pr-10 pl-3 py-2.5 text-xs focus:bg-white focus:outline-none focus:border-teal-500 transition"
          />
        </div>

      </div>
    </div>

    <!-- Products Grid -->
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-slate-900">محصولات آماده سفارش و ارسال آنلاین</h2>
        <span className="text-xs font-bold text-slate-500">
          تعداد {{ filteredProducts.length }} محصول یافت شد
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="prod in filteredProducts"
          :key="prod.id"
          className="bg-white rounded-3xl border border-slate-200/90 hover:border-teal-400 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group transform hover:-translate-y-1"
        >
          <div>
            <!-- Image & Badges -->
            <div className="relative h-48 overflow-hidden bg-slate-100">
              <img
                :src="prod.image"
                :alt="prod.title"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span
                v-if="prod.badge"
                className="absolute top-3 right-3 bg-amber-400 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-full shadow-md"
              >
                {{ prod.badge }}
              </span>
              <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-amber-300 px-2 py-0.5 rounded-lg text-[10px] font-bold flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-300" />
                <span>{{ prod.rating }}</span>
              </div>
            </div>

            <!-- Card Content -->
            <div className="p-5 space-y-3">
              <h3 className="font-black text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-teal-700 transition">
                {{ prod.title }}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {{ prod.subtitle }}
              </p>

              <!-- Features checklist -->
              <ul className="space-y-1 text-[11px] text-slate-600 border-t border-slate-100 pt-3">
                <li v-for="(feat, idx) in prod.features.slice(0, 2)" :key="idx" className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span className="line-clamp-1">{{ feat }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Card Footer & Pricing -->
          <div className="p-5 pt-0 space-y-3">
            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <div>
                <span v-if="prod.originalPrice" className="line-through text-[11px] text-slate-400 block font-mono">
                  {{ prod.originalPrice.toLocaleString('fa-IR') }} تومان
                </span>
                <span className="text-sm font-black text-teal-800 font-mono">
                  {{ prod.price.toLocaleString('fa-IR') }} تومان
                </span>
              </div>

              <button
                @click="selectedProductModal = prod"
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition cursor-pointer text-xs font-bold"
              >
                جزئیات
              </button>
            </div>

            <button
              @click="emit('buyProduct', prod)"
              className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>خرید آنلاین شتاب</span>
            </button>
          </div>

        </div>
      </div>
    </div>

    <!-- Product Detail Modal -->
    <div
      v-if="selectedProductModal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in"
    >
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden space-y-6 p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          @click="selectedProductModal = null"
          className="absolute left-5 top-5 w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-700 font-bold transition cursor-pointer"
        >
          ✕
        </button>

        <div className="flex flex-col sm:flex-row gap-6">
          <img
            :src="selectedProductModal.image"
            :alt="selectedProductModal.title"
            className="w-full sm:w-56 h-56 object-cover rounded-2xl border border-slate-200"
          />

          <div className="space-y-3 flex-1">
            <span v-if="selectedProductModal.badge" className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              {{ selectedProductModal.badge }}
            </span>
            <h3 className="font-black text-slate-900 text-base sm:text-lg">
              {{ selectedProductModal.title }}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {{ selectedProductModal.description }}
            </p>

            <div className="pt-2 border-t border-slate-100 space-y-1">
              <span className="text-xs font-bold text-slate-800 block">ویژگی‌های اصلی محصول:</span>
              <ul className="space-y-1 text-xs text-slate-600">
                <li v-for="(f, i) in selectedProductModal.features" :key="i" className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>{{ f }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div>
            <span className="text-xs text-slate-500 block">مبلغ قابل پرداخت:</span>
            <span className="text-lg font-black text-teal-800 font-mono">
              {{ selectedProductModal.price.toLocaleString('fa-IR') }} تومان
            </span>
          </div>

          <button
            @click="() => {
              const p = selectedProductModal;
              selectedProductModal = null;
              if (p) emit('buyProduct', p);
            }"
            className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white font-black text-xs rounded-2xl shadow-lg transition cursor-pointer flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>ثبت سفارش و پرداخت آنلاین</span>
          </button>
        </div>

      </div>
    </div>

  </div>
</template>
