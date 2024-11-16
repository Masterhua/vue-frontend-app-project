<template>
  <!-- 排名、金、银、铜的标题 -->
  <div class="ranking-header">
    <span>Rank</span>
    <span>Country</span>
    <span>Gold</span>
    <span>Silver</span>
    <span>Bronze</span>
  </div>

  <div class="ranking-list">
    <!-- 排行榜内容 -->
    <ul>
      <li v-for="country in countries" :key="country.noc" @click="onCountryClick(country.noc)">
        <span>{{ country.rank }}</span>
        <!-- 国旗和国家名称绑定在一起 -->
        <span class="country-column">
          <img :src="country.flagUrl" alt="Flag" />
          <span>{{ country.noc }}</span>
        </span>
        <span>{{ country.gold }}</span>
        <span>{{ country.silver }}</span>
        <span>{{ country.bronze }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RankingList',
  props: {
    countries: {
      type: Array,
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

.ranking-header {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr 1fr;  /* 增加 Country 列的宽度比例为 4fr */
  font-weight: bold;
  margin-bottom: 10px;
  padding: 12px 0;
  border-bottom: 2px solid #ddd;
  background-color: #f8f8f8;
  text-align: center;
}

.ranking-header span {
  padding: 0 10px;
}

.ranking-list ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.ranking-list li {
  width: 400px;
  display: grid;
  grid-template-columns: 1.5fr 2.5fr 1fr 1fr 1fr;  /* 使 Country 列更宽，比例设置为 4fr */
  align-items: center;
  margin: 0;
  padding: 10px 0;
  cursor: pointer;
  text-align: left;
}

.ranking-list li:hover {
  background-color: #f0f0f0;
}

.ranking-list img {
  width: 35px;
  height: 25px;
  margin-right: 10px;
}

.ranking-list span {
  margin-left: 5px;
  padding: 0 8px;
}
</style>
