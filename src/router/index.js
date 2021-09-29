import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Organizations from "../views/Organizations.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/organizations",
    name: "Organizations",
    component: Organizations,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
