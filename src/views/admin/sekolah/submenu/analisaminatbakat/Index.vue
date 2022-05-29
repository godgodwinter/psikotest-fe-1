<script setup>
const BASE_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : "http://localhost:8000/";
import { ref, watch } from "vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import ButtonDelete from "@/components/atoms/ButtonDel.vue";
import ButtonDetail from "@/components/atoms/ButtonDetail1.vue";
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
    id: "Belum masuk Kelas",
  },
]);
// get Kelas
const getDataKelas = async () => {
  try {
    const response = await Api.get(`admin/datasekolah/${id}/kelas`);
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
getDataKelas();

const getData = async () => {
  try {
    const response = await Api.get(
      `admin/datasekolah/${id}/datasiswa/withsertifikat`
    );
    // console.log(response);
    dataAsli.value = response.data;
    // array map dataAsli to data
    // data.value = dataAsli.value.map((item, index) => {
    //   return {
    //     ...item,
    //     nama: item.nama,
    //     kelas: `${item.kelas ? item.kelas.nama : ""}`,
    //   };
    // });
    dataAsli.value.forEach((item, index) => {
      let tempDataList = {};
      if (item.siswadetailwithsertifikat) {
        ListTampilkan.value.forEach((listItem) => {
          tempDataList[listItem.id] =
            item.siswadetailwithsertifikat.apiprobkwithsertifikat.apiprobk_sertifikat[
              listItem.id
            ];
        });
      }
      // console.log(tempDataList);
      data.value.push({
        ...item,
        nama: item.nama,
        id: item.id,
        kelas: `${item.kelas ? item.kelas.nama : ""}`,
      });

      ListTampilkan.value.forEach((listItem) => {
        data.value[index][listItem.id] = tempDataList[listItem.id];
      });
    });
    return response;
  } catch (error) {
    Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};
getData();

const columns = ref([
  {
    label: "No",
    field: "no",
    width: "50px",
    tdClass: "text-center",
    thClass: "text-center",
  },
  {
    label: "Nama Siswa",
    field: "nama",
    type: "String",
  },
  {
    label: "Minat Pekerjaan 1",
    field: "minat_pekerjaan_1",
    type: "String",
  },
]);

const doEditData = async (id2, index) => {
  router.push({
    name: "AdminSekolahDetailSiswaEdit",
    params: { id: id, id2: id2 },
  });
};

const doDeleteData = async (id2, index) => {
  if (confirm("Apakah anda yakin menghapus data ini?")) {
    try {
      const response = await Api.delete(`admin/datasekolah/${id}/siswa/${id2}`);
      data.value.splice(index, 1);
      Toast.success("Success", "Data Berhasil dihapus!");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};
const inputCariKelas = ref({
  label: "Semua Kelas",
  id: "Semua Kelas",
});

const doPilihKelas = () => {
  if (inputCariKelas.value.id === "Semua Kelas") {
    data.value = dataAsli.value.map((item, index) => {
      return {
        ...item,
        nama: item.nama,
        kelas: `${item.kelas ? item.kelas.nama : ""}`,
      };
    });
  } else if (inputCariKelas.value.id === "Belum masuk Kelas") {
    let dataFiltered = dataAsli.value.filter((item) => {
      return item.kelas === null;
    });
    data.value = dataFiltered.map((item, index) => {
      return {
        ...item,
        nama: item.nama,
        kelas: "Belum Masuk Kelas",
      };
    });
  } else {
    let dataFiltered = dataAsli.value.filter((item) => {
      return item.kelas_id == inputCariKelas.value.id;
    });
    data.value = dataFiltered.map((item, index) => {
      return {
        ...item,
        nama: item.nama,
        kelas: `${item.kelas ? item.kelas.nama : ""}`,
      };
    });
  }
};

// seleksi yang ditampilkan
const ListTampilkan = ref([
  { label: "Minat Pekerjaan 1", id: "minat_pekerjaan_1", checked: true },
  { label: "Minat Pekerjaan 2", id: "minat_pekerjaan_2", checked: false },
  { label: "Minat Pekerjaan 3", id: "minat_pekerjaan_3", checked: false },
  { label: "Cita Cita 1", id: "mnt_cita2_1", checked: false },
  { label: "Cita Cita 2", id: "mnt_cita2_2", checked: false },
  { label: "Cita Cita 3", id: "mnt_cita2_3", checked: false },
]);

const onToggleList = (index) => {
  ListTampilkan.value[index].checked = !ListTampilkan.value[index].checked;

  if (ListTampilkan.value[index].checked) {
    columns.value.push({
      label: ListTampilkan.value[index].label,
      field: ListTampilkan.value[index].id,
      // field: `siswadetailwithsertifikat.apiprobkwithsertifikat.apiprobk_sertifikat.${ListTampilkan.value[index].id}`,
      // field: `siswadetailwithsertifikat`,
      type: "String",
    });
  } else {
    columns.value.forEach((item, index2) => {
      if (item.field === ListTampilkan.value[index].id) {
        columns.value.splice(index2, 1);
      }
    });
  }

  // console.log("====================================");
  // console.log(
  //   index,
  //   ListTampilkan.value[index].label,
  //   ListTampilkan.value[index].id,
  //   ListTampilkan.value[index].checked
  // );
  // console.log("====================================");
};

const listData = ref("minat_pekerjaan_1");
watch(ListTampilkan.value, (newValue, oldValue) => {
  listData.value = [];
  ListTampilkan.value.forEach((item, index) => {
    if (item.checked) {
      listData.value.push(item.id);
    }
  });
});
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm"
        >Analisa Minat dan Bakat</span
      >
    </div>
    <div class="md:py-0 py-4 space-x-2 space-y-2"></div>
  </div>
  <div class="w-full bg-white shadow shadow-md py-4 px-4">
    <div class="flex justify-center gap-2">
      <v-select
        class="py-2 px-3 w-72 mx-auto md:mx-0"
        :options="pilihKelas"
        v-model="inputCariKelas"
        v-bind:class="{ disabled: false }"
      ></v-select>
      <div class="py-2">
        <button class="btn btn-sm btn-info p-2" @click="doPilihKelas()">
          Cari
        </button>
      </div>
      <a
        :href="
          BASE_URL +
          'api/admin/proses/export/datasiswa/' +
          id +
          '/get?listdata=' +
          listData
        "
        target="_blank"
      >
        <button
          class="btn hover:shadow-lg btn-success shadow text-white hover:text-gray-100 gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Export
        </button>
      </a>
    </div>
  </div>
  <div class="w-full bg-white shadow shadow-md py-4 px-4">
    <div class="flex justify-center gap-2 w-full flex-wrap">
      <div v-for="(item, index) in ListTampilkan">
        <div class="form-control">
          <label class="cursor-pointer label" @click="onToggleList(index)">
            <span class="label-text px-2">{{ item.label }}</span>
            <input
              type="checkbox"
              :checked="item.checked"
              class="checkbox checkbox-secondary"
            />
          </label>
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
              <span v-if="props.column.field == 'no'">
                <div class="text-center">{{ props.index + 1 }}</div>
              </span>
              <span v-else-if="props.column.field == 'nama'">
                <div class="text-left">{{ props.row.nama }}</div>
              </span>

              <span v-else>
                <div v-if="props.row.siswadetailwithsertifikat == null">
                  <button
                    data-tip="Data API PRO BK tidak ditemukan"
                    class="tooltip btn btn-warning btn-sm text-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </button>
                </div>
                <div v-else>
                  {{ props.formattedRow[props.column.field] }}
                  <!-- {{
                    props.row.siswadetailwithsertifikat.apiprobkwithsertifikat
                      .apiprobk_sertifikat[props.column.field]
                  }} -->
                  <!-- {{ props.column.field }} -->
                </div>
              </span>
            </template>
          </vue-good-table>
        </div>
      </div>
    </div>
  </div>
</template>
