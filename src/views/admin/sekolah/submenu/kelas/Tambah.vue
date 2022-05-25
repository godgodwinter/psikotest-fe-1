<script setup>
import { ref } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import { Field, Form } from "vee-validate";
import Api from "@/axios/axios";
import Toast from "@/components/lib/Toast";
import { useRouter } from "vue-router";
const router = useRouter();

const dataSekolahAsli = ref([]);
const data = ref([]);
const dataDetail = ref({
  nama: "",
  alamat: "",
  status: "",
  kepsek_nama: "",
  tahunajaran_nama: "",
  semester_nama: "",
  kecamatan: "",
  kabupaten: "",
  provinsi: "",
});

// validasi
const validateData = (value) => {
  if (!value) {
    return "This field is required";
  }
  if (value.length < 1) {
    return "This Field must be at least 2 characters";
  }
  return true;
};
const onSubmit = () => {
  const res = doStoreData();
};
const doStoreData = async (d) => {
  let dataStore = {
    nama: dataDetail.value.nama,
    alamat: dataDetail.value.alamat,
    status: dataDetail.value.status,
    kepsek_nama: dataDetail.value.kepsek_nama,
    tahunajaran_nama: dataDetail.value.tahunajaran_nama,
    semester_nama: dataDetail.value.semester_nama,
    kecamatan: dataDetail.value.kecamatan,
    kabupaten: dataDetail.value.kabupaten,
    provinsi: dataDetail.value.provinsi,
  };
  try {
    const response = await Api.post(`admin/sekolah`, dataStore);
    Toast.success("Success", "Data Berhasil ditambahkan!");
    // resetForm();
    router.push({ name: "AdminSekolah" });

    return response.data;
  } catch (error) {
    Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};
const resetForm = () => {
  dataDetail.value = {
    nama: "",
    alamat: "",
    status: "",
    kepsek_nama: "",
    tahunajaran_nama: "",
    semester_nama: "",
    kecamatan: "",
    kabupaten: "",
    provinsi: "",
  };
};
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm"
        >Sekolah</span
      >
    </div>
    <div class="md:py-0 py-4">
      <BreadCrumb>
        <template v-slot:content> Sekolah <BreadCrumbSpace /> Tambah </template>
      </BreadCrumb>
    </div>
  </div>

  <div class="md:pt-6">
    <div class="md:flex justify-between px-10">
      <div class="space-x-1 space-y-1 pt-1 md:pt-0"></div>
      <div class="space-x-1 space-y-1 pt-1 md:pt-0">
        <router-link :to="{ name: 'AdminSekolah' }">
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
  </div>

  <div class="px-4 py-4">
    <div class="w-full">
      <div class="bg-white shadow rounded-lg px-0 py-4">
        <div class="w-full lg:w-fi mx-4">
          <div class="p-2 sm:p-6 xl:p-8">
            <Form v-slot="{ errors }" @submit="onSubmit" v-if="data">
              <div class="pt-0 px-0">
                <div class="w-full mx-0">
                  <div class="bg-white rounded-lg p-0 sm:p-6 xl:p-0">
                    <div class="grid md:grid-cols-2 gap-2">
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Nama</label
                        >
                        <Field
                          v-model="dataDetail.nama"
                          :rules="validateData"
                          type="text"
                          name="nama"
                          ref="nama"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.nama }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Alamat</label
                        >
                        <Field
                          v-model="dataDetail.alamat"
                          :rules="validateData"
                          type="text"
                          name="alamat"
                          ref="alamat"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.alamat }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Status</label
                        >
                        <select
                          class="select select-bordered w-full max-w-xs"
                          v-model="dataDetail.status"
                        >
                          <option disabled selected>Pilih Status ?</option>
                          <option>Aktif</option>
                          <option>Nonaktif</option>
                        </select>
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.status }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Nama Kepala Sekolah</label
                        >
                        <Field
                          v-model="dataDetail.kepsek_nama"
                          :rules="validateData"
                          type="text"
                          name="kepsek_nama"
                          ref="kepsek_nama"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.kepsek_nama }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Tahun Ajaran</label
                        >
                        <Field
                          v-model="dataDetail.tahunajaran_nama"
                          :rules="validateData"
                          type="text"
                          name="tahunajaran_nama"
                          ref="tahunajaran_nama"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.tahunajaran_nama }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Semester</label
                        >
                        <Field
                          v-model="dataDetail.semester_nama"
                          :rules="validateData"
                          type="text"
                          name="semester_nama"
                          ref="semester_nama"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.semester_nama }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Provinsi</label
                        >
                        <Field
                          v-model="dataDetail.provinsi"
                          :rules="validateData"
                          type="text"
                          name="provinsi"
                          ref="provinsi"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.provinsi }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Kabupaten</label
                        >
                        <Field
                          v-model="dataDetail.kabupaten"
                          :rules="validateData"
                          type="text"
                          name="kabupaten"
                          ref="kabupaten"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.kabupaten }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Kecamatan</label
                        >
                        <Field
                          v-model="dataDetail.kecamatan"
                          :rules="validateData"
                          type="text"
                          name="kecamatan"
                          ref="kecamatan"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.kecamatan }}
                        </div>
                      </div>
                    </div>

                    <div class="w-full flex justify-end mt-4 px-20">
                      <button class="btn btn-active btn-lg btn-primary">
                        Simpan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
