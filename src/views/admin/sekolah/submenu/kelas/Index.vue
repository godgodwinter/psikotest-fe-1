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
        >Kelas</span
      >
    </div>
    <div class="md:py-0 py-4 space-x-2 space-y-2">
      <button class="btn btn-sm btn-info text-gray-600">Tambah</button>
    </div>
  </div>
  <div class="w-full bg-white shadow shadow-md py-4 px-4">
    <div>TABEL kelas</div>
  </div>
</template>
