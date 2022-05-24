<script setup>
import Api from "@/axios/axios.js";
import { ref } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import { Field, Form } from "vee-validate";
import Toast from "@/components/lib/Toast.js";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const id = route.params.id;

const dataAsli = ref([]);
const data = ref([]);
const dataDetail = ref({
  nama: "",
  tipe: "",
  link: "",
  file: "",
});

const getDataId = async () => {
  try {
    const response = await Api.get(`admin/buletinpsikologi/${id}`);
    // console.log(response);
    // dataDetail.value = response.data;
    dataDetail.value = {
      nama: response.data.nama,
      tipe: response.data.tipe,
      link: response.data.link,
      file: response.data.file,
    };
    // console.log(data.value);
    return response;
  } catch (error) {
    Toast.danger("Warning", "Data Gagal dimual");
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
    tipe: dataDetail.value.tipe,
    link: dataDetail.value.link,
    file: dataDetail.value.file,
  };
  try {
    const response = await Api.put(`admin/buletinpsikologi/${id}`, dataStore);
    Toast.success("Success", "Data Berhasil diupdate!");
    // resetForm();
    router.push({ name: "AdminBuletin" });

    return response.data;
  } catch (error) {
    Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};
const resetForm = () => {
  dataDetail.value = {
    nama: "",
    tipe: "",
    link: "",
    file: "",
  };
};
</script>
<template>
  <div class="pt-10 px-10 md:flex justify-between">
    <div>
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm"
        >Buletin Psikologi
      </span>
    </div>
    <div class="md:py-0 py-4">
      <BreadCrumb>
        <template v-slot:content> Buletin <BreadCrumbSpace /> Edit </template>
      </BreadCrumb>
    </div>
  </div>

  <div class="md:pt-6">
    <div class="md:flex justify-between px-10">
      <div class="space-x-1 space-y-1 pt-1 md:pt-0"></div>
      <div class="space-x-1 space-y-1 pt-1 md:pt-0">
        <router-link :to="{ name: 'AdminBuletin' }">
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
            <Form v-slot="{ errors }" @submit="onSubmit">
              <div class="pt-0 px-0">
                <div class="w-full mx-0">
                  <div class="bg-white rounded-lg p-0 sm:p-6 xl:p-0">
                    <div class="grid md:grid-cols-2 gap-2">
                      <div class="grid col-span-2">
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Judul</label
                        ><textarea
                          v-model="dataDetail.nama"
                          :rules="validateData"
                          name="nama"
                          ref="nama"
                          class="textarea textarea-bordered md:w-full max-w-2xl"
                          placeholder=""
                        ></textarea>
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.nama }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Tipe</label
                        >
                        <select
                          class="select select-bordered w-full max-w-xs"
                          v-model="dataDetail.tipe"
                          :rules="validateData"
                        >
                          <option disabled selected>Pilih ?</option>
                          <option>Link</option>
                          <option>Upload</option>
                        </select>

                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.tipe }}
                        </div>
                      </div>
                      <div v-if="dataDetail.tipe == 'Link'">
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Link</label
                        >
                        <Field
                          v-model="dataDetail.link"
                          type="text"
                          name="link"
                          ref="link"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.link }}
                        </div>
                      </div>
                      <div v-if="dataDetail.tipe == 'Upload'">
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >File</label
                        >

                        <Field
                          v-model="dataDetail.file"
                          type="text"
                          name="file"
                          ref="file"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.file }}
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
