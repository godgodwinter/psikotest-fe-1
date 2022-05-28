<script setup>
import { jsPDF } from "jspdf";
import { ref, onMounted, watch } from "vue";
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
  watch(testHtml, (newVal) => {
    doc.html(newVal, {
      margin: [
        30, //left x coord
        10, //top y coord
        30, //right x coord
        10, //bottom y coord
      ],
      callback: function (doc) {
        //   doc.save();
        //   doc.output("save", "filename.pdf"); //Try to save PDF as a file (not works on ie before 10, and some mobile devices)
        // doc.output("datauristring"); //returns the data uri string
        // doc.output("datauri"); //opens the data uri in current window
        // doc.output("dataurlnewwindow"); //opens the data uri in new window
        let iframe = document.createElement("iframe");
        iframe.setAttribute(
          "style",
          "position:absolute;right:0; top:0; bottom:0; height:100%; width:700px"
        );
        document.body.appendChild(iframe);
        iframe.src = doc.output("datauristring");
      },
      x: 15,
      y: 15,
    });
  });
</script>
<template>
  <div ref="testHtml" data-theme="light">
    <div class="max-w-xl bg-white text-sm">
      <h1 class="text-center">SERTIFIKAT</h1>
      <div class="py-4">
        <div>
          <table class="table table-compact">
            <thead>
              <tr>
                <th class="whitespace-nowrap w-1/100"></th>
                <th class="whitespace-nowrap w-1/100">Name</th>
                <th class="whitespace-nowrap w-1/100">Job</th>
                <th class="whitespace-nowrap w-1/100">company</th>
                <th class="whitespace-nowrap w-1/100">location</th>
                <th class="whitespace-pre-wrap w-1/100">Last Login</th>
                <th class="whitespace-pre-wrap w-1/100">Favorite Color</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in 10">
                <th>1</th>
                <td class="whitespace-pre-wrap w-1/100">Cy Ganderton</td>
                <td class="whitespace-pre-wrap w-1/100">
                  Quality Control Specialist
                </td>
                <td class="whitespace-pre-wrap w-1/100">
                  Littel, Schaden and Vandervort
                </td>
                <td class="whitespace-pre-wrap w-1/100">Canada</td>
                <td class="whitespace-pre-wrap w-1/100">12/16/2020</td>
                <td class="whitespace-pre-wrap w-1/100">Blue</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="text-gray-600 text-sm px-2">
        <h1>Test heading</h1>
        <div class="card">
          <div class="card-header">Featured</div>
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
        <div class="card">
          <div class="card-header">Featured</div>
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
        <button class="btn btn-danger" @click="generatePdf">
          generate PDF
        </button>
      </div>
    </div>
  </div>
</template>
