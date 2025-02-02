<template>
  <div class="border border-gray-800 rounded bg-white leading-none">
    <div
      class="px-6 py-1 border-b-2 border-cream"
      :class="{ 'bg-cream': focused }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      default: false,
    },
    focused: {
      default: false,
    },
  },
};
</script>