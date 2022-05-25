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
const id2 = route.params.id2;

const dataAsli = ref([]);
const data = ref([]);
const dataDetail = ref({
  penjelasan: "",
});

const getDataId = async () => {
  try {
    const response = await Api.get(`admin/katabijak/${id}/detail/${id2}`);
    // console.log(response);
    // dataDetail.value = response.data;
    dataDetail.value = {
      penjelasan: response.data.penjelasan,
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
    penjelasan: dataDetail.value.penjelasan,
  };
  try {
    const response = await Api.put(
      `admin/katabijak/${id}/detail/${id2}`,
      dataStore
    );
    Toast.success("Success", "Data Berhasil diupdate!");
    // resetForm();
    router.push({ name: "AdminKataBijakDetail" });

    return response.data;
  } catch (error) {
    Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};
const resetForm = () => {
  dataDetail.value = {
    penjelasan: "",
  };
};
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm"
        >Kata - kata bijak Detail
      </span>
    </div>
    <div class="md:py-0 py-4">
      <BreadCrumb>
        <template v-slot:content>
          Kata bijak <BreadCrumbSpace /> Detail <BreadCrumbSpace /> Edit
        </template>
      </BreadCrumb>
    </div>
  </div>

  <div class="md:pt-6">
    <div class="md:flex justify-between px-10">
      <div class="space-x-1 space-y-1 pt-1 md:pt-0"></div>
      <div class="space-x-1 space-y-1 pt-1 md:pt-0">
        <router-link :to="{ name: 'AdminKataBijakDetail' }">
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
                          >Penjelasan</label
                        ><textarea
                          v-model="dataDetail.penjelasan"
                          :rules="validateData"
                          name="penjelasan"
                          ref="penjelasan"
                          class="textarea textarea-bordered md:w-full max-w-2xl"
                          placeholder=""
                        ></textarea>
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.penjelasan }}
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
