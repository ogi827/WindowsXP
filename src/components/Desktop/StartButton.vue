<template>
  <div
    class="cursor-pointer"
    v-click-away="clickAway"
    @click="$emit('toggle')"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <img :src="buttonSrc" class="block" alt="" />
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
    },
  },
  data: () => ({
    hovered: false,
  }),
  methods: {
    clickAway(e) {
      this.$emit("close");
    },
  },
  computed: {
    buttonSrc() {
      return this.open
        ? "https://i.imgur.com/86x2M1f.png"
        : this.hovered
        ? "https://i.imgur.com/Fn37Urk.png"
        : "https://i.imgur.com/7aAYVFQ.png";
    },
  },
};
</script>