<template>
  <div class="bg-cream border border-gray-300 z-50 p-0.5 text-sm">
    <div
      v-for="(action, i) in actions"
      :key="action.label"
      class="relative"
      @mouseenter="mouseenter(i)"
      @mouseleave="mouseleave"
    >
      <div
        v-if="action.spacer"
        class="border-b border-gray-400 pt-1 mb-1"
      ></div>
      <div
        v-else
        @click="
          runAction(action);
          this.close();
        "
        class="flex items-center p-0.5 cursor-pointer hover:bg-blue-500 hover:text-white leading-none flex items-center justify-between"
      >
        <div
          class="w-6 h-6 flex-shrink-0 flex items-center justify-center"
          :class="
            typeof action.toggled !== 'undefined' && action.toggled
              ? 'bg-blue-300 border border-blue-400'
              : ''
          "
        >
          <div v-if="action.icon" v-html="action.icon"></div>
          <div
            v-else-if="typeof action.toggled !== 'undefined' && action.toggled"
          >
            <svg
              class="w-4 h-4 text-black"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
        <div class="flex-1 whitespace-nowrap pl-1 pr-4">{{ action.label }}</div>
        <div v-if="action.actions" class="text-xs">&#9654;</div>
      </div>
      <transition name="fade">
        <div
          v-if="action.actions && activeSubMenu === i"
          class="absolute top-0 right-0 transform translate-x-full"
        >
          <context-menu :actions="action.actions" @close="close" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "context-menu",
  components: {
    ContextMenu: () => import("./ContextMenu.vue"),
  },
  props: {
    actions: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    activeSubMenu: null,
  }),
  methods: {
    runAction(action) {
      if (action.action) {
        action.action.call();
      }

      this.activeSubMenu = null;
      this.$emit("close");
    },
    mouseenter(i) {
      this.activeSubMenu = i;
    },
    mouseleave() {
      this.activeSubMenu = null;
    },
    close() {
      this.activeSubMenu = null;
      this.$emit("close");
    },
  },
  beforeCreate() {
    this.$options.components.ContextMenu = require("./ContextMenu.vue").default;
  },
};
</script>