<template>
  <div>
    <img :src="superhero.images.md" :alt="superhero.name" />
    <p>{{ superhero.name }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { SUPERHERO_API } from "@/config/config";

const route = useRoute();
const superhero = ref([]);

const getSuperheroById = async () => {
  try {
    const result = await axios.get(
      `${SUPERHERO_API}/id/${route.params.id}.json`
    );
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

superhero.value = await getSuperheroById();
</script>

<style scoped></style>
