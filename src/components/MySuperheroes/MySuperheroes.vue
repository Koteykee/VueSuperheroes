<template>
  <div>
    <div class="create-card">
      <router-link :to="`/createsuperhero`" class="create-box">
        <span class="plus">+</span>
      </router-link>
      <p class="create-text">Create superhero</p>
    </div>
    <div></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const superhero = ref(null);

onMounted(() => {
  const data = localStorage.getItem("superhero");
  if (data) {
    superhero.value = JSON.parse(data);
  }
});
</script>

<style scoped>
.create-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.create-box {
  width: 300px;
  height: 400px;
  border: 3px dashed rgb(72, 69, 100);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

.plus {
  font-size: 48px;
  line-height: 1;
  color: rgb(72, 69, 100);
}

.create-text {
  font-size: 20px;
}
</style>
