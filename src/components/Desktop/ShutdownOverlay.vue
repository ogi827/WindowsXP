<template>
  <div class="absolute w-full h-full z-50">
    <div class="absolute inset-0" style="backdrop-filter: grayscale(1)"></div>
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="bg-blue-700">
        <div class="flex items-center px-2 py-1">
          <div
            class="text-white py-1 text-shadow-lg tracking-wider text-xl mr-24 font-heading"
          >
            Turn off computer
          </div>
          <div class="w-8 h-8 flex-shrink-0 img-shadow">
            <logo />
          </div>
        </div>
        <div
          class="bg-blue-500 py-8 border-t-2 border-b-2 border-white flex items-center justify-around gap-x-8 px-16"
        >
          <div
            @click="$emit('shutdown')"
            class="flex flex-col items-center text-white cursor-pointer p-2 rounded border-t-2 border-transparent hover:bg-blue-600 hover:border-blue-700"
          >
            <div class="border border-white rounded bg-red-500 p-1 mb-2">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div class="text-xs font-bold">Turn Off</div>
          </div>
          <div
            @click="$emit('restart')"
            class="flex flex-col items-center text-white cursor-pointer p-2 rounded border-t-2 border-transparent hover:bg-blue-600 hover:border-blue-700"
          >
            <div class="border border-white rounded bg-green-500 p-1 mb-2">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                ></path>
              </svg>
            </div>
            <div class="text-xs font-bold">Restart</div>
          </div>
        </div>
        <div class="flex justify-end p-3">
          <button
            @click="$emit('close')"
            class="bg-white rounded px-4 py-0.5 text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "./Logo";

export default {
  components: {
    Logo,
  },
};
</script>