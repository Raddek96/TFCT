import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "../composables/useAuth";

import ListadoAnuncios from "../components/ListadoAnuncios.vue";
import AnuncioDetalle from "../views/AnuncioDetalle.vue";
import Contacto from "../views/Contacto.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import CrearAnuncio from "../views/CrearAnuncio.vue";

const routes = [
  {
    path: "/",
    name: "inicio",
    component: ListadoAnuncios,
  },
  {
    path: "/anuncios",
    name: "anuncios",
    component: ListadoAnuncios,
  },
  {
    path: "/anuncio/:id",
    name: "anuncio-detalle",
    component: AnuncioDetalle,
  },
  {
    path: "/crear-anuncio",
    name: "crear-anuncio",
    component: CrearAnuncio,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/contacto",
    name: "contacto",
    component: Contacto,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      guestOnly: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      guestOnly: true,
    },
  },
  {
    path: "/crear-anuncio",
    name: "crear-anuncio",
    component: CrearAnuncio,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const { isAuthenticated, restoreSession } = useAuth();

  if (!isAuthenticated.value && localStorage.getItem("token")) {
    await restoreSession();
  }

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return "/login";
  }

  if (to.meta.guestOnly && isAuthenticated.value) {
    return "/";
  }

  return true;
});

export default router;
