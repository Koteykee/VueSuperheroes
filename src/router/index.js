import { createRouter, createWebHistory } from "vue-router";

import Home from "@/components/Home.vue";
import SuperheroPage from "@/components/SuperheroPage/SuperheroPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/superhero/:id",
      name: "Superhero",
      component: SuperheroPage,
    },
  ],
});

export default router;
