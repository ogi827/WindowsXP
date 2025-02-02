<template>
  <div v-hotkey="keymap" class="fixed inset-0 flex items-center justify-center">
    <div>
      <div class="flex">
        <div class="bg-red-600 px-0.5 py-2">
          <div
            class="border border-l-2 border-r-2 border-white px-4 py-6 text-white"
          >
            <slot></slot>
          </div>
        </div>
        <div class="bg-black bg-opacity-75 w-3 mt-8"></div>
      </div>
      <div class="bg-black bg-opacity-75 h-6 ml-4"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    keymap: {
      type: Object,
      required: true,
    },
  },
};
</script>