<script setup lang="ts">
import { ref } from 'vue';
import {
  Stethoscope,
  Search,
  Calendar,
  Sparkles,
  ShieldCheck,
  User,
  Menu,
  X,
  ChevronDown,
  Globe,
  Video,
  CalendarCheck,
  Smile,
  MessageSquare,
  FlaskConical,
  Home,
  Bot,
  SlidersHorizontal,
  FileText,
  PhoneCall,
  Info,
  PackageCheck
} from 'lucide-vue-next';
import { PageRoute, SubMenuCategory } from '../types';
import { MENU_CATEGORIES } from '../data/mockData';

const props = defineProps<{
  currentPage: PageRoute;
}>();

const emit = defineEmits<{
  (e: 'navigate', page: PageRoute): void;
  (e: 'openMegaCategory', subCat: SubMenuCategory): void;
  (e: 'openAiAssistant'): void;
  (e: 'openAdmin'): void;
}>();

const mobileMenuOpen = ref(false);
const activeMenuHover = ref<string | null>(null);

const getSubMenuIcon = (iconName: string) => {
  switch (iconName) {
    case 'Globe': return Globe;
    case 'Video': return Video;
    case 'CalendarCheck': return CalendarCheck;
    case 'Sparkles': return Sparkles;
    case 'Smile': return Smile;
    case 'Stethoscope': return Stethoscope;
    case 'MessageSquare': return MessageSquare;
    case 'FlaskConical': return FlaskConical;
    case 'Home': return Home;
    default: return PackageCheck;
  }
};
</script>

