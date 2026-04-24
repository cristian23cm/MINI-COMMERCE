<template>
  <div class="carrito">
    <h1>Carrito de Compras</h1>
    <div v-if="carrito.length > 0">
      <CartItem
        v-for="item in carrito"
        :key="item._id"
        :item="item"
        @quitar="quitarDelCarrito"
        @actualizar="actualizarCantidad"
      />
      <div class="resumen">
        <p>Total: <strong>${{ totalCarrito.toFixed(2) }}</strong></p>
        <button @click="realizarPedido" :disabled="procesando">
          {{ procesando ? 'Procesando...' : 'Realizar Pedido' }}
        </button>
      </div>
    </div>
    <div v-else class="vacio">
      <p>Tu carrito está vacío</p>
      <router-link to="/tienda">Ir a la tienda</router-link>
    </div>
  </div>
</template>

<script>
import CartItem from '@/components/cart/CartItem.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'CartView',
  components: { CartItem },
  data() { return { procesando: false } },
  computed: { ...mapGetters(['carrito', 'totalCarrito']) },
  methods: {
    ...mapActions(['quitarDelCarrito', 'actualizarCantidad', 'realizarPedido']),
    async realizarPedido() {
      this.procesando = true;
      try {
        await this.realizarPedido();
        this.$router.push('/mis-pedidos');
      } finally {
        this.procesando = false;
      }
    }
  }
}
</script>

<style scoped>
h1 { color: #2d3748; margin-bottom: 24px; }
.resumen { text-align: right; padding: 20px 0; border-top: 2px solid #e2e8f0; margin-top: 20px; }
.resumen p { font-size: 1.3rem; margin-bottom: 16px; }
.resumen button { padding: 12px 32px; background: #48bb78; color: white; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; }
.vacio { text-align: center; padding: 60px; }
.vacio a { color: #48bb78; font-weight: bold; }
</style>
