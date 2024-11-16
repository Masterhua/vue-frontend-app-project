<template>
  <nav class="navigation">
    <ul>
      <li v-for="item in menuItems" :key="item.name">
        <a :href="item.link">{{ item.name }}</a>
      </li>

      <!-- 搜索框 -->
      <li class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Enter country name..."
          @keyup.enter="searchCountry"
        />
        <button @click="searchCountry">Search</button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  props: {
    menuItems: {
      type: Array as PropType<{ name: string; link: string }[]>,
      required: true,
    },
  },
  setup() {
    const router = useRouter();
    const searchQuery = ref('');

    // 搜索国家并跳转到国家详情页面
    const searchCountry = () => {
      if (searchQuery.value) {
        router.push({ name: 'country-detail', params: { noc: searchQuery.value } });
      }
    };

    return {
      searchQuery,
      searchCountry,
    };
  },
});
</script>

<style scoped>
.navigation {
  background-color: #333;
  padding: 10px;
  position: fixed; /* 固定在页面顶部 */
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000; /* 确保导航栏在其他内容上方 */
}

.navigation ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.navigation li {
  margin-right: 15px;
}

.navigation a {
  color: white;
  text-decoration: none;
}

.navigation a:hover {
  text-decoration: underline;
}

/* 搜索框样式 */
.search-container {
  display: flex;
  gap: 10px;
}

.search-container input {
  padding: 5px;
  width: 200px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.search-container button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-container button:hover {
  background-color: #0056b3;
}
</style>
