<template>
  <div class="wrapper">
    <h3 class="main-title">Create your superhero!</h3>
    <label for="name" class="main-name">Superhero name</label>
    <input
      type="text"
      id="name"
      class="main-input"
      v-model="stats.name"
    /><br /><br />
    <label for="image" class="main-name">Superhero image</label>
    <input type="text" id="image" class="main-input" v-model="stats.image" />
    <p class="sub-title">Powerstats</p>
    <div class="container">
      <div class="stat">
        <label for="intelligence" class="title">Intelligence</label>
        <input
          type="number"
          id="intelligence"
          min="1"
          max="100"
          step="1"
          v-model.number="stats.intelligence"
          @input="checkValue('intelligence')"
          @keydown="preventInvalidInput"
          class="input"
        />
      </div>
      <div class="stat">
        <label for="strength" class="title">Strength</label>
        <input
          type="number"
          id="strength"
          min="1"
          max="100"
          step="1"
          v-model.number="stats.strength"
          @input="checkValue('strength')"
          @keydown="preventInvalidInput"
          class="input"
        />
      </div>
      <div class="stat">
        <label for="speed" class="title">Speed</label>
        <input
          type="number"
          id="speed"
          min="1"
          max="100"
          step="1"
          v-model.number="stats.speed"
          @input="checkValue('speed')"
          @keydown="preventInvalidInput"
          class="input"
        />
      </div>
      <div class="stat">
        <label for="durability" class="title">Durability</label>
        <input
          type="number"
          id="durability"
          min="1"
          max="100"
          step="1"
          v-model.number="stats.durability"
          @input="checkValue('durability')"
          @keydown="preventInvalidInput"
          class="input"
        />
      </div>
      <div class="stat">
        <label for="power" class="title">Power</label>
        <input
          type="number"
          id="power"
          min="1"
          max="100"
          step="1"
          v-model.number="stats.power"
          @input="checkValue('power')"
          @keydown="preventInvalidInput"
          class="input"
        />
      </div>
      <div class="stat">
        <label for="combat" class="title">Combat</label>
        <input
          type="number"
          id="combat"
          min="1"
          max="100"
          step="1"
          v-model.number="stats.combat"
          @input="checkValue('combat')"
          @keydown="preventInvalidInput"
          class="input"
        />
      </div>
    </div>
    <p class="sub-title">Appearance</p>
    <div class="container">
      <div>
        <label for="gender" class="title">Gender</label>
        <input
          v-model="stats.gender"
          type="text"
          id="gender"
          class="text-input"
        />
      </div>
      <div>
        <label for="race" class="title">Race</label>
        <input v-model="stats.race" type="text" id="race" class="text-input" />
      </div>
      <div>
        <label for="height" class="title">Height</label>
        <input
          type="number"
          id="height"
          min="1"
          step="1"
          v-model.number="stats.height"
          @keydown="preventInvalidInput"
          class="input"
        />
      </div>
      <div>
        <label for="weight" class="title">Weight</label>
        <input
          type="number"
          id="weight"
          min="1"
          step="1"
          v-model.number="stats.weight"
          @keydown="preventInvalidInput"
          class="input"
        />
      </div>
      <div>
        <label for="eyeColor" class="title">Eye Color</label>
        <input
          v-model="stats.eyeColor"
          type="text"
          id="eyeColor"
          class="text-input"
        />
      </div>
      <div>
        <label for="hairColor" class="title">Hair Color</label>
        <input
          v-model="stats.hairColor"
          type="text"
          id="hairColor"
          class="text-input"
        />
      </div>
    </div>
    <p class="sub-title">Biography</p>
    <div class="biography-container">
      <div class="biography-stat">
        <label for="fullName" class="main-name">Full Name</label>
        <input
          v-model="stats.fullName"
          type="text"
          id="fullName"
          class="main-input"
        />
      </div>
      <div class="biography-stat">
        <label for="placeOfBirth" class="main-name">Place Of Birth</label>
        <input
          v-model="stats.placeOfBirth"
          type="text"
          id="placeOfBirth"
          class="main-input"
        />
      </div>
      <div class="biography-stat">
        <label for="alignment" class="main-name">Alignment</label>
        <select v-model="stats.alignment" id="alignment" class="select">
          <option disabled value="" selected>Select alignment</option>
          <option value="good">Good</option>
          <option value="bad">Bad</option>
        </select>
      </div>
      <div class="biography-stat">
        <label for="occupation" class="main-name">Occupation</label>
        <input
          v-model="stats.occupation"
          type="text"
          id="occupation"
          class="main-input"
        />
      </div>
    </div>
    <p v-if="error !== ''" class="error">{{ error }}</p>
    <button class="button" @click="createSuperhero">Create superhero</button>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const router = useRouter();
