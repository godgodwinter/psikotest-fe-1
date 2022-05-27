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
import AdminSekolahDetailHasilPsikologiPenanganan from '../views/admin/sekolah/submenu/hasilpsikologi/Penanganan.vue'
import AdminSekolahDetailHasilPsikologiTerapis from '../views/admin/sekolah/submenu/hasilpsikologi/Terapis.vue'
import AdminSekolahDetailHasilPsikologiSertifikat from '../views/admin/sekolah/submenu/hasilpsikologi/Sertifikat.vue'
import AdminSekolahDetailHasilPsikologiDeteksi from '../views/admin/sekolah/submenu/hasilpsikologi/Deteksi.vue'


import AdminSekolahDetailNilaiPsikologiSiswa from '../views/admin/sekolah/submenu/nilaipsikologisiswa/Index.vue'
import AdminSekolahDetailAnalisaMinatBakat from '../views/admin/sekolah/submenu/analisaminatbakat/Index.vue'
import AdminSekolahDetailAnalisaPenjurusan from '../views/admin/sekolah/submenu/analisapenjurusan/Index.vue'
import AdminSekolahDetailCatatanKasusSiswa from '../views/admin/sekolah/submenu/catatankasussiswa/Index.vue'
import AdminSekolahDetailCatatanKasusSiswaDetail from '../views/admin/sekolah/submenu/catatankasussiswa/Detail.vue'
import AdminSekolahDetailCatatanKasusSiswaTambah from '../views/admin/sekolah/submenu/catatankasussiswa/Tambah.vue'
import AdminSekolahDetailCatatanKasusSiswaEdit from '../views/admin/sekolah/submenu/catatankasussiswa/Edit.vue'

import AdminSekolahDetailCatatanPengembanganDiri from '../views/admin/sekolah/submenu/catatanpengembangandiri/Index.vue'
import AdminSekolahDetailCatatanPengembanganDiriDetail from '../views/admin/sekolah/submenu/catatanpengembangandiri/Detail.vue'
import AdminSekolahDetailCatatanPengembanganDiriTambah from '../views/admin/sekolah/submenu/catatanpengembangandiri/Tambah.vue'
import AdminSekolahDetailCatatanPengembanganDiriEdit from '../views/admin/sekolah/submenu/catatanpengembangandiri/Edit.vue'

import AdminSekolahDetailCatatanPrestasiSiswa from '../views/admin/sekolah/submenu/catatanprestasisiswa/Index.vue'
import AdminSekolahDetailCatatanPrestasiSiswaDetail from '../views/admin/sekolah/submenu/catatanprestasisiswa/Detail.vue'
import AdminSekolahDetailCatatanPrestasiSiswaTambah from '../views/admin/sekolah/submenu/catatanprestasisiswa/Tambah.vue'
import AdminSekolahDetailCatatanPrestasiSiswaEdit from '../views/admin/sekolah/submenu/catatanprestasisiswa/Edit.vue'
// MENU-SEKOLAH-SUB
// MENU-SEKOLAH

