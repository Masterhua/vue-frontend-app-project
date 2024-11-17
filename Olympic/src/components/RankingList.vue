<template>
  <div class="grid grid-cols-5 font-bold mb-2 py-3 px-0 border-b-2 border-gray-300 bg-gray-100 text-center">
    <span>Rank</span>
    <span>Country</span>
    <span>Gold</span>
    <span>Silver</span>
    <span>Bronze</span>
  </div>

  <div class="ranking-list">
    <ul>
      <li v-for="country in countries" :key="country.noc" @click="onCountryClick(country.noc)" class="grid grid-cols-5 items-center py-2 px-0 cursor-pointer hover:bg-gray-50">
        <span class="text-left">{{ country.rank }}</span>
        <span class="flex items-center text-left">
          <img :src="country.flagUrl" alt="Flag" class="w-8 h-6 mr-2" />
          <span>{{ country.noc }}</span>
        </span>
        <span class="text-center">{{ country.gold }}</span>
        <span class="text-center">{{ country.silver }}</span>
        <span class="text-center">{{ country.bronze }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Country {
  noc: string;
  rank: number;
  gold: number;
  silver: number;
  bronze: number;
  flagUrl: string;
}

export default defineComponent({
  name: 'RankingList',
  props: {
    countries: {
      type: Array as () => Country[],
      required: true,
    },
  },
  emits: ['country-click'],
  methods: {
    onCountryClick(noc: string) {
      this.$emit('country-click', noc);
    },
  },
});
</script>

<style scoped>
.ranking-list {
  text-align: left;
  margin: 0 auto;
}
</style>
