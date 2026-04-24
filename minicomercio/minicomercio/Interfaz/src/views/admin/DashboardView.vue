<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <div class="stats-grid">
      <div class="stat-card"><span class="numero">{{ totalProductos }}</span><span class="label">Productos</span></div>
      <div class="stat-card"><span class="numero">{{ totalPedidos }}</span><span class="label">Pedidos</span></div>
      <div class="stat-card"><span class="numero">${{ totalVentas.toFixed(2) }}</span><span class="label">Ventas</span></div>
    </div>
    <h2>Pedidos Recientes</h2>
    <table>
      <thead><tr><th>ID</th><th>Cliente</th><th>Total</th><th>Estado</th></tr></thead>
      <tbody>
        <tr v-for="p in pedidosRecientes" :key="p._id">
          <td>#{{ p._id.slice(-6).toUpperCase() }}</td>
          <td>{{ p.usuario?.nombre }}</td>
          <td>${{ p.total.toFixed(2) }}</td>
          <td><span :class="['badge', p.estado]">{{ p.estado }}</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'DashboardView',
  computed: {
    ...mapGetters(['productos', 'pedidos']),
    totalProductos() { return this.productos.length },
    totalPedidos() { return this.pedidos.length },
    totalVentas() { return this.pedidos.reduce((s, p) => s + p.total, 0) },
    pedidosRecientes() { return this.pedidos.slice(0, 5) }
  },
  methods: { ...mapActions(['cargarProductos', 'cargarTodosPedidos']) },
  created() { this.cargarProductos(); this.cargarTodosPedidos(); }
}
</script>

<style scoped>
h1, h2 { color: #2d3748; margin-bottom: 20px; }
.stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 32px; }
.stat-card { background: white; border-radius: 10px; padding: 24px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.numero { display: block; font-size: 2rem; font-weight: bold; color: #48bb78; }
.label { font-size: 0.9rem; color: #718096; }
table { width: 100%; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); border-collapse: collapse; }
th { background: #f7fafc; padding: 12px 16px; text-align: left; font-weight: 600; color: #4a5568; }
td { padding: 12px 16px; border-top: 1px solid #f0f0f0; }
.badge { padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; }
.badge.pendiente { background: #fef3c7; color: #d97706; }
.badge.entregado { background: #d1fae5; color: #065f46; }
</style>