const userStore = useUserStore();
const currentUser = userStore.currentUser;

const stats = reactive({
  name: "",
  image: "",
  intelligence: null,
  strength: null,
  speed: null,
  durability: null,
  power: null,
  combat: null,
  gender: "",
  race: "",
  height: null,
  weight: null,
  eyeColor: "",
  hairColor: "",
  fullName: "",
  placeOfBirth: "",
  alignment: "",
  occupation: "",
});

const checkValue = (field) => {
  let val = stats[field];

  if (val !== 0) {
    stats[field] = Number(String(val).replace(/^0+/, ""));
  }

  if (stats[field] > 100) stats[field] = 100;
  if (stats[field] < 1) stats[field] = 1;
};

const preventInvalidInput = (e) => {
  if (["-", "e", "E", ".", ","].includes(e.key)) {
    e.preventDefault();
  }
};

const error = ref("");

const createSuperhero = () => {
  if (
    stats.name.trim() === "" ||
    stats.intelligence === null ||
    stats.strength === null ||
    stats.speed === null ||
    stats.durability === null ||
    stats.power === null ||
    stats.combat === null ||
    stats.height === null ||
    stats.weight === null ||
    stats.gender.trim() === "" ||
    stats.race.trim() === "" ||
    stats.eyeColor.trim() === "" ||
    stats.hairColor.trim() === "" ||
    stats.fullName.trim() === "" ||
    stats.placeOfBirth.trim() === "" ||
    stats.alignment.trim() === "" ||
    stats.occupation.trim() === ""
  ) {
    error.value = "Fill in all fields";
    return;
  }

  error.value = "";

  const newHero = {
    id: "local-" + Date.now(),
    userId: currentUser.id,
    name: stats.name,
    powerstats: {
      intelligence: stats.intelligence,
      strength: stats.strength,
      speed: stats.speed,
      durability: stats.durability,
      power: stats.power,
      combat: stats.combat,
    },
    appearance: {
      gender: stats.gender,
      race: stats.race,
      height: [0, `${stats.height} cm`],
      weight: [0, `${stats.weight} kg`],
      eyeColor: stats.eyeColor,
      hairColor: stats.hairColor,
    },
    biography: {
      fullName: stats.fullName,
      placeOfBirth: stats.placeOfBirth,
      alignment: stats.alignment,
      alterEgos: "None",
      aliases: ["None"],
      firstAppearance: "-",
      publisher: "You",
    },
    work: {
      occupation: stats.occupation,
      base: "-",
    },
    connections: {
      groupAffiliation: "-",
      relatives: "-",
    },
    images: {
      lg: `${stats.image}`,
    },
  };

  const superheroes = JSON.parse(localStorage.getItem("superheroes") || "[]");
  superheroes.push(newHero);
  localStorage.setItem("superheroes", JSON.stringify(superheroes));

  router.push(`/superhero/${newHero.id}`);
};
</script>

<style scoped>
.wrapper {
  width: 60%;
  margin: 0 auto;
  background-color: rgb(170, 166, 206);
  padding: 10px 20px;
  border-radius: 20px;
}

.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 10px 20px;
}

.biography-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.biography-stat {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.stat {
  display: flex;
  flex-direction: column;
}

.title {
  display: inline-block;
  width: 100%;
  font-weight: bold;
  margin-bottom: 5px;
}

.input {
  width: 100%;
  padding: 5px;
  font-size: 18px;
}

.select {
  width: 50%;
  padding: 5px;
  font-size: 18px;
}

.main-title {
  padding-bottom: 10px;
}

.sub-title {
  padding: 10px 0;
  font-size: 18px;
  text-decoration: underline;
}

.main-name {
  padding-right: 10px;
  font-weight: bold;
  margin-bottom: 5px;
}

.main-input {
  padding: 5px;
  width: 50%;
  font-size: 18px;
}

.text-input {
  padding: 5px;
  width: 100%;
  font-size: 18px;
}

.button {
  margin-top: 10px;
  width: 100%;
  font-size: 16px;
  padding: 4px;
  background-color: rgb(112, 218, 191);
  border-radius: 4px;
  border: 1px solid black;
  cursor: pointer;
}

.error {
  font-size: 18px;
  color: rgb(233, 35, 9);
  margin-top: 10px;
}
</style>
