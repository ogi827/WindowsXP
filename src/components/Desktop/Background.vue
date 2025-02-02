<template>
  <div
    class="flex-1 bg-cover bg-center flex flex-col leading-none relative z-30"
    :style="style"
  >
    <div
      class="flex-1 flex justify-center flex-wrap content-start p-4 md:p-2 gap-4 md:gap-2 md:justify-start md:flex-col overflow-auto"
      @contextmenu="contextmenu"
      @mousedown="mousedown"
      @mouseup="mouseup"
      @mousemove="mousemove"
      @click.self="click"
    >
      <file-icon
        v-for="icon in icons"
        :ref="
          (el) => {
            iconRefs[icon.id] = el;
          }
        "
        :key="icon.id"
        :file="icon"
        :meta="icon.meta || {}"
        layout="vertical"
        :selected="selectedIconIndexes.includes(icon.id)"
        @select="select(icon.id)"
        @open="$emit('open-app', { id: icon.app.id, meta: icon.meta || {} })"
      />
      <div
        v-if="dragging"
        class="absolute bg-blue-500 bg-opacity-25 border-2 border-blue-400 bg-blue-400 border-opacity-50"
        :style="selectionStyle"
      ></div>
      <transition name="fade">
        <context-menu
          v-if="contextOpen"
          :actions="actions"
          class="absolute"
          :style="contextStyle"
          @close="contextOpen = false"
        />
      </transition>
    </div>
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <slot name="windows"></slot>
    </div>
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <slot name="notes"></slot>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import ContextMenu from "../UI/ContextMenu";
import FileIcon from "../UI/FileIcon";

export default {
  components: {
    ContextMenu,
    FileIcon,
  },
  props: {
    icons: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const iconRefs = ref([]);

    return { iconRefs };
  },
  data: () => ({
    contextOpen: false,
    contextPosition: null,
    // backgroundImage: "https://wallpaperaccess.com/full/2778221.jpg",
    backgroundImage: "https://i.imgur.com/da4HY4P.jpg",
    dragging: false,
    mouseDown: false,
    dragStart: { x: 0, y: 0 },
    dragEnd: { x: 0, y: 0 },
    selectedIconIndex: null,
  }),
  methods: {
    log(e) {
      // console.log(e);
    },
    mousedown(e) {
      this.mouseDown = true;
      this.dragStart.x = e.clientX;
      this.dragStart.y = e.clientY;

      this.dragEnd.x = e.clientX;
      this.dragEnd.y = e.clientY;
    },
    mouseup(e) {
      this.mouseDown = false;

      if (this.dragging) {
        this.dragging = false;
      }
    },
    mousemove(e) {
      let distX = Math.abs(this.dragStart.x - e.clientX);
      let distY = Math.abs(this.dragStart.y - e.clientY);

      if (this.mouseDown && !this.dragging && (distX >= 2 || distY >= 2)) {
        this.dragging = true;
        this.selectedIconIndex = null;
      }

      if (this.dragging) {
        this.dragEnd.x = e.clientX;
        this.dragEnd.y = e.clientY;
      }
    },
    click() {
      this.contextOpen = false;
      this.selectedIconIndex = null;
    },
    contextmenu(e) {
      this.$emit("play-sound", "click");
      this.contextOpen = true;
      this.contextPosition = {
        x: e.clientX,
        y: e.clientY,
      };
    },
    select(index) {
      this.selectedIconIndex = index;
    },
  },
  computed: {
    selectedIconIndexes() {
      if (this.selectedIconIndex !== null) {
        return [this.selectedIconIndex];
      }

      let ids = [];

      if (
        this.dragStart.x > 0 ||
        this.dragStart.y > 0 ||
        this.dragEnd.x > 0 ||
        this.dragEnd.y > 0
      ) {
        for (let i = 0; i < this.icons.length; i++) {
          if (typeof this.iconRefs[i] !== "undefined") {
            let $el = this.iconRefs[i];
            // console.log($el);
            let w = $el.offsetWidth;
            let h = $el.offsetHeight;
            let x = $el.offsetLeft + w / 2;
            let y = $el.offsetTop + h / 2;

            if (
              x >= this.selectionArea.left &&
              y >= this.selectionArea.top &&
              x <= this.selectionArea.left + this.selectionArea.width &&
              y <= this.selectionArea.top + this.selectionArea.height
            ) {
              ids.push(i);
            }
          } else {
            // console.log(this.iconRefs[i]);
          }
        }
      }

      return ids;
    },
    selectionArea() {
      let left = Math.min(this.dragStart.x, this.dragEnd.x);
      let top = Math.min(this.dragStart.y, this.dragEnd.y);
      let width = Math.max(this.dragStart.x, this.dragEnd.x) - left;
      let height = Math.max(this.dragStart.y, this.dragEnd.y) - top;

      return {
        left: left,
        top: top,
        height: height,
        width: width,
      };
    },
    selectionStyle() {
      return {
        left: this.selectionArea.left + "px",
        top: this.selectionArea.top + "px",
        height: this.selectionArea.height + "px",
        width: this.selectionArea.width + "px",
      };
    },
    style() {
      return "background-image: url(" + this.backgroundImage + ")";
    },
    contextStyle() {
      return this.contextPosition
        ? {
            left: this.contextPosition.x + "px",
            top: this.contextPosition.y + "px",
          }
        : null;
    },
    actions() {
      return [
        {
          label: "Arrange Icons By",
          actions: [
            {
              label: "Nothing",
              action: () => {
                this.$emit("change-screen", "bsod");
              },
            },
          ],
        },
        {
          label: "Refresh",
          action: () => {
            window.location.reload();
          },
        },
        {
          spacer: true,
        },
        {
          label: "Paste",
          disabled() {
            return true;
          },
        },
        {
          label: "Paste Shortcut",
          disabled() {
            return true;
          },
        },
        {
          spacer: true,
        },
        {
          label: "New",
        },
        {
          spacer: true,
        },
        {
          label: "Change background",
          action: () => {
            this.backgroundImage = prompt("Image url");
          },
        },
        {
          spacer: true,
        },
        {
          label: "Properties",
        },
      ];
    },
  },
};
</script>