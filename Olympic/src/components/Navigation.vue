<template>
  <nav class="bg-gray-800 text-white fixed w-full top-0 left-0 z-50 p-3">
    <ul class="flex items-center gap-4">
      <li v-for="item in menuItems" :key="item.name">
        <a :href="item.link" class="hover:underline">{{ item.name }}</a>
      </li>
      <li class="relative flex items-center gap-2">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Enter country name..."
          @keyup="filterSuggestions"
          @focus="showSuggestions"
          @blur="hideSuggestions"
          class="px-3 py-2 border border-gray-300 rounded w-48 focus:outline-none focus:ring focus:ring-blue-300 text-black"/>
        <button
          @click="searchCountry(searchQuery)"
          class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-black rounded">
          Search
        </button>
        <ul
          v-if="showList && filteredSuggestions.length"
          class="absolute top-12 left-0 w-full bg-white border  border-gray-300 rounded shadow max-h-40 overflow-y-auto z-50">
          <li
            v-for="suggestion in filteredSuggestions"
            :key="suggestion.noc"
            @click="selectSuggestion(suggestion)"
            class="px-3 py-2 cursor-pointer hover:bg-blue-500 hover:text-white text-black">
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
import { countries, CountryInfo } from '@/countryinfo.json';

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

    const menuItems = [
      { name: 'Home', link: '/' },
      { name: 'Aboutus', link: '/about' },
      { name: 'Contact', link: '/contact' }
    ];

    return {
      searchQuery,
      filteredSuggestions,
      showList,
      filterSuggestions,
      searchCountry,
      selectSuggestion,
      showSuggestions,
      hideSuggestions,
      menuItems,
    };
  },
});
</script>

<style scoped>
nav a {
  color: white;
}

input, button {
  color: black;
}

ul li {
  color: black;
}

ul li:hover {
  background-color: #3b82f6;
  color: white;
}
</style>
