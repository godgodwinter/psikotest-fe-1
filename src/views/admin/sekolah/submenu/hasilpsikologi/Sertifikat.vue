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
const id2 = route.params.id2;

const dataAsli = ref([]);
const dataKelas = ref([]);
const data = ref([]);
const siswa = ref([]);
const aspekKepribadianRank = ref([]);

const kecerdasan = ref([]);
const temp = ref([{ nama: "" }]);

const PagesView = ref([
  {
    no: 1,
    label: "IQ (Intelegence Quotient) / IST",
    tampilkan: true,
  },
  {
    no: 2,
    label: "EQ (Emotional Quotient)",
    tampilkan: true,
  },
  {
    no: 3,
    label: "Sc.Q (Social Quotient))",
    tampilkan: true,
  },
  {
    no: 4,
    label: "IQ (KM) 8 Kecerdasan 65 % Keterangan : Baik",
    tampilkan: true,
  },
  {
    no: 5,
    label: "Pengetahuan Umum",
    tampilkan: true,
  },
  {
    no: 6,
    label: "Kreativitas",
    tampilkan: true,
  },
  {
    no: 7,
    label: "Kemampuan Mengingat",
    tampilkan: true,
  },
  {
    no: 8,
    label: "ASPEK KEPRIBADIAN",
    tampilkan: true,
  },
  {
    no: 9,
    label: "TIPE BAKAT YANG DISUKAI",
    tampilkan: true,
  },
  {
    no: 10,
    label: "MINAT PEKERJAAN TERKUAT",
    tampilkan: true,
  },
  {
    no: 11,
    label: "KESIMPULAN DAN SARAN",
    tampilkan: true,
  },
]);

const kecerdasanList = ref([
  {
    label: "Sangat Kurang Sekali",
    code: "SKS",
  },
  {
    label: "Kurang Sekali",
    code: "KS",
  },
  {
    label: "Kurang",
    code: "K",
  },
  {
    label: "Hampir Cukup",
    code: "HC",
  },
  {
    label: "Cukup",
    code: "C",
    altCode: "CB",
  },
  {
    label: "Kurang Baik",
    code: "KB",
  },
  {
    label: "Baik",
    code: "B",
  },
  {
    label: "Sangat Baik",
    code: "SB",
  },
  {
    label: "Sangat Baik Sekali",
    code: "SBS",
  },
]);

