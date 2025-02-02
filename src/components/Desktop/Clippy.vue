<template>
  <div
    class="pointer-events-auto absolute z-50 bottom-4 w-40 right-4 flex flex-col"
  >
    <div
      @click.self="click"
      @contextmenu="$emit('close')"
      class="bg-clippy leading-tight text-sm p-2 rounded-lg border border-black shadow-lg"
    >
      <div v-html="message"></div>
      <div class="pt-4" v-if="tip.options">
        <div
          class="flex items-start pl-1 mb-2 cursor-pointer group hover:underline"
          v-for="option in tip.options"
          :key="option.label"
          @click="clickOption(option)"
        >
          <div
            class="mt-1 w-3 h-3 flex-shrink-0 bg-blue-800 group-hover:bg-blue-500 rounded-full"
          ></div>
          <div class="pl-2">{{ option.label }}</div>
        </div>
      </div>
    </div>
    <div class="flex justify-start pl-8 -mt-0.5">
      <div
        class="bg-clippy w-4 h-4 shadow-lg"
        style="clip-path: polygon(100% 0, 0 0, 100% 100%)"
      ></div>
    </div>
    <img
      @click="click"
      src="https://i.imgur.com/PqqFsgA.gif"
      data-src="https://i.imgur.com/uGnqmEa.png"
      class="block ml-12"
      alt=""
    />
  </div>
</template>

<script>
export default {
  props: {
    tip: {
      type: Object,
      required: true,
    },
  },
  computed: {
    message() {
      return this.tip.message.replace(/\n/g, "<br /><br />");
    },
  },
  methods: {
    clickOption(option) {
      if (option.mailId) {
        this.$emit("receive-mail", option.mailId);
      }

      if (option.tipId) {
        this.$emit("change-tip", option.tipId);
      } else if (option.screenId) {
        this.$emit("change-screen", option.screenId);
      } else if (option.callback) {
        this.$emit.call(...option.callback());
      } else {
        this.$emit("close");
      }
    },
    click() {
      if (!this.tip.options) {
        this.$emit("close");
      }
    },
  },
};
</script>