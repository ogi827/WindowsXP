<template>
  <div
    class="flex items-center p-1 text-white hover:bg-blue-600 rounded cursor-pointer border-t-2 border-transparent hover:border-blue-700 ml-1"
    @click="$emit('shutdown')"
  >
    <div class="bg-red-500 p-1 rounded border-white border">
      <svg
        class="w-5 h-5"
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
    <div class="pl-2">Turn Off Computer</div>
  </div>
</template>