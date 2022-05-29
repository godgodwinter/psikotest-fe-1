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
    const response = await Api.get(
      `admin/datasekolah/${id}/siswa/${id2}/catatankasussiswa`
    );
    // console.log(response);

    siswa.value = response.siswa;
    siswa.value.sekolah_nama = response.siswa.sekolah.nama;
    siswa.value.kelas_nama = response.siswa.kelas.nama;
    dataAsli.value = response.data;
    // array map dataAsli to data
    data.value = dataAsli.value.map((item, index) => {
      return {
        ...item,
        // nama: item.nama,
        // kelas: `${item.kelas ? item.kelas.nama : ""}`,
      };
    });
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
</script>
<template>
  <div v-if="data" class="flex justify-center">
    <div ref="testHtml" data-theme="light" class="">
      <div class="max-w-xl bg-white text-sm">
        <div class="px-4 py-4">
          <img src="@/assets/img/cetak/kop_mentah.png" alt="" />
        </div>
        <div class="flex gap-4 justify-center font-bold uppercase">
          <p class="text-center py-4">Catatan</p>
          <p class="text-center py-4">Kasus</p>
          <p class="text-center py-4">Siswa</p>
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
                  <td class="whitespace-nowrap w-1/100">Sekolah</td>
                  <td class="whitespace-pre-wrap w-5/12">:</td>
                  <td class="whitespace-nowrap w-5/12">
                    {{ siswa.sekolah_nama }}
                  </td>
                </tr>
                <tr>
                  <td class="whitespace-nowrap w-1/100">Kelas</td>
                  <td class="whitespace-pre-wrap w-5/12">:</td>
                  <td class="whitespace-nowrap w-5/12">
                    {{ siswa.kelas_nama }}
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
                <div v-for="(item, index) in data" class="space-y-2">
                  <h1 class="text-lg font-bold text-gray-700">
                    {{ index + 1 }}. Nama Kasus {{ item.kasus }}
                  </h1>
                  <div class="px-4 text-gray-700">
                    <span class="font-bold">Tanggal :</span>
                    {{
                      moment(item.tanggal).locale("id").format("DD MMM YYYY")
                    }}
                  </div>
                  <div class="px-4 text-gray-700">
                    <span class="font-bold">Pengambilan data :</span>
                    {{ item.pengambilandata }}
                  </div>
                  <div class="px-4 text-gray-700">
                    <span class="font-bold">Sumber Kasus :</span>
                    {{ item.sumberkasus }}
                  </div>
                  <div class="px-4 text-gray-700">
                    <span class="font-bold">Golongan Kasus</span>
                    : {{ item.golkasus }}
                  </div>
                  <div class="px-4 text-gray-700">
                    <span class="font-bold"> Penyebab Kasus :</span>
                    {{ item.penyebabtimbulkasus }}
                  </div>
                  <div class="px-4 text-gray-700">
                    <span class="font-bold">Teknik Konseling :</span>
                    {{ item.teknikkonseling }}
                  </div>
                  <div class="px-4 text-gray-700">
                    <span class="font-bold"
                      >Keberhasilan Penanganan Kasus :</span
                    >
                    {{ item.keberhasilanpenanganankasus }}
                  </div>
                  <div class="px-4 text-gray-700">
                    <span class="font-bold">Keterangan :</span>
                    {{ item.keterangan }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
