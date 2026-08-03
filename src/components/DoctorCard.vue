<script setup lang="ts">
import { Doctor } from '../types';
import { Star, MapPin, Calendar, Sparkles, CheckCircle2, Phone, Stethoscope } from 'lucide-vue-next';

const props = defineProps<{
  doctor: Doctor;
}>();

const emit = defineEmits<{
  (e: 'bookAppointment', doctor: Doctor): void;
}>();
</script>

<template>
  <div className="bg-white rounded-3xl border border-slate-200/90 hover:border-teal-400 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group transform hover:-translate-y-1.5 relative">
    
    <!-- Top Banner Tag -->
    <div v-if="doctor.isBranded" className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-slate-950 px-4 py-1.5 flex items-center justify-between text-xs font-black shadow-sm">
      <div className="flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
        <span>پزشک برند شده VIP</span>
      </div>
      <span className="text-[10px] bg-slate-950/20 text-slate-950 px-2 py-0.5 rounded-full">
        پزشک برتر
      </span>
    </div>

    <!-- Main Card Body -->
    <div className="p-5 space-y-4">
      
      <!-- Avatar & Title Header -->
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <img
            :src="doctor.avatar"
            :alt="doctor.name"
            className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-100 group-hover:border-teal-500 transition duration-300 shadow-md"
          />
          <span className="absolute -bottom-2 -right-2 bg-teal-600 text-white p-1 rounded-lg text-[10px] font-bold shadow-xs">
            {{ doctor.experienceYears }} سال
          </span>
        </div>

        <div className="space-y-1 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition">
              {{ doctor.name }}
            </h3>
            <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2 py-0.5 rounded-lg text-xs font-bold border border-amber-200">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{{ doctor.rating }}</span>
            </div>
          </div>

          <p className="text-xs font-medium text-teal-700">{{ doctor.title }}</p>

          <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
            <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
              کد نظام: {{ doctor.medicalCouncilNumber }}
            </span>
            <div className="flex items-center gap-1 text-slate-500">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>{{ doctor.city }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bio -->
      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
        {{ doctor.bio }}
      </p>

      <!-- Services Badges -->
      <div className="flex flex-wrap gap-1.5 pt-1">
        <span
          v-for="(serv, idx) in doctor.services.slice(0, 3)"
          :key="idx"
          className="bg-teal-50 text-teal-800 text-[10px] font-semibold px-2.5 py-1 rounded-lg border border-teal-100 flex items-center gap-1"
        >
          <CheckCircle2 className="w-3 h-3 text-teal-600" />
          <span>{{ serv }}</span>
        </span>
      </div>

      <!-- Next Available Slot Badge -->
      <div v-if="doctor.availableSlots.length > 0" className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 p-2.5 rounded-xl text-xs">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span className="font-medium">اولین نوبت خالی:</span>
        </div>
        <span className="font-bold text-emerald-700">{{ doctor.availableSlots[0] }}</span>
      </div>

    </div>

    <!-- Card Footer Fee & Action -->
    <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
      <div>
        <span className="block text-[10px] text-slate-400">حق مشاوره مطب:</span>
        <span className="text-sm font-black text-slate-900">
          {{ doctor.consultationFee.toLocaleString('fa-IR') }}{' '}
          <span className="text-[10px] font-normal text-slate-500">تومان</span>
        </span>
      </div>

      <button
        @click="emit('bookAppointment', doctor)"
        className="flex items-center gap-1.5 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-md shadow-teal-600/20 active:scale-95 cursor-pointer"
      >
        <Calendar className="w-4 h-4" />
        <span>رزرو نوبت آنلاین</span>
      </button>
    </div>

  </div>
</template>
