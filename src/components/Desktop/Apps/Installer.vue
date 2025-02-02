<template>
  <div class="w-full h-full flex flex-col">
    <div class="flex flex-1">
      <div class="w-1/3 bg-blue-900"></div>
      <div class="w-2/3 bg-white p-4 border-b border-gray-400">
        <h2 class="text-xl">Welcome to the Wizard</h2>
      </div>
    </div>
    <div class="bg-cream p-3 border-t border-white flex justify-end">
      <div class="flex gap-x-3">
        <div class="flex gap-x-1">
          <ui-button disabled>&lt; Back</ui-button>
          <ui-button focused>Next &gt;</ui-button>
        </div>
        <ui-button>Cancel</ui-button>
      </div>
    </div>
  </div>
</template>

<script>
import UiButton from "../../UI/Button";

export default {
  components: { UiButton },
  data: () => ({}),
  mounted() {},
  methods: {},
};
</script>