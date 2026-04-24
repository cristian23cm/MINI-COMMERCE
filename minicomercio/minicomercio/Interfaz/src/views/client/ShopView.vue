<template>
  <div class="tienda">
    <h1>Tienda</h1>
    <div class="filtros">
      <input v-model="busqueda" type="text" placeholder="Buscar productos..." />
      <select v-model="categoriaFiltro">
        <option value="">Todas las categorías</option>
        <option v-for="cat in categorias" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>
    <div class="grid">
      <ProductoCard
        v-for="producto in productosFiltrados"
        :key="producto._id"
        :producto="producto"
        @agregar-carrito="agregarAlCarrito"
      />
    </div>
    <p v-if="productosFiltrados.length === 0" class="vacio">No se encontraron productos</p>
  </div>
</template>

<script>
import ProductoCard from '@/components/product/ProductoCard.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ShopView',
  components: { ProductoCard },
  data() { return { busqueda: '', categoriaFiltro: '' } },
  computed: {
    ...mapGetters(['productos']),
    categorias() { return [...new Set(this.productos.map(p => p.categoria).filter(Boolean))] },
    productosFiltrados() {
      return this.productos.filter(p => {
        const matchBusqueda = p.nombre.toLowerCase().includes(this.busqueda.toLowerCase());
        const matchCategoria = !this.categoriaFiltro || p.categoria === this.categoriaFiltro;
        return matchBusqueda && matchCategoria;
      });
    }
  },
  methods: { ...mapActions(['cargarProductos', 'agregarAlCarrito']) },
  created() { this.cargarProductos() }
}
</script>

<style scoped>
h1 { color: #2d3748; margin-bottom: 24px; }
.filtros { display: flex; gap: 16px; margin-bottom: 24px; }
.filtros input, .filtros select { padding: 10px 14px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 1rem; }
.filtros input { flex: 1; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 24px; }
.vacio { text-align: center; color: #718096; padding: 40px; }
</style>
