<script setup>
import { jsPDF } from "jspdf";
import { ref, onMounted, watch } from "vue";
import Api from "@/axios/axios";
// import moment from "moment";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";

moment.updateLocale("id", localization);

import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const id = route.params.id;
const id2 = route.params.id2;

const dataAsli = ref([]);
const dataCek = ref(false);
const data = ref([]);
const siswa = ref([]);
const getData = async () => {
  try {
    const response = await Api.get(`admin/datahasildeteksi/${id2}/penanganan`);
    // console.log(response);

    siswa.value = response.siswa;
    siswa.value.sekolah_nama = response.siswa.sekolah.nama;
    siswa.value.kelas_nama = response.siswa.kelas.nama;
    dataAsli.value = response.data;
    // array map dataAsli to data

    data.value = response.data;
    dataCek.value = true;
    return response;
  } catch (error) {
    console.error(error);
  }
};
getData();
// import html2canvas from "html2canvas";
let doc = new jsPDF("p", "pt", "A4", "potrait");
let margins = {
  top: 40,
  bottom: 60,
  left: 40,
  width: 522,
};
const testHtml = ref();

margins.left, // x coord
  margins.top,
  {
    // y coord
    width: margins.width, // max width of content on PDF
  },
  watch(dataCek, (newVal) => {
    doc.html(testHtml.value, {
      margin: [
        30, //left x coord
        10, //top y coord
        30, //right x coord
        10, //bottom y coord
      ],
      callback: function (doc) {
        doc.save();
        //   doc.output("save", "filename.pdf"); //Try to save PDF as a file (not works on ie before 10, and some mobile devices)
        // doc.output("datauristring"); //returns the data uri string
        // doc.output("datauri"); //opens the data uri in current window
        // doc.output("dataurlnewwindow"); //opens the data uri in new window
        // let iframe = document.createElement("iframe");
        // iframe.setAttribute(
        //   "style",
        //   "position:absolute;right:0; top:0; bottom:0; height:100%; width:700px"
        // );
        // document.body.appendChild(iframe);
        // iframe.src = doc.output("datauristring");
      },
      x: 15,
      y: 15,
    });
  });

const singkatan = (item = 99) => {
  let hasil = null;
  if (item > 90) {
    hasil = "Sangat Tinggi Sekali / Sangat Mengganggu Sekali";
  } else if (91 > item && item >= 81) {
    hasil = "Tinggi Sekali / Mengganggu Sekali (TS)";
  } else if (81 > item && item >= 71) {
    hasil = "Tinggi / Mengganggu";
  } else if (71 > item && item >= 61) {
    hasil = "Cukup Tinggi / Cukup Mengganggu";
  } else if (61 > item && item >= 41) {
    hasil = "Cukup / Terkendali ";
  } else if (41 > item && item >= 31) {
    hasil = "Agak Rendah / Cukup Terkendali ";
  } else if (31 > item && item >= 21) {
    hasil = "Rendah / Terkendali Baik ";
  } else if (21 > item && item >= 11) {
    hasil = "Rendah Sekali / Terkendali Baik Sekali";
  } else {
    hasil = "Sangat Rendah Sekali / Sangan Terkendali Baik Sekali ";
  }
  return hasil;
};
</script>
<template>
  <div v-if="data" class="flex justify-center">
    <div ref="testHtml" data-theme="light" class="">
      <div class="max-w-xl bg-white text-sm">
        <div class="px-4 py-4">
          <img src="@/assets/img/cetak/kop_mentah.png" alt="" />
        </div>
        <div class="flex gap-2 justify-center">
          <p class="text-center py-4">Penanganan</p>
          <p class="text-center py-4">Deteksi</p>
          <p class="text-center py-4">Masalah</p>
        </div>
        <div class="bg-white shadow rounded-lg px-4 py-4">
          <div>
            <table class="table table-compact w-1/2">
              <tbody>
                <tr>
                  <td class="whitespace-nowrap w-1/100">Nama</td>
                  <td class="whitespace-pre-wrap w-5/12">:</td>
                  <td class="whitespace-nowrap w-5/12">{{ siswa.nama }}</td>
                </tr>
                <tr>
                  <td class="whitespace-nowrap w-1/100">Umur</td>
                  <td class="whitespace-pre-wrap w-5/12">:</td>
                  <td class="whitespace-nowrap w-5/12">
                    {{ data.umur }}
                  </td>
                </tr>
                <tr>
                  <td class="whitespace-nowrap w-1/100">Jenis Kelamin</td>
                  <td class="whitespace-pre-wrap w-5/12">:</td>
                  <td class="whitespace-nowrap w-5/12">
                    {{ siswa.jk }}
                  </td>
                </tr>
                <tr>
                  <td class="whitespace-nowrap w-1/100">Sekolah</td>
                  <td class="whitespace-pre-wrap w-5/12">:</td>
                  <td class="whitespace-nowrap w-5/12">
                    {{ siswa.sekolah_nama }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="px-4 lg:flex flex-wrap gap-4">
          <div class="w-full lg:w-full">
            <div class="bg-white shadow rounded-lg px-4 py-0">
              <div class="px-4 space-y-10 mt-4 pb-4">
                <div v-for="(item, index) in data.deteksi" class="space-y-2">
                  <h1 class="text-lg font-bold text-gray-700">
                    {{ index + 1 }}. {{ item.nama }} : {{ item.score }} -
                    {{ singkatan(item.keterangan) }}
                  </h1>
                  <p class="indent-8 text-gray-700">{{ item.penanganan }}</p>
                  <!-- <div class="px-4 text-gray-700">
                    <span class="font-bold"> Kesimpulan dan Saran :</span>
                    {{ item.kesimpulandansaran }}
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
