<template>
  <div
    v-if="window.open"
    class="cursor-pointer flex items-center text-white px-2 rounded border-t-2 w-40 lg:w-48 shadow"
    :class="
      active ? 'bg-blue-700 border-blue-700' : 'bg-blue-400 border-blue-300'
    "
    :title="window.title + ' - ' + app.title"
  >
    <div v-html="app.icon" class="w-4 h-4 flex-shrink-0"></div>
    <div class="pl-2 py-0.5 lg:pr-4 truncate flex-grow leading-none">
      <span v-if="window.title">{{ window.title }} - </span>
      <span>{{ app.title }}</span>
    </div>
  </div>
</template>

<script>
import apps from "../../data/apps";

export default {
  props: {
    window: {
      type: Object,
      required: true,
    },
    active: {
      type: Boolean,
    },
  },
  computed: {
    app() {
      return apps.find((app) => app.id === this.window.appId);
    },
  },
};
</script>