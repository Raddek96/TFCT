<script setup>
import { onMounted, ref } from 'vue'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const anuncios = ref([])
const loading = ref(false)
const error = ref('')

const currentPage = ref(1)
const totalPages = ref(1)
const nextUrl = ref(null)
const previousUrl = ref(null)

const filters = ref({
  search: '',
  tipo: '',
  precioMin: '',
  precioMax: '',
  wifi: false,
  terraza: false,
  garaje: false,
})

const buildQuery = () => {
  const params = new URLSearchParams()

  if (filters.value.search) params.append('search', filters.value.search)
  if (filters.value.tipo) params.append('tipo', filters.value.tipo)
  if (filters.value.precioMin) params.append('precio_min', filters.value.precioMin)
  if (filters.value.precioMax) params.append('precio_max', filters.value.precioMax)
  if (filters.value.wifi) params.append('wifi', 'true')
  if (filters.value.terraza) params.append('terraza', 'true')
  if (filters.value.garaje) params.append('garaje', 'true')

  params.append('page', currentPage.value)

  return params.toString()
}

const fetchAnuncios = async (url = null) => {
  loading.value = true
  error.value = ''

  try {
    const endpoint = url || `${API_URL}/api/anuncios/?${buildQuery()}`
    const response = await fetch(endpoint)

    if (!response.ok) {
      throw new Error('No se pudieron cargar los anuncios')
    }

    const data = await response.json()

    anuncios.value = data.results || data
    nextUrl.value = data.next || null
    previousUrl.value = data.previous || null

    if (data.count) {
      totalPages.value = Math.ceil(data.count / 10) || 1
    } else {
      totalPages.value = 1
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const applyFilters = () => {
  currentPage.value = 1
  fetchAnuncios()
}

const clearFilters = () => {
  filters.value = {
    search: '',
    tipo: '',
    precioMin: '',
    precioMax: '',
    wifi: false,
    terraza: false,
    garaje: false,
  }

  currentPage.value = 1
  fetchAnuncios()
}

const goNext = () => {
  if (!nextUrl.value) return
  currentPage.value += 1
  fetchAnuncios(nextUrl.value)
}

const goPrevious = () => {
  if (!previousUrl.value) return
  currentPage.value -= 1
  fetchAnuncios(previousUrl.value)
}

const getInitial = (text) => {
  return (text || 'E').charAt(0).toUpperCase()
}

onMounted(() => {
  fetchAnuncios()
})
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 py-10">
    <div class="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center mb-10">
      <div>
        <div class="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2 mb-5">
          <span class="w-2 h-2 rounded-full bg-primary"></span>
          <span class="text-sm text-gray-300">
            Alojamientos para Erasmus en Malta
          </span>
        </div>

        <h1 class="text-4xl md:text-6xl font-black tracking-tight mb-5">
          Encuentra tu piso ideal
          <span class="text-primary">sin complicarte</span>
        </h1>

        <p class="text-lg text-gray-300 max-w-2xl leading-relaxed">
          Busca habitaciones, estudios y pisos completos cerca de las zonas más populares de Malta.
        </p>

        <div class="flex flex-wrap gap-3 mt-7">
          <a href="#listado" class="btn-primary">
            Ver anuncios
          </a>

          <router-link to="/contacto" class="btn-secondary">
            Contactar
          </router-link>
        </div>
      </div>

      <div class="card-dark p-5">
        <div class="bg-gradient-to-br from-primary/30 to-blue-500/20 rounded-2xl p-5 border border-white/10">
          <div class="bg-darkest/70 rounded-2xl p-5 backdrop-blur">
            <p class="text-gray-400 text-sm mb-2">
              Destacado
            </p>

            <h2 class="text-2xl font-bold mb-3">
              Vive tu Erasmus en Malta
            </h2>

            <p class="text-gray-300 text-sm mb-5">
              Filtra por zona, precio, tipo de vivienda y servicios incluidos.
            </p>

            <div class="grid grid-cols-3 gap-3">
              <div class="bg-white/10 rounded-xl p-3">
                <p class="text-2xl font-black text-primary">
                  {{ anuncios.length }}
                </p>
                <p class="text-xs text-gray-400">
                  anuncios
                </p>
              </div>

              <div class="bg-white/10 rounded-xl p-3">
                <p class="text-2xl font-black text-primary">
                  3
                </p>
                <p class="text-xs text-gray-400">
                  filtros
                </p>
              </div>

              <div class="bg-white/10 rounded-xl p-3">
                <p class="text-2xl font-black text-primary">
                  24/7
                </p>
                <p class="text-xs text-gray-400">
                  acceso
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      id="listado"
      class="card-dark p-5 md:p-6 mb-8"
    >
      <div class="flex items-center justify-between gap-4 mb-5">
        <div>
          <h2 class="text-2xl font-bold">
            Busca tu alojamiento
          </h2>

          <p class="text-sm text-gray-400 mt-1">
            Ajusta los filtros para encontrar mejores resultados.
          </p>
        </div>

        <button
          type="button"
          class="hidden md:inline-flex btn-secondary py-2"
          @click="clearFilters"
        >
          Limpiar
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm text-gray-400 mb-2">
            Localización
          </label>

          <input
            v-model="filters.search"
            type="text"
            placeholder="Sliema, Valletta..."
            class="input-dark"
            @keyup.enter="applyFilters"
          />
        </div>

        <div>
          <label class="block text-sm text-gray-400 mb-2">
            Tipo
          </label>

          <select
            v-model="filters.tipo"
            class="input-dark"
          >
            <option value="">Todos</option>
            <option value="habitacion">Habitación</option>
            <option value="piso">Piso completo</option>
            <option value="estudio">Estudio</option>
          </select>
        </div>

        <div>
          <label class="block text-sm text-gray-400 mb-2">
            Precio mínimo
          </label>

          <input
            v-model="filters.precioMin"
            type="number"
            min="0"
            placeholder="300"
            class="input-dark"
            @keyup.enter="applyFilters"
          />
        </div>

        <div>
          <label class="block text-sm text-gray-400 mb-2">
            Precio máximo
          </label>

          <input
            v-model="filters.precioMax"
            type="number"
            min="0"
            placeholder="900"
            class="input-dark"
            @keyup.enter="applyFilters"
          />
        </div>
      </div>

      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-5">
        <div class="flex flex-wrap gap-3">
          <label class="flex items-center gap-2 text-sm text-gray-300 bg-white/5 border border-white/10 rounded-full px-4 py-2">
            <input v-model="filters.wifi" type="checkbox" class="accent-[#e94560]" />
            Wifi
          </label>

          <label class="flex items-center gap-2 text-sm text-gray-300 bg-white/5 border border-white/10 rounded-full px-4 py-2">
            <input v-model="filters.terraza" type="checkbox" class="accent-[#e94560]" />
            Terraza
          </label>

          <label class="flex items-center gap-2 text-sm text-gray-300 bg-white/5 border border-white/10 rounded-full px-4 py-2">
            <input v-model="filters.garaje" type="checkbox" class="accent-[#e94560]" />
            Garaje
          </label>
        </div>

        <div class="flex gap-3">
          <button
            type="button"
            class="md:hidden btn-secondary flex-1"
            @click="clearFilters"
          >
            Limpiar
          </button>

          <button
            type="button"
            class="btn-primary flex-1 md:flex-none"
            @click="applyFilters"
          >
            Filtrar resultados
          </button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in 6"
        :key="item"
        class="card-dark p-5 animate-pulse"
      >
        <div class="h-40 bg-white/10 rounded-2xl mb-5"></div>
        <div class="h-5 bg-white/10 rounded w-3/4 mb-3"></div>
        <div class="h-5 bg-white/10 rounded w-1/3 mb-4"></div>
        <div class="h-4 bg-white/10 rounded w-full mb-2"></div>
        <div class="h-4 bg-white/10 rounded w-2/3"></div>
      </div>
    </div>

    <div
      v-else-if="error"
      class="bg-red-500/10 border border-red-500/30 text-red-300 rounded-2xl p-5"
    >
      {{ error }}
    </div>

    <div
      v-else-if="anuncios.length"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <article
        v-for="anuncio in anuncios"
        :key="anuncio.id"
        class="group card-dark overflow-hidden hover:-translate-y-1 hover:shadow-primary/10 transition duration-300"
      >
        <div class="h-44 bg-gradient-to-br from-primary/30 via-[#0f3460]/60 to-[#16213e] relative overflow-hidden">
          <div class="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,_white,_transparent_30%)]"></div>

          <div class="absolute top-4 left-4">
            <span class="bg-black/35 backdrop-blur border border-white/10 text-white text-xs px-3 py-1 rounded-full">
              {{ anuncio.tipo_vivienda || anuncio.tipo || 'Alojamiento' }}
            </span>
          </div>

          <div class="absolute bottom-4 left-4 w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <span class="text-2xl font-black">
              {{ getInitial(anuncio.localizacion || anuncio.location) }}
            </span>
          </div>
        </div>

        <div class="p-5">
          <div class="mb-4">
            <h2 class="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary">
              {{ anuncio.titulo || anuncio.title || 'Anuncio sin título' }}
            </h2>

            <p class="text-gray-400">
              📍 {{ anuncio.localizacion || anuncio.location || 'Ubicación no especificada' }}
            </p>
          </div>

          <p class="text-3xl font-black text-primary mb-4">
            {{ anuncio.precio || anuncio.price || 'Consultar' }}
            <span
              v-if="anuncio.precio || anuncio.price"
              class="text-sm font-normal text-gray-400"
            >
              €/mes
            </span>
          </p>

          <p class="text-sm text-gray-300 line-clamp-3 mb-5">
            {{ anuncio.descripcion || anuncio.description || 'Sin descripción disponible.' }}
          </p>

          <div class="flex flex-wrap gap-2 mb-5">
            <span
              v-if="anuncio.wifi"
              class="text-xs bg-white/10 border border-white/10 px-3 py-1 rounded-full text-gray-300"
            >
              Wifi
            </span>

            <span
              v-if="anuncio.terraza"
              class="text-xs bg-white/10 border border-white/10 px-3 py-1 rounded-full text-gray-300"
            >
              Terraza
            </span>

            <span
              v-if="anuncio.garaje"
              class="text-xs bg-white/10 border border-white/10 px-3 py-1 rounded-full text-gray-300"
            >
              Garaje
            </span>
          </div>

          <router-link
            :to="`/anuncio/${anuncio.id}`"
            class="inline-flex items-center justify-center w-full btn-primary"
          >
            Ver detalle
          </router-link>
        </div>
      </article>
    </div>

    <div
      v-else
      class="card-dark p-10 text-center"
    >
      <div class="w-16 h-16 mx-auto rounded-2xl bg-white/10 flex items-center justify-center mb-4">
        <span class="text-3xl">🏠</span>
      </div>

      <h2 class="text-2xl font-bold mb-2">
        No se encontraron anuncios
      </h2>

      <p class="text-gray-400 mb-5">
        Prueba cambiando los filtros de búsqueda.
      </p>

      <button
        type="button"
        class="btn-primary"
        @click="clearFilters"
      >
        Limpiar filtros
      </button>
    </div>

    <div
      v-if="!loading && !error && anuncios.length"
      class="flex items-center justify-center gap-4 mt-10"
    >
      <button
        type="button"
        class="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="!previousUrl"
        @click="goPrevious"
      >
        Anterior
      </button>

      <span class="text-sm text-gray-400">
        Página {{ currentPage }} de {{ totalPages }}
      </span>

      <button
        type="button"
        class="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="!nextUrl"
        @click="goNext"
      >
        Siguiente
      </button>
    </div>
  </section>
</template>