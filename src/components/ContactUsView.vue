<script setup lang="ts">
import { ref } from 'vue';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageSquare } from 'lucide-vue-next';

const submitted = ref(false);
const formData = ref({ name: '', phone: '', subject: '', message: '' });

const handleSubmit = () => {
  submitted.value = true;
};
</script>

<template>
  <div className="max-w-5xl mx-auto space-y-12 py-8 animate-in fade-in duration-300">
    
    <!-- Page Title -->
    <div className="text-center space-y-3">
      <span className="bg-teal-100 text-teal-800 text-xs font-black px-3 py-1 rounded-full">
        ارتباط مستقیم با پزشک برتر
      </span>
      <h1 className="text-3xl font-black text-slate-900">تماس با ما و پشتیبانی مطب‌ها</h1>
      <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
        تیم پشتیبانی پزشک برتر به صورت ۲۴ ساعته در ۷ روز هفته آماده پاسخگویی به سوالات بیماران و پزشکان محترم می‌باشد.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      
      <!-- Contact Info Card -->
      <div className="md:col-span-5 bg-gradient-to-br from-slate-900 to-teal-950 text-white rounded-3xl p-8 space-y-6 shadow-xl border border-teal-500/20">
        <h3 className="text-xl font-black text-white border-b border-white/10 pb-3">اطلاعات دفتر مرکزی</h3>

        <div className="space-y-4 text-xs">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-teal-500/20 text-teal-300 rounded-xl shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold block text-slate-200">نشانی دفتر مرکزی:</span>
              <span className="text-slate-300 leading-relaxed">
                تهران، جردن، بالاتر از میرداماد، بن‌بست آناهیتا، پلاک ۱۲، برج سلامت پزشک برتر
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-teal-500/20 text-teal-300 rounded-xl shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold block text-slate-200">تلفن پشتیبانی و مشاوره:</span>
              <span className="text-amber-300 font-mono text-sm font-bold dir-ltr block text-right">۰۲۱-۸۸۸۸۹۹۰۰</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-teal-500/20 text-teal-300 rounded-xl shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold block text-slate-200">پست الکترونیک:</span>
              <span className="text-slate-300 font-mono">info@pezeshkbartar.com</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-teal-500/20 text-teal-300 rounded-xl shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold block text-slate-200">ساعات کاری بخش فنی:</span>
              <span className="text-slate-300">شنبه تا چهارشنبه: ۰۸:۳۰ الی ۲۰:۰۰</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div className="md:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
        <div v-if="submitted" className="text-center py-12 space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-black text-slate-900">پیام شما با موفقیت دریافت شد</h3>
          <p className="text-xs text-slate-500">کارشناسان پشتیبانی تا حداکثر ۲ ساعت آینده با شما تماس خواهند گرفت.</p>
        </div>

        <form v-else @submit.prevent="handleSubmit" className="space-y-4">
          <h3 className="text-lg font-black text-slate-900 mb-2">ارسال پیام / درخواست مشاوره</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">نام و نام خانوادگی *</label>
              <input
                type="text"
                required
                v-model="formData.name"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">شماره همراه *</label>
              <input
                type="tel"
                required
                v-model="formData.phone"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono text-right dir-ltr"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-bold text-slate-700 mb-1">موضوع پیام</label>
            <input
              type="text"
              required
              v-model="formData.subject"
              placeholder="مثلا: مشاوره پکیج طلایی برندسازی پزشکان"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
            />
          </div>

          <div className="text-xs">
            <label className="block font-bold text-slate-700 mb-1">متن پیام *</label>
            <textarea
              required
              rows="4"
              v-model="formData.message"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>ارسال پیام</span>
          </button>
        </form>
      </div>

    </div>
  </div>
</template>
