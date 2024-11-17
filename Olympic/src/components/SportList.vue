<template>
  <div class="sport-list-container p-5">
    <h2 class="text-2xl font-bold mb-4">Sports</h2>
    <ul class="sport-list list-none p-0 m-0">
      <li
        v-for="sport in disciplines"
        :key="sport.name"
        @click="onSportClick(sport.name)"
        class="flex justify-between items-center p-4 mb-4 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 transition"
      >
        <span class="sport-name text-lg font-medium">{{ sport.name }}</span>
        <span class="medal-summary text-sm flex gap-4">
          <span class="text-gray-600">Gold: {{ sport.gold }}</span>
          <span class="text-gray-600">Silver: {{ sport.silver }}</span>
          <span class="text-gray-600">Bronze: {{ sport.bronze }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router';

interface Discipline {
  name: string;
  gold: number;
  silver: number;
  bronze: number;
}

export default defineComponent({
  name: 'SportList',
  props: {
    disciplines: {
      type: Array as PropType<Discipline[]>,
      required: true,
    },
    noc: {
      type: String,
      required: true,
    },
  },
  methods: {
    onSportClick(sportName: string) {
      this.$router.push({ name: 'sport-detail', params: { noc: this.noc, sportName } });
    },
  },
});
</script>