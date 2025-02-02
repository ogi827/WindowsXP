<template>
  <section class="tabs">
    <menu class="m-0 p-0 flex items-end" role="tablist">
      <button
        role="tab"
        v-for="(tab, i) in tabs"
        :key="'tab-' + tab"
        class="bg-white border-l border-r rounded-t border-gray-400 focus:outline-none"
        :class="selectedTabIndex === i ? '-mr-px' : 'mt-1 mr-1'"
        :aria-selected="selectedTabIndex === i"
        @click="selectedTabIndex = i"
      >
        <div
          class="px-4 py-1 rounded-t"
          :class="
            selectedTabIndex === i
              ? 'border-t-2 border-yellow-500'
              : 'border-t border-b border-gray-400 py-0.5'
          "
        >
          {{ tab }}
        </div>
      </button>
    </menu>

    <article
      role="tabpanel"
      v-for="(tab, i) in tabs"
      :key="'content-' + tab"
      class="p-4 -mt-px border border-gray-400 bg-white shadow"
      :hidden="selectedTabIndex !== i"
    >
      <slot :name="'tab-' + i"> </slot>
    </article>
  </section>
</template>

<script>
export default {
  data: () => ({
    selectedTabIndex: 0,
  }),
  props: {
    tabs: {
      type: Array,
      required: true,
    },
  },
};
</script>