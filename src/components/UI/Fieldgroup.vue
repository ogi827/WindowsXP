<template>
  <fieldset class="relative px-2 py-2 border border-gray-400 rounded">
    <legend
      class="absolute -top-2.5 left-2 bg-cream px-1 text-gray-500 text-shadow text-sm"
    >
      {{ title }}
    </legend>

    <slot>
      <div
        v-for="stat in stats"
        class="text-sm flex items-center justify-between"
      >
        <div>{{ stat.label }}</div>
        <div class="pl-2">{{ stat.value }}</div>
      </div>
    </slot>
  </fieldset>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    stats: {
      type: Array,
    },
  },
};
</script>