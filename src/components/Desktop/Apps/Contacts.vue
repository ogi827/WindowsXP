<template>
  <div class="w-full h-full flex flex-col">
    <toolbar :menus="toolbar" />
    <div class="flex flex-1 overflow-hidden">
      <div class="bg-indigo-400 p-4 flex flex-col gap-y-4 overflow-auto">
        <div
          v-for="(group, letter) in groupedContacts"
          :key="letter"
          class="bg-white rounded"
        >
          <div class="px-2 py-1.5 text-blue-600 font-bold">
            {{ letter }}
          </div>
          <div
            class="border shadow-inner border-white bg-indigo-100 p-2 flex flex-col gap-y-1"
          >
            <div
              v-for="(contact, i) in group"
              :key="contact.name"
              @click="selectedContactIndex = i"
              class="leading-normal text-sm text-blue-600 hover:text-blue-800 cursor-pointer flex items-center"
            >
              <div
                class="w-6 h-6 flex-shrink-0 border border-white rounded shadow"
              >
                <img
                  :src="contact.character.avatar"
                  class="block rounded"
                  alt=""
                />
              </div>
              <div
                class="pl-2 whitespace-nowrap"
                :class="selectedContactIndex === i ? 'underline' : ''"
              >
                {{ contact.character.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="selectedContact" class="flex-1 flex flex-col overflow-auto">
        <div class="bg-gradient-to-br from-indigo-500 to-cream px-4 py-2">
          <div class="flex items-center">
            <div class="w-12 h-12 flex-shrink-0">
              <img
                :src="selectedContact.character.avatar"
                class="block rounded border border-white shadow"
                alt=""
              />
            </div>
            <div class="pl-3">
              <div
                class="text-xl font-heading text-white leading-none tracking-wide text-shadow-lg"
              >
                {{ selectedContact.character.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1 bg-cream p-2">
          <tabs :tabs="['Recent Messages', 'two']">
            <template v-slot:tab-0>one?</template>
            <template v-slot:tab-1>two!</template>
          </tabs>
        </div>
      </div>
      <div v-else class="flex-1 flex items-center justify-center text-gray-400">
        Select a contact
      </div>
    </div>
  </div>
</template>

<script>
import characters from "../../../data/characters";
import Tabs from "../../UI/Tabs";
import Toolbar from "../../Window/Toolbar";

export default {
  components: {
    Tabs,
    Toolbar,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    groupedContacts() {
      let groups = {};

      for (let i = 0; i < this.contacts.length; i++) {
        let contact = this.contacts[i];
        let letter = contact.character.name.substring(0, 1);

        if (!groups[letter]) {
          groups[letter] = [];
        }

        groups[letter].push(contact);
      }

      return Object.keys(groups)
        .sort()
        .reduce(function (result, key) {
          result[key] = groups[key];
          return result;
        }, {});
    },
    selectedContact() {
      return this.selectedContactIndex !== null
        ? this.contacts[this.selectedContactIndex]
        : null;
    },
    contacts() {
      return this.user.contacts.map((contact) => ({
        ...contact,
        character: characters.find(
          (character) => character.id === contact.characterId
        ),
      }));
    },
  },
  data: () => ({
    selectedContactIndex: null,
    toolbar: [
      {
        label: "File",
        actions: [
          {
            label: "Open",
          },
          {
            label: "Print",
          },
        ],
      },
      {
        label: "Contacts",
        actions: [
          {
            label: "Test",
          },
        ],
      },
      {
        label: "Actions",
        actions: [
          {
            label: "Test",
          },
        ],
      },
      {
        label: "Tools",
        actions: [
          {
            label: "Test",
          },
        ],
      },
      {
        label: "Help",
        actions: [
          {
            label: "Test",
          },
        ],
      },
    ],
  }),
};
</script>