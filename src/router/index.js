import { createRouter, createWebHistory } from "vue-router";

import Home from "@/components/Home.vue";
import SuperheroPage from "@/components/SuperheroPage/SuperheroPage.vue";
import SignIn from "@/components/SignIn.vue";
import MySuperheroes from "@/components/MySuperheroes/MySuperheroes.vue";
import SuperheroForm from "@/components/MySuperheroes/SuperheroForm.vue";

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
    {
      path: "/signin",
      name: "SignIn",
      component: SignIn,
    },
    {
      path: "/mysuperheroes",
      name: "MySuperheroes",
      component: MySuperheroes,
    },
    {
      path: "/superheroform/:id?",
      name: "SuperheroForm",
      component: SuperheroForm,
    },
  ],
});

export default router;
