<script setup>
import { ref } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import ButtonDelete from "@/components/atoms/ButtonDel.vue";
import ButtonDetail from "@/components/atoms/ButtonDetail1.vue";
import Api from "@/axios/axios";
import Toast from "@/components/lib/Toast";
import { useStoreAdminBar } from "@/stores/adminBar";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const id = route.params.id;

const storeAdminBar = useStoreAdminBar();
storeAdminBar.setPagesActive("sekolah");

const dataAsli = ref([]);
const data = ref([]);

const dataDetail = ref({
  nama: "",
  alamat: "",
  status: "",
  kepsek_nama: "",
  tahunajaran_nama: "",
  semester_nama: "",
  kecamatan: "",
  kabupaten: "",
  provinsi: "",
});

const getDataId = async () => {
  try {
    const response = await Api.get(`admin/sekolah/${id}`);
    // console.log(response);
    // dataDetail.value = response.data;
    dataDetail.value = {
      nama: response.data.nama,
      alamat: response.data.alamat,
      status: response.data.status,
      kepsek_nama: response.data.kepsek_nama,
      tahunajaran_nama: response.data.tahunajaran_nama,
      semester_nama: response.data.semester_nama,
      kecamatan: response.data.kecamatan,
      kabupaten: response.data.kabupaten,
      provinsi: response.data.provinsi,
    };
    // console.log(data.value);
    return response;
  } catch (error) {
    Toast.danger("Warning", "Data Gagal dimual");
    console.error(error);
  }
};

getDataId();
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span
        class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm"
        >{{ dataDetail.nama }}
      </span>
    </div>
    <div class="md:py-0 py-4">
      <BreadCrumb>
        <template v-slot:content> Sekolah <BreadCrumbSpace /> Detail </template>
      </BreadCrumb>
    </div>
  </div>
</template>
