import { createRouter, createWebHistory } from 'vue-router';
// layouts
import LandingLayout from '../layouts/LandingLayout.vue';
import AdminLayout from '../layouts/AdminLayout.vue';
// pages
import NotFound from '../views/NotFound.vue';
import LandingIndex from '../views/landing/LandingIndex.vue';
import LandingLogin from '../views/landing/LandingLogin.vue';

// admin
import DashBoard from '../views/admin/DashBoard.vue'

import AdminApiProBK from '../views/admin/apiprobk/Index.vue'
import AdminApiProBKTambah from '../views/admin/apiprobk/Tambah.vue'
import AdminApiProBKEdit from '../views/admin/apiprobk/Edit.vue'

// MENU-SEKOLAH
import AdminSekolah from '../views/admin/sekolah/Index.vue'
import AdminSekolahTambah from '../views/admin/sekolah/Tambah.vue'
import AdminSekolahEdit from '../views/admin/sekolah/Edit.vue'
import AdminSekolahDetail from '../views/admin/sekolah/Detail.vue'
// MENU-SEKOLAH-SUB
import AdminSekolahDetailDashboard from '../views/admin/sekolah/submenu/DashBoard.vue'
import AdminSekolahDetailSiswa from '../views/admin/sekolah/submenu/siswa/Index.vue'
import AdminSekolahDetailSiswaTambah from '../views/admin/sekolah/submenu/siswa/Tambah.vue'
import AdminSekolahDetailSiswaEdit from '../views/admin/sekolah/submenu/siswa/Edit.vue'
import AdminSekolahDetailKelas from '../views/admin/sekolah/submenu/kelas/Index.vue'
import AdminSekolahDetailKelasTambah from '../views/admin/sekolah/submenu/kelas/Tambah.vue'
import AdminSekolahDetailKelasEdit from '../views/admin/sekolah/submenu/kelas/Edit.vue'
import AdminSekolahDetailWaliKelas from '../views/admin/sekolah/submenu/walikelas/Index.vue'
import AdminSekolahDetailWaliKelasTambah from '../views/admin/sekolah/submenu/walikelas/Tambah.vue'
import AdminSekolahDetailWaliKelasEdit from '../views/admin/sekolah/submenu/walikelas/Edit.vue'
import AdminSekolahDetailGuruBk from '../views/admin/sekolah/submenu/gurubk/Index.vue'
import AdminSekolahDetailGuruBkTambah from '../views/admin/sekolah/submenu/gurubk/Tambah.vue'
import AdminSekolahDetailGuruBkEdit from '../views/admin/sekolah/submenu/gurubk/Edit.vue'
import AdminSekolahDetailHasilPsikologi from '../views/admin/sekolah/submenu/hasilpsikologi/Index.vue'
import AdminSekolahDetailNilaiPsikologiSiswa from '../views/admin/sekolah/submenu/nilaipsikologisiswa/Index.vue'
import AdminSekolahDetailAnalisaMinatBakat from '../views/admin/sekolah/submenu/analisaminatbakat/Index.vue'
import AdminSekolahDetailAnalisaPenjurusan from '../views/admin/sekolah/submenu/analisapenjurusan/Index.vue'
// MENU-SEKOLAH-SUB
// MENU-SEKOLAH

