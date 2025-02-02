<template>
  <div
    class="flex items-center p-1 text-white hover:bg-blue-600 rounded cursor-pointer border-t-2 border-transparent hover:border-blue-700"
    @click="$emit('logout')"
  >
    <div class="bg-yellow-500 p-1 rounded border-white border">
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
          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
        ></path>
      </svg>
    </div>
    <div class="pl-2">Log off</div>
  </div>
</template>