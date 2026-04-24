<template>
  <div class="producto-card">
    <img :src="producto.imagen || 'https://via.placeholder.com/240x160?text=Producto'" :alt="producto.nombre" />
    <div class="info">
      <h3>{{ producto.nombre }}</h3>
      <p class="desc">{{ producto.descripcion }}</p>
      <div class="footer">
        <span class="precio">${{ producto.precio }}</span>
        <button @click="$emit('agregar-carrito', producto)" :disabled="producto.stock === 0">
          {{ producto.stock === 0 ? 'Agotado' : '+ Agregar' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductoCard',
  props: { producto: { type: Object, required: true } },
  emits: ['agregar-carrito']
}
</script>

<style scoped>
.producto-card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08); transition: transform 0.2s; }
.producto-card:hover { transform: translateY(-4px); }
img { width: 100%; height: 160px; object-fit: cover; }
.info { padding: 16px; }
h3 { margin: 0 0 8px; color: #2d3748; }
.desc { font-size: 0.85rem; color: #718096; margin-bottom: 16px; }
.footer { display: flex; justify-content: space-between; align-items: center; }
.precio { font-size: 1.2rem; font-weight: bold; color: #38a169; }
button { padding: 8px 16px; background: #48bb78; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 0.875rem; }
button:disabled { background: #cbd5e0; cursor: not-allowed; }
button:hover:not(:disabled) { background: #38a169; }
</style>