<template>
  <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
    <!-- Top Banner Notice -->
    <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-cyan-900 text-white text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 space-x-reverse">
          <span className="bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full font-bold text-[10px] animate-pulse">
            برندسازی ویژه ۱۴۰۳
          </span>
          <span className="hidden sm:inline">
            پزشک برتر؛ مرکز تخصصی نوبت‌دهی آنلاین و برندسازی پزشکان برجسته کشور
          </span>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse text-teal-100">
          <button
            @click="emit('openAiAssistant')"
            className="flex items-center gap-1.5 hover:text-amber-300 font-medium transition cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5 text-amber-300" />
            <span>دستیار هوشمند سلامت (Gemini AI)</span>
          </button>
          <span className="hidden md:inline">|</span>
          <span className="hidden md:inline dir-ltr text-xs">پشتیبانی: ۰۲۱-۸۸۸۸۹۹۰۰</span>
        </div>
      </div>
    </div>

    <!-- Main Navbar -->
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-20">
        <!-- Logo -->
        <div className="flex items-center space-x-3 space-x-reverse cursor-pointer" @click="emit('navigate', 'home')">
          <div className="w-11 h-11 bg-gradient-to-tr from-teal-600 to-cyan-500 rounded-2xl flex items-center justify-center text-white shadow-md shadow-teal-500/20 transform hover:scale-105 transition">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-slate-900">پزشک برتر</span>
              <span className="bg-teal-100 text-teal-800 text-[11px] font-extrabold px-1.5 py-0.5 rounded">
                VIP
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">pezeshkbartar.com</p>
          </div>
        </div>

        <!-- Desktop Navigation Links & Mega Menus -->
        <nav className="hidden lg:flex items-center space-x-1 space-x-reverse font-medium text-sm text-slate-700">
          <button
            @click="emit('navigate', 'home')"
            :class="[
              'px-3 py-2 rounded-lg transition cursor-pointer',
              props.currentPage === 'home' ? 'text-teal-600 bg-teal-50 font-bold' : 'hover:text-teal-600 hover:bg-slate-100'
            ]"
          >
            صفحه اصلی
          </button>

          <!-- Mega Menu Categories Dropdowns -->
          <div
            v-for="cat in MENU_CATEGORIES"
            :key="cat.id"
            className="relative group"
            @mouseenter="activeMenuHover = cat.id"
            @mouseleave="activeMenuHover = null"
          >
            <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-teal-600 hover:bg-slate-100 transition cursor-pointer">
              <span>{{ cat.title }}</span>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
            </button>

            <!-- Dropdown Panel -->
            <div
              v-if="activeMenuHover === cat.id"
              className="absolute right-0 top-full pt-2 w-[420px] z-50 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-4 space-y-3">
                <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">زیرمنوهای {{ cat.title }}</span>
                  <span className="text-[11px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full font-semibold">
                    ۱۵ محصول در هر زیرمنو
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div
                    v-for="sub in cat.submenus"
                    :key="sub.id"
                    @click="() => { emit('openMegaCategory', sub); activeMenuHover = null; }"
                    className="flex items-start space-x-3 space-x-reverse p-3 rounded-xl hover:bg-teal-50/80 group/sub transition cursor-pointer border border-transparent hover:border-teal-200"
                  >
                    <div className="p-2.5 bg-slate-100 rounded-xl group-hover/sub:bg-white group-hover/sub:shadow-xs transition text-teal-600">
                      <component :is="getSubMenuIcon(sub.icon)" className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 group-hover/sub:text-teal-700 text-sm">
                          {{ sub.title }}
                        </h4>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                          15 محصول
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{{ sub.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            @click="emit('navigate', 'search')"
            :class="[
              'px-3 py-2 rounded-lg transition cursor-pointer',
              props.currentPage === 'search' ? 'text-teal-600 bg-teal-50 font-bold' : 'hover:text-teal-600 hover:bg-slate-100'
            ]"
          >
            جستجوی پزشکان
          </button>

          <button
            @click="emit('navigate', 'shop')"
            :class="[
              'px-3 py-2 rounded-lg transition font-bold cursor-pointer text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/80',
              props.currentPage === 'shop' ? 'text-amber-900 bg-amber-200 font-extrabold' : ''
            ]"
          >
            فروشگاه محصولات
          </button>

          <button
            @click="emit('navigate', 'doctor-branding')"
            :class="[
              'px-3 py-2 rounded-lg transition flex items-center gap-1 cursor-pointer',
              props.currentPage === 'doctor-branding' ? 'text-teal-600 bg-teal-50 font-bold' : 'hover:text-teal-600 hover:bg-slate-100'
            ]"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>برندسازی پزشکان</span>
          </button>

          <button
            @click="emit('navigate', 'articles')"
            :class="[
              'px-3 py-2 rounded-lg transition cursor-pointer',
              props.currentPage === 'articles' ? 'text-teal-600 bg-teal-50 font-bold' : 'hover:text-teal-600 hover:bg-slate-100'
            ]"
          >
            مجله سلامت
          </button>

          <button
            @click="emit('navigate', 'contact')"
            :class="[
              'px-3 py-2 rounded-lg transition cursor-pointer',
              props.currentPage === 'contact' ? 'text-teal-600 bg-teal-50 font-bold' : 'hover:text-teal-600 hover:bg-slate-100'
            ]"
          >
            تماس با ما
          </button>

          <button
            @click="emit('navigate', 'about')"
            :class="[
              'px-3 py-2 rounded-lg transition cursor-pointer',
              props.currentPage === 'about' ? 'text-teal-600 bg-teal-50 font-bold' : 'hover:text-teal-600 hover:bg-slate-100'
            ]"
          >
            درباره ما
          </button>
        </nav>

        <!-- Right Action Buttons -->
        <div className="hidden sm:flex items-center space-x-3 space-x-reverse">
          <button
            @click="emit('openAdmin')"
            :class="[
              'flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer',
              props.currentPage === 'admin'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
            ]"
          >
            <SlidersHorizontal className="w-4 h-4 text-teal-600" />
            <span>پنل مدیریت</span>
          </button>

          <button
            @click="emit('navigate', 'search')"
            className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-teal-600/20 hover:shadow-lg transition transform active:scale-95 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>رزرو نوبت پزشک</span>
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <div className="flex lg:hidden items-center gap-2">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
          >
            <component :is="mobileMenuOpen ? X : Menu" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <div v-if="mobileMenuOpen" className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4">
      <div className="space-y-1 text-sm font-medium">
        <button
          @click="() => { emit('navigate', 'home'); mobileMenuOpen = false; }"
          className="w-full text-right py-2.5 px-3 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          صفحه اصلی
        </button>
        <button
          @click="() => { emit('navigate', 'search'); mobileMenuOpen = false; }"
          className="w-full text-right py-2.5 px-3 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          جستجوی پزشکان و رزرو نوبت
        </button>
        <button
          @click="() => { emit('navigate', 'shop'); mobileMenuOpen = false; }"
          className="w-full text-right py-2.5 px-3 rounded-lg bg-amber-50 text-amber-900 font-bold hover:bg-amber-100 cursor-pointer"
        >
          فروشگاه محصولات سلامت
        </button>
        <button
          @click="() => { emit('navigate', 'doctor-branding'); mobileMenuOpen = false; }"
          className="w-full text-right py-2.5 px-3 rounded-lg hover:bg-teal-50 text-teal-700 font-bold flex items-center justify-between cursor-pointer"
        >
          <span>برندسازی پزشکان</span>
          <Sparkles className="w-4 h-4 text-amber-500" />
        </button>
        <button
          @click="() => { emit('navigate', 'articles'); mobileMenuOpen = false; }"
          className="w-full text-right py-2.5 px-3 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          مجله سلامت و مقالات
        </button>
        <button
          @click="() => { emit('navigate', 'contact'); mobileMenuOpen = false; }"
          className="w-full text-right py-2.5 px-3 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          تماس با ما
        </button>
        <button
          @click="() => { emit('navigate', 'about'); mobileMenuOpen = false; }"
          className="w-full text-right py-2.5 px-3 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          درباره پزشک برتر
        </button>
      </div>

      <div className="pt-3 border-t border-slate-100 space-y-2">
        <button
          @click="() => { emit('openAdmin'); mobileMenuOpen = false; }"
          className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4 text-teal-400" />
          <span>ورود به پنل مدیریت</span>
        </button>
        <button
          @click="() => { emit('openAiAssistant'); mobileMenuOpen = false; }"
          className="w-full py-2.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
        >
          <Bot className="w-4 h-4 text-amber-600" />
          <span>دستیار هوشمند سلامت (Gemini AI)</span>
        </button>
      </div>
    </div>
  </header>
</template>
