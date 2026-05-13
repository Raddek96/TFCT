<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const menuOpen = ref(false)

const { user, isAuthenticated, loadingAuth, logout } = useAuth()

const closeMenu = () => {
  menuOpen.value = false
}

const handleLogout = () => {
  logout()
  closeMenu()
  router.push('/')
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-white/10 bg-[#1a1a2e]/75 backdrop-blur-xl">
    <nav class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
      <router-link
        to="/"
        class="flex items-center gap-3"
        @click="closeMenu"
      >
        <div class="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
          <span class="font-black text-white">E</span>
        </div>

        <div>
          <p class="text-white font-black text-xl leading-none">
            ErasmusStay
          </p>
          <p class="text-gray-400 text-xs mt-1">
            Malta student housing
          </p>
        </div>
      </router-link>

      <div class="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-2 py-2">
        <router-link
          to="/"
          class="px-4 py-2 rounded-full text-sm text-gray-300 hover:text-white hover:bg-white/10"
          active-class="bg-primary text-white"
        >
          Inicio
        </router-link>

        <router-link
          to="/anuncios"
          class="px-4 py-2 rounded-full text-sm text-gray-300 hover:text-white hover:bg-white/10"
          active-class="bg-primary text-white"
        >
          Anuncios
        </router-link>

        <router-link
          to="/contacto"
          class="px-4 py-2 rounded-full text-sm text-gray-300 hover:text-white hover:bg-white/10"
          active-class="bg-primary text-white"
        >
          Contacto
        </router-link>
      </div>

      <div class="hidden md:flex items-center gap-3">
        <span
          v-if="loadingAuth"
          class="text-sm text-gray-400"
        >
          Cargando...
        </span>

        <template v-else-if="isAuthenticated">
          <router-link
            to="/crear-anuncio"
            class="btn-primary py-2"
          >
            Publicar anuncio
          </router-link>

          <div class="text-right">
            <p class="text-sm text-white">
              {{ user?.username || user?.email || 'Usuario' }}
            </p>
            <p class="text-xs text-gray-400">
              Sesión activa
            </p>
          </div>

          <button
            type="button"
            class="btn-secondary py-2"
            @click="handleLogout"
          >
            Salir
          </button>
        </template>

        <template v-else>
          <router-link
            to="/login"
            class="btn-secondary py-2"
          >
            Entrar
          </router-link>

          <router-link
            to="/register"
            class="btn-primary py-2"
          >
            Crear cuenta
          </router-link>
        </template>
      </div>

      <button
        class="md:hidden w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-2xl"
        type="button"
        aria-label="Abrir menú"
        @click="menuOpen = !menuOpen"
      >
        <span v-if="!menuOpen">☰</span>
        <span v-else>×</span>
      </button>
    </nav>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="menuOpen"
        class="md:hidden mx-4 mb-4 card-dark p-4 space-y-3"
      >
        <router-link
          to="/"
          class="block px-4 py-3 rounded-xl hover:bg-white/10"
          active-class="bg-primary text-white"
          @click="closeMenu"
        >
          Inicio
        </router-link>

        <router-link
          to="/anuncios"
          class="block px-4 py-3 rounded-xl hover:bg-white/10"
          active-class="bg-primary text-white"
          @click="closeMenu"
        >
          Anuncios
        </router-link>

        <router-link
          to="/contacto"
          class="block px-4 py-3 rounded-xl hover:bg-white/10"
          active-class="bg-primary text-white"
          @click="closeMenu"
        >
          Contacto
        </router-link>

        <div class="pt-3 border-t border-white/10">
          <span
            v-if="loadingAuth"
            class="block text-sm text-gray-400"
          >
            Cargando...
          </span>

          <template v-else-if="isAuthenticated">
            <div class="mb-4 px-4">
              <p class="text-sm text-white">
                {{ user?.username || user?.email || 'Usuario' }}
              </p>
              <p class="text-xs text-gray-400">
                Sesión activa
              </p>
            </div>

            <router-link
              to="/crear-anuncio"
              class="block text-center btn-primary mb-3"
              @click="closeMenu"
            >
              Publicar anuncio
            </router-link>

            <button
              type="button"
              class="w-full btn-secondary"
              @click="handleLogout"
            >
              Cerrar sesión
            </button>
          </template>

          <template v-else>
            <router-link
              to="/login"
              class="block text-center btn-secondary mb-3"
              @click="closeMenu"
            >
              Entrar
            </router-link>

            <router-link
              to="/register"
              class="block text-center btn-primary"
              @click="closeMenu"
            >
              Crear cuenta
            </router-link>
          </template>
        </div>
      </div>
    </transition>
  </header>
</template>