<template>
  <div class="pedidos">
    <h1>Mis Pedidos</h1>
    <div v-if="pedidos.length > 0">
      <div v-for="pedido in pedidos" :key="pedido._id" class="pedido-card">
        <div class="pedido-header">
          <span>Pedido #{{ pedido._id.slice(-6).toUpperCase() }}</span>
          <span :class="['estado', pedido.estado]">{{ pedido.estado }}</span>
        </div>
        <p>Total: <strong>${{ pedido.total.toFixed(2) }}</strong></p>
        <p class="fecha">{{ new Date(pedido.createdAt).toLocaleDateString('es-CO') }}</p>
      </div>
    </div>
    <p v-else class="vacio">No tienes pedidos aún</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'OrdersView',
  computed: { ...mapGetters(['pedidos']) },
  methods: { ...mapActions(['cargarMisPedidos']) },
  created() { this.cargarMisPedidos() }
}
</script>

<style scoped>
h1 { color: #2d3748; margin-bottom: 24px; }
.pedido-card { background: white; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; margin-bottom: 16px; }
.pedido-header { display: flex; justify-content: space-between; margin-bottom: 12px; font-weight: bold; }
.estado { padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; }
.estado.pendiente { background: #fef3c7; color: #d97706; }
.estado.enviado { background: #dbeafe; color: #2563eb; }
.estado.entregado { background: #d1fae5; color: #065f46; }
.fecha { color: #718096; font-size: 0.875rem; }
.vacio { text-align: center; color: #718096; padding: 40px; }
</style>
