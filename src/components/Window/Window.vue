<template>
  <resizable
    v-show="window.open && !window.minimize"
    :width="width"
    :height="height"
    :left="left"
    :top="top"
    :minWidth="300"
    :minHeight="300"
    dragSelector=".window-title"
    :active="['r', 'rb', 'b', 'lb', 'l', 'lt', 't', 'rt']"
    :fit-parent="true"
    :maximize="window.maximize"
    @maximize="maximize"
    style="position: absolute !important"
    class="pointer-events-auto"
    :class="active ? 'z-40' : 'z-30'"
  >
    <div
      class="w-full h-full flex flex-col"
      :class="shaking ? 'shake' : ''"
      @mousedown="focus"
    >
      <div
        class="flex items-center p-1 pt-0.5 border-t-2"
        :class="[
          active
            ? 'text-white bg-blue-600 border-blue-500 '
            : 'text-gray-200 bg-blue-400 border-blue-300',
          window.maximize ? '' : ' rounded-t',
        ]"
      >
        <div
          class="window-title flex items-center flex-1 p-1"
          @dblclick="$emit('toggle-maximize')"
        >
          <div v-if="app.icon" class="pr-2">
            <div v-html="app.icon" class="w-4 h-4"></div>
          </div>
          <div
            class="flex-1 text-shadow-lg font-semibold"
            :class="active ? '' : ''"
          >
            <span v-if="window.title">{{ window.title }} - </span>
            <span>{{ app.title }}</span>
          </div>
        </div>
        <div class="flex items-center gap-x-1">
          <div
            @click="$emit('minimize')"
            class="cursor-pointer bg-blue-500 hover:bg-blue-600 border p-0.5 rounded"
            :class="active ? 'border-white' : ' border-gray-300 bg-opacity-50'"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 12H4"
              ></path>
            </svg>
          </div>
          <div
            @click="$emit('toggle-maximize')"
            class="cursor-pointer bg-blue-500 hover:bg-blue-600 border border-white p-0.5 rounded"
            :class="active ? 'border-white' : ' border-gray-300 bg-opacity-50'"
          >
            <svg
              v-if="window.maximize"
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              ></path>
            </svg>
            <svg
              v-else
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              ></path>
            </svg>
          </div>
          <div
            @click="$emit('close')"
            class="cursor-pointer bg-red-500 hover:bg-red-600 border border-white p-0.5 rounded"
            :class="active ? 'border-white' : ' border-gray-300 bg-opacity-50'"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div
        class="flex-1 select-auto bg-white border-t-0 overflow-hidden flex flex-col"
        :class="[
          active ? 'border-blue-600' : 'border-blue-400',
          window.maximize ? '' : 'border-2 rounded-b',
        ]"
      >
        <slot></slot>
      </div>
    </div>
  </resizable>
</template>

<script>
import Resizable from "./Resizable";

import apps from "../../data/apps";

export default {
  components: {
    Resizable,
  },
  props: {
    api: {
      type: Object,
      required: true,
    },
    windowApi: {
      type: Object,
      required: true,
    },
    window: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
    state: {
      type: Object,
    },
    active: {
      type: Boolean,
    },
  },
  data: () => ({
    width: 800,
    height: 600,
    left: 100,
    top: 100,
    shaking: false,
  }),
  computed: {
    app() {
      return apps.find((app) => app.id === this.window.appId);
    },
  },
  methods: {
    shake() {
      this.shaking = true;

      setTimeout(() => (this.shaking = false), 1000);
    },
    maximize(e) {
      this.$emit(
        "maximized",
        e.hasOwnProperty("state") ? e : { state: !this.window.maximize }
      );
    },
    focus() {
      if (!this.active) {
        this.$emit("focus");
      }
    },
  },
};
</script>