import AdminYayasan from '../views/admin/yayasan/Index.vue'
import AdminYayasanTambah from '../views/admin/yayasan/Tambah.vue'
import AdminYayasanEdit from '../views/admin/yayasan/Edit.vue'
import AdminYayasanDetail from '../views/admin/yayasan/Detail.vue'
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
import AdminTerapisTambah from '../views/admin/terapisKarakterPositif/Tambah.vue'
import AdminTerapisEdit from '../views/admin/terapisKarakterPositif/Edit.vue'
import AdminPenanganan from '../views/admin/penangananDeteksiMasalah/Index.vue'
import AdminPenangananDetailStore from '../views/admin/penangananDeteksiMasalah/DetailStore.vue'
import AdminKataBijak from '../views/admin/kataBijak/Index.vue'
import AdminKataBijakTambah from '../views/admin/kataBijak/Tambah.vue'
import AdminKataBijakEdit from '../views/admin/kataBijak/Edit.vue'
import AdminKataBijakDetail from '../views/admin/kataBijak/Detail.vue'
import AdminKataBijakDetailTambah from '../views/admin/kataBijak/DetailTambah.vue'
import AdminKataBijakDetailEdit from '../views/admin/kataBijak/DetailEdit.vue'
import AdminMasterNilaiPsikologi from '../views/admin/masterNilaiPsikologi/Index.vue'
import AdmiMinatBakat from '../views/admin/minatBakat/Index.vue'
import AdminAdministrator from '../views/admin/administrator/Index.vue'
import AdminAdministratorTambah from '../views/admin/administrator/Tambah.vue'
import AdminAdministratorEdit from '../views/admin/administrator/Edit.vue'
import AdminOwner from '../views/admin/owner/Index.vue'
import AdminOwnerTambah from '../views/admin/owner/Tambah.vue'
import AdminOwnerEdit from '../views/admin/owner/Edit.vue'

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
            path: '/pages/admin/sekolahdetail/:id/hasilpsikologi/:id2/deteksi', 
            name: 'AdminSekolahDetailHasilPsikologiDeteksi',
            component: AdminSekolahDetailHasilPsikologiDeteksi,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/hasilpsikologi/:id2/sertifikat', 
            name: 'AdminSekolahDetailHasilPsikologiSertifikat',
            component: AdminSekolahDetailHasilPsikologiSertifikat,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/hasilpsikologi/:id2/penanganan', 
            name: 'AdminSekolahDetailHasilPsikologiPenanganan',
            component: AdminSekolahDetailHasilPsikologiPenanganan,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/hasilpsikologi/:id2/terapis', 
            name: 'AdminSekolahDetailHasilPsikologiTerapis',
            component: AdminSekolahDetailHasilPsikologiTerapis,
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
          {
            path: '/pages/admin/sekolahdetail/:id/catatankasussiswa', 
            name: 'AdminSekolahDetailCatatanKasusSiswa',
            component: AdminSekolahDetailCatatanKasusSiswa,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/catatankasussiswa/:id2',
            name: 'AdminSekolahDetailCatatanKasusSiswaDetail',
            component: AdminSekolahDetailCatatanKasusSiswaDetail,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/catatankasussiswa/:id2/tambah', 
            name: 'AdminSekolahDetailCatatanKasusSiswaTambah',
            component: AdminSekolahDetailCatatanKasusSiswaTambah,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/catatankasussiswa/:id2/edit/:id3', 
            name: 'AdminSekolahDetailCatatanKasusSiswaEdit',
            component: AdminSekolahDetailCatatanKasusSiswaEdit,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/catatanpengembangandiri', 
            name: 'AdminSekolahDetailCatatanPengembanganDiri',
            component: AdminSekolahDetailCatatanPengembanganDiri,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/catatanpengembangandiri/:id2',
            name: 'AdminSekolahDetailCatatanPengembanganDiriDetail',
            component: AdminSekolahDetailCatatanPengembanganDiriDetail,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/catatanpengembangandiri/:id2/tambah', 
            name: 'AdminSekolahDetailCatatanPengembanganDiriTambah',
            component: AdminSekolahDetailCatatanPengembanganDiriTambah,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/catatanpengembangandiri/:id2/edit/:id3', 
            name: 'AdminSekolahDetailCatatanPengembanganDiriEdit',
            component: AdminSekolahDetailCatatanPengembanganDiriEdit,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/catatanprestasisiswa', 
            name: 'AdminSekolahDetailCatatanPrestasiSiswa',
            component: AdminSekolahDetailCatatanPrestasiSiswa,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/catatanprestasisiswa/:id2',
            name: 'AdminSekolahDetailCatatanPrestasiSiswaDetail',
            component: AdminSekolahDetailCatatanPrestasiSiswaDetail,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/catatanprestasisiswa/:id2/tambah', 
            name: 'AdminSekolahDetailCatatanPrestasiSiswaTambah',
            component: AdminSekolahDetailCatatanPrestasiSiswaTambah,
          },
          {
            path: '/pages/admin/sekolahdetail/:id/catatanprestasisiswa/:id2/edit/:id3', 
            name: 'AdminSekolahDetailCatatanPrestasiSiswaEdit',
            component: AdminSekolahDetailCatatanPrestasiSiswaEdit,
          },
        ],
      },
      // MENU-SEKOLAH
      {
        path: '/pages/admin/yayasan', 
        name: 'AdminYayasan',
        component: AdminYayasan,
      },
      {
        path: '/pages/admin/yayasan', 
        name: 'AdminYayasanTambah',
        component: AdminYayasanTambah,
      },
      {
        path: '/pages/admin/yayasan/:id', 
        name: 'AdminYayasanEdit',
        component: AdminYayasanEdit,
      },
      {
        path: '/pages/admin/yayasan/:id/detail', 
        name: 'AdminYayasanDetail',
        component: AdminYayasanDetail,
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
        path: '/pages/admin/terapis', 
        name: 'AdminTerapisTambah',
        component: AdminTerapisTambah,
      },
      {
        path: '/pages/admin/terapis/:id', 
        name: 'AdminTerapisEdit',
        component: AdminTerapisEdit,
      },
      {
        path: '/pages/admin/penanganan', 
        name: 'AdminPenanganan',
        component: AdminPenanganan,
      },
      {
        path: '/pages/admin/penanganan/detailstore/:id', 
        name: 'AdminPenangananDetailStore',
        component: AdminPenangananDetailStore,
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
      {
        path: '/pages/admin/administrator', 
        name: 'AdminAdministratorTambah',
        component: AdminAdministratorTambah,
      },
      {
        path: '/pages/admin/administrator', 
        name: 'AdminAdministratorEdit',
        component: AdminAdministratorEdit,
      },
      {
        path: '/pages/admin/owner', 
        name: 'AdminOwner',
        component: AdminOwner,
      },
      {
        path: '/pages/admin/owner', 
        name: 'AdminOwnerTambah',
        component: AdminOwnerTambah,
      },
      {
        path: '/pages/admin/owner/:id', 
        name: 'AdminOwnerEdit',
        component: AdminOwnerEdit,
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
