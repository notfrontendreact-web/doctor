<script setup lang="ts">
import { ShieldCheck, Award, HeartPulse, Sparkles, CheckCircle2 } from 'lucide-vue-next';
</script>

<template>
  <div className="max-w-4xl mx-auto space-y-12 py-8 animate-in fade-in duration-300 text-slate-800">
    
    <!-- Hero -->
    <div className="text-center space-y-4">
      <span className="bg-teal-100 text-teal-800 text-xs font-black px-3 py-1 rounded-full">
        درباره پلتفرم پزشک برتر
      </span>
      <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
        سامانه جامع نوبت‌دهی، مجله سلامت و برندسازی تخصصی پزشکان
      </h1>
      <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
        «پزشک برتر» با هدف ارتقای کیفیت خدمات درمانی و تسهیل ارتباط بیماران با برجسته‌ترین پزشکان متخصص کشور تاسیس گردیده است.
      </p>
    </div>

    <!-- Grid Features -->
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs text-center space-y-3">
        <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto">
          <HeartPulse className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-slate-900 text-base">دسترسی آسان به پزشکان</h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          رزرو نوبت در کمتر از ۱ دقیقه با درگاه آنلاین شتاب بدون نیاز به تماس تلفنی و معطلی در مطب.
        </p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs text-center space-y-3">
        <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-slate-900 text-base">تخصصی‌ترین برندسازی</h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          طراحی وب‌سایت، سئوی گوگل و تولید محتوای ویدیویی برای پزشکانی که می‌خواهند مرجع حوزه خود باشند.
        </p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs text-center space-y-3">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-slate-900 text-base">احراز هویت و نظارت علمی</h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          استعلام رسمی کد نظام پزشکی و ارزیابی کیفیت خدمات درمانی تمام پزشکان فعال در پلتفرم.
        </p>
      </div>
    </div>

    <!-- Story -->
    <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl space-y-4">
      <h3 className="text-xl font-black text-amber-300">چرا «پزشک برتر» را انتخاب کنیم؟</h3>
      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify">
        ما معتقدیم که هر بیمار شایسته دریافت بهترین مراقبت‌های پزشکی است و از طرفی، پزشکان برجسته کشور باید بستر نرم‌افزاری و رسانه‌ای شایسته‌ای برای معرفی تخصص خود داشته باشند. سامانه پزشک برتر زیرساختی مجهز، امن و هوشمند ایجاد کرده تا این دو نیاز مهم را به بهترین نحو پاسخ دهد.
      </p>
    </div>

  </div>
</template>
