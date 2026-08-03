<script setup lang="ts">
import { ref, computed } from 'vue';
import { SubMenuCategory, ServiceProduct } from '../types';
import { X, Sparkles, ShoppingBag, Star, CheckCircle, ArrowLeft, Filter, Search } from 'lucide-vue-next';

const props = defineProps<{
  submenu: SubMenuCategory | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'selectProductToPay', product: ServiceProduct): void;
}>();

const searchTerm = ref('');

const filteredProducts = computed(() => {
  if (!props.submenu) return [];
  return props.submenu.products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});
</script>

<template>
  <div v-if="submenu" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
    <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
      <!-- Modal Header -->
      <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-cyan-900 text-white p-6 relative">
        <button
          @click="emit('close')"
          className="absolute left-6 top-6 w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
            <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-white">{{ submenu.title }}</h2>
              <span className="bg-amber-400 text-slate-900 text-xs font-black px-2.5 py-0.5 rounded-full">
                ۱۵ محصول کامل
              </span>
            </div>
            <p className="text-teal-100 text-sm mt-1">{{ submenu.description }}</p>
          </div>
        </div>

        <!-- Search bar inside modal -->
        <div className="mt-6 relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
          <input
            type="text"
            v-model="searchTerm"
            placeholder="جستجو در بین ۱۵ محصول و خدمت این دسته‌بندی..."
            className="w-full bg-white/10 border border-white/20 text-white placeholder-teal-200 text-xs rounded-xl pr-10 pl-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
          />
        </div>
      </div>

      <!-- Products Grid Body -->
      <div className="p-6 overflow-y-auto flex-1 bg-slate-50 space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-200">
          <span>نمایش {{ filteredProducts.length }} محصول از ۱۵ محصول ثبت‌شده</span>
          <span className="text-teal-700 font-bold">پزشک برتر؛ تضمین اصالت و کیفیت</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="(prod, idx) in filteredProducts"
            :key="prod.id"
            className="bg-white rounded-2xl border border-slate-200 hover:border-teal-400 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group transform hover:-translate-y-1"
          >
            <div>
              <!-- Card Image -->
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  :src="prod.image"
                  :alt="prod.title"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <span v-if="prod.badge" className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md">
                  {{ prod.badge }}
                </span>
                <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>{{ prod.rating }}</span>
                </span>
                <span className="absolute top-3 left-3 bg-teal-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  کد {{ idx + 1 }}
                </span>
              </div>

              <!-- Details -->
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-teal-700 transition">
                  {{ prod.title }}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {{ prod.description }}
                </p>

                <div className="space-y-1 pt-2">
                  <div v-for="(feat, fIdx) in prod.features.slice(0, 2)" :key="fIdx" className="flex items-center gap-1.5 text-[11px] text-slate-600">
                    <CheckCircle className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                    <span className="truncate">{{ feat }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Card Footer Price & Buy -->
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span v-if="prod.originalPrice" className="block text-[10px] text-slate-400 line-through">
                  {{ prod.originalPrice.toLocaleString('fa-IR') }} تومان
                </span>
                <span className="text-sm font-black text-teal-700">
                  {{ prod.price.toLocaleString('fa-IR') }}{' '}
                  <span className="text-[10px] font-normal text-slate-500">تومان</span>
                </span>
              </div>

              <button
                @click="() => { emit('selectProductToPay', prod); emit('close'); }"
                className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-md shadow-teal-600/20 active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>سفارش فوری</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div className="bg-white p-4 border-t border-slate-200 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          تمامی سفارشات این بخش به درگاه مستقیم بانکی شتاب و زرین‌پال وصل هستند.
        </span>
        <button
          @click="emit('close')"
          className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
        >
          بستن پنجره
        </button>
      </div>
    </div>
  </div>
</template>
