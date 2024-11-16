<template>
  <!-- 导航栏 -->
  <Navigation :menuItems="menuItems" />

  <div class="home-view">
    <!-- 排行榜 -->
    <RankingList :countries="paginatedCountries" @country-click="goToCountryDetail" />

    <!-- 分页控件 -->
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { countries } from '@/db'; // 从 db.ts 获取国家数据
import { useRouter } from 'vue-router';
import RankingList from '@/components/RankingList.vue'; // 假设排行榜组件位置
import Navigation from '@/components/Navigation.vue'; // 导入导航栏组件

export default defineComponent({
  name: 'HomeView',
  components: {
    RankingList,
    Navigation, // 添加 Navigation 组件
  },
  setup() {
    const router = useRouter();

    // 分页参数
    const itemsPerPage = 5;
    const currentPage = ref(1);

    // 计算分页后的国家列表
    const paginatedCountries = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      return countries.slice(startIndex, startIndex + itemsPerPage);
    });

    // 计算总页数
    const totalPages = computed(() => {
      return Math.ceil(countries.length / itemsPerPage);
    });

    // 上一页
    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    // 下一页
    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    // 点击国家名称时跳转到该国的详细信息页面
    const goToCountryDetail = (noc: string) => {
      router.push({ name: 'country-detail', params: { noc } });
    };

    // 导航栏的菜单项
    const menuItems = [
      { name: 'Home', link: '/' },
    ];

    return {
      currentPage,
      totalPages,
      paginatedCountries,
      previousPage,
      nextPage,
      goToCountryDetail,
      menuItems,
    };
  },
});
</script>

<style scoped>
.home-view {
  max-width: 100%;
  margin: 0 auto;
  padding: 16px;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}
</style>
