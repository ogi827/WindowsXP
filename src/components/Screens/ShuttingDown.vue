<template>
  <div class="flex-1 flex flex-col bg-blue-700 py-20">
    <div
      class="bg-gradient-to-br from-blue-300 to-blue-500 flex-1 border-t-2 border-b-2 border-white p-16 flex items-center justify-center"
    >
      <div class="flex flex-col items-end">
        <img
          src="https://i.imgur.com/ekggMI8.png"
          class="h-24 lg:h-48 block mb-2"
          alt=""
        />
        <div class="text-white whitespace-nowrap lg:text-lg">
          Windows is shutting down...
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  mounted() {
    this.$emit("play-sound", "shutdown");
    setTimeout(() => this.$emit("change-screen", "power"), 2000);
  },
};
</script>