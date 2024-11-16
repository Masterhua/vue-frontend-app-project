<template>
  <div class="sport-list-container">
    <h2>Sports</h2>
    <ul class="sport-list">
      <li v-for="sport in disciplines" :key="sport.name" @click="onSportClick(sport.name)">
        <span class="sport-name">{{ sport.name }}</span>
        <span class="medal-summary">
          <span>Gold: {{ sport.gold }}</span>
          <span>Silver: {{ sport.silver }}</span>
          <span>Bronze: {{ sport.bronze }}</span>
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
      // 使用 router.push 跳转到 SportDetail 页面，传递 noc 和 sportName 参数
      this.$router.push({ name: 'sport-detail', params: { noc: this.noc, sportName } });
    },
  },
});
</script>

<style scoped>
.sport-list-container {
  padding: 20px;
}

h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.sport-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.sport-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.sport-list li:hover {
  background-color: #e0e0e0;
}

.sport-name {
  font-size: 18px;
  font-weight: 500;
}

.medal-summary {
  font-size: 14px;
  display: flex;
  gap: 10px;
}

.medal-summary span {
  color: #555;
}
</style>
