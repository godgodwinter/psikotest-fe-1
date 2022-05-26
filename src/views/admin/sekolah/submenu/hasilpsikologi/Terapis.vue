<script setup>
import { ref } from "vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import ButtonDelete from "@/components/atoms/ButtonDel.vue";
import ButtonDetail from "@/components/atoms/ButtonDetail1.vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import { useRouter, useRoute } from "vue-router";
import Toast from "@/components/lib/Toast";
import Api from "@/axios/axios";
const router = useRouter();
const route = useRoute();

const id = route.params.id;
const id2 = route.params.id2;

const dataAsli = ref([]);
const dataKelas = ref([]);
const data = ref([]);

const getData = async () => {
  try {
    const response = await Api.get(`admin/deteksi/${id2}`);
    // console.log(response);
    dataAsli.value = response.data;
    data.value = response.data;
    return response;
  } catch (error) {
    Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};
getData();
const dataKetNegativ = ref([
  {
    label: "91-99",
    ket: "Sangat Tinggi Sekali / Sangat Mengganggu Sekali",
    kode: "STS",
  },
  {
    label: "81-90",
    ket: "Tinggi Sekali / Mengganggu Sekali",
    kode: "TS",
  },
  {
    label: "71-80",
    ket: "Tinggi / Mengganggu",
    kode: "T",
  },
  {
    label: "61-70",
    ket: "Cukup Tinggi / Cukup Mengganggu",
    kode: "CT",
  },
  {
    label: "41-60",
    ket: "Cukup / Terkendali",
    kode: "C",
  },
  {
    label: "31-40",
    ket: "Agak Rendah / Cukup Terkendali",
    kode: "AR",
  },
  {
    label: "21-30",
    ket: "Rendah / Terkendali Baik",
    kode: "R",
  },
  {
    label: "11-20",
    ket: "Rendah Sekali / Terkendali Baik Sekali",
    kode: "RS",
  },
  {
    label: "01-10",
    ket: "Sangat Rendah Sekali / Sangat Terkendali Baik Sekali",
    kode: "SRS",
  },
]);
</script>
<template>
  <div>
    <div class="pt-4 px-10 md:flex justify-between">
      <div>
        <span
          class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm"
          >Terapis Karakter Positif</span
        >
      </div>
      <div class="md:py-0 py-4 space-x-2 space-y-2">
        <router-link
          :to="{ name: 'AdminSekolahDetailHasilPsikologi', params: { id } }"
        >
          <button
            class="btn hover:shadow-lg shadow text-white hover:text-gray-100 gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            Kembali
          </button></router-link
        >
      </div>
    </div>

    <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
      <div class="w-full lg:w-full">
        <div class="bg-white shadow rounded-lg px-4 py-4">
          <div class="overflow-x-auto">
            <table class="table table-compact">
              <tbody>
                <!-- row 1 -->
                <tr>
                  <td class="whitespace-nowrap w-1/12">No Induk</td>
                  <td class="whitespace-nowrap w-1/12">:</td>
                  <td class="whitespace-nowrap w-10/12">{{ data.no_induk }}</td>
                </tr>
                <!-- row 2 -->
                <tr>
                  <td>Nama</td>
                  <td>:</td>
                  <td>{{ data.nama }}</td>
                </tr>
                <!-- row 3 -->
                <tr>
                  <td>Umur</td>
                  <td>:</td>
                  <td>{{ data.umur }}</td>
                </tr>
                <!-- row 3 -->
                <tr>
                  <td>Jenis Kelamin</td>
                  <td>:</td>
                  <td>{{ data.jenis_kelamin }}</td>
                </tr>
                <!-- row 3 -->
                <tr>
                  <td>Sekolah</td>
                  <td>:</td>
                  <td>{{ data.sekolah }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-4 px-10 md:flex justify-between">
      <div>
        <span
          class="text-2xl sm:text-2xl leading-none font-bold text-gray-700 shadow-sm"
          >ASPEK PSIKOLOGIS YANG DIUNGKAP</span
        >
      </div>
      <div class="md:py-0 py-4 space-x-2 space-y-2"></div>
    </div>

    <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
      <div class="w-full lg:w-full">
        <div class="bg-white shadow rounded-lg px-4 py-4">
          <div class="overflow-x-auto">
            <table class="table table-compact w-full">
              <tbody>
                <tr>
                  <th class="whitespace-nowrap w-1/100">No</th>
                  <th class="whitespace-nowrap w-5/12">Gangguan Karakter</th>
                  <th class="whitespace-nowrap w-1/100">Rank</th>
                  <th class="whitespace-nowrap w-1/100">%</th>
                  <th class="whitespace-nowrap w-1/100">ket</th>
                  <th class="whitespace-nowrap w-5/12"></th>
                </tr>
                <!-- row 1 -->

                <!-- row 2 -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-4 px-10 md:flex justify-between">
      <div>
        <span
          class="text-2xl sm:text-2xl leading-none font-bold text-gray-700 shadow-sm"
          >KETERANGAN NEGATIF</span
        >
      </div>
      <div class="md:py-0 py-4 space-x-2 space-y-2"></div>
    </div>

    <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
      <div class="w-full lg:w-full">
        <div class="bg-white shadow rounded-lg px-4 py-4">
          <div class="overflow-x-auto">
            <table class="table table-compact w-full">
              <tbody>
                <tr>
                  <th class="whitespace-nowrap w-1/100">Range</th>
                  <th class="whitespace-nowrap w-1/100">:</th>
                  <th class="whitespace-nowrap w-full">Keterangan</th>
                </tr>
                <!-- row 1 -->
                <tr v-for="(item, index) in dataKetNegativ">
                  <td class="text-center">{{ item.label }}</td>
                  <td>:</td>
                  <td>{{ item.ket }} ({{ item.kode }})</td>
                </tr>
                <!-- row 2 -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-4 px-10 md:flex justify-between">
      <div>
        <span
          class="text-2xl sm:text-xl leading-none font-bold text-gray-600 shadow-sm"
          >KESIMPULAN DAN SARAN</span
        >
      </div>
      <div class="md:py-0 py-4 space-x-2 space-y-2"></div>
    </div>

    <div class="pt-4 px-10 md:flex justify-between">
      <div>
        <span
          class="text-2xl sm:text-xl leading-none font-bold text-gray-600 shadow-sm"
          >II. EQ (Emotional Quotient): 39.88 AR</span
        >
      </div>
      <div class="md:py-0 py-4 space-x-2 space-y-2"></div>
    </div>

    <div class="pt-4 px-10 md:flex justify-between">
      <div>
        <span
          class="text-2xl sm:text-xl leading-none font-bold text-gray-600 shadow-sm"
          >III. SCQ (Social Quotient): 39.44 AR</span
        >
      </div>
      <div class="md:py-0 py-4 space-x-2 space-y-2"></div>
    </div>
    <div class="pt-4 px-10 md:flex justify-between">
      <div>
        <span
          class="text-2xl sm:text-xl leading-none font-bold text-gray-600 shadow-sm"
          >Saat ini anda memiliki Gangguan Karakter : 54.39 C yang dapat
          menimbulkan masalah dan mengganggu aktivitas usaha anda dalam mencapai
          keberhasilan. Sedangkan karakter negatif yang perlu anda kendalikan
          dan bersifat merugikan di antaranya yaitu dalam Posisi Nilai Cukup
          Tinggi ke atas sampai nilai Sangat Tinggi Sekali, nilai Cukup perlu
          diperhatikan dikhawatirkan suatu saat akan mengalami perubahan
          meningkat.</span
        >
      </div>
      <div class="md:py-0 py-4 space-x-2 space-y-2"></div>
    </div>
  </div>
</template>
