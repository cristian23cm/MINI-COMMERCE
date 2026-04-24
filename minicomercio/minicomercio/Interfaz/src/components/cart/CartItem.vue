<template>
  <div class="cart-item">
    <img :src="item.imagen || 'https://via.placeholder.com/80'" :alt="item.nombre" />
    <div class="details">
      <h4>{{ item.nombre }}</h4>
      <p>${{ item.precio }}</p>
    </div>
    <div class="controls">
      <button @click="$emit('actualizar', { id: item._id, cantidad: item.cantidad - 1 })">-</button>
      <span>{{ item.cantidad }}</span>
      <button @click="$emit('actualizar', { id: item._id, cantidad: item.cantidad + 1 })">+</button>
    </div>
    <span class="subtotal">${{ (item.precio * item.cantidad).toFixed(2) }}</span>
    <button class="btn-remove" @click="$emit('quitar', item._id)">✕</button>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: { item: { type: Object, required: true } },
  emits: ['quitar', 'actualizar']
}
</script>

<style scoped>
.cart-item { display: flex; align-items: center; gap: 16px; background: white; padding: 16px; border-radius: 10px; margin-bottom: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
img { width: 80px; height: 80px; object-fit: cover; border-radius: 8px; }
.details { flex: 1; }
h4 { margin: 0 0 4px; color: #2d3748; }
p { color: #718096; margin: 0; }
.controls { display: flex; align-items: center; gap: 10px; }
.controls button { width: 30px; height: 30px; border: 1px solid #e2e8f0; background: white; border-radius: 6px; cursor: pointer; font-size: 1rem; }
.subtotal { font-weight: bold; color: #38a169; min-width: 70px; text-align: right; }
.btn-remove { background: none; border: none; color: #fc8181; cursor: pointer; font-size: 1.2rem; }
</style>
