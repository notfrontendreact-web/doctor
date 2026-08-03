<script setup lang="ts">
import { ref } from 'vue';
import { Bot, X, Sparkles, Send, Stethoscope, AlertCircle, RefreshCw } from 'lucide-vue-next';

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'navigateToSearch'): void;
}>();

const symptoms = ref('');
const age = ref('');
const gender = ref('نامشخص');
const loading = ref(false);
const aiAnswer = ref<string | null>(null);

const handleSubmit = async () => {
  if (!symptoms.value.trim()) return;

  loading.value = true;
  aiAnswer.value = null;

  try {
    const res = await fetch('/api/ai/symptom-checker', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symptoms: symptoms.value, age: age.value, gender: gender.value })
    });

    const data = await res.json();
    aiAnswer.value = data.answer || 'پاسخی دریافت نشد.';
  } catch (err) {
    console.error(err);
    aiAnswer.value = 'خطا در برقراری ارتباط با هوش مصنوعی. لطفا مجددا تلاش کنید.';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 dir-rtl">
      
      <!-- Header -->
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-slate-950 p-6 relative">
        <button
          @click="emit('close')"
          className="absolute left-5 top-5 w-8 h-8 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center text-slate-950 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-950 text-amber-400 rounded-2xl shadow-lg">
            <Bot className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-slate-950">دستیار هوشمند سلامت Gemini</h2>
              <span className="bg-slate-950 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                AI HEALTH
              </span>
            </div>
            <p className="text-slate-900 text-xs mt-0.5">
              توصیه و تحلیل اولیه علائم بر پایه مدل هوش مصنوعی Gemini 2.5 Flash
            </p>
          </div>
        </div>
      </div>

      <!-- Content Body -->
      <div className="p-6 space-y-5">
        
        <form @submit.prevent="handleSubmit" className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              علائم یا سوال پزشکی خود را شرح دهید: *
            </label>
            <textarea
              required
              rows="3"
              v-model="symptoms"
              placeholder="مثلا: دو روزه که سردرد شدید به همراه تهوع در سمت راست سر دارم..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs focus:bg-white focus:border-amber-500 focus:outline-none transition leading-relaxed"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">سن (اختیاری):</label>
              <input
                type="text"
                v-model="age"
                placeholder="مثلا: ۳۵"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">جنسیت:</label>
              <select
                v-model="gender"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs cursor-pointer"
              >
                <option value="نامشخص">انتخاب کنید</option>
                <option value="زن">خانم</option>
                <option value="مرد">آقا</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            :disabled="loading"
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-slate-950 font-black text-xs rounded-2xl transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <template v-if="loading">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>در حال پردازش هوشمند علائم...</span>
            </template>
            <template v-else>
              <Sparkles className="w-4 h-4" />
              <span>تحلیل علائم با هوش مصنوعی</span>
            </template>
          </button>
        </form>

        <!-- AI Response Box -->
        <div v-if="aiAnswer" className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="text-xs font-bold text-teal-800 flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-amber-500" />
              <span>پاسخ هوش مصنوعی پزشک برتر</span>
            </span>
            <span className="text-[10px] text-slate-400">Gemini 2.5 Flash</span>
          </div>

          <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line text-justify">
            {{ aiAnswer }}
          </div>

          <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="text-[10px] text-slate-400">
              جهت معاینه بالینی مستقیم نوبت دریافت کنید.
            </span>
            <button
              @click="() => { emit('close'); emit('navigateToSearch'); }"
              className="w-full sm:w-auto px-4 py-2 bg-teal-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>جستجو و رزرو نوبت پزشکان</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>
