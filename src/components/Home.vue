<template>
  <div>
    <h1>Superhero website</h1>
    <Suspense>
      <SuperheroList />
    </Suspense>
  </div>
</template>

<script setup>
import { Suspense } from "vue";

import SuperheroList from "./SuperheroList/SuperheroList.vue";
</script>

<style scoped></style>
