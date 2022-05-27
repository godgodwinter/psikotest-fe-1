<script setup>
import Api from "@/axios/axios.js";
import { ref } from "vue";
import ButtonDelete from "@/components/atoms/ButtonDel.vue";
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
  email: "",
  username: "",
  password: "",
});

let pilihSelect = ref([]);
const inputPilihSekolah = ref({
  label: "Pilih Sekolah",
  id: null,
});

const getDataSekolah = async () => {
  try {
    const response = await Api.get(`admin/yayasan/${id}/detail/getsekolah`);
    pilihSelect.value = response.data.map((item, index) => {
      return {
        label: item.nama,
        id: item.id,
      };
    });
    return response;
  } catch (error) {
    Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};
getDataSekolah();

const getData = async () => {
  try {
    const response = await Api.get(`admin/yayasan/${id}/detail`);
    // console.log(response);
    dataAsli.value = response.data;
    data.value = response.data;
    // console.log(data.value);
    return response;
  } catch (error) {
    Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};

getData();

const columns = [
  {
    label: "No",
    field: "no",
    width: "50px",
    tdClass: "text-center",
    thClass: "text-center",
  },
  {
    label: "Actions",
    field: "actions",
    sortable: false,
    width: "50px",
    tdClass: "text-center",
    thClass: "text-center",
  },
  {
    label: "Nama",
    field: "nama",
    type: "String",
  },
  {
    label: "Username",
    field: "username",
    type: "String",
  },
  {
    label: "Jumlah Sekolah",
    field: "jml",
    type: "String",
  },
  {
    label: "STATUS",
    field: "status_login",
    type: "String",
  },
];
const getDataId = async () => {
  try {
    const response = await Api.get(`admin/yayasan/${id}/`);
    // console.log(response);
    // dataDetail.value = response.data;
    dataDetail.value = {
      nama: response.data.nama,
      email: response.data.email,
      username: response.data.username,
      password: response.data.password,
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
  if (inputPilihSekolah.value.id) {
    const res = doStoreData();
  } else {
    Toast.warning("Warning", "Pilih Sekolah Terlebih Dahulu");
  }
};
const doStoreData = async (d) => {
  let dataStore = {
    sekolah_id: inputPilihSekolah.value.id,
  };
  try {
    const response = await Api.post(`admin/yayasan/${id}/detail`, dataStore);
    Toast.success("Success", "Data Berhasil diupdate!");
    // resetForm();
    // router.push({ name: "AdminYayasanDetail", params: { id: id } });
    getData();
    getDataSekolah();
    resetForm();

    return response.data;
  } catch (error) {
    Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};
const resetForm = () => {
  inputPilihSekolah.value.id = null;
  inputPilihSekolah.value.label = "Pilih Sekolah";
  dataDetail.value = {
    sekolah_id: "",
  };
};
const doDeleteData = async (kode, index) => {
  if (confirm("Apakah anda yakin menghapus data ini?")) {
    try {
      const response = await Api.delete(`admin/yayasan/${id}/detail/${kode}`);
      data.value.splice(index, 1);
      Toast.success("Success", "Data Berhasil dihapus!");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm"
        >Yayasan
      </span>
    </div>
    <div class="md:py-0 py-4">
      <BreadCrumb>
        <template v-slot:content> Yayasan <BreadCrumbSpace /> Edit </template>
      </BreadCrumb>
    </div>
  </div>

  <div class="md:pt-6">
    <div class="md:flex justify-between px-10">
      <div class="space-x-1 space-y-1 pt-1 md:pt-0"></div>
      <div class="space-x-1 space-y-1 pt-1 md:pt-0">
        <router-link :to="{ name: 'AdminYayasan' }">
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
                      <div>
                        <label
                          for="name"
                          class="text-sm font-medium text-gray-900 block mb-2"
                          >Pilih Sekolah</label
                        >
                        <v-select
                          class="py-2 px-3 w-72 mx-auto md:mx-0"
                          :options="pilihSelect"
                          v-model="inputPilihSekolah"
                          v-bind:class="{ disabled: false }"
                        ></v-select>
                        <div class="text-xs text-red-600 mt-1">
                          {{ errors.sekolah_id }}
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

  <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
    <div class="w-full lg:w-full">
      <div class="bg-white shadow rounded-lg px-4 py-4">
        <div v-if="data">
          <vue-good-table
            :columns="columns"
            :rows="data"
            :search-options="{
              enabled: true,
            }"
            :pagination-options="{
              enabled: true,
              perPageDropdown: [10, 20, 50],
            }"
            styleClass="vgt-table striped bordered condensed"
            class="py-0"
          >
            <template #table-row="props">
              <span v-if="props.column.field == 'actions'">
                <div
                  class="text-sm font-medium text-center flex justify-center"
                >
                  <ButtonDelete
                    @click="doDeleteData(props.row.id, props.index)"
                  />
                </div>
              </span>

              <span v-else-if="props.column.field == 'no'">
                <div class="text-center">{{ props.index + 1 }}</div>
              </span>

              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
          </vue-good-table>
        </div>
      </div>
    </div>
  </div>
</template>
