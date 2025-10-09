<template>
  <div class="container">
    <div class="titles">
      <h3
        class="title"
        @click="toggleSignin('signup')"
        :class="{ active: isSignup === 'signup' }"
      >
        Sign up
      </h3>
      <h3
        class="title"
        @click="toggleSignin('login')"
        :class="{ active: isSignup === 'login' }"
      >
        Log in
      </h3>
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
      <input type="text" id="username-email" v-model="userLogin" />
      <label for="password-login">Password</label>
      <input type="password" id="password-login" v-model="userPassword" />
      <p v-if="error !== ''" class="error">{{ error }}</p>
      <button class="button" @click="login">Log in</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/counter";

const username = ref("");
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");
const error = ref("");
const userLogin = ref("");
const userPassword = ref("");
const isSignup = ref("signup");

const router = useRouter();
const userStore = useUserStore();

onMounted(() => {
  userStore.loadFromStorage();
});

const toggleSignin = (val) => {
  isSignup.value = val;
  error.value = "";
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

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    error.value = "Invalid email";
    return;
  }

  if (
    password.value.length < 6 ||
    !/[a-z]/.test(password.value) ||
    !/[A-Z]/.test(password.value) ||
    !/[0-9]/.test(password.value)
  ) {
    error.value = "Invalid password";
    return;
  }

  if (password.value !== passwordConfirm.value) {
    error.value = "Passwords don't match";
    return;
  }

  const existingUser = userStore.userList.find(
    (user) =>
      user.username.toLowerCase() === username.value.trim().toLowerCase() ||
      user.email.toLowerCase() === email.value.trim().toLowerCase()
  );

  if (existingUser) {
    error.value = "User with this username or email already exists";
    return;
  }

  error.value = "";

  const newUser = {
    username: username.value.trim(),
    email: email.value.trim(),
    password: password.value.trim(),
  };

  userStore.registerUser(newUser);

  router.push("/");
};

const login = () => {
  if (userLogin.value.trim() === "" || userPassword.value.trim() === "") {
    error.value = "Enter your Username or Email and Password";
    return;
  }

  const user = userStore.userList.find(
    (u) =>
      u.username.toLowerCase() === userLogin.value.trim().toLowerCase() ||
      u.email.toLowerCase() === userLogin.value.trim().toLowerCase()
  );

  if (!user) {
    error.value = "User does not exist";
    return;
  }

  if (user.password !== userPassword.value) {
    error.value = "Incorrect password";
    return;
  }

  error.value = "";

  userStore.loginUser(user);

  router.push("/");
};
</script>

<style scoped>
.container {
  width: 60%;
  margin: 0 auto;
  background-color: rgb(147, 143, 184);
  padding: 10px;
  border-radius: 20px;
}

.titles {
  display: flex;
  gap: 10px;
}

.title {
  background-color: rgba(112, 123, 180, 0.7);
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

.signup-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px;
}

.login-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px;
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
  color: rgb(233, 35, 9);
}

.hint {
  font-size: 14px;
  color: rgb(233, 233, 233);
}
</style>
