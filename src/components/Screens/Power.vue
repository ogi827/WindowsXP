<template>
  <div
    v-hotkey="keymap"
    class="flex-1 text-center lg:text-left flex flex-col items-center justify-center"
  >
    <div
      class="bg-gradient-to-br from-cream to-cream-alt mb-8 p-4 rounded-lg transition transition-all duration-1000 z-50"
      :class="zooming ? 'transform scale-600' : ''"
    >
      <div class="bg-gradient-to-tl from-cream to-cream-alt p-1 rounded-lg">
        <div class="scanlines rounded-lg overflow-hidden">
          <div
            class="w-72 h-48 rounded-lg shadow-inner overflow-hidden transition transition-all duration-1000"
            :class="on ? 'bg-white' : 'bg-black'"
          ></div>
        </div>
      </div>
    </div>
    <div
      class="flex font-mono bg-cream-alt text-center p-2 rounded-lg gap-x-2 shadow-2xl"
    >
      <div class="p-4 bg-cream flex-1 rounded-lg flex flex-col items-center">
        <div class="uppercase tracking-widest mb-1 text-blue-900">Power</div>
        <div class="flex-1 flex items-center justify-center">
          <div
            class="p-1.5 rounded-full bg-gradient-to-tl from-cream to-cream-alt"
          >
            <div
              @mousedown="powerIn"
              @mouseup="powerOut"
              @mouseleave="powerDown ? powerOut() : null"
              class="w-14 h-14 relative cursor-pointer rounded-full border border-gray-400 border-opacity-50 bg-gradient-to-br from-cream to-cream-alt"
            >
              <div
                v-if="powerDown"
                class="absolute inset-0 bg-cream-alt rounded-full bg-opacity-25 shadow-inner"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-4 bg-cream flex-1 rounded-lg flex flex-col items-center">
        <div class="uppercase tracking-widest mb-1 text-blue-900">Reset</div>
        <div class="flex-1 flex items-center justify-center">
          <div
            class="p-1.5 rounded-full bg-gradient-to-tl from-cream to-cream-alt"
          >
            <div
              @mousedown="resetIn"
              @mouseup="resetOut"
              @mouseleave="resetDown ? resetOut() : null"
              class="w-10 h-10 relative cursor-pointer rounded-full border border-gray-400 border-opacity-50 bg-gradient-to-br from-cream to-cream-alt"
            >
              <div
                v-if="resetDown"
                class="absolute inset-0 bg-cream-alt rounded-full bg-opacity-25 shadow-inner"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="p-2 bg-cream flex-1 rounded-lg flex">
        <div class="px-2 py-2 flex flex-col justify-between gap-y-1">
          <div class="flex items-center">
            <div
              class="rounded-full bg-gradient-to-tl from-cream to-cream-alt p-1 border border-gray-300"
            >
              <div
                class="w-3 h-3 rounded-full shadow-inner"
                :class="on ? 'bg-green-400' : 'bg-green-700'"
              ></div>
            </div>
            <div class="pl-2 uppercase tracking-widest text-blue-900">
              Power
            </div>
          </div>
          <div class="flex items-center">
            <div
              class="rounded-full bg-gradient-to-tl from-cream to-cream-alt p-1 border border-gray-300"
            >
              <div
                class="w-3 h-3 bg-yellow-600 rounded-full shadow-inner"
              ></div>
            </div>
            <div class="pl-2 uppercase tracking-widest text-blue-900">
              Turbo
            </div>
          </div>
          <div class="flex items-center">
            <div
              class="rounded-full bg-gradient-to-tl from-cream to-cream-alt p-1 border border-gray-300"
            >
              <div
                class="w-3 h-3 rounded-full shadow-inner"
                :class="hdd ? 'bg-red-400' : 'bg-red-700'"
              ></div>
            </div>
            <div class="pl-2 uppercase tracking-widest text-blue-900">
              HDISK
            </div>
          </div>
        </div>
        <div class="ml-2 rounded-lg">
          <div class="rounded-lg overflow-hidden w-20 border shadow">
            <img src="https://i.imgur.com/UJHU24I.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div
      class="pt-4 mb-4 w-96 leading-normal text-xs opacity-50 transition transition-all duration-1000"
      :class="on ? 'text-black' : 'text-white'"
    >
      Created by
      <a href="https://burt0n.net/" target="_blank" class="underline"
        >Adam Burton</a
      >
      using
      <a href="https://tailwindcss.com/" target="_blank" class="underline"
        >Tailwind CSS</a
      >
      and
      <a href="https://vuejs.org/" target="_blank" class="underline">Vue</a>.
      All trademarks and registered trademarks are the property of their
      respective owners.
    </div>
    <!-- <div class="bg-white px-4 py-1 rounded text-gray-700">
      Press the POWER button to start.
    </div> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    on: false,
    hdd: false,
    powerDown: false,
    resetDown: false,
    hddTimer: "",
    screenTimer: "",
    zoomTimer: "",
    zooming: false,
  }),
  beforeDestroy() {
    clearInterval(this.hddTimer);
    clearTimeout(this.screenTimer);
  },
  methods: {
    powerIn() {
      this.powerDown = true;
      this.$emit("play-sound", "switch_in");

      this.on = !this.on;

      if (this.on) {
        this.$emit("play-sound", "power_on");
      } else {
        this.hdd = 0;
        this.$emit("stop-sound", "power_on");
        this.$emit("play-sound", "power_off");
        clearInterval(this.hddTimer);
        clearTimeout(this.screenTimer);
      }
    },
    powerOut() {
      this.powerDown = false;
      this.$emit("play-sound", "switch_out");

      if (this.on) {
        this.hddTimer = setInterval(this.changeHdd, 100);
        this.zoomTimer = setTimeout(() => {
          this.zooming = true;
          this.on = false;
        }, 3000);
        this.screenTimer = setTimeout(() => {
          this.$emit("change-screen", "post");
        }, 3500);
      }
    },
    resetIn() {
      this.resetDown = true;
      this.$emit("play-sound", "switch_in");
    },
    resetOut() {
      this.resetDown = false;
      this.$emit("play-sound", "switch_out");

      this.$emit("reset");
    },
    changeHdd() {
      if (Math.random() > 0.5) {
        this.hdd = !this.hdd;
      }
    },
  },
  computed: {
    keymap() {
      return {
        space: () => this.$emit("change-screen", "post"),
      };
    },
  },
};
</script>