<template>
  <div class="flex-1 flex flex-col overflow-hidden">
    <div
      v-if="contact.status === 'away' || contact.status === 'offline'"
      class="bg-balloon text-sm p-1 flex items-center"
    >
      <svg
        class="w-5 h-5 text-blue-800"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <div class="pl-1">
        {{ character.name }} may not reply because their status is currently set
        to {{ contact.status }}.
      </div>
    </div>
    <div class="flex-1 flex bg-blue-100 overflow-hidden">
      <div class="flex-1 bg-blue-700 p-1.5 flex flex-col">
        <!-- <div class="mb-1 text-white opacity-75 font-bold text-sm">
        To: {{ contact.character.name }}
      </div> -->
        <transition-group
          name="fade"
          tag="div"
          class="bg-white rounded-t mb-1.5 p-2 flex-1 flex flex-col overflow-auto gap-y-2"
          ref="chat"
        >
          <div
            v-for="message in messages"
            :key="message.id"
            class="flex"
            :class="message.sent ? 'flex-row-reverse' : ''"
          >
            <div
              class="px-3 py-2.5 rounded-lg leading-normal"
              :class="
                message.sent ? 'bg-cream ml-16' : 'bg-blue-600 text-white mr-16'
              "
            >
              {{ message.message }}
            </div>
          </div>
        </transition-group>
        <div class="bg-white rounded-b flex p-2 gap-x-2">
          <textarea
            v-model="userMessage"
            class="h-20 w-4/5 focus:outline-none"
          ></textarea>
          <div class="w-1/5 flex">
            <button
              class="flex items-center justify-center w-full bg-cream border border-gray-300 rounded"
              :class="userMessage.length > 0 ? '' : 'text-gray-400'"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <!-- <div class="w-1/3">sidebar</div> -->
    </div>
  </div>
</template>

<script>
import characters from "../../../../data/characters";
import messages from "../../../../data/messages";

export default {
  data: () => ({
    userMessage: "",
    characters: characters,
  }),
  props: {
    characterId: {
      type: String,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  watch: {
    messages() {
      this.scrollToBottom();
    },
  },
  mounted() {
    // this.$nextTick(() => this.scrollToBottom());
  },
  methods: {
    scrollToBottom() {
      let chat = this.$refs.chat;
      console.log({ chat });
      this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
    },
  },
  computed: {
    messages() {
      return messages.filter(
        (message) => message.characterId === this.characterId
      );
    },
    contact() {
      return this.user.contacts.find(
        (contact) => contact.characterId === this.characterId
      );
    },
    character() {
      return characters.find(
        (character) => character.id === this.contact.characterId
      );
    },
  },
};
</script>