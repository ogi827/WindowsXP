<template>
  <div class="flex-1 flex flex-col bg-blue-700 py-20">
    <div
      class="bg-gradient-to-br from-blue-300 to-blue-500 flex-1 border-t-2 border-b-2 border-white p-16 flex items-center justify-center"
    >
      <transition-group
        name="fade-slow"
        tag="div"
        class="flex flex-col items-center"
      >
        <div v-if="show" key="0" class="mb-8 text-white text-3xl">Welcome</div>
        <div v-if="show" key="1" class="flex items-center gap-x-8 mb-8">
          <div
            class="bg-white p-1 shadow rounded-full cursor-pointer"
            @click="prev"
          >
            <svg
              class="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </div>
          <div class="border border-white w-24 h-24 rounded">
            <img
              :src="profilePicture"
              class="block rounded object-cover pixelated w-full h-full"
              alt=""
            />
          </div>
          <div
            class="bg-white p-1 shadow rounded-full cursor-pointer"
            @click="next"
          >
            <svg
              class="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </div>
        </div>
        <div v-if="show" key="2" class="flex gap-x-4">
          <input
            type="text"
            autofocus
            v-model="name"
            class="p-2 w-48 rounded focus:outline-none"
            placeholder="Type your name..."
            @keyup.enter="go"
          />
          <button
            :disabled="name.length < 1"
            @click="go"
            class="w-10 h-10 border border-white rounded flex items-center justify-center"
            :class="
              name.length > 0
                ? 'bg-green-400 text-white'
                : 'bg-green-600 text-gray-300'
            "
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </button>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import data from "../../data";

export default {
  data: () => ({
    show: false,
    name: "",
    selectedIndex: Math.floor(Math.random() * data.profilePictures.length),
  }),
  computed: {
    profilePicture() {
      return "profiles/" + data.profilePictures[this.selectedIndex] + ".png";
    },
  },
  methods: {
    go() {
      if (this.name.length > 0) {
        this.$emit("add-profile", {
          name: this.name,
          avatar: data.profilePictures[this.selectedIndex],
        });

        this.$emit("play-sound", "logon");
        this.show = false;

        setTimeout(() => this.$emit("login", this.name), 1000);
      }
    },
    prev() {
      if (this.selectedIndex - 1 < 0) {
        this.selectedIndex = data.profilePictures.length - 1;
      } else {
        this.selectedIndex -= 1;
      }
    },
    next() {
      if (this.selectedIndex + 1 >= data.profilePictures.length) {
        this.selectedIndex = 0;
      } else {
        this.selectedIndex += 1;
      }
    },
  },
  mounted() {
    setTimeout(() => (this.show = true), 1000);
  },
};
</script>