<template>
  <div
    v-hotkey="keymap"
    class="flex-1 bg-bsod p-2 text-white text-xl font-mono flex flex-col"
  >
    <div class="mb-2 text-center">
      CMOS Setup Utility - Copyright (C) 1984-1999 Award Software
    </div>
    <div class="border border-white p-0.5 flex-1 flex flex-col">
      <div class="border-t border-b border-white flex flex-1">
        <ul
          v-for="(column, i) in columns"
          :key="i"
          class="p-8 w-1/2 flex flex-col items-start gap-y-8 border-l border-r border-white"
        >
          <bios-option
            v-for="(option, j) in column"
            :key="option.label"
            :option="option"
            :selected="selectedColumn === i && selectedIndex === j"
          />
        </ul>
      </div>
      <div class="border-l border-r border-b px-6 py-4 flex">
        <div class="w-1/2">
          <div class="">Esc : Quit</div>
          <div class="">F10 : Save &amp; Exit Setup</div>
        </div>
        <div class="w-1/2 pl-4">
          &uarr; &darr; &rarr; &larr; &nbsp; : Select Item
        </div>
      </div>
      <div class="border-l border-r border-b py-8 text-center text-yellow-200">
        {{ selectedItem.description }}
      </div>
    </div>
    <bios-modal v-if="showSave" :keymap="saveKeymap"
      >SAVE to CMOS and EXIT (Y/N)? Y&nbsp;</bios-modal
    >
  </div>
</template>

<script>
import BiosModal from "../Bios/BiosModal";
import BiosOption from "../Bios/BiosOption";

export default {
  components: {
    BiosModal,
    BiosOption,
  },
  data: () => ({
    selectedColumn: 0,
    selectedIndex: 0,
    showSave: false,
    columns: [
      [
        {
          label: "Standard CMOS Features",
          description:
            "Lorem 1 ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          label: "Advanced BIOS Features",
          description:
            "Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          label: "Advanced Chipset Features",
          description:
            "Lorem 3 ipsum dolor sit amet, consectetur adipiscing elit.",
        },
      ],
      [
        {
          label: "Frequency/Voltage Control",
          description:
            "Lorem 4 ipsum dolor sit amet, consectetur adipiscing elit.",
        },
      ],
    ],
  }),
  methods: {
    moveLeft() {
      this.selectedColumn =
        this.selectedColumn - 1 >= 0
          ? this.selectedColumn - 1
          : this.selectedColumn;

      this.fixIndex();
    },
    moveRight() {
      this.selectedColumn =
        this.selectedColumn + 1 <= 1
          ? this.selectedColumn + 1
          : this.selectedColumn;

      this.fixIndex();
    },
    moveUp() {
      this.selectedIndex =
        this.selectedIndex - 1 >= 0
          ? this.selectedIndex - 1
          : this.selectedIndex;
    },
    moveDown() {
      this.selectedIndex =
        this.selectedIndex + 1 < this.columns[this.selectedColumn].length
          ? this.selectedIndex + 1
          : this.selectedIndex;
    },
    fixIndex() {
      if (typeof selectedItem === "undefined") {
        this.selectedIndex = 0;
      }
    },
    reboot() {
      this.$emit("change-screen", "post");
    },
  },
  computed: {
    selectedItem() {
      return this.columns[this.selectedColumn][this.selectedIndex];
    },
    keymap() {
      return {
        esc: () => (this.showSave = true),
        f10: () => (this.showSave = true),
        left: () => this.moveLeft(),
        right: () => this.moveRight(),
        up: () => this.moveUp(),
        down: () => this.moveDown(),
      };
    },
    saveKeymap() {
      return {
        enter: () => this.reboot(),
        y: () => this.reboot(),
        esc: () => (this.showSave = false),
        n: () => (this.showSave = false),
      };
    },
  },
};
</script>