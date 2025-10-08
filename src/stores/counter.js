import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const currentUser = ref(null);
  const userList = ref([]);

  const loadFromStorage = () => {
    const storedUsers = localStorage.getItem("user");
    const storedCurrentUser = localStorage.getItem("currentUser");

    if (storedUsers) {
      try {
        userList.value = JSON.parse(storedUsers);
      } catch (e) {
        console.error("Error parsing user list");
      }
    }

    if (storedCurrentUser) {
      try {
        currentUser.value = JSON.parse(storedCurrentUser);
      } catch (e) {
        console.error("Error parsing current user");
      }
    }
  };

  const saveToStorage = () => {
    localStorage.setItem("user", JSON.stringify(userList.value));
    localStorage.setItem("currentUser", JSON.stringify(currentUser.value));
  };

  const registerUser = (user) => {
    userList.value.push(user);
    currentUser.value = user;
    saveToStorage();
  };

  const loginUser = (user) => {
    currentUser.value = user;
    saveToStorage();
  };

  const logoutUser = () => {
    currentUser.value = null;
    localStorage.removeItem("currentUser");
  };

  return {
    currentUser,
    userList,
    registerUser,
    loginUser,
    logoutUser,
    loadFromStorage,
  };
});
