<template>
  <div class="shadow" style="width: 600px">
    <div
      class="bg-blue-500 rounded-t border-t-2 border-blue-400 p-2 flex items-center"
    >
      <div class="w-12 h-12 border border-white rounded">
        <img
          class="block rounded object-cover pixelated w-full h-full"
          :src="'profiles/' + user.avatar + '.png'"
          alt=""
        />
      </div>
      <div class="text-white text-lg pl-3 text-shadow-lg">
        {{ user.name }}
      </div>
    </div>
    <div class="border-l-2 border-r-2 border-blue-500 flex">
      <div class="w-1/2 bg-white p-2">
        <slot name="left"></slot>
      </div>
      <div class="w-1/2 bg-blue-100 p-2 border-l-2 border-blue-200">
        <slot name="right"></slot>
      </div>
    </div>
    <div
      class="bg-blue-500 border-b-2 border-blue-600 p-2 flex items-center justify-end text-white"
    >
      <log-off-button @logout="$emit('logout')" />
      <turn-off-button @shutdown="$emit('shutdown')" />
    </div>
  </div>
</template>

<script>
import LogOffButton from "../UI/LogOffButton";
import TurnOffButton from "../UI/TurnOffButton";

export default {
  components: {
    LogOffButton,
    TurnOffButton,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>