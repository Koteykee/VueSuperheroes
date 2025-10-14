<template>
  <ul class="superhero-container">
    <li v-for="superhero in superheroes" :key="superhero.id">
      <SuperheroListItem :superhero="superhero" />
    </li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

import SuperheroListItem from "./SuperheroListItem.vue";
import { SUPERHERO_API } from "@/config/config";

const superheroes = ref([]);

const getSuperheroes = async () => {
  try {
    const result = await axios.get(`${SUPERHERO_API}/all.json`);

    return result.data;
  } catch (err) {
    console.log(err);
  }
};

superheroes.value = await getSuperheroes();
</script>

<style scoped>
.superhero-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  list-style: none;
}

@media (max-width: 1460px) {
  .superhero-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1060px) {
  .superhero-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 740px) {
  .superhero-container {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
