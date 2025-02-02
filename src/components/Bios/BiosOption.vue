<template>
  <li
    class="flex items-center cursor-pointer"
    :class="selected ? 'bg-red-600' : 'text-yellow-200'"
  >
    <div class="mr-3">&#9654;</div>
    <div>{{ option.label }}</div>
  </li>
</template>

<script>
export default {
  props: {
    option: {
      type: Object,
      required: true,
    },
    selected: {
      type: Boolean,
    },
  },
};
</script>