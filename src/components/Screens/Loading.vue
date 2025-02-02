<template>
  <div class="flex-1 flex flex-col bg-black text-white">
    <transition-group name="fade-slow" class="flex-1 flex flex-col">
      <div
        v-if="show"
        key="1"
        class="flex-1 flex flex-col items-center justify-center"
      >
        <div>
          <img
            src="https://i.imgur.com/ekggMI8.png"
            class="h-48 lg:h-64 block"
            alt=""
          />
        </div>
        <div class="pt-8">
          <img
            src="https://media.tenor.com/images/a9c7f93d8a6efd52ffb460f837464a11/tenor.gif"
            class="w-48 block"
            alt=""
          />
        </div>
      </div>
      <div v-if="show" key="2" class="flex items-center justify-between p-8">
        <div>Copyright &copy; Microsoft Corporation</div>
        <div>
          <img
            src="https://i.imgur.com/AJRCram.png"
            class="block w-28"
            alt=""
          />
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  data: () => ({
    logoTimer: "",
    show: false,
  }),
  mounted() {
    setTimeout(() => (this.show = true), 1000);
    setTimeout(() => (this.show = false), 4000);
    setTimeout(() => this.$emit("change-screen", "login"), 6000);
  },
  beforeDestroy() {
    this.$emit("play-sound", "startup");
  },
};
</script>