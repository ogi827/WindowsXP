<template>
  <div class="flex-1 flex flex-col bg-blue-700">
    <div class="h-20 w-full"></div>
    <div
      class="bg-gradient-to-br from-blue-300 to-blue-500 flex-1 border-t-2 border-b-2 border-white flex flex-col lg:flex-row items-center justify-center"
    >
      <transition name="fade-slow" appear>
        <div
          class="w-1/2 py-8 lg:px-8 lg:py-0 flex flex-col lg:items-end justify-center border-b lg:border-r lg:border-b-0 border-white"
        >
          <div class="flex justify-center lg:justify-end">
            <img
              src="https://i.imgur.com/ekggMI8.png"
              class="h-32 2xl:h-48 block"
              alt=""
            />
          </div>
          <div
            class="text-center lg:text-right text-white pt-4 pr-4 leading-normal text-shadow text-sm lg:text-lg"
          >
            To begin, click your name or create a profile
          </div>
        </div>
      </transition>
      <transition name="fade-slow" appear>
        <div
          class="w-1/2 py-8 lg:px-8 lg:py-0 flex flex-col lg:items-start gap-y-2 lg:gap-y-4 justify-center"
        >
          <div
            v-for="user in state.profiles"
            :key="user.name"
            class="flex items-center p-2 cursor-pointer rounded border-t-2 border-transparent hover:bg-blue-600 hover:border-blue-700"
            @click="login(user)"
          >
            <div
              class="border border-white rounded w-12 h-12 lg:w-16 lg:h-16 flex-shrink-0 shadow-lg border border-white shadow-lg"
            >
              <img
                class="block rounded object-cover pixelated w-full h-full"
                :src="'profiles/' + user.avatar + '.png'"
                alt=""
              />
            </div>
            <div class="text-white px-3 lg:px-4">
              <div class="text-xl mb-0.5">
                {{ user.name }}
              </div>
              <div v-if="loggingIn" class="font-bold text-sm text-blue-800">
                Loading your personal settings...
              </div>
            </div>
          </div>
          <div
            v-if="!loggingIn"
            class="flex items-center p-2 cursor-pointer rounded border-t-2 border-transparent hover:bg-blue-600 hover:border-blue-700"
            @click="newUser"
          >
            <div
              class="border border-white text-white rounded w-12 h-12 bg-green-500 lg:w-16 lg:h-16 shadow-lg border border-white shadow-lg flex items-center justify-center"
            >
              <svg
                class="w-8 h-8"
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
            <div class="px-3 text-white lg:text-xl lg:px-4">New Profile</div>
          </div>
        </div>
      </transition>
    </div>

    <div class="h-20 w-full px-8 flex items-center justify-between">
      <transition name="fade-slow" appear
        ><turn-off-button @shutdown="$emit('shutdown')" />
      </transition>
    </div>
  </div>
</template>

<script>
import TurnOffButton from "../UI/TurnOffButton";

export default {
  components: {
    TurnOffButton,
  },
  props: {
    state: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    loggingIn: false,
  }),
  methods: {
    login(user) {
      this.$emit("play-sound", "logon");

      this.loggingIn = true;

      setTimeout(() => this.$emit("login", user.name), 1000);
    },
    newUser() {
      this.$emit("change-screen", "new-user");
    },
  },
};
</script>