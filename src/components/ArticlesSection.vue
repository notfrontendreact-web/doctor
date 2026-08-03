<script setup lang="ts">
import { ref, computed } from 'vue';
import { Article } from '../types';
import { Eye, Heart, Clock, Calendar, ArrowLeft, Search, Bookmark, Share2, Sparkles, X } from 'lucide-vue-next';

const props = defineProps<{
  articles: Article[];
}>();

const emit = defineEmits<{
  (e: 'selectArticle', article: Article): void;
}>();

const activeCategory = ref('all');
const searchTerm = ref('');

const categories = ['all', 'برندسازی پزشکی', 'پوست و زیبایی', 'سلامت قلب', 'دندان‌پزشکی'];

const filtered = computed(() => {
  return props.articles.filter((a) => {
    const matchCat = activeCategory.value === 'all' || a.category === activeCategory.value;
    const matchSearch =
      a.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchTerm.value.toLowerCase());
    return matchCat && matchSearch;
  });
});
</script>

<template>
  <section className="space-y-8 py-8 animate-in fade-in duration-300">
    
    <!-- Header & Search -->
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="bg-teal-100 text-teal-800 text-xs font-black px-2.5 py-0.5 rounded-full">
            مجله سلامت پزشک برتر
          </span>
          <span className="text-slate-400 text-xs">آخرین مقالات و دستاوردهای پزشکی</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
          مقالات علمی و راهنمای سلامت
        </h2>
      </div>

      <!-- Search -->
      <div className="relative w-full md:w-72">
        <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
        <input
          type="text"
          v-model="searchTerm"
          placeholder="جستجو در بین مقالات سلامت..."
          className="w-full bg-white border border-slate-200 rounded-xl pr-10 pl-3 py-2 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
        />
      </div>
    </div>

    <!-- Category Pills -->
    <div className="flex flex-wrap gap-2">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="activeCategory = cat"
        :class="[
          'px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer',
          activeCategory === cat
            ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20'
            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
        ]"
      >
        {{ cat === 'all' ? 'همه مقالات' : cat }}
      </button>
    </div>

    <!-- Articles Grid -->
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <article
        v-for="art in filtered"
        :key="art.id"
        @click="emit('selectArticle', art)"
        className="bg-white rounded-3xl border border-slate-200 hover:border-teal-400 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer transform hover:-translate-y-1"
      >
        <div>
          <!-- Thumbnail Image with Animated Scale -->
          <div className="relative h-48 overflow-hidden bg-slate-100">
            <img
              :src="art.imageUrl"
              :alt="art.title"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <span className="absolute top-3 right-3 bg-teal-800/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
              {{ art.category }}
            </span>
            <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-slate-200 text-[10px] font-medium px-2 py-0.5 rounded-lg flex items-center gap-1">
              <Clock className="w-3 h-3 text-teal-400" />
              <span>{{ art.readTimeMinutes }} دقیقه مطالعه</span>
            </span>
          </div>

          <!-- Title & Excerpt -->
          <div className="p-5 space-y-3">
            <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition leading-snug line-clamp-2">
              {{ art.title }}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
              {{ art.summary }}
            </p>
          </div>
        </div>

        <!-- Article Author & Stats Footer -->
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <img
              :src="art.authorAvatar"
              :alt="art.authorName"
              className="w-7 h-7 rounded-full object-cover border border-slate-200"
            />
            <span className="font-medium text-slate-700 text-[11px] truncate">{{ art.authorName }}</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <div className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              <span>{{ art.views }}</span>
            </div>
            <div className="flex items-center gap-1 text-rose-500">
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              <span>{{ art.likes }}</span>
            </div>
          </div>
        </div>

      </article>
    </div>

  </section>
</template>
