<template>
  <nav class="nav-bar">
    <router-link :to="`/`">
      <h2 class="title">Superheroes</h2>
    </router-link>
    <Search />
    <router-link :to="`/signin`" class="sign-in">Sign In</router-link>
    <div>
      <div class="menu-wrapper">
        <img
          src="../assets/icons/menu.svg"
          alt="Menu"
          class="menu-icon"
          @click="toggleMenu"
        />
        <h3 class="menu" @click="toggleMenu">Menu</h3>
      </div>
      <ul v-if="isMenuOpen">
        <li>
          <router-link :to="`/mysuperheroes`">My superheroes</router-link>
        </li>
        <li><p>Log Out</p></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import Search from "./Search.vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: rgb(215, 224, 250);
}

.title {
  cursor: pointer;
}

.sign-in {
  font-size: 20px;
  font-weight: 600;
}

.title:hover,
.sign-in:hover {
  color: rgb(12, 80, 148);
}

.menu-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.menu {
  cursor: pointer;
}

.menu-icon {
  cursor: pointer;
  background-color: rgb(87, 191, 240);
  border-radius: 50%;
  padding: 8px;
}
</style>
