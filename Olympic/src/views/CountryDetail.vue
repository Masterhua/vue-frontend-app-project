<template>
  <div>
    <div class="country-info bg-white shadow-lg p-4 rounded-lg mb-5 max-w-2xl absolute left-1/5">
      <img v-if="country?.flagUrl" :src="country?.flagUrl" alt="Country Flag" class="w-12 h-8 object-cover" />
      <h1 class="text-xl font-bold">{{ country?.enLongDescription }} ({{ country?.noc }})</h1>
    </div>

    <div v-if="country" class="competition-info bg-white shadow-lg p-4 rounded-lg mb-5 max-w-2xl absolute left-1/5 top-1/3">
      <div class="medal-info mb-5">
        <h2 class="text-lg font-bold">Medal Summary</h2>
        <p>Rank: {{ country.rank }}</p>
        <ul class="list-none p-0">
          <li>Gold: {{ country.gold }}</li>
          <li>Silver: {{ country.silver }}</li>
          <li>Bronze: {{ country.bronze }}</li>
          <li>Total: {{ country.total }}</li>
        </ul>
      </div>
      <div class="rank-info">
        <h2 class="text-lg font-bold">Other Ranking Info</h2>
        <p>Sort Rank: {{ country.sortRank }}</p>
        <p>Total Rank: {{ country.rankTotal }}</p>
        <p>Sort Total Rank: {{ country.sortTotalRank }}</p>
      </div>
    </div>

    <div v-else>
      <p>Country not found or loading...</p>
    </div>

    <div class="sport-list bg-white shadow-lg p-4 rounded-lg mb-5 max-w-2xl absolute right-1/5 top-1/3">
      <SportList :disciplines="countryDisciplines" :noc="noc" @sport-click="handleSportClick" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { countries } from '@/countryinfo'; // Assuming countries data is in db.ts
import sportdb from '@/sportdb.json'; // Import the full sportdb.json
import SportList from '@components/SportList.vue';

interface Country {
  noc: string;
  enLongDescription: string;
  rank: number;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
  sortRank: number;
  rankTotal: number;
  sortTotalRank: number;
  flagUrl: string;
}

export default defineComponent({
  name: 'CountryDetail',
  components: {
    SportList,
  },
  props: {
    noc: {
      type: String,
      required: true,
    },
  },
  computed: {
    // Find country by NOC
    country(): Country | undefined {
      return countries.find((country) => country.noc === this.noc);
    },
    // Get disciplines for the specific country
    countryDisciplines() {
      const countryData = sportdb.find((item) => item.noc === this.noc);
      return countryData ? countryData.disciplines : [];
    },
  },
  methods: {
    handleSportClick(sportName: string) {
      const { noc } = this.$props;
      this.$router.push({
        name: 'SportDetail',
        params: {
          noc: noc,
          sportName: sportName,
        },
      });
    },
  },
});
</script>

<style scoped>
.country-info {
  position: absolute;
  top: 10%;
  left: 20%;
  width: 30%;
}

.competition-info {
  position: absolute;
  top: 30%;
  left: 20%;
  width: 30%;
}

.sport-list {
  position: absolute;
  top: 30%;
  right: 20%;
  width: 25%;
}
</style>
