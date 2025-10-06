<template>
  <nav class="nav-bar">
    <h2 class="title">Superheroes</h2>
    <img src="../assets/icons/menu.svg" alt="Menu" class="menu-icon" />
    <h3 class="menu">Menu</h3>
    <div class="search-wrapper">
      <input type="text" placeholder="Search for superhero" class="search" />
      <img src="../assets/icons/search.svg" alt="Search" class="search-icon" />
    </div>
  </nav>
</template>

<script setup></script>

<style scoped>
.nav-bar {
  display: flex;
  align-items: center;
  margin: 20px;
  background-color: rgb(215, 224, 250);
}

.title {
  margin: 0 10px;
}

.menu {
  margin-right: 10px;
}

.search-wrapper {
  width: 50%;
}

.search {
  width: 50%;
  padding: 6px;
}

.search:hover {
  border-color: rgb(141, 199, 247);
}

.search-icon {
  background-color: rgb(87, 191, 240);
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
}
</style>
