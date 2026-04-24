<template>
  <nav class="navbar">
    <router-link to="/" class="brand">🛒 MiniComercio</router-link>
    <div class="nav-links">
      <router-link to="/tienda">Tienda</router-link>
      <router-link v-if="isAdmin" to="/admin">Admin</router-link>
      <router-link to="/carrito" class="carrito-btn">
        🛒 <span v-if="cantidadCarrito > 0" class="badge">{{ cantidadCarrito }}</span>
      </router-link>
      <span v-if="isAuthenticated" class="usuario">{{ usuarioNombre }}</span>
      <button v-if="isAuthenticated" @click="cerrarSesion">Salir</button>
      <router-link v-else to="/login">Ingresar</router-link>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'NavBar',
  computed: { ...mapGetters(['isAuthenticated', 'isAdmin', 'usuarioNombre', 'cantidadCarrito']) },
  methods: {
    ...mapActions(['logout']),
    cerrarSesion() { this.logout(); this.$router.push('/login'); }
  }
}
</script>

<style scoped>
.navbar { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.brand { font-size: 1.4rem; font-weight: bold; color: #38a169; text-decoration: none; }
.nav-links { display: flex; align-items: center; gap: 20px; }
.nav-links a { color: #4a5568; text-decoration: none; font-weight: 500; }
.nav-links a:hover, .nav-links a.router-link-active { color: #38a169; }
.carrito-btn { position: relative; }
.badge { position: absolute; top: -8px; right: -10px; background: #fc8181; color: white; border-radius: 50%; padding: 2px 6px; font-size: 0.7rem; }
.usuario { color: #718096; font-size: 0.9rem; }
button { padding: 8px 16px; background: #fc8181; color: white; border: none; border-radius: 6px; cursor: pointer; }
</style>
