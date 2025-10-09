<template>
  <nav class="nav-bar">
    <router-link :to="`/`">
      <h2 class="title">Superheroes</h2>
    </router-link>
    <Search />
    <router-link :to="`/signin`" class="sign-in" v-if="!currentUser"
      >Sign In</router-link
    >
    <div v-else class="menu-wrapper-container">
      <div class="menu-wrapper">
        <img
          src="../assets/icons/menu.svg"
          alt="Menu"
          class="menu-icon"
          @click="toggleMenu"
        />
        <h3 class="currentUser" @click="toggleMenu">
          {{ currentUser.username }}
        </h3>
      </div>
      <ul v-if="isMenuOpen" class="menu-container">
        <li class="menu-item">
          <router-link :to="`/mysuperheroes`" class="menu-inner"
            >My superheroes</router-link
          >
        </li>
        <li class="menu-item">
          <p
            @click="
              userStore.logoutUser();
              toggleMenu();
            "
            class="menu-inner"
          >
            Log Out
          </p>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/counter";
import { storeToRefs } from "pinia";
import Search from "./Search.vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const userStore = useUserStore();
const { currentUser } = storeToRefs(userStore);

onMounted(() => {
  userStore.loadFromStorage();
});
</script>

<style scoped>
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: rgb(202, 212, 247);
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

.currentUser {
  cursor: pointer;
}

.menu-icon {
  cursor: pointer;
  background-color: rgb(87, 191, 240);
  border-radius: 50%;
  padding: 8px;
}

.menu-wrapper-container {
  position: relative;
}

.menu-container {
  position: absolute;
  top: 100%;
  right: 0;
  width: max-content;
  min-width: 160px;
  margin-top: 6px;
  border-radius: 10px;
  overflow: hidden;
}

.menu-item {
  background-color: white;
  padding: 10px;
  list-style: none;
  font-size: 20px;
  cursor: pointer;
}

.menu-inner {
  padding: 12px;
  border-radius: 10px;
  display: block;
}

.menu-item:hover .menu-inner {
  background-color: #f1f1f1;
}
</style>
