<script setup lang="ts">
import { ref, watch } from 'vue';
import { Doctor } from '../types';
import { X, Calendar, Clock, User, Phone, ShieldCheck, CreditCard, Star, AlertCircle } from 'lucide-vue-next';

const props = defineProps<{
  doctor: Doctor | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'proceedToPayment', bookingData: {
    doctorName: string;
    doctorId: string;
    title: string;
    amount: number;
    patientName: string;
    patientPhone: string;
    nationalId: string;
    timeSlot: string;
  }): void;
}>();

const selectedSlot = ref(props.doctor?.availableSlots[0] || 'فردا ساعت ۱۰:۰۰');
const patientName = ref('');
const patientPhone = ref('');
const nationalId = ref('');
const errorMsg = ref('');

watch(() => props.doctor, (newDoc) => {
  if (newDoc && newDoc.availableSlots.length > 0) {
    selectedSlot.value = newDoc.availableSlots[0];
  }
});

const handleSubmit = () => {
  if (!patientName.value.trim()) {
    errorMsg.value = 'لطفا نام و نام خانوادگی بیمار را وارد کنید';
    return;
  }
  if (!patientPhone.value.trim() || patientPhone.value.length < 10) {
    errorMsg.value = 'لطفا شماره موبایل معتبر (مثلا 09121112233) وارد کنید';
    return;
  }
  if (!nationalId.value.trim() || nationalId.value.length < 8) {
    errorMsg.value = 'لطفا کد ملی معتبر بیمار را وارد کنید';
    return;
  }

  errorMsg.value = '';
  if (props.doctor) {
    emit('proceedToPayment', {
      doctorId: props.doctor.id,
      doctorName: props.doctor.name,
      title: `نوبت مشاوره آنلاین - ${props.doctor.name}`,
      amount: props.doctor.consultationFee,
      patientName: patientName.value,
      patientPhone: patientPhone.value,
      nationalId: nationalId.value,
      timeSlot: selectedSlot.value
    });
  }
};
</script>

<template>
  <div v-if="doctor" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
    <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
      
      <!-- Header -->
      <div className="bg-gradient-to-r from-teal-700 to-cyan-800 text-white p-6 relative">
        <button
          @click="emit('close')"
          className="absolute left-5 top-5 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-4">
          <img
            :src="doctor.avatar"
            :alt="doctor.name"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white/30 shadow-md"
          />
          <div>
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full inline-block mb-1">
              رزرو نوبت مستقیم
            </span>
            <h2 className="text-lg font-black text-white">{{ doctor.name }}</h2>
            <p className="text-teal-100 text-xs">{{ doctor.title }}</p>
          </div>
        </div>
      </div>

      <!-- Form Body -->
      <form @submit.prevent="handleSubmit" className="p-6 space-y-5">
        
        <div v-if="errorMsg" className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-2xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
          <span>{{ errorMsg }}</span>
        </div>

        <!-- Time Slot Selection -->
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-teal-600" />
            <span>انتخاب زمان نوبت:</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              v-for="(slot, idx) in doctor.availableSlots"
              :key="idx"
              type="button"
              @click="selectedSlot = slot"
              :class="[
                'p-3 rounded-2xl border text-xs font-bold text-center transition cursor-pointer',
                selectedSlot === slot
                  ? 'bg-teal-50 border-teal-600 text-teal-800 ring-2 ring-teal-500/30'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              ]"
            >
              {{ slot }}
            </button>
          </div>
        </div>

        <!-- Patient Details -->
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              نام و نام خانوادگی بیمار *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              <input
                type="text"
                required
                v-model="patientName"
                placeholder="مثلا: علی حسینی"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-3 py-2.5 text-xs focus:bg-white focus:border-teal-500 focus:outline-none transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                شماره همراه (جهت پیامک) *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                <input
                  type="tel"
                  required
                  v-model="patientPhone"
                  placeholder="09121112233"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-3 py-2.5 text-xs focus:bg-white focus:border-teal-500 focus:outline-none transition font-mono dir-ltr text-right"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                کد ملی بیمار *
              </label>
              <input
                type="text"
                required
                v-model="nationalId"
                placeholder="0012345678"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:bg-white focus:border-teal-500 focus:outline-none transition font-mono dir-ltr text-right"
              />
            </div>
          </div>
        </div>

        <!-- Consultation Fee Summary -->
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 block">مبلغ قابل پرداخت نوبت:</span>
            <span className="text-base font-black text-teal-700">
              {{ doctor.consultationFee.toLocaleString('fa-IR') }} تومان
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-teal-800 bg-teal-100/80 px-2.5 py-1 rounded-lg">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>پرداخت امن شتاب / زرین‌پال</span>
          </div>
        </div>

        <!-- Submit -->
        <div className="pt-2 flex gap-3">
          <button
            type="button"
            @click="emit('close')"
            className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition cursor-pointer"
          >
            انصراف
          </button>
          <button
            type="submit"
            className="flex-1 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold text-xs rounded-2xl transition shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <CreditCard className="w-4 h-4" />
            <span>اتصال به درگاه پرداخت</span>
          </button>
        </div>

      </form>

    </div>
  </div>
</template>
