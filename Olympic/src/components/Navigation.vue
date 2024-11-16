<template>
  <nav class="navigation">
    <ul>
      <li v-for="item in menuItems" :key="item.name">
        <a :href="item.link">{{ item.name }}</a>
      </li>
      <li class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Enter country name..."
          @keyup="filterSuggestions"
          @focus="showSuggestions"
          @blur="hideSuggestions"
        />
        <button @click="searchCountry(searchQuery)">Search</button>
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
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { countries, CountryInfo } from '@/db';

export default defineComponent({
  props: {
    menuItems: {
      type: Array as () => { name: string; link: string }[],
      required: true,
    },
  },
  setup() {
    const router = useRouter();
    const searchQuery = ref<string>('');
    const filteredSuggestions = ref<CountryInfo[]>([]);
    const showList = ref(false);

    const filterSuggestions = () => {
      if (searchQuery.value) {
        filteredSuggestions.value = countries.filter(country =>
          country.enDescription.toLowerCase().startsWith(searchQuery.value.toLowerCase())
        );
        showList.value = filteredSuggestions.value.length > 0;
      } else {
        showList.value = false;
      }
    };

    const selectSuggestion = (suggestion: CountryInfo) => {
      searchQuery.value = suggestion.enDescription;
      searchCountry(suggestion.noc);
    };

    const searchCountry = (noc: string) => {
      if (noc) {
        router.push({ name: 'country-detail', params: { noc } });
      }
    };

    const showSuggestions = () => {
      showList.value = true;
    };

    const hideSuggestions = () => {
      setTimeout(() => {
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
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
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

.search-container {
  display: flex;
  gap: 10px;
  position: relative;
  align-items: center;
}

.search-container input {
  padding: 5px;
  width: 200px;
  border-radius: 4px;
  border: 1px solid #ccc;
  flex: 1;
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

.suggestions {
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 35px;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1001;
  font-size: 12px;
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
