<script setup>
import { ref, watch } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import { Field, Form } from "vee-validate";
import Api from "@/axios/axios";
import Toast from "@/components/lib/Toast";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
const router = useRouter();
const route = useRoute();
const id = route.params.id;
const id2 = route.params.id2;
const kelas_id = route.params.id2;

const dataAsli = ref([]);
const data = ref([]);

const countDataSinkron = ref(0);
const diProsesSinkron = ref(0);
const progressBarValueSinkron = ref(0);
const countData = ref(0);
const diProses = ref(0);
const progressBarValue = ref(0);
let dataForm = {};
let dataFormDeteksi = {};


// get link sertifikat dan deteksi from server

const linkDeteksi = ref(null);
const linkSertifikat = ref(null);
const fnGetLinkFromBe = async () => {
  try {
    const response = await Api.get(`admin/apiprobk/serveraktif`);
    // console.log(response.data);
    linkDeteksi.value = response.data.deteksi ? response.data.deteksi.link : null;
    linkSertifikat.value = response.data.sertifikat ? response.data.sertifikat.link : null;
    return response;
  } catch (error) {
    console.error(error);
  }
};

fnGetLinkFromBe();

const getData = async () => {
  try {
    const response = await Api.get(`admin/apiprobk/kelas/${id2}`);
    // console.log(response);
    dataAsli.value = response.data;
    data.value = response.data;
    countData.value = data.value.filter(
      (item) => item.sertifikat == "belum"
    ).length;

    countDataSinkron.value = data.value.filter(
      (item) =>
        item.sertifikat == "sudah" &&
        item.deteksi == "sudah" &&
        item.sinkron == "belum"
    ).length;
    diProses.value = 0;
    diProsesSinkron.value = 0;
    // console.log(data.value);
    return response;
  } catch (error) {
    // Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};

getData();
const columns = [
  {
    label: "Actions",
    field: "actions",
    sortable: false,
    width: "50px",
    tdClass: "text-center",
    thClass: "text-center",
  },
  {
    label: "sertifikat_id",
    field: "sertifikat_id",
    type: "number",
  },
  {
    label: "deteksi_id",
    field: "deteksi_id",
    type: "number",
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
    label: "Iq",
    field: "iq",
    type: "number",
  },
  {
    label: "Sertifikat",
    field: "sertifikat",
    type: "String",
  },
  {
    label: "Status Get Data",
    field: "sertifikat_tgl",
    type: "String",
  },
  {
    label: "Deteksi",
    field: "deteksi",
    type: "String",
  },
  {
    label: "Status Deteksi Data",
    field: "deteksi_tgl",
    type: "String",
  },
  {
    label: "Sinkron",
    field: "sinkron",
    type: "String",
  },
  {
    label: "Status Sinkron Data",
    field: "sinkron_tgl",
    type: "String",
  },
];
const doBackupPerId = async (
  id,
  index,
  username,
  sertifikat_id,
  deteksi_id
) => {
  if (confirm("Apakah anda yakin melakukan backup data ini?")) {
    Toast.success("Info", "Proses backup di mulai, Tunggu hingga selesai!");
    // console.log(id, index, username);
    getDataFromApiUjianSertifikat(username, id, index, sertifikat_id);
    getDataFromApiUjianDeteksi(username, id, index, deteksi_id);
    getData();
  }
};

const getDataFromApiUjianSertifikat = async (
  username,
  apiprobk_id = 0,
  index = 0,
  sertifikat_id = 0
) => {
  try {
    if (linkSertifikat.value) {
      const response = await axios.post(
        `${linkSertifikat.value}`,
        {
          username: username,
        },
        {
          headers: {},
        }
      );
      // console.log(response);
      dataForm = response.data;
      dataForm.apiprobk_id = apiprobk_id;
      // console.log(dataForm);
      doStoreDataBackupSertifikat(dataForm, index, sertifikat_id);
      data.value[index].sertifikat = "sudah";
      Toast.success("Success", "Data Sertifikat Berhasil update!");
      // console.log(dataForm.iq);
      // data.value[index].iq = dataForm.iq;
      getData();
      return response;
    } else {
      Toast.babeng("Warning", "Link Sertifikat tidak ditemukan!");
    }
  } catch (error) {
    doProsesGetApiGagal(apiprobk_id, index);
    // data.value[index].sertifikat = "gagal";
    // Toast.danger("Warning", "Proses gagal");
    console.error(error);
  }
};

const getDataFromApiUjianDeteksi = async (
  username,
  apiprobk_id = 0,
  index = 0,
  deteksi_id = 0
) => {
  try {
    if (linkDeteksi) {
      const response = await axios.post(
        `${linkDeteksi.value}`,
        {
          username: username,
        },
        {
          headers: {},
        }
      );
      // console.log(response);
      dataFormDeteksi = response.data;
      dataFormDeteksi.apiprobk_id = apiprobk_id;
      console.log(dataFormDeteksi);
      doStoreDataBackupDeteksi(dataFormDeteksi, index, deteksi_id);
      data.value[index].sertifikat = "sudah";
      return response;
    }
    else {
      Toast.babeng("Warning", "Link Deteksi tidak ditemukan!")
    }
  } catch (error) {
    doProsesGetApiGagal(apiprobk_id, index, deteksi_id);
    // data.value[index].sertifikat = "gagal";
    // Toast.danger("Warning", "Proses gagal");
    console.error(error);
  }
};

const doStoreDataBackupSertifikat = async (d, index, sertifikat_id) => {
  try {
    const response = await Api.post(
      `admin/apiprobk/api_backup/update/${sertifikat_id}`,
      d
    );
    // console.log(response.data);
    // Toast.success("Success", "Data Berhasil ditambahkan!");
    data.value[index].deteksi = "sudah";
    diProses.value++;
    return response.data;
  } catch (error) {
    diProses.value++;
    data.value[index].deteksi = "gagal";
    // Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};

const doStoreDataBackupDeteksi = async (d, index, deteksi_id) => {
  // console.log(d);
  try {
    const response = await Api.post(
      `admin/apiprobk/api_backup_deteksi/update/${deteksi_id}`,
      d
    );
    // console.log(response.data);
    // Toast.success("Success", "Data Berhasil ditambahkan!");
    data.value[index].deteksi = "sudah";
    Toast.success("Success", "Data Deteksi Berhasil update!");
    console.log(deteksi_id, "sucess");
    // getData();
    diProses.value++;
    return response.data;
  } catch (error) {
    diProses.value++;
    data.value[index].deteksi = "gagal";
    // Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};

watch(diProses, async (newQuestion, oldQuestion) => {
  if (newQuestion == oldQuestion) return;
  if (countData.value > 0) {
    progressBarValue.value = (
      (newQuestion / (countData.value * 2)) *
      100
    ).toFixed(2);

    if (progressBarValue.value == 100) {
      Toast.success("Info", "Proses Backup Selesai!");
    }
  }
});

const doProsesGetApiGagal = async (id, index) => {
  // console.log(d);
  try {
    const response = await Api.post("admin/apiprobk/gagal", {
      id: id,
    });
    // console.log(response.data);
    // Toast.warning("Warning", "Update Proses gagal!");
    data.value[index].sertifikat = "gagal";
    data.value[index].deteksi = "gagal";
    diProses.value++;
    return response.data;
  } catch (error) {
    diProses.value++;
    data.value[index].sertifikat = "gagal";
    data.value[index].deteksi = "gagal";
    // Toast.danger("Warning", "Data gagal diupdate!");
    console.error(error);
  }
};
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm">SINKRON APIPROBK</span>
    </div>
    <div class="md:py-0 py-4 space-x-2 space-y-2">
      <router-link :to="{ name: 'AdminSekolahDetailKelas', params: { id: id } }">
        <button class="btn hover:shadow-lg shadow text-white hover:text-gray-100 gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Kembali
        </button>
      </router-link>
    </div>
  </div>

  <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
    <div class="w-full lg:w-full">
      <div class="bg-white shadow rounded-lg px-4 py-4">
        <div v-if="data">
          <vue-good-table :line-numbers="true" :columns="columns" :rows="data" :search-options="{
            enabled: true,
          }" :pagination-options="{
            enabled: true,
            perPageDropdown: [10, 20, 50],
          }" styleClass="vgt-table striped bordered condensed" class="py-0">
            <template #table-row="props">
              <span v-if="props.column.field == 'actions'">
                <div class="text-sm font-medium text-center flex justify-center">
                  <button @click="
                    doBackupPerId(
                      props.row.id,
                      props.index,
                      props.row.username,
                      props.row.sertifikat_id,
                      props.row.deteksi_id
                    )
                  " data-tip="UPDATE"
                    class="tooltip text-orange-100 block rounded-lg font-bold py-1 px-1 mr-2 flex items-center hover:text-orange-300 bg-orange-400 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
              </span>

              <span v-else-if="props.column.field == 'no'">
                <div class="text-center">{{ props.index + 1 }}</div>
              </span>

              <span v-else-if="props.column.field == 'sertifikat'">
                <div class="text-sm font-medium text-center flex justify-center">
                  <button v-if="props.row.sertifikat == 'sudah'" data-tip="Sukses"
                    class="tooltip text-green-100 block rounded-lg font-bold py-1 px-1 mr-2 flex items-center hover:text-green-300 bg-green-400 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </button>
                  <button v-else-if="props.row.sertifikat == 'gagal'" data-tip="Gagal"
                    class="tooltip text-red-100 block rounded-lg font-bold py-1 px-1 mr-2 flex items-center hover:text-red-300 bg-red-400 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd" />
                    </svg>
                  </button>
                  <button v-else data-tip="Belum"
                    class="tooltip text-gray-100 block rounded-lg font-bold py-1 px-1 mr-2 flex items-center hover:text-gray-300 bg-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </span>
              <span v-else-if="props.column.field == 'deteksi'">
                <div class="text-sm font-medium text-center flex justify-center">
                  <button v-if="props.row.deteksi == 'sudah'" data-tip="Sukses"
                    class="tooltip text-green-100 block rounded-lg font-bold py-1 px-1 mr-2 flex items-center hover:text-green-300 bg-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </button>
                  <button v-else-if="props.row.deteksi == 'gagal'" data-tip="Gagal"
                    class="tooltip text-red-100 block rounded-lg font-bold py-1 px-1 mr-2 flex items-center hover:text-red-300 bg-red-400 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd" />
                    </svg>
                  </button>
                  <button v-else data-tip="Belum"
                    class="tooltip text-gray-100 block rounded-lg font-bold py-1 px-1 mr-2 flex items-center hover:text-gray-300 bg-gray-400 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </span>
              <span v-else-if="props.column.field == 'sinkron'">
                <div class="text-sm font-medium text-center flex justify-center">
                  <button v-if="props.row.sinkron == 'sudah'" data-tip="Sukses"
                    class="tooltip text-green-100 block rounded-lg font-bold py-1 px-1 mr-2 flex items-center hover:text-green-300 bg-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </button>
                  <button v-else-if="props.row.sinkron == 'gagal'" data-tip="Gagal"
                    class="tooltip text-red-100 block rounded-lg font-bold py-1 px-1 mr-2 flex items-center hover:text-red-300 bg-red-400 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd" />
                    </svg>
                  </button>
                  <button v-else data-tip="Belum"
                    class="tooltip text-gray-100 block rounded-lg font-bold py-1 px-1 mr-2 flex items-center hover:text-gray-300 bg-gray-400 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
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
  