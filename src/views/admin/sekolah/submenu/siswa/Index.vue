<script setup>
import { ref } from "vue";
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
    const response = await Api.get(`admin/datasekolah/${id}/siswa`);
    // console.log(response);
    dataAsli.value = response.data;
    // array map dataAsli to data
    data.value = dataAsli.value.map((item, index) => {
      return {
        ...item,
        nama: item.nama,
        kelas: `${item.kelas ? item.kelas.nama : ""}`,
        username: item.username,
        passworddefault: item.passworddefault,
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
    label: "Nama Siswa",
    field: "nama",
    type: "String",
  },
  {
    label: "Kelas",
    field: "kelas",
    type: "String",
  },
  {
    label: "Username",
    field: "username",
    type: "String",
  },
  {
    label: "Password Default",
    field: "passworddefault",
    type: "String",
  },
  {
    label: "Username Ortu",
    field: "ortu_username",
    type: "String",
  },
  {
    label: "Password Default Ortu",
    field: "ortu_passworddefault",
    type: "String",
  },
];

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
        username: item.username,
        passworddefault: item.passworddefault,
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
        username: item.username,
        passworddefault: item.passworddefault,
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
        username: item.username,
        passworddefault: item.passworddefault,
      };
    });
  }
};

const doGenerateAkun = () => {
  if (confirm("Apakah anda yakin menggenerate akun siswa yang belum dibuat?")) {
    try {
      const response = Api.post(`admin/datasekolah/${id}/siswa/generateakun`);
      getData();
      Toast.success("Success", "Generate akun berhasil!");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};
const doGenerateAkunAll = () => {
  if (confirm("Apakah anda yakin menggenerate akun semua siswa?")) {
    try {
      const response = Api.post(
        `admin/datasekolah/${id}/siswa/generateakunforceall`
      );
      getData();
      Toast.success("Success", "Generate akun berhasil!");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

const doCopyClipboard = (item) => {
  navigator.clipboard.writeText(item);
  Toast.babeng("Info", `${item} berhasil disalin`);
};
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm"
        >Siswa</span
      >
    </div>
    <div class="md:py-0 py-4 space-x-2 space-y-2">
      <button
        class="btn btn-sm btn-warning text-gray-100"
        @click="doGenerateAkun()"
      >
        Generate Akun Baru
      </button>
      <button
        class="btn btn-sm btn-error text-gray-100"
        @click="doGenerateAkunAll()"
      >
        Generate Semua Akun
      </button>
      <router-link :to="{ name: 'AdminSekolahDetailSiswaTambah' }">
        <button class="btn btn-sm btn-info text-gray-100">
          Tambah
        </button></router-link
      >
    </div>
  </div>
  <div class="w-full bg-white shadow shadow-md py-4 px-4">
    <div class="flex justify-center">
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
                  <ButtonEdit @click="doEditData(props.row.id, props.index)" />
                  <ButtonDelete
                    @click="doDeleteData(props.row.id, props.index)"
                  />
                  <router-link
                    :to="{
                      name: 'AdminSekolahDetailSiswaDetail',
                      params: { id, id2: props.row.id },
                    }"
                  >
                    <ButtonDetail />
                  </router-link>
                </div>
              </span>

              <span v-else-if="props.column.field == 'no'">
                <div class="text-center">{{ props.index + 1 }}</div>
              </span>
              <span v-else-if="props.column.field == 'username'">
                <div class="flex justify-center gap-2">
                  <div class="text-center">{{ props.row.username }}</div>
                  <span
                    v-if="props.row.username"
                    @click="doCopyClipboard(props.row.username)"
                    class="hover:text-primary cursor-pointer"
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
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                  </span>
                </div>
              </span>
              <span v-else-if="props.column.field == 'passworddefault'">
                <div class="flex justify-center gap-2">
                  <div class="text-center">{{ props.row.passworddefault }}</div>
                  <span
                    v-if="props.row.passworddefault"
                    @click="doCopyClipboard(props.row.passworddefault)"
                    class="hover:text-primary cursor-pointer"
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
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                  </span>
                </div>
              </span>
              <span v-else-if="props.column.field == 'ortu_username'">
                <div class="flex justify-center gap-2">
                  <div class="text-center">{{ props.row.ortu_username }}</div>
                  <span
                    v-if="props.row.ortu_username"
                    @click="doCopyClipboard(props.row.ortu_username)"
                    class="hover:text-primary cursor-pointer"
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
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                  </span>
                </div>
              </span>
              <span v-else-if="props.column.field == 'ortu_passworddefault'">
                <div class="flex justify-center gap-2">
                  <div class="text-center">
                    {{ props.row.ortu_passworddefault }}
                  </div>
                  <span
                    v-if="props.row.ortu_passworddefault"
                    @click="doCopyClipboard(props.row.ortu_passworddefault)"
                    class="hover:text-primary cursor-pointer"
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
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                  </span>
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
