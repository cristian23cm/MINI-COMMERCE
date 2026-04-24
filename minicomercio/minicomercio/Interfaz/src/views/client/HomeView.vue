<template>
  <div class="home">
    <section class="hero">
      <h1>Bienvenido a MiniComercio</h1>
      <p>Encuentra los mejores productos al mejor precio</p>
      <router-link to="/tienda" class="btn-hero">Ver Tienda</router-link>
    </section>
    <section class="productos-destacados">
      <h2>Productos Destacados</h2>
      <div class="grid">
        <ProductoCard
          v-for="producto in productosDestacados"
          :key="producto._id"
          :producto="producto"
          @agregar-carrito="agregarAlCarrito"
        />
      </div>
    </section>
  </div>
</template>

<script>
import ProductoCard from '@/components/product/ProductoCard.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'HomeView',
  components: { ProductoCard },
  computed: {
    ...mapGetters(['productosDestacados'])
  },
  methods: {
    ...mapActions(['agregarAlCarrito', 'cargarProductos'])
  },
  created() {
    this.cargarProductos();
  }
}
</script>

<style scoped>
.hero { text-align: center; padding: 60px 20px; background: linear-gradient(135deg, #48bb78, #38a169); color: white; border-radius: 12px; margin-bottom: 40px; }
.hero h1 { font-size: 2.5rem; margin-bottom: 12px; }
.btn-hero { display: inline-block; margin-top: 20px; padding: 14px 32px; background: white; color: #38a169; border-radius: 8px; font-weight: bold; text-decoration: none; }
h2 { margin-bottom: 24px; color: #2d3748; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 24px; }
</style>
