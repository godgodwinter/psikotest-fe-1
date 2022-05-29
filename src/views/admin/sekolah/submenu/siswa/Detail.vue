<script setup>
import { ref, watch } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import { Field, Form } from "vee-validate";
import Api from "@/axios/axios";
import Toast from "@/components/lib/Toast";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const id = route.params.id;
const id2 = route.params.id2;

const idTemp = ref(id);

const dataSekolahAsli = ref([]);
const data = ref();
const dataDetail = ref({
  nama: "",
  nomeridentitas: "",
  alamat: "",
  jk: "",
  kelas_id: "",
  sekolah_id: {
    label: "",
    id: "",
  },
});

const getDataId = async () => {
  try {
    const response = await Api.get(`admin/datasekolah/${id}/siswa/${id2}`);
    data.value = response.data;
    dataDetail.value = {
      nama: response.data.nama,
      nomeridentitas: response.data.nomeridentitas,
      alamat: response.data.alamat,
      jk: response.data.jk,
      kelas_id: {
        label: `${response.data.kelas ? response.data.kelas.nama : ""}`,
        id: response.data.kelas_id,
      },
      sekolah_id: {
        label: `${response.data.sekolah ? response.data.sekolah.nama : ""}`,
        id: response.data.sekolah_id,
      },
      tempatlahir: response.data.tempatlahir,
      tgllahir: response.data.tgllahir,
      usia: response.data.usia,
      agama: response.data.agama,
      anak: response.data.anak,
      kandung: response.data.kandung,
      angkat: response.data.angkat,
      tiri: response.data.tiri,
      statusanak: response.data.statusanak,
      bahasa: response.data.bahasa,
      tinggal: response.data.tinggal,
      jarak: response.data.jarak,
      telp: response.data.telp,
    };
    // console.log(data.value);
    return response;
  } catch (error) {
    Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};

getDataId();
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
    nomeridentitas: dataDetail.value.nomeridentitas,
    alamat: dataDetail.value.alamat,
    jk: dataDetail.value.jk,
    kelas_id: dataDetail.value.kelas_id.id,
    tempatlahir: dataDetail.value.tempatlahir,
    tgllahir: dataDetail.value.tgllahir,
    usia: dataDetail.value.usia,
    agama: dataDetail.value.agama,
    anak: dataDetail.value.anak,
    kandung: dataDetail.value.kandung,
    angkat: dataDetail.value.angkat,
    tiri: dataDetail.value.tiri,
    statusanak: dataDetail.value.statusanak,
    bahasa: dataDetail.value.bahasa,
    tinggal: dataDetail.value.tinggal,
    jarak: dataDetail.value.jarak,
    telp: dataDetail.value.telp,
  };
  try {
    const response = await Api.put(
      `admin/datasekolah/${id}/siswa/${id2}`,
      dataStore
    );
    Toast.success("Success", "Data Berhasil update!");
    // resetForm();
    router.push({ name: "AdminSekolahDetailSiswa", params: { id: id } });

    return response.data;
  } catch (error) {
    Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};
const resetForm = () => {
  dataDetail.value = {
    nama: "",
    nomeridentitas: "",
    alamat: "",
    jk: "",
    kelas_id: "",
  };
};
const dataKelas = ref([]);
const dataSekolah = ref([]);
const pilihKelas = ref([]);
const pilihSekolah = ref([]);

// get Sekolah
const getDataSekolah = async () => {
  try {
    const response = await Api.get(`admin/sekolah/`);
    // console.log(response);
    dataSekolah.value = response.data;
    dataSekolah.value.forEach((item) => {
      pilihSekolah.value.push({
        label: item.nama,
        id: item.id,
      });
    });
    return response;
  } catch (error) {
    Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};
getDataSekolah();
// get Kelas
const getDataKelas = async (sekolah_id) => {
  try {
    pilihKelas.value = [];
    const response = await Api.get(`admin/datasekolah/${sekolah_id}/kelas`);
    // console.log(response);
    dataKelas.value = response.data;
    dataKelas.value.forEach((item) => {
      pilihKelas.value.push({
        label: item.nama,
        id: item.id,
      });
    });
    return response;
  } catch (error) {
    Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};
getDataKelas(idTemp.value);

const changedValue = (value) => {
  getDataKelas(dataDetail.value.sekolah_id);
};
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between" v-if="data">
    <div class="card">
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm"
      >
        {{ data.nama }}
      </span>
      <span
        class="text-lg sm:text-lg leading-none font-bold text-gray-700 shadow-sm"
      >
        Sekolah : {{ data.sekolah.nama }}
      </span>
      <span
        class="text-lg sm:text-lg leading-none font-bold text-gray-700 shadow-sm"
      >
        Kelas : {{ data.kelas.nama }}
      </span>
    </div>
    <div class="md:py-0 py-4 space-x-2 space-y-2">
      <router-link
        :to="{ name: 'AdminSekolahDetailSiswa', params: { id: id } }"
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
                          >Pilih Sekolah Baru</label
                        >
                        <select
                          class="select select-info w-full max-w-xs"
                          v-model="dataDetail.sekolah_id"
                          @change="changedValue"
                          @selected="changedLabel"
                        >
                          <option disabled selected>
                            {{ data.sekolah.nama }}?
                          </option>
                          <option
                            v-for="(item, index) in pilihSekolah"
                            :value="item.id"
                          >
                            {{ item.label }}
                          </option>
                        </select>
                        <!-- <v-select
                          @change="changedValue"
                          @selected="changedLabel"
                          class="py-2 px-3 w-72 mx-auto md:mx-0"
                          :options="pilihSekolah"
                          v-model="dataDetail.sekolah_id"
                          v-bind:class="{ disabled: false }"
                        ></v-select> -->
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.nama }}
                        </div>
                      </div>

                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Pilih Kelas Baru</label
                        >
                        <!-- <v-select
                          class="py-2 px-3 w-72 mx-auto md:mx-0"
                          :options="pilihKelas"
                          v-model="dataDetail.kelas_id"
                          v-bind:class="{ disabled: false }"
                        ></v-select> -->
                        <select
                          class="select select-info w-full max-w-xs"
                          v-model="dataDetail.kelas_id"
                        >
                          <option disabled selected>
                            {{ data.kelas.nama }}
                          </option>
                          <option
                            v-for="(item, index) in pilihKelas"
                            :value="item.id"
                          >
                            {{ item.label }}
                          </option>
                        </select>
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.nama }}
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
