<template>
  <div class="border-t border-black py-2 group flex items-center">
    <div class="w-28 h-28 flex-shrink-0 mr-4">
      <img
        :src="item.image"
        class="block object-contain w-full h-full"
        alt=""
      />
    </div>
    <div class="mb-2 leading-normal flex-1">
      <div class="mb-2">{{ item.name }}</div>
      <div v-if="item.features" class="text-sm">
        <div v-for="feature in item.features">
          <span>{{ feature.label }}:</span>
          <span class="text-gray-500"> {{ feature.value }}</span>
        </div>
      </div>
    </div>
    <div class="">
      <div class="mb-2 flex items-center justify-center gap-x-2">
        <div class="cursor-pointer" @click="minus">
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <div class="text-2xl">{{ quantity }}</div>
        <div class="cursor-pointer" @click="plus">
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
      </div>
      <div
        @click="buy"
        class="opacity-50 cursor-pointer group-hover:opacity-100 bg-green-500 hover:bg-green-600 text-white text-center p-2"
      >
        Buy ${{ price }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    quantity: 1,
  }),
  methods: {
    buy() {
      this.$emit("buy-product", {
        productId: this.item.id,
        quantity: this.quantity,
      });

      this.quantity = 1;
    },
    plus() {
      if (this.price + this.item.price * (this.quantity + 1)) {
        this.quantity += 1;
      }
    },
    minus() {
      this.quantity = this.quantity - 1 < 1 ? 1 : this.quantity - 1;
    },
  },
  computed: {
    price() {
      return this.item.price * this.quantity;
    },
  },
};
</script>