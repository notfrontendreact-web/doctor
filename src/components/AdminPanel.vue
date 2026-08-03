<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import {
  Users,
  ShoppingBag,
  DollarSign,
  Stethoscope,
  FileText,
  SlidersHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  Edit,
  Shield,
  Search,
  TrendingUp,
  RefreshCw,
  Sparkles,
  UserCheck,
  UserX,
  CreditCard
} from 'lucide-vue-next';
import { AppointmentOrder, AppUser, Doctor, Article } from '../types';

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const activeTab = ref<'dashboard' | 'orders' | 'users' | 'doctors' | 'articles'>('dashboard');
const loading = ref(false);
const stats = ref<any>(null);
const orders = ref<AppointmentOrder[]>([]);
const users = ref<AppUser[]>([]);
const doctors = ref<Doctor[]>([]);
const articles = ref<Article[]>([]);

const orderSearch = ref('');
const userSearch = ref('');

// Add new Doctor Modal State
const showAddDoctorModal = ref(false);
const newDocData = ref({
  name: '',
  title: '',
  specialtyName: '',
  city: 'تهران',
  phone: '',
  consultationFee: 400000,
  isBranded: true,
  bio: ''
});

// Add new Article Modal State
const showAddArticleModal = ref(false);
const newArtData = ref({
  title: '',
  category: 'پوست و زیبایی',
  summary: '',
  content: ''
});

const loadData = async () => {
  loading.value = true;
  try {
    const [statsRes, ordersRes, usersRes, docsRes, artsRes] = await Promise.all([
      fetch('/api/admin/stats').then((r) => r.json()),
      fetch('/api/admin/orders').then((r) => r.json()),
      fetch('/api/admin/users').then((r) => r.json()),
      fetch('/api/doctors').then((r) => r.json()),
      fetch('/api/articles').then((r) => r.json())
    ]);

    stats.value = statsRes;
    orders.value = ordersRes.orders || [];
    users.value = usersRes.users || [];
    doctors.value = docsRes.doctors || [];
    articles.value = artsRes.articles || [];
  } catch (err) {
    console.error('Error fetching admin data:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadData();
});

const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
  try {
    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    if (res.ok) {
      orders.value = orders.value.map((o) => (o.id === orderId ? { ...o, status: newStatus as any } : o));
    }
  } catch (err) {
    console.error('Error updating order:', err);
  }
};

