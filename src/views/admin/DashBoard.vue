<script setup>
import { ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

import { useStoreAdminBar } from "@/stores/adminBar";
const storeAdminBar = useStoreAdminBar();
storeAdminBar.setPagesActive("dashboard");
const isOpen = ref(false);

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}
</script>
<template>
  <!-- Modal -->

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-20">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Payment successful
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Your payment has been successfully submitted. We’ve sent you
                  an email with all of the details of your order.
                </p>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Got it, thanks!
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  <!--  Modal-->
  <div class="pt-10 px-10">
    <span
      class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm"
      >Dashboard</span
    >
    <div class="tooltip" data-tip="hello">
      <button class="btn">Hover me</button>
    </div>
    <button
      type="button"
      @click="openModal"
      class="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      Open dialog
    </button>
  </div>
  <div class="mockup-phone">
    <div class="camera"></div>
    <div class="display">
      <div class="artboard artboard-demo phone-1">Hi.</div>
    </div>
  </div>
  <div class="mockup-code">
    <pre data-prefix="$"><code>npm i daisyui</code></pre>
    <pre data-prefix=">" class="text-warning"><code>installing...</code></pre>
    <pre data-prefix=">" class="text-success"><code>Done!</code></pre>
  </div>
  <div class="pt-6 px-4 lg:flex">
    <div class="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://api.lorem.space/image/shoes?w=400&h=225"
          alt="Shoes"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
    <div class="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://api.lorem.space/image/shoes?w=400&h=225"
          alt="Shoes"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">
          Shoes!
          <div class="badge badge-secondary">NEW</div>
        </h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
          <div class="badge badge-outline">Fashion</div>
          <div class="badge badge-outline">Products</div>
        </div>
      </div>
    </div>
    <div class="w-full lg:w-4/12 mx-4">
      <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
        <p class="text-base font-normal text-gray-500 mb-10">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat
          minus quibusdam dolore, vitae expedita ipsam quisquam hic in possimus
          eveniet eos explicabo dolorum aspernat ur qui magnam. Deleniti ipsa at
          aliquid.
        </p>
      </div>
    </div>
    <div class="w-full lg:w-8/12 mx-4">
      <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
        <p class="text-base font-normal text-gray-500 mb-10">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat
          minus quibusdam dolore, vitae expedita ipsam quisquam hic in possimus
          eveniet eos explicabo dolorum aspernat ur qui magnam. Deleniti ipsa at
          aliquid.
        </p>
      </div>
    </div>
  </div>
  <div class="pt-6 px-4">
    <div class="w-full lg:w-4/12 mx-4">
      <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
        <p class="text-base font-normal text-gray-500 mb-10">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat
          minus quibusdam dolore, vitae expedita ipsam quisquam hic in possimus
          eveniet eos explicabo dolorum aspernat ur qui magnam. Deleniti ipsa at
          aliquid.
        </p>
      </div>
    </div>
  </div>
  <div class="pt-6 px-4">
    <div class="w-full lg:w-4/12 mx-4">
      <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
        <p class="text-base font-normal text-gray-500 mb-10">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat
          minus quibusdam dolore, vitae expedita ipsam quisquam hic in possimus
          eveniet eos explicabo dolorum aspernat ur qui magnam. Deleniti ipsa at
          aliquid.
        </p>
      </div>
    </div>
  </div>
</template>
