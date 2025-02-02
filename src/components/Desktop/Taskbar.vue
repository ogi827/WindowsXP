<template>
  <footer class="flex flex-shrink-0 relative z-30">
    <div
      class="bg-gradient-to-b from-blue-600 to-blue-500 border-t-2 border-blue-500 absolute inset-0"
    ></div>
    <div class="relative">
      <start-button @toggle="toggleStart" @close="closeStart" :open="open" />
    </div>
    <transition name="fade">
      <div
        v-if="open"
        class="absolute top-0 left-0 transform -translate-y-full w-screen z-40"
      >
        <slot name="start"></slot>
      </div>
    </transition>
    <div
      class="relative flex-1 flex flex-wrap gap-0.5 py-0.5 overflow-auto px-2"
    >
      <slot name="bar"></slot>
    </div>

    <div
      class="relative bg-blue-400 border-blue-300 border-t-2 flex items-center shadow"
    >
      <div class="px-4 flex items-center gap-x-1.5">
        <tray-icon
          v-for="app in trayIcons"
          :key="app.id"
          :app="app"
          @open-app="$emit('open-app', $event)"
          @close="$emit('close-notification', app.id)"
          @play-sound="$emit('play-sound', $event)"
        />
      </div>
      <div class="pr-4 text-white text-sm lg:text-base">{{ time }}</div>
    </div>
  </footer>
</template>

<script>
import StartButton from "./StartButton";
import TrayIcon from "../Desktop/TrayIcon";

import apps from "../../data/apps";

export default {
  components: {
    StartButton,
    TrayIcon,
  },
  props: {
    open: {
      type: Boolean,
    },
    notifications: {
      type: Array,
    },
  },
  data: () => ({
    timer: "",
    date: new Date(),
    apps: apps,
  }),
  mounted() {
    this.timer = setInterval(() => (this.date = new Date()), 10000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  computed: {
    trayIcons() {
      return apps
        .filter(
          (app) =>
            app.notification ||
            app.closeToTray ||
            this.notifications.find(
              (notification) => notification.appId === app.id
            )
        )
        .map((app) => ({
          ...app,
          notifications: this.notifications.filter(
            (notification) => notification.appId === app.id
          ),
        }));
    },
    time() {
      let hours = this.date.getHours();
      let mins = this.date.getMinutes();

      return (
        (hours <= 9 ? "0" : "") + hours + ":" + (mins <= 9 ? "0" : "") + mins
      );
    },
  },
  methods: {
    toggleStart() {
      this.$emit("toggle-start");
    },
    closeStart() {
      this.$emit("close-start");
    },
  },
};
</script>