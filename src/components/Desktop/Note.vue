<template>
  <div
    class="bg-note pointer-events-auto shadow-lg absolute transform rotate-6"
    :style="style"
  >
    <div
      class="bg-note w-48 h-48 lg:w-64 lg:h-64 overflow-auto shadow-lg transform -translate-x-1 -translate-y-1 -rotate-6"
    >
      <div class="font-serif italic leading-normal text-sm p-4 lg:text-lg">
        Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nulla
        vitae elit libero, a pharetra augue. Duis mollis, est non commodo
        luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
        Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
        vestibulum.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    style() {
      return {
        right: 20 + "px",
        top: 20 + "px",
      };
    },
  },
};
</script>