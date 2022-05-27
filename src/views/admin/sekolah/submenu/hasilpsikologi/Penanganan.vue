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
const siswa = ref(null);

const getData = async () => {
  try {
    const response = await Api.get(`admin/datahasildeteksi/${id2}/penanganan`);
    // console.log(response);
    dataAsli.value = response.data;
    data.value = response.data;
    siswa.value = response.siswa;
    return response;
  } catch (error) {
    Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};
getData();

const singkatan = (item = 99) => {
  let hasil = null;
  if (item > 90) {
    hasil = "Sangat Tinggi Sekali / Sangat Mengganggu Sekali";
  } else if (91 > item && item >= 81) {
    hasil = "Tinggi Sekali / Mengganggu Sekali (TS)";
  } else if (81 > item && item >= 71) {
    hasil = "Tinggi / Mengganggu";
  } else if (71 > item && item >= 61) {
    hasil = "Cukup Tinggi / Cukup Mengganggu";
  } else if (61 > item && item >= 41) {
    hasil = "Cukup / Terkendali ";
  } else if (41 > item && item >= 31) {
    hasil = "Agak Rendah / Cukup Terkendali ";
  } else if (31 > item && item >= 21) {
    hasil = "Rendah / Terkendali Baik ";
  } else if (21 > item && item >= 11) {
    hasil = "Rendah Sekali / Terkendali Baik Sekali";
  } else {
    hasil = "Sangat Rendah Sekali / Sangan Terkendali Baik Sekali ";
  }
  return hasil;
};
</script>
<template>
  <div v-if="siswa">
    <div class="pt-4 px-10 md:flex justify-between">
      <div>
        <span
          class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm"
          >Penanganan Deteksi Masalah</span
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
                  <td class="whitespace-nowrap w-10/12">
                    {{ siswa.nomeridentitas }}
                  </td>
                </tr>
                <!-- row 2 -->
                <tr>
                  <td>Nama</td>
                  <td>:</td>
                  <td>{{ siswa.nama }}</td>
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
                  <td>{{ siswa.jk }}</td>
                </tr>
                <!-- row 3 -->
                <tr>
                  <td>Sekolah</td>
                  <td>:</td>
                  <td>{{ siswa.sekolah.nama }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
      <div class="w-full lg:w-full">
        <div class="bg-white shadow rounded-lg px-4 py-4">
          <div class="overflow-x-auto px-4 space-y-10 mt-4 py-4">
            <div v-for="(item, index) in data.deteksi" class="space-y-2">
              <h1 class="text-lg font-bold text-gray-700">
                {{ index + 1 }}. {{ item.nama }} : {{ item.score }} -
                {{ singkatan(item.keterangan) }}
              </h1>
              <p class="indent-8 text-gray-700">{{ item.penanganan }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
