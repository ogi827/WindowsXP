<template>
  <div class="w-full h-full flex flex-col">
    <textarea
      disabled
      class="w-full bg-black flex-1 text-white font-mono p-1 leading-normal focus:outline-none"
      v-model="output"
      @click="focus"
    ></textarea>
    <textarea
      ref="inputArea"
      class="w-full bg-black text-white font-mono p-1 leading-normal focus:outline-none"
      v-model="input"
      @keypress.enter="enter"
    ></textarea>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    input: "",
    output: "",
  }),
  mounted() {
    this.input = this.prompt;
  },
  methods: {
    focus() {
      this.$refs.inputArea.focus();
    },
    enter(e) {
      e.preventDefault();

      let command = this.input.replace(this.prompt, "");

      this.output += command;
      console.log(command);

      this.input = this.prompt;
    },
  },
  computed: {
    prompt() {
      return "C:\\Users\\" + this.user.name + ">";
    },
  },
};
</script>