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
const aspekKepribadianRank = ref([]);
const tempPositifDiungkap = ref([]);
const getData = async () => {
  try {
    const response = await Api.get(`admin/datahasildeteksi/${id}/terapis`);
    // console.log(response);

    siswa.value = response.siswa;
    siswa.value.sekolah_nama = response.siswa.sekolah.nama;
    siswa.value.kelas_nama = response.siswa.kelas.nama;
    dataAsli.value = response.data;
    // array map dataAsli to data
    data.value = response.data;

    aspekKepribadianRank.value = [
      {
        nama: "Faktor Sikap Dingin",
        rank: data.value.hspq_a_kr_rank,
        persen: data.value.hspq_a_kr_persen,
        ket: data.value.hspq_a_kr_keterangan,
        positif_diungkap: data.value.hspq_a_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_a_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Emosi Labil",
        rank: data.value.hspq_c_kr_rank,
        persen: data.value.hspq_c_kr_persen,
        ket: data.value.hspq_c_kr_keterangan,
        positif_diungkap: data.value.hspq_c_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_c_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Sulit Bergairah",
        rank: data.value.hspq_d_kr_rank,
        persen: data.value.hspq_d_kr_persen,
        ket: data.value.hspq_d_kr_keterangan,
        positif_diungkap: data.value.hspq_d_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_d_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Patuh atau Tunduk",
        rank: data.value.hspq_e_kr_rank,
        persen: data.value.hspq_e_kr_persen,
        ket: data.value.hspq_e_kr_keterangan,
        positif_diungkap: data.value.hspq_e_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_d_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sungguh-sungguh",
        rank: data.value.hspq_f_kr_rank,
        persen: data.value.hspq_f_kr_persen,
        ket: data.value.hspq_f_kr_keterangan,
        positif_diungkap: data.value.hspq_f_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_f_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Menolak Peraturan",
        rank: data.value.hspq_g_kr_rank,
        persen: data.value.hspq_g_kr_persen,
        ket: data.value.hspq_g_kr_keterangan,
        positif_diungkap: data.value.hspq_g_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_g_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Keras Hati",
        rank: data.value.hspq_h_kr_rank,
        persen: data.value.hspq_h_kr_persen,
        ket: data.value.hspq_h_kr_keterangan,
        positif_diungkap: data.value.hspq_h_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_h_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Pemalu",
        rank: data.value.hspq_i_kr_rank,
        persen: data.value.hspq_i_kr_persen,
        ket: data.value.hspq_i_kr_keterangan,
        positif_diungkap: data.value.hspq_i_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_i_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Bersemangat",
        rank: data.value.hspq_j_kr_rank,
        persen: data.value.hspq_j_kr_persen,
        ket: data.value.hspq_j_kr_keterangan,
        positif_diungkap: data.value.hspq_j_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_j_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Percaya Diri",
        rank: data.value.hspq_o_kr_rank,
        persen: data.value.hspq_o_kr_persen,
        ket: data.value.hspq_o_kr_keterangan,
        positif_diungkap: data.value.hspq_o_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_o_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Kurang Mandiri",
        rank: data.value.hspq_q2_kr_rank,
        persen: data.value.hspq_q2_kr_persen,
        ket: data.value.hspq_q2_kr_keterangan,
        positif_diungkap: data.value.hspq_q2_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_q2_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Kurang Disiplin",
        rank: data.value.hspq_q3_kr_rank,
        persen: data.value.hspq_q3_kr_persen,
        ket: data.value.hspq_q3_kr_keterangan,
        positif_diungkap: data.value.hspq_q3_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_q3_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Rileks atau santai",
        rank: data.value.hspq_q4_kr_rank,
        persen: data.value.hspq_q4_kr_persen,
        ket: data.value.hspq_q4_kr_keterangan,
        positif_diungkap: data.value.hspq_q4_kr_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_q4_kr_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Hangat",
        rank: data.value.hspq_a_kn_rank,
        persen: data.value.hspq_a_kn_persen,
        ket: data.value.hspq_a_kn_keterangan,
        positif_diungkap: data.value.hspq_a_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_a_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Emosi Stabil",
        rank: data.value.hspq_c_kn_rank,
        persen: data.value.hspq_c_kn_persen,
        ket: data.value.hspq_c_kn_keterangan,
        positif_diungkap: data.value.hspq_c_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_c_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Bergairah",
        rank: data.value.hspq_d_kn_rank,
        persen: data.value.hspq_d_kn_persen,
        ket: data.value.hspq_d_kn_keterangan,
        positif_diungkap: data.value.hspq_d_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_d_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Dominasi",
        rank: data.value.hspq_e_kn_rank,
        persen: data.value.hspq_e_kn_persen,
        ket: data.value.hspq_e_kn_keterangan,
        positif_diungkap: data.value.hspq_e_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_e_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Keceriaan",
        rank: data.value.hspq_f_kn_rank,
        persen: data.value.hspq_f_kn_persen,
        ket: data.value.hspq_f_kn_keterangan,
        positif_diungkap: data.value.hspq_f_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_f_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Taat Peraturan",
        rank: data.value.hspq_g_kn_rank,
        persen: data.value.hspq_g_kn_persen,
        ket: data.value.hspq_g_kn_keterangan,
        positif_diungkap: data.value.hspq_g_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_g_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Lembut Hati / Peka",
        rank: data.value.hspq_h_kn_rank,
        persen: data.value.hspq_h_kn_persen,
        ket: data.value.hspq_h_kn_keterangan,
        positif_diungkap: data.value.hspq_h_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_h_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Pemberani",
        rank: data.value.hspq_i_kn_rank,
        persen: data.value.hspq_i_kn_persen,
        ket: data.value.hspq_i_kn_keterangan,
        positif_diungkap: data.value.hspq_i_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_i_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Menarik Diri",
        rank: data.value.hspq_j_kn_rank,
        persen: data.value.hspq_j_kn_persen,
        ket: data.value.hspq_j_kn_keterangan,
        positif_diungkap: data.value.hspq_j_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_j_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Ketakutan",
        rank: data.value.hspq_o_kn_rank,
        persen: data.value.hspq_o_kn_persen,
        ket: data.value.hspq_o_kn_keterangan,
        positif_diungkap: data.value.hspq_o_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_o_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Mandiri",
        rank: data.value.hspq_q2_kn_rank,
        persen: data.value.hspq_q2_kn_persen,
        ket: data.value.hspq_q2_kn_keterangan,
        positif_diungkap: data.value.hspq_q2_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_q2_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Disiplin",
        rank: data.value.hspq_q3_kn_rank,
        persen: data.value.hspq_q3_kn_persen,
        ket: data.value.hspq_q3_kn_keterangan,
        positif_diungkap: data.value.hspq_q3_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_q3_kn_aspek_negatif_di_ungkap,
      },
      {
        nama: "Faktor Sikap Tegang",
        rank: data.value.hspq_q4_kn_rank,
        persen: data.value.hspq_q4_kn_persen,
        ket: data.value.hspq_q4_kn_keterangan,
        positif_diungkap: data.value.hspq_q4_kn_aspek_positif_di_ungkap,
        negatif_diungkap: data.value.hspq_q4_kn_aspek_negatif_di_ungkap,
      },
    ];
    aspekKepribadianRank.value.sort(function (a, b) {
      return a.rank - b.rank;
    });
    for (let i = 0; i < 5; i++) {
      let kalimat = aspekKepribadianRank.value[i].positif_diungkap;
      let arrPerKalimat = kalimat.split(",");

      for (let j = 0; j < arrPerKalimat.length; j++) {
        let kata = arrPerKalimat[j];
        let kataBaru = kata
          .replace(/[^a-z0-9\s\-]/gi, "")
          .replace("Sikap", "")
          .trim()
          .toLowerCase();
        // let kataBaru = kata2.replace("Sikap", "").trim().toLowerCase();
        // let kataBaru = kata3.trim().toLowerCase();
        arrPerKalimat[j] = kataBaru;
      }
      // res.value = getTerapisPerKalimat(arrPerKalimat);
      // resTemp.value = {
      //   label: aspekKepribadianRank.value[i].positif_diungkap,
      //   data: res.value,
      // };
      let tempData = {
        label: aspekKepribadianRank.value[i].positif_diungkap,
        dataSend: arrPerKalimat,
        data: [],
      };
      // array push
      tempPositifDiungkap.value.push(tempData);
      triggetData.value = tempData;
    }
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

const triggetData = ref("");

const getTerapisPerKalimat = async (arrPerKalimat, index) => {
  let dataStore = {
    kalimat: arrPerKalimat,
  };
  try {
    const response = await Api.post(
      `admin/fungsi/terapis/perkalimat`,
      dataStore
    );
    tempPositifDiungkap.value[index].data = response.data;
    // Toast.success("Success", "Data Berhasil update!");
    // resetForm();

    return response.data;
  } catch (error) {
    // Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};

// watcher vue
watch(triggetData, async (newData, oldData) => {
  // console.log(tempPositifDiungkap.value);
  for (let i = 0; i < tempPositifDiungkap.value.length; i++) {
    getTerapisPerKalimat(tempPositifDiungkap.value[i].dataSend, i);

    if (i == tempPositifDiungkap.value.length - 1) {
      setTimeout(() => {
        dataCek.value = true;
      }, 5000);
    }
  }
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
          <p class="text-center py-4">Terapis</p>
          <p class="text-center py-4">Karakter</p>
          <p class="text-center py-4">Positif</p>
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
                <div
                  v-for="(item, index) in tempPositifDiungkap"
                  class="space-y-2"
                >
                  <h1 class="text-lg font-bold text-gray-700">
                    {{ index + 1 }}. {{ item.label }}
                  </h1>

                  <div
                    class="space-y-2 border-b-2 py-2"
                    v-for="(it, index) in item.data"
                  >
                    <h1
                      class="text-lg font-bold text-gray-700 py-2 bg-gray-100 capitalize"
                    >
                      {{ index + 1 }}. {{ it.nama }}
                    </h1>
                    <h1 class="text-md font-bold text-gray-700 bg-gray-50">
                      a. Pemahaman dan Pengertian
                    </h1>

                    <p class="indent-8 text-gray-700">
                      {{ it.pemahaman }}
                    </p>
                    <h1 class="text-md font-bold text-gray-700 bg-gray-50">
                      b. Tujuan dan Manfaat
                    </h1>

                    <p class="indent-8 text-gray-700">
                      {{ it.tujuandanmanfaat }}
                    </p>
                    <h1 class="text-md font-bold text-gray-700 bg-gray-50">
                      c. Pembiasaan Sikap dan Penerapan
                    </h1>
                    <p class="indent-8 text-gray-700">
                      {{ it.pembiasaansikap }}
                    </p>
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
