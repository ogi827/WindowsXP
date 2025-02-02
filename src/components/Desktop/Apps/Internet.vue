<template>
  <div v-if="currentWebsite" class="flex-1 flex flex-col overflow-hidden">
    <toolbar v-if="!currentWebsite.spam" :menus="toolbar" />
    <div
      v-if="!currentWebsite.spam"
      class="bg-cream border-b border-gray-300 flex px-1.5 gap-x-1"
    >
      <toolbar-button label="Back" @click="back">
        <icon-button :color="history.length > 0 ? 'green' : 'gray'"
          ><svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            ></path></svg
        ></icon-button>
      </toolbar-button>
      <toolbar-button>
        <icon-button color="gray">
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </icon-button>
      </toolbar-button>
      <toolbar-button
        label="Bookmarks"
        :toggled="showBookmarks"
        @click="showBookmarks = !showBookmarks"
      >
        <icon-button color="yellow">
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            ></path>
          </svg>
        </icon-button>
      </toolbar-button>
    </div>
    <div
      v-if="!currentWebsite.spam"
      class="bg-cream px-1.5 flex items-center border-b border-gray-300"
    >
      <div class="pr-1.5 text-gray-500">Address</div>
      <select
        class="flex-1 px-2 py-1 border border-gray-300 focus:outline-none"
        v-model="website"
      >
        <option
          v-for="site in websites"
          :key="site.address"
          :value="site.address"
        >
          {{ site.address }}
        </option>
      </select>
    </div>
    <div class="flex-1 flex">
      <div
        v-if="showBookmarks"
        class="w-1/4 bg-cream border-r border-gray-400 flex flex-col"
      >
        <div class="p-1.5 flex items-center justify-between">
          <div>Bookmarks</div>
          <div class="">
            <svg
              class="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
        <div class="flex-1 bg-white mr-1 border-t border-gray-400">
          <div
            v-for="(bookmark, i) in bookmarks"
            :key="i"
            class="p-1.5 cursor-pointer whitespace-nowrap hover:underline"
            @click="
              website = bookmark.address;
              showBookmarks = false;
            "
          >
            {{ bookmark.address }}
          </div>
        </div>
      </div>
      <div class="flex-1 overflow-auto">
        <component
          :is="currentWebsite.id"
          @visit="website = $event"
          :user="user"
          :website="currentWebsite"
          v-on="{ ...api, ...windowApi }"
          v-bind="{ api, windowApi }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import websites from "../../../data/websites";

import Ad from "./Internet/Ad";
import Google from "./Internet/Google";

import IconButton from "../../Desktop/IconButton";
import Toolbar from "../../Window/Toolbar";
import ToolbarButton from "../../Window/ToolbarButton";

export default {
  components: {
    Ad,
    Google,

    IconButton,
    Toolbar,
    ToolbarButton,
  },
  props: {
    window: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
    address: {
      type: String,
    },
    api: {
      type: Object,
      required: true,
    },
    windowApi: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.website = this.address ? this.address : "google.com";
  },
  watch: {
    currentWebsite(website, old) {
      this.$emit("set-title", {
        windowId: this.window.id,
        title: website.name,
      });

      if (!this.isGoingBack && old) {
        this.history.push(old.address);
      }

      this.isGoingBack = false;
    },
  },
  methods: {
    back() {
      if (this.history.length > 0) {
        this.isGoingBack = true;
        this.website = this.history.pop();
      }
    },
  },
  computed: {
    currentWebsite() {
      return websites.find((website) => website.address === this.website);
    },
    bookmarks() {
      return this.user.bookmarks.map((bookmark) =>
        websites.find((website) => website.id === bookmark)
      );
    },
  },
  data: () => ({
    website: "",
    websites: websites,
    history: [],
    showBookmarks: false,
    isGoingBack: false,
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