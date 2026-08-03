<script setup lang="ts">
import { Stethoscope, ShieldCheck, Phone, Mail, MapPin, Heart, Sparkles } from 'lucide-vue-next';
import { PageRoute } from '../types';

const emit = defineEmits<{
  (e: 'navigate', page: PageRoute): void;
  (e: 'openAdmin'): void;
}>();
</script>

<template>
  <footer className="bg-slate-950 text-white border-t border-slate-800 dir-rtl text-xs">
    <!-- Top Footer Banner -->
    <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-cyan-900 text-teal-100 py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center font-bold text-amber-300">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">آیا پزشک هستید و قصد برندسازی مطب خود را دارید؟</h4>
            <p className="text-xs text-teal-200">جهت دریافت مشاوره رایگان با کارشناسان برندسازی پزشک برتر تماس بگیرید.</p>
          </div>
        </div>
        <button
          @click="emit('navigate', 'doctor-branding')"
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-5 py-2.5 rounded-xl shadow-lg transition cursor-pointer shrink-0"
        >
          مشاهده پکیج‌های برندسازی
        </button>
      </div>
    </div>

    <!-- Main Footer Links -->
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        <!-- Brand Info -->
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 cursor-pointer" @click="emit('navigate', 'home')">
            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
              <Stethoscope className="w-6 h-6" />
            </div>
            <span className="text-lg font-black text-white">پزشک برتر</span>
            <span className="bg-teal-900 text-teal-300 text-[10px] font-bold px-2 py-0.5 rounded">
              VIP
            </span>
          </div>

          <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
            سامانه جامع نوبت‌دهی آنلاین پزشکان، مجله اختصاصی خدمات سلامت، پکیج‌های پیشرفته برندسازی و بازاریابی دیجیتال پزشکان کشور.
          </p>

          <div className="pt-2 text-slate-400 space-y-1.5">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-400" />
              <span>تهران، جردن، بالاتر از میرداماد، برج سلامت پزشک برتر</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-teal-400" />
              <span className="font-mono text-white">۰۲۱-۸۸۸۸۹۹۰۰</span>
            </div>
          </div>
        </div>

        <!-- Quick Links 1 -->
        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm border-b border-slate-800 pb-2">خدمات اصلی</h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <button @click="emit('navigate', 'search')" className="hover:text-teal-400 transition cursor-pointer">
                جستجو و نوبت‌دهی پزشکان
              </button>
            </li>
            <li>
              <button @click="emit('navigate', 'shop')" className="hover:text-amber-300 font-bold transition cursor-pointer">
                فروشگاه تجهیزات و محصولات سلامت
              </button>
            </li>
            <li>
              <button @click="emit('navigate', 'doctor-branding')" className="hover:text-teal-400 transition cursor-pointer">
                برندسازی شخصی پزشکان
              </button>
            </li>
            <li>
              <button @click="emit('navigate', 'articles')" className="hover:text-teal-400 transition cursor-pointer">
                مجله سلامت و مقالات
              </button>
            </li>
            <li>
              <button @click="emit('openAdmin')" className="hover:text-amber-300 font-bold transition cursor-pointer">
                پنل مدیریت سفارشات و کاربران
              </button>
            </li>
          </ul>
        </div>

        <!-- Quick Links 2 -->
        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm border-b border-slate-800 pb-2">اطلاعات تکمیلی</h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <button @click="emit('navigate', 'about')" className="hover:text-teal-400 transition cursor-pointer">
                درباره پزشک برتر
              </button>
            </li>
            <li>
              <button @click="emit('navigate', 'contact')" className="hover:text-teal-400 transition cursor-pointer">
                تماس با ما
              </button>
            </li>
            <li>
              <a href="#privacy" className="hover:text-teal-400 transition">
                حریم خصوصی و قوانین
              </a>
            </li>
          </ul>
        </div>

        <!-- Trust Seals -->
        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm border-b border-slate-800 pb-2">نمادهای اعتماد</h4>
          <div className="flex gap-2">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 text-center flex-1 space-y-1">
              <ShieldCheck className="w-6 h-6 text-teal-400 mx-auto" />
              <span className="block text-[10px] text-slate-300 font-bold">نماد اعتماد الکترونیک</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 text-center flex-1 space-y-1">
              <ShieldCheck className="w-6 h-6 text-amber-400 mx-auto" />
              <span className="block text-[10px] text-slate-300 font-bold">نشان ساماندهی</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Bottom Bar -->
    <div className="bg-slate-900 py-4 px-4 text-center text-slate-500 border-t border-slate-800 text-[11px]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>تمامی حقوق مادی و معنوی متعلق به سامانه «پزشک برتر» می‌باشد. ۱۴۰۳ ©</span>
        <div className="flex items-center gap-1 text-slate-400">
          <span>طراحی شده برای پلتفرم‌های پزشکی و درگاه‌های بانکی کشور</span>
        </div>
      </div>
    </div>
  </footer>
</template>
