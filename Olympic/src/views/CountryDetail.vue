<template>
  <div>
    <div class="country-info bg-blue-500 shadow-lg p-4 rounded-lg mb-5 max-w-2xl mx-auto sm:relative sm:left-0">
      <div class="flag-container">
        <img v-if="country?.flagUrl" :src="country?.flagUrl" alt="Country Flag" class="w-12 h-8 object-cover" />
      <h1 class="text-xl font-bold text-center">{{ country?.enLongDescription }} ({{ country?.noc }})</h1>
      
    </div>
      <p class="text-center">Rank: {{ country.rank }}</p>
  </div>

    <div v-if="country" class="competition-info bg-white shadow-lg p-4 rounded-lg mb-5 max-w-2xl mx-auto sm:relative sm:left-0 sm:top-1/3">
      <div class="medal-info mb-5">
        <h2 class="text-lg font-bold">Medal Summary</h2>
        <ul class="list-none p-0">
          <li class="mb-2">
            <div class="medal-container">
              <img src="../picture/gold.gif" alt="Gold Medal" class="medal-icon" />
              <span class="medal-text">Gold: {{ country.gold }}</span>
            </div>
          </li>
          <li class="mb-2">
            <div class="medal-container">
              <img src="../picture/silver.gif" alt="Silver Medal" class="medal-icon" />
              <span class="medal-text">Silver: {{ country.silver }}</span>
            </div>
          </li>
          <li class="mb-2">
            <div class="medal-container">
              <img src="../picture/bronze.gif" alt="Bronze Medal" class="medal-icon" />
              <span class="medal-text">Bronze: {{ country.bronze }}</span>
            </div>
          </li>
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

    <div class="sport-list bg-white shadow-lg p-4 rounded-lg mb-5 max-w-2xl mx-auto sm:relative sm:right-0 sm:top-1/3 sm:w-2/5">
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
    country(): Country | undefined {
      return countries.find((country) => country.noc === this.noc);
    },
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
.flag-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
}

.medal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.medal-icon {
  margin-right: 8px;
}

.medal-text {
  text-align: center;
}
</style>
