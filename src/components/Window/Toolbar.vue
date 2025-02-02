<template>
  <div class="bg-cream flex gap-x-0.5 border-b border-gray-300 z-50">
    <div v-for="(menu, i) in menus" :key="menu.label" class="relative">
      <div
        class="px-2 py-1.5 cursor-pointer leading-none text-sm"
        :class="
          openMenuIndex === i ? 'bg-blue-500 text-white' : 'hover:bg-white'
        "
        @mouseenter="mouseenter(i)"
        @click="click(i)"
      >
        {{ menu.label }}
      </div>
      <transition name="fade">
        <div v-if="openMenuIndex === i" class="absolute w-40">
          <context-menu :actions="menu.actions" @close="openMenuIndex = null" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import ContextMenu from "../UI/ContextMenu";

export default {
  components: {
    ContextMenu,
  },
  props: {
    menus: {
      type: Array,
    },
  },
  data: () => ({
    openMenuIndex: null,
  }),
  methods: {
    click(i) {
      this.openMenuIndex = this.openMenuIndex === i ? null : i;
    },
    mouseenter(index) {
      if (this.openMenuIndex !== null && this.openMenuIndex !== index) {
        this.openMenuIndex = index;
      }
    },
  },
};
</script>