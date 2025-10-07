<template>
  <div class="search-wrapper">
    <div class="input-wrapper">
      <input
        type="text"
        v-model="searchQuery"
        @input="getResults"
        placeholder="Search for superhero"
        class="search"
      />
      <img src="../assets/icons/search.svg" alt="Search" class="search-icon" />
    </div>
    <ul v-if="searchResults" class="superhero-container">
      <p class="error" v-if="searchError">
        Sorry, something went wrong, please try again.
      </p>
      <p class="error" v-if="!searchError && searchResults.length === 0">
        No results found.
      </p>
      <template v-else>
        <li
          v-for="searchResult in searchResults"
          :key="searchResult.id"
          @click="getSuperhero(searchResult.id)"
          class="superhero"
        >
          <router-link
            :to="`/superhero/${searchResult.id}`"
            class="superhero-inner"
          >
            {{ searchResult.name }}
          </router-link>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { SUPERHERO_API } from "@/config/config";

const searchQuery = ref("");
const queryTimeout = ref(null);
const searchResults = ref(null);
const searchError = ref(null);
const superhero = ref("");

const getResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(`${SUPERHERO_API}/all.json`);

        const filtered = result.data.filter((superhero) =>
          superhero.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );

        searchResults.value = filtered;
        searchError.value = null;
      } catch {
        searchError.value = true;
      }
      return;
    }
    searchResults.value = null;
  }, 300);
};

const getSuperhero = (searchResult) => {
  superhero.value = searchResult;
  searchResults.value = null;
  searchQuery.value = "";
};
</script>

<style scoped>
.search-wrapper {
  width: 30%;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 2px solid transparent;
}

.search-wrapper:hover,
.search-wrapper:focus-within {
  border: 2px solid rgb(87, 191, 240);
  border-radius: 20px;
  background-color: white;
}

.input-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
  background-color: rgba(255, 255, 255, 0.55);
  padding: 6px;
  border-radius: 20px;
}

.search {
  flex: 1;
  padding: 6px;
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 20px;
}

.search-icon {
  align-self: flex-end;
  background-color: rgb(87, 191, 240);
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
}

.superhero-container {
  position: absolute;
  top: 100%;
  width: 100%;
  margin-top: 6px;
  border-radius: 10px;
  overflow: hidden;
}

.superhero {
  background-color: white;
  padding: 10px;
  list-style: none;
  font-size: 20px;
  cursor: pointer;
}

.superhero-inner {
  padding: 12px;
  border-radius: 10px;
  display: block;
}

.superhero:hover .superhero-inner {
  background-color: #f1f1f1;
}

.error {
  font-size: 20px;
  background-color: white;
  padding: 10px;
}
</style>
