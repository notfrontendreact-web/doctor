<script setup lang="ts">
import { Article } from '../types';
import { X } from 'lucide-vue-next';

const props = defineProps<{
  article: Article | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();
</script>

<template>
  <div v-if="article" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
    <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
      
      <!-- Header Image -->
      <div className="relative h-64 bg-slate-900">
        <img
          :src="article.imageUrl"
          :alt="article.title"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        
        <button
          @click="emit('close')"
          className="absolute left-5 top-5 w-9 h-9 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-md transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="absolute bottom-6 right-6 left-6 text-white space-y-2">
          <span className="bg-teal-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full">
            {{ article.category }}
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
            {{ article.title }}
          </h1>
          <div className="flex items-center gap-4 text-xs text-slate-300">
            <span>تاریخ انتشار: {{ article.date }}</span>
            <span>•</span>
            <span>زمان مطالعه: {{ article.readTimeMinutes }} دقیقه</span>
          </div>
        </div>
      </div>

      <!-- Content Body -->
      <div className="p-6 overflow-y-auto flex-1 space-y-6 text-slate-800 text-sm leading-relaxed">
        
        <!-- Author info box -->
        <div className="bg-teal-50 border border-teal-100 p-4 rounded-2xl flex items-center gap-3">
          <img
            :src="article.authorAvatar"
            :alt="article.authorName"
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div>
            <h4 className="font-bold text-slate-900 text-sm">{{ article.authorName }}</h4>
            <p className="text-xs text-teal-700">{{ article.authorRole }}</p>
          </div>
        </div>

        <div className="whitespace-pre-line leading-loose text-slate-700 text-justify">
          {{ article.content }}
        </div>

        <!-- Tags -->
        <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
          <span className="text-xs text-slate-400 font-medium">برچسب‌ها:</span>
          <span v-for="(tag, idx) in article.tags" :key="idx" className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-lg">
            #{{ tag }}
          </span>
        </div>

      </div>

      <!-- Footer -->
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
        <button
          @click="emit('close')"
          className="px-6 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition cursor-pointer"
        >
          بستن مقاله
        </button>
      </div>

    </div>
  </div>
</template>
