<script setup>
import { ref } from "vue";
import { computed } from "vue";
import { useCounterStore } from "@/stores/counter";
import Toast from "@/components/lib/Toast";
import Api from "@/axios/axios";

const storeCounter = useCounterStore();
const counter = computed(() => storeCounter.count);
let isSidebarActive = ref(false);
function sidebarToggle() {
  isSidebarActive.value = !isSidebarActive.value;
  // console.log(isSidebarActive.value);
}
function scrollBehavior(to) {
  if (to.hash) {
    const element = document.getElementById(to.hash.slice(1));
    if (element) {
      return window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  }
  return window.scrollTo({ top: 0, behavior: "smooth" });
}
const doIncrement = () => {
  storeCounter.$patch((state) => {
    state.count++;
  });
};
// reset otomatis ke nilai awal state
const doReset = () => {
  storeCounter.$reset();
};

// subscribe mirip watcher divue
storeCounter.$subscribe((mutation, state) => {
  console.log(mutation, state);
});

// getter
const getCount = computed(() => storeCounter.doubleCount);
// send param example
const divideByTwo = computed(() => storeCounter.divideBy(2));

// action
const actIncrement = () => {
  storeCounter.increment();
};
const actIncrementBy = (num) => {
  storeCounter.incrementBy(num);
};

// const arr = ref([
//   "Kegembiraan yang Anda miliki gunakan secara wajar dan realita",
//   "Nikmatilah hidup itu dengan gembira seperti menyongsong terbitnya Matahari dengan penuh harapan",
//   "Menanti datangnya kegembiraan hal yang sangat diharapkan setiap orang maka nikmatilah kegembiraan dengan hati riang, lembut",
// ]);

const arr = ref([]);
const data = ref([]);
const getData = async () => {
  try {
    const response = await Api.get(`guest/katabijak`);
    // console.log(response);
    data.value = response.data;
    data.value.map((item, index) => {
      arr.value.push(item.penjelasan);
    });

    return response.data;
  } catch (error) {
    Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};
getData();
</script>
<template>
  <!-- aside sidebar -->
  <div
    v-if="isSidebarActive"
    id="aside"
    class="z-10 top-0 block z-998 font-serif h-full fixed flex-row bg-white w-4/5 md:hidden shadow-xl border-r-2"
  >
    <div class="px-2 ml-5 pt-0 pb-5 overflow-y-auto h-full">
      <router-link :to="{ name: 'LandingIndex' }">
        <h1 class="text-xs text-gray-800 font-bold py-2 pt-6">Home</h1>
      </router-link>

      <router-link :to="{ name: 'LandingLogin' }">
        <h1 class="text-xs text-gray-800 font-bold py-2 pt-6">Login</h1>
      </router-link>

      <!-- <h1 class="text-xs text-gray-400 font-bold py-2">Installation</h1> -->
    </div>
  </div>
  <!-- aside sidebar -->

  <!-- scrolltotop -->

  <div class="fixed bottom-4 right-4 xl:right-20 z-999">
    <a
      class="transform duration-500 ease-in-out animate-bounce bg-gradient-to-br from-sky-500 to-vue-500 px-1 py-1 md:px-4 md:py-3 font-mono font-semibold rounded-lg shadow hover:shadow-xl flex justify-between items-center gap-4"
      @click="scrollBehavior('top')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="text-white h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
        />
      </svg>
    </a>
  </div>
  <!-- scrolltotop -->

  <!-- <LandingHeader class="sticky z-10" /> -->
  <div class="static bg-white" v-if="!isSidebarActive">
    <div
      class="fixed z-50 w-full font-serif font-semibold text-sm bg-slate-700 text-white flex justify-center py-2 px-4 text-center"
    >
      <VueWriter
        v-if="arr.length > 0"
        :array="arr"
        :eraseSpeed="50"
        :typeSpeed="40"
        :delay="2000"
        :intervals="500"
      />
    </div>
  </div>

  <div class="border-b-2 top-10 relative">
    <div class="container max-w-4xl mx-auto font-serif">
      <div class="w-full">
        <div class="flex justify-between px-3 pt-2 pb-4">
          <router-link
            :to="{ name: 'LandingIndex' }"
            class="flex px-2 py-0 w-2/5"
          >
            <img
              src="../assets/img/logo/google-developers.svg"
              alt="icon"
              class="w-10 hover:shadow-lg"
            />
            <h3
              class="pt-2 lg:pt-0 ml-4 mt-1 text-md font-bold text-gray-800 hover:text-sky-600 hover:underline"
            >
              YPMT PSIKOTEST
            </h3></router-link
          >
          <div class="md:w-3/5">
            <div class="hidden md:block">
              <div class="flex justify-end gap-10 pt-2">
                <router-link
                  :to="{ name: 'LandingIndex' }"
                  class="text-gray-800 font-normal text-sm hover:text-sky-600 hover:underline"
                  >Home</router-link
                >
                <router-link
                  :to="{ name: 'LandingLogin' }"
                  class="text-gray-800 font-normal text-sm hover:text-sky-600 hover:underline"
                  >Login</router-link
                >
                <!-- <a href="https://github.com/godgodwinter" target="blank" class="text-gray-800 font-semibold text-sm hover:text-vue-600 hover:underline">Github </a> -->
              </div>
            </div>

            <span
              @click="sidebarToggle"
              class="text-gray-600 text-xl md:hidden block"
            >
              <svg
                v-if="!isSidebarActive"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="50"
                height="50"
                viewBox="0 0 50 50"
                style="fill: #000000"
              >
                <path
                  d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"
                ></path>
              </svg>
              <svg
                class="w-8 h-8"
                v-else
                width="50"
                height="50"
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
                <path
                  d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 10.293l5.293-5.293.707.707-5.293 5.293 5.293 5.293-.707.707-5.293-5.293-5.293 5.293-.707-.707 5.293-5.293-5.293-5.293.707-.707 5.293 5.293z"
                />
              </svg>
            </span>
            <!-- <font-awesome-icon icon="user-secret" /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <main class="font-serif">
    <router-view />
  </main>

  <footer class="bg-gray-50 text-center lg:text-left font-serif">
    <div class="text-gray-500 text-center p-4">
      © 2022 Copyright:
      <a class="text-gray-600" href="#">TeamDev</a>
    </div>
  </footer>
</template>
