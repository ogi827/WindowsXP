<template>
  <div class="relative">
    <div
      @click="$emit('open-app', app.id)"
      class="w-4 h-4"
      v-html="app.icon"
    ></div>
    <div
      v-if="app.notifications && app.notifications.length > 0"
      class="absolute z-50 top-1.5 left-4 transform -translate-x-full -translate-y-full"
    >
      <balloon
        :notification="app.notifications[0]"
        @open-app="$emit('open-app', $event)"
        @close="$emit('close')"
        @play-sound="$emit('play-sound', $event)"
      />
    </div>
  </div>
</template>

<script>
import Balloon from "./Balloon";

export default {
  components: {
    Balloon,
  },
  props: {
    app: {
      type: Object,
      require: true,
    },
  },
};
</script>