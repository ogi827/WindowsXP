<template>
  <div
    class="p-1 shadow rounded border border-white"
    :class="'bg-' + color + '-400 group-hover:bg-' + color + '-500'"
  >
    <div class="text-white img-shadow">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
    },
  },
};
</script>