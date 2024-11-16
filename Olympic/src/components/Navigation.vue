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
          @keyup="filterSuggestions"
          @focus="showSuggestions"
          @blur="hideSuggestions"
        />
        <!-- 修改为箭头函数，传递 noc 值 -->
        <button @click="() => searchCountry(searchQuery.value)">Search</button>
        
        <!-- 显示搜索建议 -->
        <ul v-if="showList && filteredSuggestions.length" class="suggestions">
          <li
            v-for="suggestion in filteredSuggestions"
            :key="suggestion.noc"
            @click="selectSuggestion(suggestion)"
          >
            {{ suggestion.enDescription }}
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import { useRouter } from 'vue-router';
import { countries, CountryInfo } from '@/db'; // 导入数据库中的国家数据

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
    const filteredSuggestions = ref<CountryInfo[]>([]);
    const showList = ref(false); // 控制建议列表是否显示

    // 过滤匹配的国家描述
    const filterSuggestions = () => {
      if (searchQuery.value) {
        filteredSuggestions.value = countries
          .filter(country =>
            country.enDescription.toLowerCase().startsWith(searchQuery.value.toLowerCase())
          );
        showList.value = filteredSuggestions.value.length > 0;
      } else {
        showList.value = false;
      }
    };

    // 选择建议并跳转
    const selectSuggestion = (suggestion: CountryInfo) => {
      searchQuery.value = suggestion.enDescription;
      searchCountry(suggestion.noc); // 选择后执行搜索
    };

    // 搜索国家并跳转到国家详情页面
    const searchCountry = (noc: string) => {
      if (noc) {
        router.push({ name: 'country-detail', params: { noc } });
      }
    };

    // 显示建议列表
    const showSuggestions = () => {
      showList.value = true;
    };

    // 隐藏建议列表
    const hideSuggestions = () => {
      setTimeout(() => { // 使用延时以防止选择时立刻隐藏
        showList.value = false;
      }, 200);
    };

    return {
      searchQuery,
      filteredSuggestions,
      showList,
      filterSuggestions,
      searchCountry,
      selectSuggestion,
      showSuggestions,
      hideSuggestions,
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
  gap: 10px; /* 控制输入框与按钮之间的间距 */
  position: relative;
  align-items: center; /* 使按钮与输入框垂直对齐 */
}

.search-container input {
  padding: 5px;
  width: 200px;
  border-radius: 4px;
  border: 1px solid #ccc;
  flex: 1; /* 使输入框占满剩余空间 */
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

/* 搜索建议列表 */
.suggestions {
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 35px; /* 放置在输入框下方 */
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1001;
  font-size: 12px; /* 缩小提示文字 */
}

.suggestions li {
  padding: 8px;
  cursor: pointer;
}

.suggestions li:hover {
  background-color: #007bff;
  color: white;
}
</style>
