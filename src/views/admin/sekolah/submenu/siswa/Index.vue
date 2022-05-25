<script setup>
import { ref } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
let inputTersedia = ref({
  label: "Tersedia",
  id: "Tersedia",
});
let pilihKelas = [
  {
    label: "Semua Kelas",
    id: "Semua Kelas",
  },
  {
    label: "X IPA",
    id: "X IPA",
  },
  {
    label: "X1 B",
    id: "X1 B",
  },
];
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm"
        >Siswa</span
      >
    </div>
    <div class="md:py-0 py-4 space-x-2 space-y-2">
      <button class="btn btn-sm btn-warning text-gray-600">
        Generate Password
      </button>
      <button class="btn btn-sm btn-info text-gray-600">Tambah</button>
    </div>
  </div>
  <div class="w-full bg-white shadow shadow-md py-4 px-4">
    <div class="flex justify-center">
      <v-select
        class="py-2 px-3 w-72 mx-auto md:mx-0"
        :options="pilihKelas"
        v-model="inputTersedia"
        v-bind:class="{ disabled: false }"
      ></v-select>
    </div>
    <div>TABEL SISWA</div>
  </div>
</template>
