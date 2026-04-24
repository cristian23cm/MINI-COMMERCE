<template>
  <div>
    <h2>Crear Cuenta</h2>
    <form @submit.prevent="handleRegistro">
      <div class="form-group">
        <label>Nombre</label>
        <input v-model="form.nombre" type="text" placeholder="Tu nombre completo" required />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input v-model="form.email" type="email" placeholder="correo@ejemplo.com" required />
      </div>
      <div class="form-group">
        <label>Contraseña</label>
        <input v-model="form.password" type="password" placeholder="Mínimo 6 caracteres" required />
      </div>
      <p v-if="error" class="error">{{ error }}</p>
      <button type="submit" :disabled="cargando">
        {{ cargando ? 'Registrando...' : 'Registrarse' }}
      </button>
      <p class="link">¿Ya tienes cuenta? <router-link to="/login">Inicia sesión</router-link></p>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'RegisterView',
  data() {
    return { form: { nombre: '', email: '', password: '' }, error: '', cargando: false }
  },
  methods: {
    ...mapActions(['registrar']),
    async handleRegistro() {
      this.cargando = true;
      this.error = '';
      try {
        await this.registrar(this.form);
        this.$router.push('/tienda');
      } catch (e) {
        this.error = e.response?.data?.mensaje || 'Error al registrarse';
      } finally {
        this.cargando = false;
      }
    }
  }
}
</script>

<style scoped>
h2 { text-align: center; margin-bottom: 24px; color: #2d3748; }
.form-group { margin-bottom: 16px; }
label { display: block; margin-bottom: 6px; font-weight: 500; color: #4a5568; }
input { width: 100%; padding: 10px 14px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 1rem; box-sizing: border-box; }
button { width: 100%; padding: 12px; background: #48bb78; color: white; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; }
button:hover { background: #38a169; }
.error { color: #e53e3e; font-size: 0.875rem; }
.link { text-align: center; margin-top: 16px; font-size: 0.9rem; }
</style>
