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
        >Dashboard Sekolah</span
      >
    </div>
    <div class="md:py-0 py-4 space-x-2 space-y-2"></div>
  </div>

  <div class="w-full bg-white shadow shadow-md py-4 px-4">
    <div>Profile Sekolah</div>
  </div>

  <div class="2xl:flex felx-wrap gap-2 w-full px-4">
    <div class="w-1/2 py-2">
      <div class="card w-96 bg-base-100 shadow-xl">
        <figure class="px-10 pt-10">
          <img
            src="@/assets/img/logo/github-copilot.svg"
            alt="Shoes"
            class="rounded-xl text-white"
          />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">Nama Sekolah</h2>
          <p>Alamat</p>
          <div class="card-actions">
            <button class="btn btn-primary">Update Logo Sekolah</button>
          </div>
        </div>
      </div>
    </div>
    <div class="w-1/2 py-2">
      <div class="card w-96 bg-base-100 shadow-xl">
        <figure class="px-10 pt-10">
          <img
            src="@/assets/img/logo/github-copilot.svg"
            alt="Shoes"
            class="rounded-xl"
          />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">Nama Kepala Sekolah</h2>
          <p>Alamat</p>
          <div class="card-actions">
            <button class="btn btn-primary">Update Photo Kepala Sekolah</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
