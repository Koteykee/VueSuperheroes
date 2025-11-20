<template>
  <div class="superhero-container">
    <div class="card-wrapper">
      <div class="superhero-wrapper">
        <img
          v-if="superhero.images?.lg"
          :src="superhero.images.lg"
          :alt="superhero.name"
        />
        <p class="name">{{ superhero.name }}</p>
      </div>
      <div class="titles">
        <h3
          class="title"
          @click="toggleTitle('powerstats')"
          :class="{ active: isTitle === 'powerstats' }"
        >
          Powerstats
        </h3>
        <h3
          class="title"
          @click="toggleTitle('appearance')"
          :class="{ active: isTitle === 'appearance' }"
        >
          Appearance
        </h3>
        <h3
          class="title"
          @click="toggleTitle('biography')"
          :class="{ active: isTitle === 'biography' }"
        >
          Biography
        </h3>
      </div>
      <div v-if="isTitle === 'powerstats'" class="powerstats">
        <div class="stat">
          <p class="stat-name">Intelligence</p>
          <p class="stat-info">{{ superhero.powerstats.intelligence }}</p>
        </div>
        <div class="stat">
          <p class="stat-name">Strength</p>
          <p class="stat-info">{{ superhero.powerstats.strength }}</p>
        </div>
        <div class="stat">
          <p class="stat-name">Speed</p>
          <p class="stat-info">{{ superhero.powerstats.speed }}</p>
        </div>
        <div class="stat">
          <p class="stat-name">Durability</p>
          <p class="stat-info">{{ superhero.powerstats.durability }}</p>
        </div>
        <div class="stat">
          <p class="stat-name">Power</p>
          <p class="stat-info">{{ superhero.powerstats.power }}</p>
        </div>
        <div class="stat">
          <p class="stat-name">Combat</p>
          <p class="stat-info">{{ superhero.powerstats.combat }}</p>
        </div>
      </div>
      <div v-if="isTitle === 'appearance'" class="appearance">
        <div class="stat">
          <p class="stat-name">Gender</p>
          <p class="stat-info">{{ superhero.appearance.gender }}</p>
        </div>
        <div class="stat">
          <p class="stat-name">Race</p>
          <p class="stat-info">{{ superhero.appearance.race }}</p>
        </div>
        <div class="stat">
          <p class="stat-name">Height</p>
          <p class="stat-info">{{ superhero.appearance.height[1] }}</p>
        </div>
        <div class="stat">
          <p class="stat-name">Weight</p>
          <p class="stat-info">{{ superhero.appearance.weight[1] }}</p>
        </div>
        <div class="stat">
          <p class="stat-name">Eye Color</p>
          <p class="stat-info">{{ superhero.appearance.eyeColor }}</p>
        </div>
        <div class="stat">
          <p class="stat-name">Hair Color</p>
          <p class="stat-info">{{ superhero.appearance.hairColor }}</p>
        </div>
      </div>
      <div v-if="isTitle === 'biography'" class="biography">
        <p class="biography-stat">Full Name</p>
        <p class="biography-info">{{ superhero.biography.fullName }}</p>
        <p class="biography-stat">Alter Egos</p>
        <p class="biography-info">{{ superhero.biography.alterEgos }}</p>
        <p class="biography-stat">Aliases</p>
        <p class="biography-info">
          {{ superhero.biography.aliases.join(", ") }}
        </p>
        <p class="biography-stat">Place Of Birth</p>
        <p class="biography-info">{{ superhero.biography.placeOfBirth }}</p>
        <p class="biography-stat">First Appearance</p>
        <p class="biography-info">{{ superhero.biography.firstAppearance }}</p>
        <p class="biography-stat">Publisher</p>
        <p class="biography-info">{{ superhero.biography.publisher }}</p>
        <p class="biography-stat">Alignment</p>
        <p class="biography-info">{{ superhero.biography.alignment }}</p>
        <p class="biography-stat">Occupation</p>
        <p class="biography-info">{{ superhero.work.occupation }}</p>
        <p class="biography-stat">Base</p>
        <p class="biography-info">{{ superhero.work.base }}</p>
        <p class="biography-stat">Group Affiliation</p>
        <p class="biography-info">
          {{ superhero.connections.groupAffiliation }}
        </p>
        <p class="biography-stat">Relatives</p>
        <p class="biography-info">{{ superhero.connections.relatives }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { SUPERHERO_API } from "@/config/config";

const route = useRoute();
const superhero = ref([]);

const loadSuperhero = async () => {
  try {
    const id = route.params.id;

    if (id.startsWith("local-")) {
      const stored = JSON.parse(localStorage.getItem("superheroes") || "[]");
      const localHero = stored.find((hero) => hero.id === id);

      if (localHero) {
        return localHero;
      }
    } else {
      const result = await axios.get(`${SUPERHERO_API}/id/${id}.json`);
      return result.data;
    }
  } catch (err) {
    console.log(err);
  }
};

superhero.value = await loadSuperhero();

const isTitle = ref("powerstats");

const toggleTitle = (val) => {
  isTitle.value = val;
};
</script>

<style scoped>
.superhero-container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.card-wrapper {
  background-color: rgb(108, 103, 145);
  padding: 30px 30px 30px 30px;
  border-radius: 20px;
  min-width: 100%;
}

.superhero-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1260px;
  background-color: rgb(147, 143, 184);
  padding: 30px;
  border-radius: 20px;
}

.name {
  font-size: 26px;
  padding-top: 10px;
}

.titles {
  display: flex;
  gap: 10px;
  padding: 10px 0;
}

.title {
  background-color: rgba(79, 90, 145, 0.8);
  padding: 6px;
  border-radius: 6px;
  cursor: pointer;
  color: white;
  border: 2px solid transparent;
}

.title:hover {
  background-color: rgba(100, 106, 189, 0.6);
}

.title.active {
  border: 2px solid rgb(244, 253, 114);
}

.powerstats,
.appearance {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  background-color: rgb(69, 73, 95);
  padding: 10px;
  border-radius: 6px;
  text-align: center;
}

.biography {
  background-color: rgb(147, 143, 184);
  border-radius: 6px;
  padding: 0 10px 10px 10px;
}

.stat {
  background-color: rgb(147, 143, 184);
  border-radius: 6px;
}

.stat-name {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.8);
}

.stat-info {
  font-size: 24px;
}

.biography-stat {
  font-size: 18px;
  text-decoration: underline;
  padding-top: 10px;
  font-weight: 600;
}

.biography-info {
  font-size: 20px;
}

img {
  max-width: 1200px;
}
</style>
