<script setup>
import { computed } from "vue";
import { useStoreAuth } from "@/stores/auth";
import Api from "@/axios/axios";
import jwt_decode from "jwt-decode";
import Toast from "@/components/lib/Toast.js";
import { ref } from "vue";
import { useRouter } from "vue-router";
const storeAuth = useStoreAuth();
const router = useRouter();
const email = ref();
const password = ref();

const doLogin = async (username, password) => {
  try {
    const response = await Api.post("admin/auth/login", {
      email: username,
      password,
    });
    // console.log(response);
    if (response.code === 200) {
      const { token } = response;
      localStorage.setItem("token", token);
      localStorage.setItem("isLogin", true);
      console.log("Login berhasil");
      storeAuth.setIsLogin(true);
      storeAuth.setToken(token);
      router.push({ name: "AdminDashboard" });
      let decoded = jwt_decode(token);
      // store.commit("setDataAuth", decoded);
      // console.log(decoded);
      Toast.success("Success", "Login Berhasil!");
    } else {
      Toast.danger("Warning", "Login gagal!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    Toast.danger("Warning", "Login gagal!");
  }
};
const onSubmit = () => {
  doLogin(email.value, password.value);
};
</script>
<template>
  <div class="bg-white flex flex-col justify-center sm:py-32">
    <div class="relative py-0 sm:max-w-xl sm:mx-auto">
      <div
        class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-2 sm:skew-y-0 sm:-rotate-2 sm:rounded-3xl"
      ></div>
      <div
        class="relative px-4 py-10 bg-white border border-sky-800 hover:shadow-2xl sm:rounded-3xl sm:p-10"
      >
        <div class="max-w-md mx-auto">
          <!-- <div>
                    <img src="../../assets/img/avatar/baemon-ava-1.jpg"
                    class="object-cover h-52 w-full" />
                    </div> -->
          <div class="divide-y divide-gray-200">
            <div
              class="flex flex-col bg-white shadow-sm px-10 py-4 rounded-3xl w-50"
            >
              <div
                class="font-bold self-center text-xl sm:text-3xl text-gray-800"
              >
                LOGIN
                <!-- {{dataToken}}
                                {{dataIsLogin}} -->
              </div>
              <div
                class="mt-4 self-center text-xl sm:text-sm text-gray-800 text-center"
              >
                Masuk sebagai Administrator
              </div>

              <div>
                <div class="mt-10">
                  <div class="flex flex-col mb-5">
                    <label
                      for="email"
                      class="mb-1 text-xs tracking-wide text-gray-600"
                      >Username or Email:</label
                    >
                    <div class="relative">
                      <div
                        class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
                      >
                        <i class="fas fa-at text-blue-500"></i>
                      </div>

                      <input
                        v-model="email"
                        name="username"
                        type="email"
                        class="w-full border-gray-300 border px-4 py-2 rounded focus:border focus:border-blue-500 focus:shadow-outline outline-none"
                      />
                    </div>
                  </div>
                  <div class="flex flex-col mb-6">
                    <label
                      for="password"
                      class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                      >Password:</label
                    >
                    <div class="relative">
                      <div
                        class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
                      >
                        <span>
                          <i class="fas fa-lock text-blue-500"></i>
                        </span>
                      </div>

                      <input
                        v-model="password"
                        name="password"
                        type="password"
                        class="w-full border-gray-300 border px-4 py-2 rounded focus:border focus:border-blue-500 focus:shadow-outline outline-none"
                      />
                    </div>
                  </div>
                  <!-- <router-link :to="{ name: 'AdminDashboard' }"> -->
                  <button class="flex w-full" @click="onSubmit()">
                    <span
                      href="#"
                      type="submit"
                      class="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in"
                    >
                      <span class="mr-2 uppercase">Sign In</span>
                      <span>
                        <svg
                          class="h-6 w-6"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </span>
                    </span>
                  </button>
                  <!-- </router-link> -->
                </div>
              </div>
            </div>

            <!-- <div class="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
              <div class="flex justify-center items-center mt-6">
                <a
                  href="#"
                  target="_blank"
                  class="inline-flex items-center text-gray-700 font-medium text-xs text-center"
                >
                  <span class="ml-2"
                    >You don't have an account?
                    <a href="#" class="text-xs ml-2 text-blue-500 font-semibold"
                      >Register now</a
                    ></span
                  >
                </a>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
