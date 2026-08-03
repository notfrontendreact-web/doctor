<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';
import { ShieldCheck, CreditCard, Lock, CheckCircle2, AlertCircle, RefreshCw, Download, ArrowRight, Building } from 'lucide-vue-next';
import { AppointmentOrder } from '../types';

const props = defineProps<{
  paymentData: {
    title: string;
    amount: number; // Toman
    patientName: string;
    patientPhone: string;
    nationalId: string;
    timeSlot?: string;
    doctorId?: string;
    doctorName?: string;
  } | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'paymentSuccess', receipt: AppointmentOrder): void;
}>();

const cardNumber = ref('');
const cvc2 = ref('');
const expMonth = ref('05');
const expYear = ref('06');
const otpCode = ref('');
const isOtpSent = ref(false);
const otpTimer = ref(60);
const loading = ref(false);
const errorMessage = ref('');
const completedReceipt = ref<AppointmentOrder | null>(null);

let intervalId: any = null;

watch(isOtpSent, (val) => {
  if (val && otpTimer.value > 0) {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
      otpTimer.value--;
      if (otpTimer.value <= 0) {
        clearInterval(intervalId);
      }
    }, 1000);
  }
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});

const handleSendOtp = () => {
  if (cardNumber.value.replace(/\s/g, '').length < 16) {
    errorMessage.value = 'لطفا شماره کارت ۱۶ رقمی معتبر وارد کنید';
    return;
  }
  errorMessage.value = '';
  isOtpSent.value = true;
  otpTimer.value = 60;
  // Simulate generated OTP
  const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
  otpCode.value = mockOtp;
};

const handleFormatCardNumber = (val: string) => {
  const raw = val.replace(/\D/g, '').slice(0, 16);
  const parts = [];
  for (let i = 0; i < raw.length; i += 4) {
    parts.push(raw.substring(i, i + 4));
  }
  cardNumber.value = parts.join(' - ');
};

