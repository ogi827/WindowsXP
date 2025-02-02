<template>
  <div class="text-xs">
    <div
      class="bg-gradient-to-r from-white to-blue-200 rounded-t-md flex items-center text-blue-900 pl-3 pr-2 py-1.5"
    >
      <div class="font-bold pr-5 flex-1">{{ title }}</div>
      <div
        class="bg-white w-4 h-4 flex items-center justify-center rounded-full border shadow cursor-pointer"
        @click="collapsed = !collapsed"
      >
        <svg
          class="w-3 h-3"
          :class="collapsed ? 'transform rotate-180' : ''"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
    <div
      class="border border-white border-t-0 bg-blue-100 px-3 py-2"
      v-if="!collapsed"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    collapsed: false,
  }),
};
</script>