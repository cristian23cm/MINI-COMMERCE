<template>
  <div>
    <div class="header">
      <h1>Productos</h1>
      <button @click="mostrarFormulario = true">+ Nuevo Producto</button>
    </div>
    <ProductoForm v-if="mostrarFormulario" @guardar="guardarProducto" @cancelar="mostrarFormulario = false" />
    <table>
      <thead><tr><th>Nombre</th><th>Precio</th><th>Stock</th><th>Categoría</th><th>Acciones</th></tr></thead>
      <tbody>
        <tr v-for="p in productos" :key="p._id">
          <td>{{ p.nombre }}</td>
          <td>${{ p.precio }}</td>
          <td>{{ p.stock }}</td>
          <td>{{ p.categoria }}</td>
          <td>
            <button class="btn-edit" @click="editarProducto(p)">Editar</button>
            <button class="btn-del" @click="eliminarProducto(p._id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ProductoForm from '@/components/product/ProductoForm.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ProductsAdminView',
  components: { ProductoForm },
  data() { return { mostrarFormulario: false } },
  computed: { ...mapGetters(['productos']) },
  methods: {
    ...mapActions(['cargarProductos', 'crearProducto', 'actualizarProducto', 'eliminarProducto']),
    async guardarProducto(data) {
      if (data._id) await this.actualizarProducto(data);
      else await this.crearProducto(data);
      this.mostrarFormulario = false;
    },
    editarProducto(p) { this.mostrarFormulario = true; }
  },
  created() { this.cargarProductos() }
}
</script>

<style scoped>
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
h1 { color: #2d3748; }
.header button { padding: 10px 20px; background: #48bb78; color: white; border: none; border-radius: 8px; cursor: pointer; }
table { width: 100%; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); border-collapse: collapse; }
th { background: #f7fafc; padding: 12px 16px; text-align: left; }
td { padding: 12px 16px; border-top: 1px solid #f0f0f0; }
.btn-edit { padding: 6px 12px; background: #4299e1; color: white; border: none; border-radius: 6px; cursor: pointer; margin-right: 6px; }
.btn-del { padding: 6px 12px; background: #fc8181; color: white; border: none; border-radius: 6px; cursor: pointer; }
</style>