const handlePay = async () => {
  errorMessage.value = '';

  if (!props.paymentData) return;

  const cleanCard = cardNumber.value.replace(/\s/g, '');
  if (cleanCard.length < 16) {
    errorMessage.value = 'شماره کارت باید ۱۶ رقم باشد';
    return;
  }
  if (cvc2.value.length < 3) {
    errorMessage.value = 'کد CVC2 معتبر نیست';
    return;
  }
  if (!otpCode.value || otpCode.value.length < 5) {
    errorMessage.value = 'لطفا رمز پویا را دریافت و وارد کنید';
    return;
  }

  loading.value = true;

  try {
    // Step 1: Request Payment on Express Server
    const reqRes = await fetch('/api/payment/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: props.paymentData.amount,
        description: props.paymentData.title,
        mobile: props.paymentData.patientPhone,
        patientName: props.paymentData.patientName,
        nationalId: props.paymentData.nationalId,
        doctorId: props.paymentData.doctorId,
        doctorName: props.paymentData.doctorName,
        timeSlot: props.paymentData.timeSlot
      })
    });

    const reqJson = await reqRes.json();

    if (!reqRes.ok || !reqJson.success) {
      throw new Error(reqJson.error || 'خطا در برقراری ارتباط با درگاه');
    }

    // Step 2: Verify Payment on Express Server
    const verifyRes = await fetch('/api/payment/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        authority: reqJson.authority,
        orderId: reqJson.orderId,
        cardNumber: cleanCard
      })
    });

    const verifyJson = await verifyRes.json();

    if (verifyRes.ok && verifyJson.success) {
      completedReceipt.value = verifyJson.order;
      emit('paymentSuccess', verifyJson.order);
    } else {
      throw new Error(verifyJson.error || 'تراکنش توسط بانک مقصد تایید نشد');
    }
  } catch (err: any) {
    errorMessage.value = err.message || 'خطای شبکه در اتصال به درگاه بانکی';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div v-if="paymentData" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
    <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-300 overflow-hidden my-8 dir-rtl">
      
      <!-- Top Bank Header Bar -->
      <div className="bg-gradient-to-r from-cyan-900 via-teal-800 to-slate-900 text-white p-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-cyan-300" />
            <span className="font-black text-sm text-white">درگاه پرداخت الکترونیک شاپرک / زرین‌پال</span>
          </div>
          <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded font-mono">
            SSL SECURED 256-BIT
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-300 block">پذیرنده:</span>
            <span className="font-bold text-amber-300">پزشک برتر (pezeshkbartar.com)</span>
          </div>
          <div className="text-left">
            <span className="text-slate-300 block">مبلغ قابل پرداخت:</span>
            <span className="font-black text-lg text-white">
              {{ paymentData.amount.toLocaleString('fa-IR') }}{' '}
              <span className="text-xs font-normal text-teal-200">تومان</span>
            </span>
          </div>
        </div>
      </div>

      <!-- If Completed -> Render Official Receipt -->
      <div v-if="completedReceipt" className="p-6 space-y-6 text-center animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-black text-slate-900">پرداخت با موفقیت انجام شد</h3>
          <p className="text-xs text-slate-500">نوبت / سفارش شما در سامانه پزشک برتر ثبت گردید.</p>
        </div>

        <!-- Receipt Summary Box -->
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2.5 text-right">
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-500">کد پیگیری تراکنش (RefId):</span>
            <span className="font-mono font-bold text-teal-700">{{ completedReceipt.paymentRefId }}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-500">شماره سفارش نوبت:</span>
            <span className="font-mono font-bold text-slate-900">{{ completedReceipt.trackingCode }}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-500">نام بیمار / خریدار:</span>
            <span className="font-bold text-slate-800">{{ completedReceipt.patientName }}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-500">موضوع خدمت:</span>
            <span className="font-bold text-slate-800">{{ completedReceipt.productTitle }}</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-slate-500">زمان رزرو شده:</span>
            <span className="font-bold text-emerald-700">{{ completedReceipt.timeSlot }}</span>
          </div>
        </div>

        <button
          @click="emit('close')"
          className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-2xl transition shadow-lg shadow-teal-600/20 cursor-pointer"
        >
          بازگشت به برنامه و دریافت رسید
        </button>
      </div>

      <!-- Payment Terminal Form -->
      <form v-else @submit.prevent="handlePay" className="p-6 space-y-4">
        
        <div v-if="errorMessage" className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
          <span>{{ errorMessage }}</span>
        </div>

        <!-- Card Number -->
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            شماره کارت ۱۶ رقمی عضو شتاب *
          </label>
          <div className="relative">
            <CreditCard className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            <input
              type="text"
              required
              :value="cardNumber"
              @input="(e: any) => handleFormatCardNumber(e.target.value)"
              placeholder="۶۰۳۷ - ۹۹۱۸ - ۱۲۳۴ - ۵۶۷۸"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-3 py-2.5 text-xs font-mono font-bold tracking-widest text-slate-800 dir-ltr text-center focus:bg-white focus:border-cyan-600 focus:outline-none transition"
            />
          </div>
        </div>

        <!-- CVC2 & Expiry -->
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              کد CVC2 (پشت کارت) *
            </label>
            <input
              type="password"
              maxLength="4"
              required
              :value="cvc2"
              @input="(e: any) => cvc2 = e.target.value.replace(/\D/g, '')"
              placeholder="***"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-mono text-center dir-ltr focus:bg-white focus:border-cyan-600 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              تاریخ انقضا (ماه / سال) *
            </label>
            <div className="flex gap-1">
              <select
                v-model="expMonth"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-1 py-2.5 text-xs font-mono text-center focus:bg-white cursor-pointer"
              >
                <option v-for="m in ['01','02','03','04','05','06','07','08','09','10','11','12']" :key="m" :value="m">{{ m }}</option>
              </select>
              <select
                v-model="expYear"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-1 py-2.5 text-xs font-mono text-center focus:bg-white cursor-pointer"
              >
                <option v-for="y in ['03','04','05','06','07','08','09','10']" :key="y" :value="y">۱۴{{ y }}</option>
              </select>
            </div>
          </div>
        </div>

        <!-- OTP Section (رمز پویا) -->
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-bold text-slate-700">
              رمز پویا (دوم) *
            </label>
            <button
              type="button"
              @click="handleSendOtp"
              :disabled="isOtpSent && otpTimer > 0"
              className="text-[11px] font-bold text-cyan-700 hover:text-cyan-800 disabled:text-slate-400 cursor-pointer flex items-center gap-1"
            >
              <RefreshCw :class="['w-3 h-3', isOtpSent && otpTimer > 0 ? 'animate-spin' : '']" />
              <span>
                {{ isOtpSent && otpTimer > 0 ? `ارسال شد (${otpTimer} ثانیه)` : 'دریافت رمز پویا' }}
              </span>
            </button>
          </div>

          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            <input
              type="text"
              required
              :value="otpCode"
              @input="(e: any) => otpCode = e.target.value.replace(/\D/g, '')"
              placeholder="کد ۶ رقمی دریافت شده در پیامک..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-3 py-2.5 text-xs font-mono text-center dir-ltr focus:bg-white focus:border-cyan-600 focus:outline-none transition"
            />
          </div>
          <p v-if="isOtpSent" className="text-[10px] text-teal-700 mt-1">
            رمز پویا به شماره موبایل صاحبان کارت پیامک گردید (کد تست: {{ otpCode }})
          </p>
        </div>

        <!-- Security Notice -->
        <div className="flex items-center gap-2 bg-slate-100 p-2.5 rounded-xl text-[11px] text-slate-600">
          <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
          <span>پرداخت با تمامی کارت‌های بانک‌های کشور (ملی، صادرات، ملت، سامان...) امکان‌پذیر است.</span>
        </div>

        <!-- Buttons -->
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
            :disabled="loading"
            className="flex-1 py-3 bg-gradient-to-r from-teal-600 to-cyan-700 hover:from-teal-700 hover:to-cyan-800 text-white font-bold text-xs rounded-2xl transition shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span v-if="loading">در حال تایید با شبکه بانکی...</span>
            <template v-else>
              <CreditCard className="w-4 h-4" />
              <span>پرداخت نهایی</span>
            </template>
          </button>
        </div>

      </form>

    </div>
  </div>
</template>
