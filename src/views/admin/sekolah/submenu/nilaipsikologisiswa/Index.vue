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
    const response = await Api.get(
      `admin/datasekolah/${id}/datasiswa/withsertifikat`
    );
    // console.log(response);
    dataAsli.value = response.data;
    // array map dataAsli to data
    data.value = dataAsli.value.map((item, index) => {
      return {
        ...item,
        nama: item.nama,
        kelas: `${item.kelas ? item.kelas.nama : ""}`,
      };
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
    label: "kb%",
    field: "kb_persen",
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
  { label: "kb%", id: "kb_persen", checked: true },
  { label: "kb ket", id: "kbh", checked: false },
  { label: "lm%", id: "lm_persen", checked: false },
  { label: "lm ket", id: "lmh", checked: false },
  { label: "ks%", id: "ks_persen", checked: false },
  { label: "ks ket", id: "ksh", checked: false },
  { label: "km%", id: "km_persen", checked: false },
  { label: "km ket", id: "kmh", checked: false },
  { label: "kk%", id: "kk_persen", checked: false },
  { label: "kk ket", id: "kkh", checked: false },
  { label: "ki%", id: "ki_persen", checked: false },
  { label: "ki ket", id: "kih", checked: false },
  { label: "ka%", id: "ka_persen", checked: false },
  { label: "ka ket", id: "kah", checked: false },
  { label: "kn%", id: "kn_persen", checked: false },
  { label: "kn ket", id: "knh", checked: false },
  { label: "iq", id: "iq", checked: false },
  { label: "iq%", id: "iq_persen", checked: false },
  { label: "iq ket", id: "iqh", checked: false },
  { label: "eq%", id: "eq_persen", checked: false },
  { label: "eq% ket", id: "eq_persen_keterangan", checked: false },
  { label: "sq%", id: "sq_persen", checked: false },
  { label: "sq% ket", id: "sq_persen_keterangan", checked: false },
  { label: "scq%", id: "scq_persen", checked: false },
  { label: "scq% ket", id: "scq_persen_keterangan", checked: false },
  { label: "a+%", id: "hspq_a_kn_persen", checked: false },
  { label: "a+% ket", id: "hspq_a_kn_keterangan", checked: false },
  { label: "a-%", id: "hspq_a_kr_persen", checked: false },
  { label: "a-% ket", id: "hspq_a_kr_keterangan", checked: false },
  { label: "c+%", id: "hspq_c_kn_persen", checked: false },
  { label: "c+% ket", id: "hspq_c_kn_keterangan", checked: false },
  { label: "c-%", id: "hspq_c_kr_persen", checked: false },
  { label: "c-% ket", id: "hspq_c_kr_keterangan", checked: false },
  { label: "d+%", id: "hspq_d_kn_persen", checked: false },
  { label: "d+% ket", id: "hspq_d_kn_keterangan", checked: false },
  { label: "d-%", id: "hspq_d_kr_persen", checked: false },
  { label: "d-% ket", id: "hspq_d_kr_keterangan", checked: false },
  { label: "e+%", id: "hspq_e_kn_persen", checked: false },
  { label: "e+% ket", id: "hspq_e_kn_keterangan", checked: false },
  { label: "e-%", id: "hspq_e_kr_persen", checked: false },
  { label: "e-% ket", id: "hspq_e_kr_keterangan", checked: false },
  { label: "f+%", id: "hspq_f_kn_persen", checked: false },
  { label: "f+% ket", id: "hspq_f_kn_keterangan", checked: false },
  { label: "f-%", id: "hspq_f_kr_persen", checked: false },
  { label: "f-% ket", id: "hspq_f_kr_keterangan", checked: false },
  { label: "g+%", id: "hspq_g_kn_persen", checked: false },
  { label: "g+% ket", id: "hspq_g_kn_keterangan", checked: false },
  { label: "g-%", id: "hspq_g_kr_persen", checked: false },
  { label: "g-% ket", id: "hspq_g_kr_keterangan", checked: false },
  { label: "h+%", id: "hspq_h_kn_persen", checked: false },
  { label: "h+% ket", id: "hspq_h_kn_keterangan", checked: false },
  { label: "h-%", id: "hspq_h_kr_persen", checked: false },
  { label: "h-% ket", id: "hspq_h_kr_keterangan", checked: false },
  { label: "i+%", id: "hspq_i_kn_persen", checked: false },
  { label: "i+% ket", id: "hspq_i_kn_keterangan", checked: false },
  { label: "i-%", id: "hspq_i_kr_persen", checked: false },
  { label: "i-% ket", id: "hspq_i_kr_keterangan", checked: false },
  { label: "j+%", id: "hspq_j_kn_persen", checked: false },
  { label: "j+% ket", id: "hspq_j_kn_keterangan", checked: false },
  { label: "j-%", id: "hspq_j_kr_persen", checked: false },
  { label: "j-% ket", id: "hspq_j_kr_keterangan", checked: false },
  { label: "o+%", id: "hspq_o_kn_persen", checked: false },
  { label: "o+% ket", id: "hspq_o_kn_keterangan", checked: false },
  { label: "o-%", id: "hspq_o_kr_persen", checked: false },
  { label: "o-% ket", id: "hspq_o_kr_keterangan", checked: false },
  { label: "q2+%", id: "hspq_q2_kn_persen", checked: false },
  { label: "q2+% ket", id: "hspq_q2_kn_keterangan", checked: false },
  { label: "q2-%", id: "hspq_q2_kr_persen", checked: false },
  { label: "q2-% ket", id: "hspq_q2_kr_keterangan", checked: false },
  { label: "q3+%", id: "hspq_q3_kn_persen", checked: false },
  { label: "q3+% ket", id: "hspq_q3_kn_keterangan", checked: false },
  { label: "q3-%", id: "hspq_q3_kr_persen", checked: false },
  { label: "q3-% ket", id: "hspq_q3_kr_keterangan", checked: false },
  { label: "q4+%", id: "hspq_q4_kn_persen", checked: false },
  { label: "q4+% ket", id: "hspq_q4_kn_keterangan", checked: false },
  { label: "q4-%", id: "hspq_q4_kr_persen", checked: false },
  { label: "q4-% ket", id: "hspq_q4_kr_keterangan", checked: false },
  { label: "rank 1", id: "hspq_rank_1", checked: false },
  { label: "rank 2", id: "hspq_rank_2", checked: false },
  { label: "rank 3", id: "hspq_rank_3", checked: false },
  { label: "rank 4", id: "hspq_rank_4", checked: false },
  { label: "rank 5", id: "hspq_rank_5", checked: false },
  { label: "rank 1+", id: "hspq_rank_1_positif", checked: false },
  { label: "rank 2+", id: "hspq_rank_2_positif", checked: false },
  { label: "rank 3+", id: "hspq_rank_3_positif", checked: false },
  { label: "rank 4+", id: "hspq_rank_4_positif", checked: false },
  { label: "rank 5+", id: "hspq_rank_5_positif", checked: false },
  { label: "rank 1-", id: "hspq_rank_1_negatif", checked: false },
  { label: "rank 2-", id: "hspq_rank_2_negatif", checked: false },
  { label: "rank 3-", id: "hspq_rank_3_negatif", checked: false },
  { label: "rank 4-", id: "hspq_rank_4_negatif", checked: false },
  { label: "rank 5-", id: "hspq_rank_5_negatif", checked: false },
  { label: "minat 1", id: "minat_pekerjaan_1_persen", checked: false },
  { label: "minat 2", id: "minat_pekerjaan_2_persen", checked: false },
  { label: "minat 3", id: "minat_pekerjaan_3_persen", checked: false },
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
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm"
        >Nilai Psikologi Siswa</span
      >
    </div>
    <div class="md:py-0 py-4 space-x-2 space-y-2"></div>
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
                  {{
                    props.row.siswadetailwithsertifikat.apiprobkwithsertifikat
                      .apiprobk_sertifikat[props.column.field]
                  }}
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
