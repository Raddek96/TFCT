<script setup>
import { onMounted } from 'vue'
import Navigation from './components/Navigation.vue'
import { useAuth } from './composables/useAuth'

const { restoreSession } = useAuth()

onMounted(() => {
  restoreSession()
})
</script>

<template>
  <div class="min-h-screen bg-darkest text-white flex flex-col">
    <Navigation />

    <main class="flex-1">
      <router-view />
    </main>

    <footer class="bg-darkest text-gray-400 py-8 border-t border-gray-800">
      <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-primary font-bold text-lg">
            ErasmusStay
          </h3>

          <p class="text-sm mt-2">
            Encuentra tu piso en Malta para estudiantes Erasmus
          </p>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-2">
            Enlaces
          </h4>

          <ul class="space-y-1 text-sm">
            <li>
              <router-link
                to="/"
                class="hover:text-primary transition"
              >
                Inicio
              </router-link>
            </li>

            <li>
              <router-link
                to="/anuncios"
                class="hover:text-primary transition"
              >
                Anuncios
              </router-link>
            </li>

            <li>
              <router-link
                to="/contacto"
                class="hover:text-primary transition"
              >
                Contacto
              </router-link>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-2">
            Contacto
          </h4>

          <p class="text-sm">
            info@erasmusstay.com
          </p>
        </div>
      </div>

      <div class="border-t border-gray-700 mt-6 pt-4 text-center text-xs">
        © 2025 ErasmusStay
      </div>
    </footer>
  </div>
</template>