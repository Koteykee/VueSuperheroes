<template>
  <div class="wrapper">
    <h3 class="main-title">Create your superhero!</h3>
    <label for="name" class="title">Superhero name</label>
    <input type="text" id="name" />
    <p class="sub-title">Powerstats</p>
    <div class="container">
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
      />
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
      />
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
      />
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
      />
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
      />
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
      />
    </div>
    <p class="sub-title">Appearance</p>
    <label for="gender" class="title">Gender</label>
    <input type="text" id="gender" />
    <label for="race" class="title">Race</label>
    <input type="text" id="race" />
    <label for="height" class="title">Height</label>
    <input
      type="number"
      id="height"
      min="1"
      max="100"
      step="1"
      v-model.number="stats.height"
      @input="checkValue('height')"
      @keydown="preventInvalidInput"
    />
    <label for="weight" class="title">Weight</label>
    <input
      type="number"
      id="weight"
      min="1"
      max="100"
      step="1"
      v-model.number="stats.weight"
      @input="checkValue('weight')"
      @keydown="preventInvalidInput"
    />
    <label for="eyeColor" class="title">Eye Color</label>
    <input type="text" id="eyeColor" />
    <label for="hairColor" class="title">Hair Color</label>
    <input type="text" id="hairColor" />
    <p class="sub-title">Biography</p>
    <label for="fullName" class="title">Full Name</label>
    <input type="text" id="fullName" />
    <label for="placeOfBirth" class="title">Place Of Birth</label>
    <input type="text" id="placeOfBirth" />
    <label for="alignment" class="title">Alignment (Good/Bad)</label>
    <input type="text" id="alignment" />
    <label for="occupation" class="title">Occupation</label>
    <input type="text" id="occupation" />
  </div>
</template>

<script setup>
import { reactive } from "vue";

const stats = reactive({
  intelligence: null,
  strength: null,
  speed: null,
  durability: null,
  power: null,
  combat: null,
  height: null,
  weight: null,
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
</script>

<style scoped>
.wrapper {
  width: 60%;
  margin: 0 auto;
  background-color: rgb(170, 166, 206);
  padding: 10px;
  border-radius: 20px;
}

.container {
}

.main-title {
  padding: 10px;
}

.sub-title {
  padding: 10px;
  font-size: 18px;
  text-decoration: underline;
}

.title {
  padding: 0 10px;
}
</style>
