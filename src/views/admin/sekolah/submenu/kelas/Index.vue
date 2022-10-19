<script setup>
import { ref } from "vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import ButtonDelete from "@/components/atoms/ButtonDel.vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import { useRouter, useRoute } from "vue-router";
import Toast from "@/components/lib/Toast";
import Api from "@/axios/axios";
const router = useRouter();
const route = useRoute();

const id = route.params.id;

const dataAsli = ref([]);
const dataKelas = ref([]);
const data = ref([]);

let pilihKelas = ref([
  {
    label: "Semua Kelas",
    id: "Semua Kelas",
  },
  {
    label: "Belum masuk Kelas",
  },
]);

const getData = async () => {
  try {
    const response = await Api.get(`admin/datasekolah/${id}/kelas`);
    // console.log(response);
    dataAsli.value = response.data;
    // array map dataAsli to data
    data.value = dataAsli.value.map((item, index) => {
      return {
        ...item,
        nama: item.nama,
        walikelas: `${item.walikelas ? item.walikelas.nama : ""}`,
        jmlsiswa: item.jmlsiswa,
      };
    });
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
    label: "Kelas",
    field: "nama",
    type: "String",
  },
  {
    label: "Walikelas",
    field: "walikelas",
    type: "String",
  },
  {
    label: "Jumlah Siswa",
    field: "jmlsiswa",
    type: "String",
  },
];

const doEditData = async (id2, index) => {
  router.push({
    name: "AdminSekolahDetailKelasEdit",
    params: { id: id, id2: id2 },
  });
};

const doSinkron = async (id2, index) => {
  router.push({
    name: "AdminSekolahDetailKelasSinkron",
    params: { id: id, id2: id2 },
  });
};

const doDeleteData = async (id2, index) => {
  if (confirm("Apakah anda yakin menghapus data ini?")) {
    try {
      const response = await Api.delete(`admin/datasekolah/${id}/kelas/${id2}`);
      data.value.splice(index, 1);
      Toast.success("Success", "Data Berhasil dihapus!");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};
const forceDestroy = async (id2, index) => {
  if (confirm("Apakah anda yakin menghapus PERMANENT data ini? data tidak bisa dikembalikan")) {
    try {
      const response = await Api.delete(`admin/datasekolah/${id}/kelas/${id2}/forceDestroy`);
      data.value.splice(index, 1);
      Toast.success("Success", "Data Berhasil dihapus!");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

const doPilihKelas = () => {
  // if (inputTersedia.value.id === "Tersedia") {
  //   data.value = dataAsli.value.filter((item) => {
  //     return item.kelas_id <= 1000;
  //   });
  // }
  console.log("====================================");
  console.log("Cari");
  console.log("====================================");
};
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm">Kelas</span>
    </div>
    <div class="md:py-0 py-4 space-x-2 space-y-2">
      <router-link :to="{ name: 'AdminSekolahDetailKelasTambah', params: { id: id } }">
        <button class="btn btn-sm btn-info text-gray-600">
          Tambah
        </button>
      </router-link>
    </div>
  </div>

  <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
    <div class="w-full lg:w-full">
      <div class="bg-white shadow rounded-lg px-4 py-4">
        <div v-if="data">
          <vue-good-table :columns="columns" :rows="data" :search-options="{
            enabled: true,
          }" :pagination-options="{
            enabled: true,
            perPageDropdown: [10, 20, 50],
          }" styleClass="vgt-table striped bordered condensed" class="py-0">
            <template #table-row="props">
              <span v-if="props.column.field == 'actions'">
                <div class="text-sm font-medium text-center flex justify-center">
                  <ButtonEdit @click="doEditData(props.row.id, props.index)" />
                  <ButtonDelete @click="doDeleteData(props.row.id, props.index)" />
                  <button class="btn btn-primary btn-sm" @click="doSinkron(props.row.id, props.index)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                  <button class="btn btn-danger btn-sm tooltip" data-tip="Permanent Delete (Kelas, Siswa, ApiProBK)"
                    @click="forceDestroy(props.row.id, props.index)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
                    </svg>

                  </button>
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
