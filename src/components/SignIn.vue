<template>
  <div class="container">
    <div class="titles">
      <h3 class="title" @click="toggleSignin('signup')">Sign up</h3>
      <h3 class="title" @click="toggleSignin('login')">Log in</h3>
    </div>
    <div v-if="isSignup === 'signup'" class="signup-wrapper">
      <label for="username">Username</label>
      <input type="text" id="username" v-model="username" />
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" />
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" />
      <p class="hint">
        Password must contain at least 6 characters including lowercase
        characters, uppercase characters, and numbers.
      </p>
      <label for="password-confirm">Confirm password</label>
      <input type="password" id="password-confirm" v-model="passwordConfirm" />
      <p v-if="error !== ''" class="error">{{ error }}</p>
      <button class="button" @click="addUser">Create account</button>
    </div>
    <div v-if="isSignup === 'login'" class="login-wrapper">
      <label for="username-email">Username or Email</label>
      <input type="text" id="username-email" />
      <label for="password-login">Password</label>
      <input type="password" id="password-login" />
      <p v-if="error !== ''" class="error">{{ error }}</p>
      <button class="button">Log in</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const username = ref("");
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");
const error = ref("");
const isSignup = ref("signup");
const userList = ref([]);

const toggleSignin = (val) => {
  isSignup.value = val;
};

const addUser = () => {
  if (
    username.value.trim() === "" ||
    email.value.trim() === "" ||
    password.value.trim() === ""
  ) {
    error.value = "Fill in all fields";
    return;
  }
};
</script>

<style scoped>
.container {
  width: 60%;
  margin: 0 auto;
}

.titles {
  display: flex;
  gap: 10px;
}

.title {
  background-color: white;
  padding: 6px;
  border-radius: 6px;
  border: 2px solid rgb(87, 191, 240);
  cursor: pointer;
}

.title:hover {
  background-color: rgb(87, 191, 240);
}

.signup-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.login-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.button {
  font-size: 16px;
  padding: 4px;
  background-color: rgb(112, 218, 191);
  border-radius: 4px;
  border: 1px solid black;
  cursor: pointer;
}

.error {
  font-size: 16px;
  color: red;
}

.hint {
  font-size: 14px;
  color: gray;
}
</style>
