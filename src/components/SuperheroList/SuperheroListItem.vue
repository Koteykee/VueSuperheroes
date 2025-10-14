<template>
  <div class="superhero-card">
    <router-link :to="`/superhero/${superhero.id}`">
      <img
        :src="superhero.images.md"
        :alt="superhero.name"
        class="superhero-img"
      />
      <p class="superhero-name">{{ superhero.name }}</p>
    </router-link>
  </div>
</template>

<script setup>
const { superhero } = defineProps({
  superhero: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.superhero-card {
  text-align: center;
}

.superhero-card a {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.superhero-img {
  cursor: pointer;
}

.superhero-name {
  cursor: pointer;
}

.superhero-name:hover {
  text-decoration: underline;
}
</style>
