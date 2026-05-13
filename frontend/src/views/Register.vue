<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const password2 = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

const handleSubmit = async () => {
  error.value = ''
  success.value = ''

  if (!username.value || !email.value || !password.value || !password2.value) {
    error.value = 'Rellena todos los campos.'
    return
  }

  if (password.value !== password2.value) {
    error.value = 'Las contraseñas no coinciden.'
    return
  }

  loading.value = true

  try {
    const response = await fetch(`${API_URL}/api/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
        password2: password2.value,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        data.error ||
        data.detail ||
        data.username?.[0] ||
        data.email?.[0] ||
        data.password?.[0] ||
        'No se pudo crear la cuenta.'
      )
    }

    success.value = 'Cuenta creada correctamente. Redirigiendo al login...'

    setTimeout(() => {
      router.push('/login')
    }, 1200)
  } catch (err) {
    error.value = err.message
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
            Nueva cuenta
          </span>
        </div>

        <h1 class="text-4xl md:text-6xl font-black tracking-tight mb-5">
          Únete a
          <span class="text-primary"> ErasmusStay</span>
        </h1>

        <p class="text-lg text-gray-300 max-w-xl leading-relaxed">
          Crea una cuenta para publicar anuncios, gestionar tu perfil y contactar con otros usuarios.
        </p>
      </div>

      <div class="card-dark p-6 md:p-8 max-w-md w-full mx-auto">
        <div class="mb-6">
          <h2 class="text-2xl font-bold mb-2">
            Crear cuenta
          </h2>

          <p class="text-gray-400 text-sm">
            Introduce tus datos para registrarte.
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
              Email
            </label>

            <input
              v-model="email"
              type="email"
              autocomplete="email"
              placeholder="tu@email.com"
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
              autocomplete="new-password"
              placeholder="••••••••"
              class="input-dark"
            />
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-2">
              Repite la contraseña
            </label>

            <input
              v-model="password2"
              type="password"
              autocomplete="new-password"
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

          <div
            v-if="success"
            class="bg-green-500/10 border border-green-500/30 text-green-300 rounded-xl p-3 text-sm"
          >
            {{ success }}
          </div>

          <button
            type="submit"
            class="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
            :disabled="loading"
          >
            <span v-if="loading">Creando cuenta...</span>
            <span v-else>Crear cuenta</span>
          </button>
        </form>

        <div class="mt-6 pt-6 border-t border-white/10">
          <p class="text-sm text-gray-400">
            ¿Ya tienes cuenta?
            <router-link
              to="/login"
              class="text-primary hover:underline"
            >
              Inicia sesión
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>