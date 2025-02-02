<template>
  <div class="flex-1 bg-blue-700 p-1.5 flex flex-col">
    <div v-if="signedIn" class="bg-white pt-2 rounded-lg flex-1 flex flex-col">
      <div class="flex items-end">
        <div class="w-10">
          <img src="https://i.imgur.com/pNkt72l.png" class="block" alt="" />
        </div>
        <div class="flex-1 flex items-end pb-2 border-b-2 border-yellow-300">
          <div class="pl-1 relative">
            <div
              @click="showStatusDropdown = !showStatusDropdown"
              class="cursor-pointer text-sm leading-none"
            >
              &#x25bc;
            </div>
            <div v-if="showStatusDropdown" class="absolute w-40">
              <context-menu :actions="[{ label: 'Test' }]"></context-menu>
            </div>
          </div>
          <div class="pl-2">
            <div class="text-gray-400 text-sm leading-none mb-1">My Status</div>
            <div class="text-lg tracking-wide leading-none">
              <span class="font-bold">{{ user.name }}</span
              ><span class="text-gray-500"> ({{ status }})</span>
            </div>
          </div>
        </div>
        <div class="border-b-2 border-red-500 w-10"></div>
        <div class="border-b-2 border-blue-600 w-10"></div>
        <div class="border-b-2 border-green-500 w-10"></div>
      </div>
      <div class="p-2 flex flex-col flex-1">
        <div class="flex items-center mb-1">
          <div class="w-4 h-4 p-0.5 shadow border rounded-full">
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 11l7-7 7 7M5 19l7-7 7 7"
              ></path>
            </svg>
          </div>
          <div class="pl-2 text-blue-800 font-bold text-sm">Online (1)</div>
        </div>
        <div class="flex-1" @click.self="selectedContactIndex = null">
          <div
            v-for="(contact, i) in contacts"
            :key="i"
            @click="selectedContactIndex = i"
            @dblclick="openChat(contact)"
            class="flex items-center pl-6 cursor-pointer"
          >
            <div
              class="flex items-center px-1"
              :class="
                selectedContactIndex === i ? 'bg-blue-700 text-white' : ''
              "
            >
              <div class="w-4 h-4">
                <img
                  v-if="contact.status === 'online'"
                  src="https://i.imgur.com/vh3gPVN.png"
                  class="block"
                  alt=""
                />
                <img
                  v-if="contact.status === 'away'"
                  src="https://i.imgur.com/riLykGs.png"
                  class="block"
                  alt=""
                />
                <img
                  v-if="contact.status === 'offline'"
                  src="https://i.imgur.com/NjLiGPv.png"
                  class="block"
                  alt=""
                />
              </div>
              <div class="ml-1 p-1">
                {{ contact.character.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="bg-white rounded flex-1 flex flex-col items-center justify-center"
    >
      <div class="mb-2 text-sm">Signing in...</div>
      <img src="https://i.imgur.com/Emd7fL9.gif" class="block h-20" alt="" />
    </div>
  </div>
</template>

<script>
import ContextMenu from "../../../UI/ContextMenu";

import characters from "../../../../data/characters";

export default {
  components: {
    ContextMenu,
  },
  props: {
    state: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
    signedIn: {
      type: Boolean,
    },
  },
  methods: {
    openChat(contact) {
      this.$emit("open-chat", contact);
    },
  },
  data: () => ({
    showStatusDropdown: false,
    selectedContactIndex: null,
    characters: characters,
    status: "Online",
  }),
  computed: {
    contacts() {
      return this.user.contacts.map((contact) => ({
        ...contact,
        character: characters.find(
          (character) => character.id === contact.characterId
        ),
      }));
    },
  },
  watch: {
    signedIn() {
      this.$emit("play-sound", "messenger_login");
    },
  },
};
</script>