const handleToggleUserStatus = async (userId: string, currentStatus: string) => {
  const nextStatus = currentStatus === 'active' ? 'blocked' : 'active';
  try {
    const res = await fetch(`/api/admin/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: nextStatus })
    });
    if (res.ok) {
      users.value = users.value.map((u) => (u.id === userId ? { ...u, status: nextStatus as any } : u));
    }
  } catch (err) {
    console.error('Error updating user:', err);
  }
};

const handleAddDoctorSubmit = async () => {
  try {
    const res = await fetch('/api/doctors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDocData.value)
    });
    if (res.ok) {
      showAddDoctorModal.value = false;
      loadData();
    }
  } catch (err) {
    console.error(err);
  }
};

const handleAddArticleSubmit = async () => {
  try {
    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newArtData.value)
    });
    if (res.ok) {
      showAddArticleModal.value = false;
      loadData();
    }
  } catch (err) {
    console.error(err);
  }
};

const filteredOrders = computed(() => {
  return orders.value.filter(
    (o) =>
      o.trackingCode.toLowerCase().includes(orderSearch.value.toLowerCase()) ||
      o.patientName.toLowerCase().includes(orderSearch.value.toLowerCase()) ||
      o.patientPhone.includes(orderSearch.value)
  );
});
</script>

<template>
  <div className="bg-slate-100 min-h-screen text-slate-900 dir-rtl p-4 sm:p-8 animate-in fade-in duration-200">
    <div className="max-w-7xl mx-auto space-y-6">
      
      <!-- Admin Header -->
      <div className="bg-slate-900 text-white rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-500/20 text-teal-400 rounded-2xl border border-teal-500/30">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black">پنل مدیریت قوی پزشک برتر</h1>
              <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full">
                ADMIN PRO
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">مدیریت متمرکز سفارشات، نوبت‌ها، کاربران و برندسازی پزشکان</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            @click="loadData"
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition cursor-pointer flex items-center gap-1.5 text-xs font-medium"
          >
            <RefreshCw :class="['w-4 h-4', loading ? 'animate-spin' : '']" />
            <span>بروزرسانی آمار</span>
          </button>
          <button
            @click="emit('close')"
            className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition shadow-md cursor-pointer"
          >
            بازگشت به سایت
          </button>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          @click="activeTab = 'dashboard'"
          :class="[
            'flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs transition cursor-pointer',
            activeTab === 'dashboard'
              ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          ]"
        >
          <TrendingUp className="w-4 h-4" />
          <span>داشبورد آمار</span>
        </button>

        <button
          @click="activeTab = 'orders'"
          :class="[
            'flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs transition cursor-pointer',
            activeTab === 'orders'
              ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          ]"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>مدیریت نوبت‌ها و سفارشات ({{ orders.length }})</span>
        </button>

        <button
          @click="activeTab = 'users'"
          :class="[
            'flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs transition cursor-pointer',
            activeTab === 'users'
              ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          ]"
        >
          <Users className="w-4 h-4" />
          <span>مدیریت کاربران ({{ users.length }})</span>
        </button>

        <button
          @click="activeTab = 'doctors'"
          :class="[
            'flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs transition cursor-pointer',
            activeTab === 'doctors'
              ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          ]"
        >
          <Stethoscope className="w-4 h-4" />
          <span>مدیریت پزشکان ({{ doctors.length }})</span>
        </button>

        <button
          @click="activeTab = 'articles'"
          :class="[
            'flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs transition cursor-pointer',
            activeTab === 'articles'
              ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          ]"
        >
          <FileText className="w-4 h-4" />
          <span>مدیریت مقالات ({{ articles.length }})</span>
        </button>
      </div>

      <!-- Tab 1: Dashboard Stats -->
      <div v-if="activeTab === 'dashboard'" className="space-y-6 animate-in fade-in">
        <!-- Stat Cards Grid -->
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-medium">کل درآمد ثبت‌شده:</span>
              <span className="block text-lg font-black text-teal-800 mt-1">
                {{ (stats?.totalRevenue || 0).toLocaleString('fa-IR') }} تومان
              </span>
            </div>
            <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-medium">کل نوبت‌های پرداختی:</span>
              <span className="block text-lg font-black text-slate-900 mt-1">
                {{ orders.filter((o) => o.status === 'paid').length }} نوبت
              </span>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-medium">پزشکان عضو و برند شده:</span>
              <span className="block text-lg font-black text-amber-600 mt-1">
                {{ doctors.filter((d) => d.isBranded).length }} پزشک VIP
              </span>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-medium">کاربران فعال سامانه:</span>
              <span className="block text-lg font-black text-slate-900 mt-1">
                {{ users.length }} کاربر
              </span>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>

        <!-- Recent Orders Overview -->
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <h3 className="font-bold text-slate-900 text-sm">آخرین تراکنش‌های درگاه آنلاین</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                  <th className="p-3">کد رهگیری</th>
                  <th className="p-3">نام بیمار</th>
                  <th className="p-3">خدمت / پزشک</th>
                  <th className="p-3">مبلغ (تومان)</th>
                  <th className="p-3">وضعیت</th>
                  <th className="p-3">تاریخ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr v-for="ord in orders.slice(0, 5)" :key="ord.id" className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-teal-700">{{ ord.trackingCode }}</td>
                  <td className="p-3 font-medium text-slate-900">{{ ord.patientName }}</td>
                  <td className="p-3 text-slate-600">{{ ord.productTitle }}</td>
                  <td className="p-3 font-bold">{{ ord.amount.toLocaleString('fa-IR') }}</td>
                  <td className="p-3">
                    <span
                      :class="[
                        'px-2.5 py-1 rounded-full text-[10px] font-bold',
                        ord.status === 'paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ord.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      ]"
                    >
                      {{ ord.status === 'paid' ? 'پرداخت موفق' : ord.status === 'pending' ? 'در انتظار پرداخت' : 'لغو شده' }}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400">{{ ord.date }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Tab 2: Orders & Appointments Management -->
      <div v-if="activeTab === 'orders'" className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 animate-in fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="font-black text-slate-900 text-base">مدیریت کامل نوبت‌ها و سفارشات</h3>
          
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            <input
              type="text"
              v-model="orderSearch"
              placeholder="جستجو کد رهگیری، نام یا شماره..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-9 pl-3 py-2 text-xs focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="p-3">کد رهگیری</th>
                <th className="p-3">نام بیمار</th>
                <th className="p-3">همراه / کد ملی</th>
                <th className="p-3">خدمت / پزشک</th>
                <th className="p-3">مبلغ</th>
                <th className="p-3">زمان رزرو</th>
                <th className="p-3">وضعیت</th>
                <th className="p-3 text-center">تغییر وضعیت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr v-for="ord in filteredOrders" :key="ord.id" className="hover:bg-slate-50">
                <td className="p-3 font-mono font-bold text-teal-700">{{ ord.trackingCode }}</td>
                <td className="p-3 font-bold text-slate-900">{{ ord.patientName }}</td>
                <td className="p-3 text-slate-500 font-mono">
                  {{ ord.patientPhone }}
                  <br />
                  <span className="text-[10px] text-slate-400">کدملی: {{ ord.patientNationalId }}</span>
                </td>
                <td className="p-3 text-slate-700">{{ ord.productTitle }}</td>
                <td className="p-3 font-bold text-slate-900">{{ ord.amount.toLocaleString('fa-IR') }} تومان</td>
                <td className="p-3 text-slate-500">{{ ord.timeSlot }}</td>
                <td className="p-3">
                  <span
                    :class="[
                      'px-2.5 py-1 rounded-full text-[10px] font-bold',
                      ord.status === 'paid'
                        ? 'bg-emerald-100 text-emerald-800'
                        : ord.status === 'pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    ]"
                  >
                    {{ ord.status === 'paid' ? 'پرداخت موفق' : ord.status === 'pending' ? 'معلق' : 'لغو شده' }}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      @click="handleUpdateOrderStatus(ord.id, 'paid')"
                      className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded text-[10px] cursor-pointer"
                    >
                      تایید پرداخت
                    </button>
                    <button
                      @click="handleUpdateOrderStatus(ord.id, 'cancelled')"
                      className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded text-[10px] cursor-pointer"
                    >
                      لغو سفارش
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Tab 3: User Management -->
      <div v-if="activeTab === 'users'" className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 animate-in fade-in">
        <h3 className="font-black text-slate-900 text-base">مدیریت کاربران سامانه</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="p-3">نام کاربر</th>
                <th className="p-3">شماره تماس</th>
                <th className="p-3">ایمیل</th>
                <th className="p-3">نقش کاربری</th>
                <th className="p-3">تعداد سفارشات</th>
                <th className="p-3">وضعیت</th>
                <th className="p-3 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr v-for="usr in users" :key="usr.id" className="hover:bg-slate-50">
                <td className="p-3 font-bold text-slate-900">{{ usr.fullName }}</td>
                <td className="p-3 font-mono text-slate-600">{{ usr.phone }}</td>
                <td className="p-3 text-slate-500 dir-ltr text-right">{{ usr.email }}</td>
                <td className="p-3">
                  <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-bold">
                    {{ usr.role === 'admin' ? 'مدیر ارشد' : usr.role === 'doctor' ? 'پزشک' : 'کاربر عادی' }}
                  </span>
                </td>
                <td className="p-3 font-bold">{{ usr.totalOrdersCount }} سفارش</td>
                <td className="p-3">
                  <span
                    :class="[
                      'px-2 py-0.5 rounded text-[10px] font-bold',
                      usr.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    ]"
                  >
                    {{ usr.status === 'active' ? 'فعال' : 'مسدود شده' }}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <button
                    @click="handleToggleUserStatus(usr.id, usr.status)"
                    :class="[
                      'px-3 py-1 rounded text-[10px] font-bold transition cursor-pointer',
                      usr.status === 'active'
                        ? 'bg-rose-50 hover:bg-rose-100 text-rose-700'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                    ]"
                  >
                    {{ usr.status === 'active' ? 'مسدودسازی' : 'فعال‌سازی' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Tab 4: Doctor Management -->
      <div v-if="activeTab === 'doctors'" className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 animate-in fade-in">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-slate-900 text-base">مدیریت پزشکان و اعطای نشان برندسازی</h3>
          <button
            @click="showAddDoctorModal = true"
            className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>افزودن پزشک جدید</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="doc in doctors" :key="doc.id" className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-3">
              <img :src="doc.avatar" :alt="doc.name" className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{{ doc.name }}</h4>
                <p className="text-xs text-teal-700">{{ doc.title }}</p>
              </div>
            </div>
            <div className="text-xs text-slate-500 space-y-1">
              <p>کد نظام پزشکی: {{ doc.medicalCouncilNumber }}</p>
              <p>شهر: {{ doc.city }} | حق مشاوره: {{ doc.consultationFee.toLocaleString('fa-IR') }} تومان</p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <span
                :class="[
                  'px-2 py-0.5 rounded text-[10px] font-bold',
                  doc.isBranded ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-600'
                ]"
              >
                {{ doc.isBranded ? 'پزشک برند شده VIP' : 'عادی' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 5: Articles Management -->
      <div v-if="activeTab === 'articles'" className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 animate-in fade-in">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-slate-900 text-base">مدیریت مقالات مجله سلامت</h3>
          <button
            @click="showAddArticleModal = true"
            className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>انتشار مقاله جدید</span>
          </button>
        </div>

        <div className="space-y-3">
          <div v-for="art in articles" :key="art.id" className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img :src="art.imageUrl" :alt="art.title" className="w-16 h-12 rounded-lg object-cover" />
              <div>
                <h4 className="font-bold text-slate-900 text-xs">{{ art.title }}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">{{ art.category }} • بازدید: {{ art.views }}</p>
              </div>
            </div>
            <span className="text-[10px] bg-teal-50 text-teal-800 px-2 py-1 rounded font-bold">
              منتشر شده
            </span>
          </div>
        </div>
      </div>

    </div>

    <!-- Add Doctor Modal -->
    <div v-if="showAddDoctorModal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 space-y-4">
        <h3 className="font-black text-slate-900 text-lg">افزودن پزشک جدید به سامانه</h3>
        <form @submit.prevent="handleAddDoctorSubmit" className="space-y-3 text-xs">
          <div>
            <label className="block font-bold mb-1">نام و نام خانوادگی پزشک</label>
            <input
              type="text"
              required
              v-model="newDocData.name"
              placeholder="دکتر علی نوری"
              className="w-full border rounded-xl p-2.5"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">تخصص و عنوان</label>
            <input
              type="text"
              required
              v-model="newDocData.title"
              placeholder="متخصص مغز و اعصاب"
              className="w-full border rounded-xl p-2.5"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">حق مشاوره (تومان)</label>
            <input
              type="number"
              required
              v-model.number="newDocData.consultationFee"
              className="w-full border rounded-xl p-2.5"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              @click="showAddDoctorModal = false"
              className="flex-1 py-2 bg-slate-100 font-bold rounded-xl cursor-pointer"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-teal-600 text-white font-bold rounded-xl cursor-pointer"
            >
              ثبت پزشک
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Add Article Modal -->
    <div v-if="showAddArticleModal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 space-y-4">
        <h3 className="font-black text-slate-900 text-lg">انتشار مقاله جدید</h3>
        <form @submit.prevent="handleAddArticleSubmit" className="space-y-3 text-xs">
          <div>
            <label className="block font-bold mb-1">عنوان مقاله</label>
            <input
              type="text"
              required
              v-model="newArtData.title"
              className="w-full border rounded-xl p-2.5"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">خلاصه مقاله</label>
            <textarea
              required
              v-model="newArtData.summary"
              className="w-full border rounded-xl p-2.5 h-20"
            ></textarea>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              @click="showAddArticleModal = false"
              className="flex-1 py-2 bg-slate-100 font-bold rounded-xl cursor-pointer"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-teal-600 text-white font-bold rounded-xl cursor-pointer"
            >
              انتشار مقاله
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>
