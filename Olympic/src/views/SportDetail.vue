<template>
  <div class="mx-auto my-8 p-6 bg-white shadow-lg rounded-lg max-w-4xl">
    <h1 v-if="sport" class="text-2xl font-bold mb-5">{{ sport.name }}</h1>
    <div v-if="country" class="flex items-center mb-5">
      <img v-if="country.flagUrl" :src="country.flagUrl" alt="Country Flag" class="w-16 h-10 object-cover mr-4" />
      <h2 class="text-xl">{{ country.enLongDescription }} ({{ country.noc }})</h2>
    </div>
    <div v-if="sport" class="bg-gray-100 p-4 rounded-lg mb-5">
      <h3 class="text-xl font-bold">Medal Summary</h3>
      <ul class="list-none p-0">
        <li class="text-lg mb-2">Gold: {{ sport.gold }}</li>
        <li class="text-lg mb-2">Silver: {{ sport.silver }}</li>
        <li class="text-lg mb-2">Bronze: {{ sport.bronze }}</li>
      </ul>
    </div>
    <CommentList />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import { countries } from '@/countryinfo';
import sportdb from '@/sportdb.json'; // 导入整个 JSON 文件
import CommentList from '@components/CommentList.vue';

// 为 disciplines 和 country 数据定义类型
interface Discipline {
  name: string;
  gold: number;
  silver: number;
  bronze: number;
}

interface Country {
  noc: string;
  flagUrl?: string;
  enLongDescription: string;
}

export default defineComponent({
  name: 'SportDetail',
  components: { CommentList },
  setup() {
    const route = useRoute();
    const noc = route.params.noc as string;
    const sportName = route.params.sportName as string;

    // 使用 computed 来获取相应的国家和运动项
    const country = computed(() => countries.find((item: Country) => item.noc === noc));
    const sport = computed(() => {
      const countryData = sportdb.find((item: { noc: string }) => item.noc === noc);
      return countryData?.disciplines.find((item: Discipline) => item.name === sportName) || null;
    });

    return { country, sport };
  },
});
</script>
