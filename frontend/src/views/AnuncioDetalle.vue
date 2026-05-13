<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const route = useRoute()
const router = useRouter()

const anuncio = ref(null)
const loading = ref(false)
const error = ref('')

const fetchAnuncio = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await fetch(`${API_URL}/api/anuncios/${route.params.id}/`)

    if (!response.ok) {
      throw new Error('No se pudo cargar el anuncio')
    }

    anuncio.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchAnuncio()
})
</script>

<template>
  <section class="max-w-4xl mx-auto px-4 py-10">
    <button
      type="button"
      class="mb-6 text-gray-400 hover:text-primary transition"
      @click="router.back()"
    >
      ← Volver
    </button>

    <div v-if="loading" class="flex justify-center py-16">
      <div class="w-12 h-12 border-4 border-gray-700 border-t-primary rounded-full animate-spin"></div>
    </div>

    <div
      v-else-if="error"
      class="bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl p-4"
    >
      {{ error }}
    </div>

    <article
      v-else-if="anuncio"
      class="bg-darker rounded-2xl p-6 md:p-8 border border-gray-800"
    >
      <div class="mb-6">
        <p class="text-primary font-semibold mb-2">
          ErasmusStay
        </p>

        <h1 class="text-3xl md:text-4xl font-bold mb-3">
          {{ anuncio.titulo || anuncio.title || 'Anuncio sin título' }}
        </h1>

        <p class="text-primary text-3xl font-bold">
          {{ anuncio.precio || anuncio.price || 'Consultar' }}
          <span
            v-if="anuncio.precio || anuncio.price"
            class="text-base font-normal text-gray-400"
          >
            €/mes
          </span>
        </p>

        <p class="text-gray-400 mt-3">
          📍 {{ anuncio.localizacion || anuncio.location || 'Ubicación no especificada' }}
        </p>
      </div>

      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-3">
          Descripción
        </h2>

        <p class="text-gray-300 leading-relaxed whitespace-pre-line">
          {{ anuncio.descripcion || anuncio.description || 'Sin descripción disponible.' }}
        </p>
      </div>

      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-3">
          Características
        </h2>

        <div class="flex flex-wrap gap-2">
          <span
            v-if="anuncio.tipo_vivienda || anuncio.tipo"
            class="bg-darkest px-3 py-1 rounded-full text-sm text-gray-300"
          >
            {{ anuncio.tipo_vivienda || anuncio.tipo }}
          </span>

          <span
            v-if="anuncio.wifi"
            class="bg-darkest px-3 py-1 rounded-full text-sm text-gray-300"
          >
            Wifi
          </span>

          <span
            v-if="anuncio.terraza"
            class="bg-darkest px-3 py-1 rounded-full text-sm text-gray-300"
          >
            Terraza
          </span>

          <span
            v-if="anuncio.garaje"
            class="bg-darkest px-3 py-1 rounded-full text-sm text-gray-300"
          >
            Garaje
          </span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div class="bg-darkest rounded-xl p-4 border border-gray-800">
          <p class="text-sm text-gray-400 mb-1">
            Duración mínima
          </p>

          <p class="font-semibold">
            {{ anuncio.duracion_minima || anuncio.min_duration || 'No especificada' }}
          </p>
        </div>

        <div class="bg-darkest rounded-xl p-4 border border-gray-800">
          <p class="text-sm text-gray-400 mb-1">
            Duración máxima
          </p>

          <p class="font-semibold">
            {{ anuncio.duracion_maxima || anuncio.max_duration || 'No especificada' }}
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-3">
          Contacto
        </h2>

        <div class="bg-darkest rounded-xl p-4 border border-gray-800 space-y-2">
          <p>
            <span class="text-gray-400">Teléfono:</span>
            {{ anuncio.telefono || anuncio.phone || 'No disponible' }}
          </p>

          <p>
            <span class="text-gray-400">Email:</span>
            {{ anuncio.email || 'No disponible' }}
          </p>
        </div>
      </div>

      <div v-if="anuncio.valoraciones?.length">
        <h2 class="text-xl font-semibold mb-3">
          Valoraciones
        </h2>

        <div class="space-y-3">
          <div
            v-for="valoracion in anuncio.valoraciones"
            :key="valoracion.id"
            class="bg-darkest rounded-xl p-4 border border-gray-800"
          >
            <p class="font-semibold">
              {{ valoracion.usuario || valoracion.user || 'Usuario' }}
            </p>

            <p class="text-primary">
              {{ valoracion.puntuacion || valoracion.rating }} / 5
            </p>

            <p class="text-gray-300 text-sm mt-1">
              {{ valoracion.comentario || valoracion.comment }}
            </p>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>