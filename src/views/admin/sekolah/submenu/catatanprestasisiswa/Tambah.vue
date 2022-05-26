<script setup>
import { ref } from "vue";
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

const dataSekolahAsli = ref([]);
const data = ref([]);
const dataDetail = ref({
  tanggal: "",
  prestasi: "",
  teknikbelajar: "",
  saranabelajar: "",
  penunjangbelajar: "",
  kesimpulandansaran: "",
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
    tanggal: dataDetail.value.tanggal,
    prestasi: dataDetail.value.prestasi,
    teknikbelajar: dataDetail.value.teknikbelajar,
    saranabelajar: dataDetail.value.saranabelajar,
    penunjangbelajar: dataDetail.value.penunjangbelajar,
    kesimpulandansaran: dataDetail.value.kesimpulandansaran,
  };
  try {
    const response = await Api.post(
      `admin/datasekolah/${id}/siswa/${id2}/catatanprestasisiswa`,
      dataStore
    );
    Toast.success("Success", "Data Berhasil ditambahkan!");
    // resetForm();
    router.push({
      name: "AdminSekolahDetailCatatanPrestasiSiswaDetail",
      params: { id, id2 },
    });

    return response.data;
  } catch (error) {
    Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};
const resetForm = () => {
  dataDetail.value = {
    tanggal: "",
    prestasi: "",
    teknikbelajar: "",
    saranabelajar: "",
    penunjangbelajar: "",
    kesimpulandansaran: "",
  };
};
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm"
        >Catatan Prestasi Siswa</span
      >
    </div>
    <div class="md:py-0 py-4 space-x-2 space-y-2">
      <router-link
        :to="{
          name: 'AdminSekolahDetailCatatanPrestasiSiswaDetail',
          params: { id, id2 },
        }"
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
                          >Tanggal</label
                        >
                        <Datepicker
                          v-model="dataDetail.tanggal"
                          format="yyyy/MM/dd"
                          value-format="yyyy-MM-dd"
                          :rules="validateData"
                          required
                        >
                          <template #calendar-header="{ index, day }">
                            <div
                              :class="
                                index === 5 || index === 6 ? 'red-color' : ''
                              "
                            >
                              {{ day }}
                            </div>
                          </template>
                        </Datepicker>
                        <!-- <Field
                          v-model="dataDetail.tanggal"
                          :rules="validateData"
                          type="text"
                          name="tanggal"
                          ref="tanggal"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        /> -->
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.tanggal }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Prestasi</label
                        >
                        <Field
                          v-model="dataDetail.prestasi"
                          :rules="validateData"
                          type="text"
                          name="prestasi"
                          ref="prestasi"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.prestasi }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Teknik Belajar</label
                        >
                        <Field
                          v-model="dataDetail.teknikbelajar"
                          :rules="validateData"
                          type="text"
                          name="teknikbelajar"
                          ref="teknikbelajar"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.teknikbelajar }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Saran Belajar</label
                        >
                        <Field
                          v-model="dataDetail.saranabelajar"
                          :rules="validateData"
                          type="text"
                          name="saranabelajar"
                          ref="saranabelajar"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.saranabelajar }}
                        </div>
                      </div>

                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Penunjang Belajar</label
                        >
                        <Field
                          v-model="dataDetail.penunjangbelajar"
                          :rules="validateData"
                          type="text"
                          name="penunjangbelajar"
                          ref="penunjangbelajar"
                          class="input input-bordered md:w-full max-w-2xl"
                          required
                        />
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.penunjangbelajar }}
                        </div>
                      </div>
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Kesimpulan dan Saran</label
                        >
                        <textarea
                          v-model="dataDetail.kesimpulandansaran"
                          class="textarea textarea-accent md:w-full max-w-2xl"
                          placeholder=""
                        ></textarea>

                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.kesimpulandansaran }}
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
