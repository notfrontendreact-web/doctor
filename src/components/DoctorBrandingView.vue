<script setup lang="ts">
import { ref } from 'vue';
import { BrandingPackage } from '../types';
import { BRANDING_PACKAGES } from '../data/mockData';
import { Sparkles, Check, Globe, Video, TrendingUp, ShieldCheck, Star, Award, PhoneCall, ArrowLeft } from 'lucide-vue-next';

const emit = defineEmits<{
  (e: 'selectPackageToBuy', pkg: BrandingPackage): void;
  (e: 'navigateToContact'): void;
}>();

const selectedPackageId = ref('pkg-gold');
</script>

<template>
  <div className="space-y-16 pb-16 animate-in fade-in duration-300">
    
    <!-- Hero Banner for Doctor Branding -->
    <section className="relative bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl overflow-hidden p-8 lg:p-16 border border-teal-500/20 shadow-2xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-3xl relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 px-4 py-1.5 rounded-full text-xs font-bold">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>خدمات تخصصی برندسازی پزشکان (Doctor Branding)</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          برند شخصی خود را بسازید؛ <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-teal-300 to-cyan-300">
            دیده شوید و مرجع شماره ۱ حوزه تخصصی خود باشید
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          امروزه بیش از ۸۵٪ بیماران، پیش از مراجعه به مطب، نام پزشک را در گوگل و اینستاگرام جستجو می‌کنند. با خدمات ۳۶۰ درجه پزشک برتر، مطب خود را به یک برند شناخته‌شده و پرطرفدار تبدیل کنید.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href="#packages"
            className="bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-xs sm:text-sm shadow-xl shadow-amber-400/20 hover:scale-105 transition active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <span>مشاهده پکیج‌ها و تعرفه‌ها</span>
            <ArrowLeft className="w-4 h-4" />
          </a>

          <button
            @click="emit('navigateToContact')"
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3.5 rounded-2xl text-xs sm:text-sm backdrop-blur-md transition flex items-center gap-2 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-teal-300" />
            <span>درخواست مشاوره رایگان</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Why Doctor Branding Pillars -->
    <section className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          خدمات برندسازی پزشک برتر شامل چیست؟
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          ارائه استراتژی‌های جدید بازاریابی اخلاقی و جذب هدفمند بیماران در سراسر ایران
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl transition space-y-3 group">
          <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center font-bold group-hover:bg-teal-600 group-hover:text-white transition">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">سایت و سئوی اختصاصی</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            طراحی وب‌سایت با بالاترین سرعت و کسب رتبه ۱ گوگل در کلمات کلیدی تخصص شما (مثلا: بهترین جراح فک اصفهان).
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl transition space-y-3 group">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center font-bold group-hover:bg-purple-600 group-hover:text-white transition">
            <Video className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">تولید محتوا و ریلز</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            سناریونویسی علمی، فیلم‌برداری حرفه‌ای در مطب و ادیت وایرال ویدیوهای آموزشی پزشکی.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl transition space-y-3 group">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center font-bold group-hover:bg-amber-600 group-hover:text-white transition">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">سامانه نوبت‌دهی آنلاین</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            اتصال مطب به درگاه پرداخت مستقیم، ارسال پیامک یادآوری خودکار و مدیریت پرونده‌ها.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl transition space-y-3 group">
          <div className="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center font-bold group-hover:bg-cyan-600 group-hover:text-white transition">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">ثبت در گوگلمپ و نقشه</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            ثبت موقعیت جغرافیایی مطب در Google Maps، نشان و بلد جهت مسیریابی آسان بیماران.
          </p>
        </div>
      </div>
    </section>

    <!-- Packages Section -->
    <section id="packages" className="space-y-8 pt-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="bg-amber-100 text-amber-800 text-xs font-black px-3 py-1 rounded-full">
          تعرفه‌های شفاف برندسازی
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          پکیج‌های برندسازی پزشکان
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          امکان پرداخت مستقیم آنلاین با درگاه بانکی شتاب و تحویل فوری خدمات
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div
          v-for="pkg in BRANDING_PACKAGES"
          :key="pkg.id"
          :class="[
            'bg-white rounded-3xl border transition-all duration-300 p-8 flex flex-col justify-between relative',
            pkg.isPopular
              ? 'border-2 border-amber-500 shadow-2xl scale-105 z-10'
              : 'border-slate-200 shadow-md hover:shadow-xl'
          ]"
        >
          <span v-if="pkg.isPopular" className="absolute -top-4 right-1/2 translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 text-xs font-black px-4 py-1 rounded-full shadow-md">
            پرطرفدارترین پکیج انتخاب شده توسط پزشکان
          </span>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400">سطح پکیج:</span>
                <span className="text-xs font-black text-amber-600">{{ pkg.name }}</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">{{ pkg.title }}</h3>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <span className="text-xs text-slate-500 block">سرمایه‌گذاری برندسازی:</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black text-teal-800">
                  {{ pkg.price.toLocaleString('fa-IR') }}
                </span>
                <span className="text-xs font-medium text-slate-600">تومان</span>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-700">
              <li v-for="(feat, fIdx) in pkg.features" :key="fIdx" className="flex items-start gap-2">
                <div className="p-0.5 bg-teal-100 text-teal-700 rounded-md shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="leading-relaxed">{{ feat }}</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <button
              @click="emit('selectPackageToBuy', pkg)"
              :class="[
                'w-full py-3.5 rounded-2xl font-black text-xs transition shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95',
                pkg.isPopular
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 shadow-amber-500/20'
                  : 'bg-teal-700 hover:bg-teal-800 text-white shadow-teal-700/20'
              ]"
            >
              <Sparkles className="w-4 h-4" />
              <span>سفارش فوری و پرداخت درگاه بانکی</span>
            </button>
          </div>

        </div>
      </div>
    </section>

  </div>
</template>
