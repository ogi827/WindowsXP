<template>
  <div
    v-hotkey="keymap"
    class="flex-1 bg-black p-8 text-white font-mono lg:text-lg text-center lg:text-left flex flex-col"
  >
    <div class="flex flex-col lg:flex-row-reverse lg:justify-between">
      <div class="lg:ml-4 mb-8 flex justify-center lg:justify-end">
        <img
          src="https://i.imgur.com/aurgcgl.png"
          class="block h-24 lg:h-32"
          alt=""
        />
      </div>
      <div class="">
        <div v-if="step >= 1">
          Award Medallion BIOS v6.0, An Energy Star Ally
        </div>
        <div v-if="step >= 1">
          Copyright (C) 1984-2001, Award Software, Inc.
        </div>
        <div v-if="step >= 1">&nbsp;</div>
        <div v-if="step >= 2">
          ASUS P4T533-C ACPI BIOS Revision 1007 Beta 001
        </div>
        <div v-if="step >= 2">&nbsp;</div>
        <div v-if="step >= 3">Intel(R) Pentium(R) 4 2800 MHz Processor</div>
        <div v-if="step >= 3">Memory Test : &nbsp;&nbsp;&nbsp;262144K OK</div>
      </div>
    </div>

    <div class="flex-1">
      <div v-if="step >= 4">&nbsp;</div>
      <div v-if="step >= 4">Award Plug and Play BIOS Extension v1.0A</div>
      <div v-if="step >= 4">Initializing Plug and Play Cards...</div>
      <div v-if="step >= 5">PNP Init Completed</div>
      <div v-if="step >= 5">&nbsp;</div>
      <div v-if="step >= 6">
        Detecting Primary Master &nbsp;... MAXTOR 6L840J2
      </div>
      <div v-if="step >= 6">
        Detecting Primary Slave &nbsp;&nbsp;... ASUS CD-S520/A
      </div>
      <div v-if="step >= 7">Detecting Secondary Master... Skip</div>
      <div v-if="step >= 7">Detecting Secondary Slave ... None</div>
    </div>
    <div v-if="shouldLoadBios">Entering SETUP...</div>
    <div v-else>
      Press
      <span @click="openBios" class="cursor-pointer font-bold">DEL</span> to
      enter SETUP
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    step: 0,
    stepTimer: "",
    shouldLoadBios: false,
  }),
  mounted() {
    this.stepTimer = setInterval(this.nextStep, 200);

    this.$emit("play-sound", "post");
    setTimeout(() => this.$emit("play-sound", "fdd"), 1000);
  },
  beforeDestroy() {
    clearInterval(this.stepTimer);
  },
  methods: {
    nextStep() {
      if (Math.random() > 0.75) {
        this.step += 1;

        if (this.step >= 8) {
          this.continue();
        }
      }
    },
    openBios() {
      if (!this.shouldLoadBios) {
        this.shouldLoadBios = true;
        this.$emit("play-sound", "post");
      }
    },
    continue() {
      this.$emit("change-screen", this.shouldLoadBios ? "bios" : "loading");
    },
  },
  computed: {
    keymap() {
      return {
        f12: () => this.openBios(),
        del: () => this.openBios(),
        esc: () => this.openBios(),
        backspace: () => this.openBios(),
      };
    },
  },
};
</script>