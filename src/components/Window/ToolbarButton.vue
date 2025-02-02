<template>
  <div
    class="flex items-center p-1 rounded border border-transparent group cursor-pointer"
    :class="
      toggled
        ? 'bg-white border-gray-400'
        : 'hover:bg-white hover:border-gray-400'
    "
    @click="$emit('click')"
  >
    <div class="w-6 h-6">
      <slot></slot>
    </div>
    <div v-if="label" class="pl-2 text-sm text-gray-800">{{ label }}</div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
    },
    toggled: {
      type: Boolean,
    },
  },
};
</script>