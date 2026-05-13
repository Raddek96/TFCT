<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const router = useRouter()
const { getAuthHeaders } = useAuth()

const loading = ref(false)
const error = ref('')
const success = ref('')

const form = ref({
  titulo: '',
  descripcion: '',
  precio: '',
  localizacion: '',
  tipo_vivienda: '',
  duracion_minima: '',
  duracion_maxima: '',
  telefono: '',
  email: '',
  wifi: false,
  terraza: false,
  garaje: false,
})

const handleSubmit = async () => {
  error.value = ''
  success.value = ''

  if (!form.value.titulo || !form.value.descripcion || !form.value.precio || !form.value.localizacion) {
    error.value = 'Rellena título, descripción, precio y localización.'
    return
  }

  loading.value = true

  try {
    const payload = {
      ...form.value,
      precio: Number(form.value.precio),
    }

    const response = await fetch(`${API_URL}/api/anuncios/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        data.detail ||
        data.error ||
        data.titulo?.[0] ||
        data.descripcion?.[0] ||
        data.precio?.[0] ||
        'No se pudo crear el anuncio.'
      )
    }

    success.value = 'Anuncio creado correctamente.'

    setTimeout(() => {
      router.push(`/anuncio/${data.id}`)
    }, 1000)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="max-w-5xl mx-auto px-4 py-12">
    <div class="mb-8">
      <div class="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2 mb-5">
        <span class="w-2 h-2 rounded-full bg-primary"></span>
        <span class="text-sm text-gray-300">
          Nuevo anuncio
        </span>
      </div>

      <h1 class="text-4xl md:text-5xl font-black tracking-tight mb-4">
        Publicar alojamiento
      </h1>

      <p class="text-gray-300 max-w-2xl">
        Crea un anuncio para que otros estudiantes puedan encontrar tu alojamiento.
      </p>
    </div>

    <form
      class="card-dark p-6 md:p-8 space-y-8"
      @submit.prevent="handleSubmit"
    >
      <div>
        <h2 class="text-2xl font-bold mb-5">
          Información principal
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div class="md:col-span-2">
            <label class="block text-sm text-gray-400 mb-2">
              Título
            </label>

            <input
              v-model="form.titulo"
              type="text"
              class="input-dark"
              placeholder="Habitación luminosa en Sliema"
            />
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-2">
              Precio mensual
            </label>

            <input
              v-model="form.precio"
              type="number"
              min="0"
              class="input-dark"
              placeholder="550"
            />
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-2">
              Localización
            </label>

            <input
              v-model="form.localizacion"
              type="text"
              class="input-dark"
              placeholder="Sliema"
            />
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-2">
              Tipo de vivienda
            </label>

            <select
              v-model="form.tipo_vivienda"
              class="input-dark"
            >
              <option value="">Selecciona una opción</option>
              <option value="habitacion">Habitación</option>
              <option value="piso">Piso completo</option>
              <option value="estudio">Estudio</option>
            </select>
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-2">
              Duración mínima
            </label>

            <input
              v-model="form.duracion_minima"
              type="text"
              class="input-dark"
              placeholder="3 meses"
            />
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm text-gray-400 mb-2">
              Descripción
            </label>

            <textarea
              v-model="form.descripcion"
              rows="6"
              class="input-dark resize-none"
              placeholder="Describe el alojamiento, la zona, normas, gastos incluidos..."
            ></textarea>
          </div>
        </div>
      </div>

      <div>
        <h2 class="text-2xl font-bold mb-5">
          Servicios
        </h2>

        <div class="flex flex-wrap gap-3">
          <label class="flex items-center gap-2 text-sm text-gray-300 bg-white/5 border border-white/10 rounded-full px-4 py-2">
            <input
              v-model="form.wifi"
              type="checkbox"
              class="accent-[#e94560]"
            />
            Wifi
          </label>

          <label class="flex items-center gap-2 text-sm text-gray-300 bg-white/5 border border-white/10 rounded-full px-4 py-2">
            <input
              v-model="form.terraza"
              type="checkbox"
              class="accent-[#e94560]"
            />
            Terraza
          </label>

          <label class="flex items-center gap-2 text-sm text-gray-300 bg-white/5 border border-white/10 rounded-full px-4 py-2">
            <input
              v-model="form.garaje"
              type="checkbox"
              class="accent-[#e94560]"
            />
            Garaje
          </label>
        </div>
      </div>

      <div>
        <h2 class="text-2xl font-bold mb-5">
          Contacto
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label class="block text-sm text-gray-400 mb-2">
              Teléfono
            </label>

            <input
              v-model="form.telefono"
              type="text"
              class="input-dark"
              placeholder="+356 0000 0000"
            />
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-2">
              Email
            </label>

            <input
              v-model="form.email"
              type="email"
              class="input-dark"
              placeholder="contacto@email.com"
            />
          </div>
        </div>
      </div>

      <div
        v-if="error"
        class="bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl p-4 text-sm"
      >
        {{ error }}
      </div>

      <div
        v-if="success"
        class="bg-green-500/10 border border-green-500/30 text-green-300 rounded-xl p-4 text-sm"
      >
        {{ success }}
      </div>

      <div class="flex flex-col sm:flex-row gap-3 sm:justify-end">
        <router-link
          to="/anuncios"
          class="btn-secondary text-center"
        >
          Cancelar
        </router-link>

        <button
          type="submit"
          class="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
          :disabled="loading"
        >
          <span v-if="loading">Publicando...</span>
          <span v-else>Publicar anuncio</span>
        </button>
      </div>
    </form>
  </section>
</template>