<script setup lang="ts">
import { ref } from 'vue';
import { Search, Sparkles, MapPin, Stethoscope, ShieldCheck, Star, ArrowLeft, Bot, Calendar } from 'lucide-vue-next';
import { Specialty } from '../types';

const props = defineProps<{
  specialties: Specialty[];
}>();

const emit = defineEmits<{
  (e: 'search', query: string, specialtyId: string, city: string): void;
  (e: 'openBrandingPage'): void;
  (e: 'openAiAssistant'): void;
}>();

const query = ref('');
const selectedSpecialty = ref('all');
const selectedCity = ref('all');

const handleFormSubmit = () => {
  emit('search', query.value, selectedSpecialty.value, selectedCity.value);
};
</script>

<template>
  <section className="relative overflow-hidden bg-gradient-to-b from-teal-900 via-slate-900 to-slate-950 text-white py-16 lg:py-24">
    <!-- Background Animated Glow Effects -->
    <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-subtle"></div>
    <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <!-- Left Hero Content -->
        <div className="lg:col-span-7 space-y-8 text-center lg:text-right">
          
          <!-- Top Badge -->
          <div className="inline-flex items-center gap-2 bg-teal-800/60 border border-teal-500/30 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-teal-200">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style="animation-duration: 6s" />
            <span>پلتفرم تخصصی نوبت‌دهی و برندسازی آنلاین پزشکان</span>
          </div>

          <!-- Title -->
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight lg:leading-tight">
            نوبت‌دهی آنلاین <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-amber-300">برترین پزشکان متخصص</span> و برندهای سلامت کشور
          </h1>

          <!-- Description -->
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
            در سامانه «پزشک برتر» با خیال راحت رزرو نوبت کنید، مشاوره آنلاین بگیرید، مقالات تخصصی مجله سلامت را بخوانید و از خدمات حرفه‌ای برندسازی پزشکان بهره‌مند شوید.
          </p>

          <!-- Interactive Search Box -->
          <form @submit.prevent="handleFormSubmit" className="bg-white/10 backdrop-blur-xl border border-white/20 p-3 sm:p-4 rounded-3xl shadow-2xl space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-2">
            <!-- Doctor Name / Query -->
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-teal-300 absolute right-3.5 top-3.5" />
              <input
                type="text"
                v-model="query"
                placeholder="نام پزشک، بیماری یا کد نظام پزشکی..."
                className="w-full bg-slate-900/60 text-white placeholder-slate-400 text-xs sm:text-sm rounded-2xl pr-10 pl-3 py-3 border border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              />
            </div>

            <!-- Specialty Select -->
            <div className="sm:w-44 relative">
              <Stethoscope className="w-4 h-4 text-teal-300 absolute right-3 top-3.5 pointer-events-none" />
              <select
                v-model="selectedSpecialty"
                className="w-full bg-slate-900/60 text-white text-xs sm:text-sm rounded-2xl pr-9 pl-2 py-3 border border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-400 appearance-none cursor-pointer"
              >
                <option value="all" className="bg-slate-900">همه تخصص‌ها</option>
                <option v-for="s in specialties" :key="s.id" :value="s.id" className="bg-slate-900">
                  {{ s.name }}
                </option>
              </select>
            </div>

            <!-- City Select -->
            <div className="sm:w-36 relative">
              <MapPin className="w-4 h-4 text-teal-300 absolute right-3 top-3.5 pointer-events-none" />
              <select
                v-model="selectedCity"
                className="w-full bg-slate-900/60 text-white text-xs sm:text-sm rounded-2xl pr-9 pl-2 py-3 border border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-400 appearance-none cursor-pointer"
              >
                <option value="all" className="bg-slate-900">همه شهرها</option>
                <option value="تهران" className="bg-slate-900">تهران</option>
                <option value="اصفهان" className="bg-slate-900">اصفهان</option>
                <option value="مشهد" className="bg-slate-900">مشهد</option>
                <option value="شیراز" className="bg-slate-900">شیراز</option>
                <option value="کرج" className="bg-slate-900">کرج</option>
              </select>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-slate-950 font-black text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-lg shadow-teal-500/20 hover:shadow-xl transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>جستجو</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </form>

          <!-- Quick Filter Badges -->
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs">
            <span className="text-slate-400 font-medium">محبوب‌ترین تخصص‌ها:</span>
            <button
              @click="emit('search', '', 'skin', 'all')"
              className="bg-white/5 hover:bg-white/15 border border-white/10 px-3 py-1 rounded-full transition cursor-pointer"
            >
              پوست و زیبایی
            </button>
            <button
              @click="emit('search', '', 'heart', 'all')"
              className="bg-white/5 hover:bg-white/15 border border-white/10 px-3 py-1 rounded-full transition cursor-pointer"
            >
              قلب و عروق
            </button>
            <button
              @click="emit('search', '', 'dentist', 'all')"
              className="bg-white/5 hover:bg-white/15 border border-white/10 px-3 py-1 rounded-full transition cursor-pointer"
            >
              ایمپلنت و دندان
            </button>
            <button
              @click="emit('search', '', 'brain', 'all')"
              className="bg-white/5 hover:bg-white/15 border border-white/10 px-3 py-1 rounded-full transition cursor-pointer"
            >
              مغز و اعصاب
            </button>
          </div>

          <!-- AI Assistant Quick Banner -->
          <div className="bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-teal-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-400 text-slate-900 rounded-xl flex items-center justify-center font-bold">
                <Bot className="w-6 h-6" />
              </div>
              <div className="text-right">
                <h4 className="font-bold text-amber-200 text-xs sm:text-sm">نمی‌دانید به کدام متخصص مراجعه کنید؟</h4>
                <p className="text-[11px] text-slate-300">مشاوره هوشمند با Gemini AI بر اساس علائم بیماری شما</p>
              </div>
            </div>
            <button
              @click="emit('openAiAssistant')"
              className="bg-amber-400 hover:bg-amber-300 text-slate-900 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-md cursor-pointer shrink-0"
            >
              تست علائم
            </button>
          </div>

        </div>

        <!-- Right Animated Card / Graphic -->
        <div className="lg:col-span-5 relative flex justify-center">
          
          <!-- Main Animated Doctor Showcase Card -->
          <div className="relative w-full max-w-sm bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-2xl animate-float">
            
            <!-- Top Doctor Avatar & Status -->
            <div className="relative rounded-2xl overflow-hidden mb-5 group">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600"
                alt="پزشک برتر"
                className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              <span className="absolute top-3 right-3 bg-teal-500 text-slate-950 font-black text-[10px] px-3 py-1 rounded-full shadow-lg">
                پزشک منتخب هفته
              </span>
              <span className="absolute bottom-3 right-3 text-white font-bold text-lg">
                دکتر محمدرضا صادقی
              </span>
            </div>

            <!-- Doctor Details -->
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>تخصص: پوست، مو و زیبایی</span>
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>۴.۹ (۳۴۲ نظر)</span>
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                <span className="text-slate-400">کد نظام پزشکی:</span>
                <span className="font-mono text-teal-300 font-bold">۱۳۴۵۸۹</span>
              </div>

              <button
                @click="emit('openBrandingPage')"
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-slate-950 font-black py-2.5 rounded-xl transition text-center flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>مشاهده خدمات برندسازی پزشکان</span>
              </button>
            </div>

          </div>

          <!-- Floating Stat Badge 1 -->
          <div className="absolute -bottom-6 -right-2 sm:right-2 bg-slate-900/90 backdrop-blur-md border border-teal-500/30 p-3 rounded-2xl shadow-2xl flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-500/20 text-teal-300 rounded-xl flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-teal-400" />
            </div>
            <div className="text-right">
              <span className="block text-sm font-black text-white">۱۲۸۰+</span>
              <span className="text-[10px] text-slate-400">نوبت آنلاین ثبت‌شده</span>
            </div>
          </div>

          <!-- Floating Stat Badge 2 -->
          <div className="absolute -top-6 -left-2 sm:left-2 bg-slate-900/90 backdrop-blur-md border border-amber-500/30 p-3 rounded-2xl shadow-2xl flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/20 text-amber-300 rounded-xl flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-right">
              <span className="block text-sm font-black text-white">۴۸+</span>
              <span className="text-[10px] text-slate-400">پزشک برند شده در کشور</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>
