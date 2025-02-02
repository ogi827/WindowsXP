<template>
  <div class="text-sm">
    <div
      @click="openApp"
      @contextmenu="$emit('close')"
      class="bg-balloon w-64 cursor-pointer border border-black rounded-lg pl-3 pr-2 py-2 shadow-lg"
    >
      <div class="flex items-start justify-between">
        <div class="flex items-center mb-2">
          <svg
            class="w-5 h-5 text-blue-800"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div class="font-bold ml-2">{{ notification.title }}</div>
        </div>
        <div
          @click.stop="$emit('close')"
          class="ml-2 p-0.5 bg-white bg-opacity-25 hover:bg-red-500 hover:text-white border rounded"
        >
          <svg
            class="w-3 h-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
      <div class="">{{ notification.message }}</div>
    </div>
    <div class="flex justify-end pr-2 -mt-px">
      <div
        class="bg-balloon w-6 h-6 shadow-lg"
        style="clip-path: polygon(100% 0, 0 0, 100% 100%)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notification: {
      type: Object,
      require: true,
    },
  },
  methods: {
    openApp() {
      this.$emit("open-app", {
        id: this.notification.appId,
        meta: this.notification.appMeta,
      });
    },
  },
  mounted() {
    this.$emit("play-sound", "balloon");
  },
  updated() {
    this.$emit("play-sound", "balloon");
  },
};
</script>