import AdminYayasan from '../views/admin/yayasan/Index.vue'
import AdminKlasifikasi from '../views/admin/klasifikasiAkademisDanProfesi/Index.vue'
import AdminKlasifikasiTambah from '../views/admin/klasifikasiAkademisDanProfesi/Tambah.vue'
import AdminKlasifikasiEdit from '../views/admin/klasifikasiAkademisDanProfesi/Edit.vue'
import AdminReferensi from '../views/admin/referensiStudiDanKerja/Index.vue'
import AdminReferensiTambah from '../views/admin/referensiStudiDanKerja/Tambah.vue'
import AdminReferensiEdit from '../views/admin/referensiStudiDanKerja/Edit.vue'
import AdminBuletin from '../views/admin/buletinPsikologi/Index.vue'
import AdminBuletinTambah from '../views/admin/buletinPsikologi/Tambah.vue'
import AdminBuletinEdit from '../views/admin/buletinPsikologi/Edit.vue'
import AdminTerapis from '../views/admin/terapisKarakterPositif/Index.vue'
import AdminPenanganan from '../views/admin/penangananDeteksiMasalah/Index.vue'
import AdminKataBijak from '../views/admin/kataBijak/Index.vue'
import AdminKataBijakTambah from '../views/admin/kataBijak/Tambah.vue'
import AdminKataBijakEdit from '../views/admin/kataBijak/Edit.vue'
import AdminKataBijakDetail from '../views/admin/kataBijak/Detail.vue'
import AdminKataBijakDetailTambah from '../views/admin/kataBijak/DetailTambah.vue'
import AdminKataBijakDetailEdit from '../views/admin/kataBijak/DetailEdit.vue'
import AdminMasterNilaiPsikologi from '../views/admin/masterNilaiPsikologi/Index.vue'
import AdmiMinatBakat from '../views/admin/minatBakat/Index.vue'
import AdminAdministrator from '../views/admin/administrator/Index.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingLayout,
    redirect: '/',
    children: [
      {
        path: '/', 
        name: 'LandingIndex',
        component: LandingIndex,
      },
      {
        path: '/login', 
        name: 'LandingLogin',
        component: LandingLogin,
      },
      {
        path: '/404',
        name: 'NotFound',
        component: NotFound,
      },
    ],
  },
  {
    path: '/pages/',
    name: 'LandingAdmin',
    component: AdminLayout,
    redirect: '/pages/admin',
    children: [
      {
        path: '/pages/admin', 
        name: 'AdminDashboard',
        component: DashBoard,
      },
      // MENU-APIPROBK
      {
        path: '/pages/admin/apiprobk', 
        name: 'AdminApiProBK',
        component: AdminApiProBK,
      },
      {
        path: '/pages/admin/apiprobk/tambah', 
        name: 'AdminApiProBKTambah',
        component: AdminApiProBKTambah,
      },
      {
        path: '/pages/admin/apiprobk/edit/:id', 
        name: 'AdminApiProBKEdit',
        component: AdminApiProBKEdit,
      },
      // MENU-APIPROBK
      // MENU-SEKOLAH
      {
        path: '/pages/admin/sekolah', 
        name: 'AdminSekolah',
        component: AdminSekolah,
      },
      {
        path: '/pages/admin/sekolah/tambah', 
        name: 'AdminSekolahTambah',
        component: AdminSekolahTambah,
      },
      {
        path: '/pages/admin/sekolah/edit/:id', 
        name: 'AdminSekolahEdit',
        component: AdminSekolahEdit,
      },
      {
        path: '/pages/admin/sekolah/detail/:id', 
        name: 'AdminSekolahDetail',
        component: AdminSekolahDetail,
        redirect: 'pages/admin/sekolahdetail/:id/dashboard',
        children: [
          {
            path: '/pages/admin/sekolahdetail/:id/dashboard', 
            name: 'AdminSekolahDetailDashboard',
            component: AdminSekolahDetailDashboard,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/siswa', 
            name: 'AdminSekolahDetailSiswa',
            component: AdminSekolahDetailSiswa,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/siswa/tambah', 
            name: 'AdminSekolahDetailSiswaTambah',
            component: AdminSekolahDetailSiswaTambah,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/siswa/edit/:id2', 
            name: 'AdminSekolahDetailSiswaEdit',
            component: AdminSekolahDetailSiswaEdit,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/kelas', 
            name: 'AdminSekolahDetailKelas',
            component: AdminSekolahDetailKelas,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/kelas/tambah', 
            name: 'AdminSekolahDetailKelasTambah',
            component: AdminSekolahDetailKelasTambah,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/kelas/edit/:id2', 
            name: 'AdminSekolahDetailKelasEdit',
            component: AdminSekolahDetailKelasEdit,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/walikelas', 
            name: 'AdminSekolahDetailWaliKelas',
            component: AdminSekolahDetailWaliKelas,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/walikelas/tambah', 
            name: 'AdminSekolahDetailWaliKelasTambah',
            component: AdminSekolahDetailWaliKelasTambah,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/walikelas/edit/:id2', 
            name: 'AdminSekolahDetailWaliKelasEdit',
            component: AdminSekolahDetailWaliKelasEdit,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/gurubk', 
            name: 'AdminSekolahDetailGuruBk',
            component: AdminSekolahDetailGuruBk,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/gurubk/tambah', 
            name: 'AdminSekolahDetailGuruBkTambah',
            component: AdminSekolahDetailGuruBkTambah,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/gurubk/edit/:id2', 
            name: 'AdminSekolahDetailGuruBkEdit',
            component: AdminSekolahDetailGuruBkEdit,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/hasilpsikologi', 
            name: 'AdminSekolahDetailHasilPsikologi',
            component: AdminSekolahDetailHasilPsikologi,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/nilaipsikologisiswa', 
            name: 'AdminSekolahDetailNilaiPsikologiSiswa',
            component: AdminSekolahDetailNilaiPsikologiSiswa,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/analisaminatbakat', 
            name: 'AdminSekolahDetailAnalisaMinatBakat',
            component: AdminSekolahDetailAnalisaMinatBakat,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/analisanpenjurusan', 
            name: 'AdminSekolahDetailAnalisaPenjurusan',
            component: AdminSekolahDetailAnalisaPenjurusan,
          },
        ],
      },
      // MENU-SEKOLAH
      {
        path: '/pages/admin/yayasan', 
        name: 'AdminYayasan',
        component: AdminYayasan,
      },
      // MENU-KLASIFIKASI
      {
        path: '/pages/admin/klasifikasi', 
        name: 'AdminKlasifikasi',
        component: AdminKlasifikasi,
      },
      {
        path: '/pages/admin/klasifikasi/tambah', 
        name: 'AdminKlasifikasiTambah',
        component: AdminKlasifikasiTambah,
      },
      {
        path: '/pages/admin/klasifikasi/edit/:id', 
        name: 'AdminKlasifikasiEdit',
        component: AdminKlasifikasiEdit,
      },
      // MENU-KLASIFIKASI
      {
        path: '/pages/admin/referensi', 
        name: 'AdminReferensi',
        component: AdminReferensi,
      },
      {
        path: '/pages/admin/referensi/tambah', 
        name: 'AdminReferensiTambah',
        component: AdminReferensiTambah,
      },
      {
        path: '/pages/admin/referensi/edit/:id', 
        name: 'AdminReferensiEdit',
        component: AdminReferensiEdit,
      },
      {
        path: '/pages/admin/buletin', 
        name: 'AdminBuletin',
        component: AdminBuletin,
      },
      {
        path: '/pages/admin/buletin', 
        name: 'AdminBuletinTambah',
        component: AdminBuletinTambah,
      },
      {
        path: '/pages/admin/buletin', 
        name: 'AdminBuletinEdit',
        component: AdminBuletinEdit,
      },
      {
        path: '/pages/admin/terapis', 
        name: 'AdminTerapis',
        component: AdminTerapis,
      },
      {
        path: '/pages/admin/penanganan', 
        name: 'AdminPenanganan',
        component: AdminPenanganan,
      },
      {
        path: '/pages/admin/katabijak', 
        name: 'AdminKataBijak',
        component: AdminKataBijak,
      },
      {
        path: '/pages/admin/katabijak', 
        name: 'AdminKataBijakTambah',
        component: AdminKataBijakTambah,
      },
      {
        path: '/pages/admin/katabijak', 
        name: 'AdminKataBijakEdit',
        component: AdminKataBijakEdit,
      },
      {
        path: '/pages/admin/katabijak/detail/:id', 
        name: 'AdminKataBijakDetail',
        component: AdminKataBijakDetail,
      },
      {
        path: '/pages/admin/katabijak/detail/:id/tambah', 
        name: 'AdminKataBijakDetailTambah',
        component: AdminKataBijakDetailTambah,
      },
      {
        path: '/pages/admin/katabijak/detail/:id/edit/:id2', 
        name: 'AdminKataBijakDetailEdit',
        component: AdminKataBijakDetailEdit,
      },
      {
        path: '/pages/admin/masternilaipsikologi', 
        name: 'AdminMasterNilaiPsikologi',
        component: AdminMasterNilaiPsikologi,
      },
      {
        path: '/pages/admin/minatbakat', 
        name: 'AdmiMinatBakat',
        component: AdmiMinatBakat,
      },
      {
        path: '/pages/admin/administrator', 
        name: 'AdminAdministrator',
        component: AdminAdministrator,
      },
    ],
  },
  {
    path: '/:catchAll(.*)', redirect: '/404',
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
