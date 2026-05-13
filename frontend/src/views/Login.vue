<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const router = useRouter()
const { login } = useAuth()

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleSubmit = async () => {
  error.value = ''

  if (!username.value || !password.value) {
    error.value = 'Introduce usuario y contraseña.'
    return
  }

  loading.value = true

  try {
    const response = await fetch(`${API_URL}/api/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })

    let data = {}

    try {
      data = await response.json()
    } catch {
      data = {}
    }

    if (!response.ok) {
      throw new Error(
        data.detail ||
        data.error ||
        data.non_field_errors?.[0] ||
        'Credenciales incorrectas.'
      )
    }

    const token = data.token || data.key || data.access

    if (!token) {
      throw new Error('El backend no devolvió ningún token.')
    }

    login(token, data.user || {
      username: username.value,
      email: data.email || '',
      rol: data.rol || '',
    })

    router.push('/')
  } catch (err) {
    error.value = err.message || 'Error al iniciar sesión.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 py-16">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      <div>
        <div class="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2 mb-5">
          <span class="w-2 h-2 rounded-full bg-primary"></span>
          <span class="text-sm text-gray-300">
            Acceso privado
          </span>
        </div>

        <h1 class="text-4xl md:text-6xl font-black tracking-tight mb-5">
          Accede a tu cuenta de
          <span class="text-primary"> ErasmusStay</span>
        </h1>

        <p class="text-lg text-gray-300 max-w-xl leading-relaxed">
          Inicia sesión para publicar anuncios, gestionar alojamientos y contactar con otros usuarios.
        </p>

        <div class="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl">
          <div class="card-dark p-4">
            <p class="text-2xl font-black text-primary">🏠</p>
            <p class="text-sm text-gray-300 mt-2">Publica anuncios</p>
          </div>

          <div class="card-dark p-4">
            <p class="text-2xl font-black text-primary">🔐</p>
            <p class="text-sm text-gray-300 mt-2">Acceso seguro</p>
          </div>

          <div class="card-dark p-4">
            <p class="text-2xl font-black text-primary">🌍</p>
            <p class="text-sm text-gray-300 mt-2">Erasmus Malta</p>
          </div>
        </div>
      </div>

      <div class="card-dark p-6 md:p-8 max-w-md w-full mx-auto">
        <div class="mb-6">
          <h2 class="text-2xl font-bold mb-2">
            Iniciar sesión
          </h2>

          <p class="text-gray-400 text-sm">
            Introduce tus credenciales para continuar.
          </p>
        </div>

        <form class="space-y-5" @submit.prevent="handleSubmit">
          <div>
            <label class="block text-sm text-gray-400 mb-2">
              Usuario
            </label>

            <input
              v-model="username"
              type="text"
              autocomplete="username"
              placeholder="Tu usuario"
              class="input-dark"
            />
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-2">
              Contraseña
            </label>

            <input
              v-model="password"
              type="password"
              autocomplete="current-password"
              placeholder="••••••••"
              class="input-dark"
            />
          </div>

          <div
            v-if="error"
            class="bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl p-3 text-sm"
          >
            {{ error }}
          </div>

          <button
            type="submit"
            class="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
            :disabled="loading"
          >
            <span v-if="loading">Entrando...</span>
            <span v-else>Entrar</span>
          </button>
        </form>

        <div class="mt-6 pt-6 border-t border-white/10">
          <p class="text-sm text-gray-400">
            ¿Todavía no tienes cuenta?
            <router-link
              to="/register"
              class="text-primary hover:underline"
            >
              Crear cuenta
            </router-link>
          </p>
        </div>

        <div class="mt-4">
          <router-link
            to="/"
            class="text-sm text-gray-500 hover:text-primary"
          >
            ← Volver al inicio
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>