const getData = async () => {
  try {
    const response = await Api.get(`admin/sertifikat/${id2}`);
    // console.log(response);
    dataAsli.value = response.data;
    data.value = response.data;
    siswa.value = response.siswa;

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

    kecerdasan.value = [
      {
        nama: "Kecerdasan Linguistik",
        persen: data.value.kb_persen,
        ket: data.value.kbh,
      },
      {
        nama: "Kecerdasan Logis - Matematis",
        persen: data.value.lm_persen,
        ket: data.value.lmh,
      },
      {
        nama: "Kecerdasan Spasial",
        persen: data.value.ks_persen,
        ket: data.value.ksh,
      },
      {
        nama: "Kecerdasan Musikal",
        persen: data.value.km_persen,
        ket: data.value.kmh,
      },
      {
        nama: "Kecerdasan Kinetik",
        persen: data.value.kk_persen,
        ket: data.value.kkh,
      },
      {
        nama: "Kecerdasan Interpersonal",
        persen: data.value.ki_persen,
        ket: data.value.kih,
      },
      {
        nama: "Kecerdasan Intrapersonal",
        persen: data.value.ka_persen,
        ket: data.value.kah,
      },
      {
        nama: "Kecerdasan Natural",
        persen: data.value.kn_persen,
        ket: data.value.knh,
      },
    ];
    temp.value = kecerdasan.value.slice(0);
    temp.value.sort(function (a, b) {
      return b.persen - a.persen;
    });
    return response;
  } catch (error) {
    Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};
getData();
const dataKetNegativ = ref([
  {
    label: "91-99",
    ket: "Sangat Tinggi Sekali / Sangat Mengganggu Sekali",
    kode: "STS",
  },
  {
    label: "81-90",
    ket: "Tinggi Sekali / Mengganggu Sekali",
    kode: "TS",
  },
  {
    label: "71-80",
    ket: "Tinggi / Mengganggu",
    kode: "T",
  },
  {
    label: "61-70",
    ket: "Cukup Tinggi / Cukup Mengganggu",
    kode: "CT",
  },
  {
    label: "41-60",
    ket: "Cukup / Terkendali",
    kode: "C",
  },
  {
    label: "31-40",
    ket: "Agak Rendah / Cukup Terkendali",
    kode: "AR",
  },
  {
    label: "21-30",
    ket: "Rendah / Terkendali Baik",
    kode: "R",
  },
  {
    label: "11-20",
    ket: "Rendah Sekali / Terkendali Baik Sekali",
    kode: "RS",
  },
  {
    label: "01-10",
    ket: "Sangat Rendah Sekali / Sangat Terkendali Baik Sekali",
    kode: "SRS",
  },
]);

function kepanjangan(item = null) {
  let hasil = item;
  if (item == "SBS") {
    hasil = "Sangat Baik Sekali";
  } else if (item == "BS") {
    hasil = "Baik Sekali";
  } else if (item == "B") {
    hasil = "Baik";
  } else if (item == "CB") {
    hasil = "Cukup Baik";
  } else if (item == "C") {
    hasil = "Cukup";
  } else if (item == "HC") {
    hasil = "Hampir Cukup";
  } else if (item == "K") {
    hasil = "Kurang";
  } else if (item == "KS") {
    hasil = "Kurang Sekali";
  } else if (item == "SKS") {
    hasil = "Sangat Kurang Sekali";
    //tambahan
  } else if (item == "STS") {
    hasil = "Sangat Tinggi Sekali";
  } else if (item == "TS") {
    hasil = "Tinggi Sekali";
  } else if (item == "T") {
    hasil = "Tinggi";
  } else if (item == "CT") {
    hasil = "Cukup Tinggi";
  } else if (item == "C") {
    hasil = "Cukup";
  } else if (item == "CR") {
    hasil = "Cukup Rendah";
  } else if (item == "AR") {
    hasil = "Agak Rendah";
  } else if (item == "R") {
    hasil = "Rendah";
  } else if (item == "RS") {
    hasil = "Rendah Sekali";
  } else if (item == "SRS") {
    hasil = "Sangat Rendah Sekali";
  }
  return hasil;
}

function iqket(item = null) {
  let hasil = "Moron";
  if (item > 139) {
    hasil = "Genius";
  } else if (140 > item && item >= 130) {
    hasil = "Berbakat";
  } else if (130 > item && item >= 120) {
    hasil = "Superior";
  } else if (120 > item && item >= 110) {
    hasil = "Di Atas Rata - Rata";
  } else if (110 > item && item >= 105) {
    hasil = "Rata - Rata Atas";
  } else if (105 > item && item >= 100) {
    hasil = "Rata - Rata";
  } else if (100 > item && item >= 90) {
    hasil = "Rata - Rata Bawah";
  } else if (90 > item && item >= 80) {
    hasil = "Lambat Belajar";
  } else if (80 > item && item >= 60) {
    hasil = "Borderline";
  } else {
    hasil = "Moron";
  }
  return hasil;
}

function getKesimpulanIq(item = null) {
  let hasil = "Kurang Lancar";
  if (item > 119) {
    hasil = "Sangat Lancar Sekali";
  } else if (120 > item && item >= 110) {
    hasil = "Lancar Sekali";
  } else if (110 > item && item >= 105) {
    hasil = "Lancar";
  } else if (105 > item && item >= 90) {
    hasil = "Cukup Lancar";
  } else if (90 > item && item >= 80) {
    hasil = "Kurang Lancar";
  } else {
    hasil = "Sangat Kurang Lancar";
  }
  return hasil;
}

function getKesimpulanEqSq(item = null) {
  let hasil = "Lebih Tinggi";
  if (item > 119) {
    hasil = "Seimbang dan Lebih Tinggi";
  } else if (120 > item && item >= 110) {
    hasil = "Seimbang dan Lebih Tinggi";
  } else if (110 > item && item >= 105) {
    hasil = "Seimbang dan Lebih Tinggi";
  } else if (105 > item && item >= 90) {
    hasil = "Lebih Tinggi";
  } else if (90 > item && item >= 80) {
    hasil = "Lebih Tinggi";
  } else {
    hasil = "Lebih Tinggi";
  }
  return hasil;
}

function romanize(num) {
  if (isNaN(num)) return NaN;
  var digits = String(+num).split(""),
    key = [
      "",
      "C",
      "CC",
      "CCC",
      "CD",
      "D",
      "DC",
      "DCC",
      "DCCC",
      "CM",
      "",
      "X",
      "XX",
      "XXX",
      "XL",
      "L",
      "LX",
      "LXX",
      "LXXX",
      "XC",
      "",
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
    ],
    roman = "",
    i = 3;
  while (i--) roman = (key[+digits.pop() + i * 10] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}
</script>
<template>
  <div>
    <div class="pt-4 px-10 md:flex justify-between">
      <div>
        <span
          class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm"
          >Sertifikat Psikologis</span
        >
      </div>
      <div class="md:py-0 py-4 space-x-2 space-y-2">
        <router-link
          :to="{ name: 'AdminSekolahDetailHasilPsikologi', params: { id } }"
        >
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

    <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
      <div class="w-full lg:w-full">
        <div class="bg-white shadow rounded-lg px-4 py-4">
          <div class="overflow-x-auto">
            <table class="table table-compact">
              <tbody>
                <!-- row 1 -->
                <tr>
                  <td class="whitespace-nowrap w-1/12">No Induk</td>
                  <td class="whitespace-nowrap w-1/12">:</td>
                  <td class="whitespace-nowrap w-10/12">
                    {{ siswa.nomeridentitas }}
                  </td>
                </tr>
                <!-- row 2 -->
                <tr>
                  <td>Nama</td>
                  <td>:</td>
                  <td>{{ siswa.nama }}</td>
                </tr>
                <!-- row 3 -->
                <tr>
                  <td>Umur</td>
                  <td>:</td>
                  <td>{{ data.umur }}</td>
                </tr>
                <!-- row 3 -->
                <tr>
                  <td>Jenis Kelamin</td>
                  <td>:</td>
                  <td>{{ siswa.jk }}</td>
                </tr>
                <!-- row 3 -->
                <tr>
                  <td>Sekolah</td>
                  <td>:</td>
                  <td>{{ siswa.sekolah ? siswa.sekolah.nama : "-" }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-4 px-10 md:flex justify-between">
      <div>
        <span
          class="text-2xl sm:text-2xl leading-none font-bold text-gray-700 shadow-sm"
          >ASPEK PSIKOLOGIS YANG DIUNGKAP</span
        >
      </div>
      <div class="md:py-0 py-4 space-x-2 space-y-2"></div>
    </div>

    <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
      <div class="w-full lg:w-full">
        <div class="bg-white shadow rounded-lg px-4 py-4">
          <div class="overflow-x-auto">
            <table class="table table-compact w-full">
              <tbody>
                <!-- row 1 -->
                <tr v-if="data.kbh">
                  <td class="whitespace-nowrap w-1/100">I.</td>
                  <td class="whitespace-nowrap w-1/100">
                    IQ (Intelegence Quotient) / IST
                  </td>
                  <td class="whitespace-nowrap w-1/100">:</td>
                  <td class="whitespace-nowrap w-1/100">{{ data.iq }}</td>
                  <td>/ {{ iqket(data.iq) }}</td>
                </tr>
                <tr>
                  <td class="whitespace-nowrap w-1/100">II.</td>
                  <td class="whitespace-nowrap w-1/100">
                    EQ (Emotional Quotient)
                  </td>
                  <td class="whitespace-nowrap w-1/100">:</td>
                  <td class="whitespace-nowrap w-1/100">
                    {{ data.eq_persen }}
                  </td>
                  <td>/ {{ kepanjangan(data.eq_persen_keterangan) }}</td>
                </tr>
                <tr>
                  <td class="whitespace-nowrap w-1/100">III.</td>
                  <td class="whitespace-nowrap w-1/100">
                    Sc.Q (Social Quotient)
                  </td>
                  <td class="whitespace-nowrap w-1/100">:</td>
                  <td class="whitespace-nowrap w-1/100">
                    {{ data.scq_persen }}
                  </td>
                  <td>/ {{ kepanjangan(data.scq_persen_keterangan) }}</td>
                </tr>

                <!-- row 2 -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-4 px-10 md:flex justify-between" v-if="data.kbh">
      <div>
        <span
          class="text-xl sm:text-xl leading-none font-bold text-gray-700 shadow-sm"
          >IV. IQ (KM) 8 Kecerdasan {{ data.iq_persen }} % Keterangan :
          {{ kepanjangan(data.iqh) }}</span
        >
      </div>
      <div class="md:py-0 py-4 space-x-2 space-y-2"></div>
    </div>
    <div class="md:py-2 px-4 lg:flex flex-wrap gap-4" v-if="data.kbh">
      <div class="w-full lg:w-full">
        <div class="bg-white shadow rounded-lg px-4 py-4">
          <div class="overflow-x-auto">
            <table class="table table-compact w-full">
              <tbody>
                <!-- row 1 -->
                <tr>
                  <td class="whitespace-nowrap w-1/100">IV.</td>
                  <td class="whitespace-nowrap w-1/100">
                    IQ (KM) 8 Kecerdasan
                  </td>
                  <td class="whitespace-pre-wrap w-1/100">Rank Nilai</td>
                  <td class="whitespace-pre-wrap w-1/100">
                    Sangat Kurang Sekali
                  </td>
                  <td class="whitespace-pre-wrap w-1/100">Kurang Sekali</td>
                  <td class="whitespace-pre-wrap w-1/100">Kurang</td>
                  <td class="whitespace-pre-wrap w-1/100">Hampir Cukup</td>
                  <td class="whitespace-pre-wrap w-1/100">Cukup</td>
                  <td class="whitespace-pre-wrap w-1/100">Kurang Baik</td>
                  <td class="whitespace-pre-wrap w-1/100">Baik</td>
                  <td class="whitespace-pre-wrap w-1/100">Baik Sekali</td>
                  <td class="whitespace-pre-wrap w-1/100">
                    Sangat Baik Sekali
                  </td>
                </tr>
                <tr v-for="(item, index) in temp">
                  <td class="whitespace-nowrap w-1/100"></td>
                  <td class="whitespace-nowrap w-1/100">
                    {{ item.nama }}
                  </td>
                  <td class="whitespace-nowrap w-1/100">{{ index + 1 }}</td>
                  <td
                    class="whitespace-nowrap w-1/100"
                    v-for="kList in kecerdasanList"
                  >
                    <span
                      class="flex justify-center"
                      v-if="kList.code == item.ket || kList.altCode == item.ket"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </td>
                  <!-- <td>{{ item.persen }}</td> -->
                  <!-- <td>{{ item.ket }}</td> -->
                </tr>

                <tr>
                  <td class="whitespace-nowrap w-1/100">V.</td>
                  <td class="whitespace-nowrap w-1/100">Pengetahuan Umum</td>
                  <td class="whitespace-nowrap w-1/100"></td>
                  <td
                    class="whitespace-nowrap w-1/100"
                    v-for="item in kecerdasanList"
                  >
                    <span
                      class="flex justify-center"
                      v-if="
                        item.code == data.km_p1_keterangan ||
                        item.altCode == data.km_p1_keterangan
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="whitespace-nowrap w-1/100">VI.</td>
                  <td class="whitespace-nowrap w-1/100">Kreativitas</td>
                  <td class="whitespace-nowrap w-1/100"></td>
                  <td
                    class="whitespace-nowrap w-1/100"
                    v-for="item in kecerdasanList"
                  >
                    <span
                      class="flex justify-center"
                      v-if="
                        item.code == data.km_kr_keterangan ||
                        item.altCode == data.km_kr_keterangan
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="whitespace-nowrap w-1/100">VII.</td>
                  <td class="whitespace-nowrap w-1/100">Kemampuan Mengingat</td>
                  <td class="whitespace-nowrap w-1/100"></td>
                  <td
                    class="whitespace-nowrap w-1/100"
                    v-for="item in kecerdasanList"
                  >
                    <span
                      class="flex justify-center"
                      v-if="
                        item.code == data.km_p9_keterangan ||
                        item.altCode == data.km_p9_keterangan
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </td>
                </tr>

                <!-- row 2 -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="md:py-2 px-4 lg:flex flex-wrap">
      <div class="w-full lg:w-3/6">
        <div class="bg-white shadow rounded-lg px-4 py-4">
          <div class="overflow-x-auto">
            <table
              class="table table-compact table-zebra w-full shadow shadow-sm"
            >
              <tbody>
                <tr>
                  <th class="whitespace-nowrap w-1/100">VIII.</th>
                  <th class="whitespace-nowrap w-1/12">ASPEK KEPRIBADIAN</th>
                  <th class="whitespace-nowrap w-1/100">%</th>
                  <th class="whitespace-nowrap w-1/100">Keterangan</th>
                  <th class="whitespace-nowrap w-1/100">Rank</th>
                </tr>
                <!-- row 1 -->
                <tr v-for="(item, index) in aspekKepribadianRank">
                  <td>{{ index + 1 }}</td>
                  <td class="whitespace-nowrap w-1/12">{{ item.nama }}</td>
                  <td>{{ item.persen }}</td>
                  <td class="whitespace-pre-wrap">
                    {{ kepanjangan(item.ket) }}
                  </td>
                  <td>{{ item.rank }}</td>
                </tr>

                <!-- row 2 -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-3/6">
        <div class="bg-white shadow rounded-lg px-4 py-4">
          <div class="overflow-x-auto">
            <table class="table table-compact table-zebra w-full">
              <tbody>
                <tr>
                  <th class="whitespace-nowrap w-1/100"></th>
                  <th class="whitespace-nowrap w-5/12">
                    ANALISA KEPRIBADIAN TERKUAT
                  </th>
                </tr>
                <!-- row 1 -->
                <tr v-for="(item, index) in aspekKepribadianRank.slice(0, 5)">
                  <td>{{ index + 1 }}.</td>
                  <td>{{ item.nama }}</td>
                </tr>

                <!-- row 2 -->
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-white shadow rounded-lg px-4 py-4">
          <div class="overflow-x-auto">
            <table class="table table-compact table-zebra w-full">
              <tbody>
                <tr>
                  <th class="whitespace-nowrap w-1/100"></th>
                  <th class="whitespace-nowrap w-5/12">
                    Faktor Kepribadian Subyek Terkuat Positif (+)
                  </th>
                </tr>
                <!-- row 1 -->
                <tr v-for="(item, index) in aspekKepribadianRank.slice(0, 5)">
                  <td>{{ index + 1 }}.</td>
                  <td class="whitespace-pre-wrap">
                    {{ item.positif_diungkap }}
                  </td>
                </tr>

                <!-- row 2 -->
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-white shadow rounded-lg px-4 py-4">
          <div class="overflow-x-auto">
            <table class="table table-compact table-zebra w-full">
              <tbody>
                <tr>
                  <th class="whitespace-nowrap w-1/100"></th>
                  <th class="whitespace-nowrap w-5/12">
                    Faktor Kepribadian Subyek Terkuat Negatif (-)
                  </th>
                </tr>
                <!-- row 1 -->
                <tr v-for="(item, index) in aspekKepribadianRank.slice(0, 5)">
                  <td>{{ index + 1 }}.</td>
                  <td class="whitespace-pre-wrap">
                    {{ item.negatif_diungkap }}
                  </td>
                </tr>

                <!-- row 2 -->
              </tbody>
            </table>
          </div>
        </div>

        <!-- card -->
        <div class="bg-white shadow rounded-lg px-4 py-4">
          <div class="overflow-x-auto">
            <table class="table table-compact table-zebra w-full">
              <tbody>
                <tr>
                  <th class="whitespace-nowrap w-1/100">IX.</th>
                  <th class="whitespace-nowrap w-5/12">
                    TIPE BAKAT YANG DISUKAI
                  </th>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>{{ data.tipe_bakat_1 }}</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>{{ data.tipe_bakat_2 }}</td>
                </tr>
                <tr>
                  <td>3.</td>
                  <td>{{ data.tipe_bakat_3 }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- card -->

        <!-- card -->
        <div class="bg-white shadow rounded-lg px-4 py-4">
          <div class="overflow-x-auto">
            <table class="table table-compact table-zebra w-full">
              <tbody>
                <tr>
                  <th class="whitespace-nowrap w-1/100">X.</th>
                  <th class="whitespace-nowrap w-5/12">
                    MINAT PEKERJAAN TERKUAT
                  </th>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>{{ data.minat_pekerjaan_1 }}</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>{{ data.minat_pekerjaan_2 }}</td>
                </tr>
                <tr>
                  <td>3.</td>
                  <td>{{ data.minat_pekerjaan_3 }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- card -->
      </div>
    </div>

    <div class="pt-4 px-10 md:flex justify-between">
      <div>
        <span
          class="text-2xl sm:text-xl leading-none font-bold text-gray-600 shadow-sm"
          >XI. KESIMPULAN DAN SARAN</span
        >
      </div>
      <div class="md:py-0 py-4 space-x-2 space-y-2"></div>
    </div>

    <div class="pt-4 px-10 md:flex justify-between">
      <div>
        <div
          class="text-lg sm:text-lg leading-1 font-md text-gray-600 shadow-sm space-y-2"
        >
          <p class="indent-8">
            Potensi kecerdasan subyek yang dapat digunakan saat ini
            <b> {{ iqket(data.iq) }}</b
            >,(IQ=<b>{{ data.iq }}</b
            >, IST KM=<b>{{ data.iq_persen }}%)</b> artinya dengan tingkat
            kemampuan menggunakan kecerdasan majemuk tergolong
            <b>{{ kepanjangan(data.iqh) }}</b
            >.
          </p>
          <p class="indent-8" v-if="temp.length > 7">
            Dalam belajar subyek disarankan menggunakan
            <b>{{ temp[0].nama }},{{ temp[1].nama }}, {{ temp[2].nama }} </b>,
            sedangkan yang perlu dilatih dan dibiasakan yaitu
            <b> {{ temp[6].nama }} dan {{ temp[7].nama }}</b
            >.
          </p>

          <p class="indent-8" v-if="temp.length > 7">
            Kecerdasan Emosi nya
            <b
              >{{ kepanjangan(data.eq_persen_keterangan) }},({{
                data.eq_persen
              }}%)</b
            >. Kecerdasan Sosialnya
            <b
              >{{ kepanjangan(data.scq_persen_keterangan) }} (ScQ=
              {{ data.scq_persen }}%)</b
            >. Karakter kepribadian subyek yang terkuat dan mempengaruhi
            aktivitas sehari-hari yaitu
            <b>
              {{ aspekKepribadianRank[0].nama }},
              {{ aspekKepribadianRank[1].nama }},
              {{ aspekKepribadianRank[2].nama }},
              {{ aspekKepribadianRank[3].nama }},
              {{ aspekKepribadianRank[4].nama }}
            </b>
            terdiri dari aspek positif dan perlu ditingkatkan, dikembangkan, dan
            dipertahankan, sedangkan aspek negatif perlu dirubah dan
            dikendalikan supaya tidak menghambat prestasi subyek.
          </p>
          <!-- kesimpulan -->
          <p class="indent-8">
            Dalam kelanjutan studi <b>{{ getKesimpulanIq(data.iq) }} </b> tapi
            perlu ditunjang oleh EQ dan SQ
            <b> {{ getKesimpulanEqSq(data.iq) }}</b> dari potensi kecerdasan
            yang dimiliki subyek dan menunjukkan adanya upaya keseimbangan
            antara potensi kecerdasan koqnitif - usaha / semangat didukung oleh
            emosi positif - kematangan kemampuan sosialnya.
          </p>
          <!-- jika kelas 9  -->
          <p class="indent-8">
            Kelanjutan studi disarankan masuk Sekolah
            <b> {{ data.saran_fakultas_1 }} </b> dengan Jurusan
            <b> {{ data.saran_fakultas_1_prodi }}</b
            >, Sekolah <b> {{ data.saran_fakultas_2 }}</b> dengan Jurusan
            <b> {{ data.saran_fakultas_2_prodi }}</b
            >.
          </p>
          <!-- jika  kelas 12 -->

          <p class="indent-8">
            Kelanjutan studi disarankan masuk Fakultas
            <b> {{ data.saran_fakultas_1 }} </b> dengan Prodi
            <b> {{ data.saran_fakultas_1_prodi }}</b
            >, Fakultas <b> {{ data.saran_fakultas_2 }} </b> dengan Prodi
            <b> {{ data.saran_fakultas_2_prodi }}</b>
          </p>
        </div>
      </div>
      <div class="md:py-0 py-4 space-x-2 space-y-2"></div>
    </div>
  </div>
</template>
