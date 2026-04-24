import { createStore } from 'vuex'
import { authService, productoService, pedidoService } from '@/services/api'

export default createStore({
  state: {
    usuario: JSON.parse(localStorage.getItem('usuario')) || null,
    token: localStorage.getItem('token') || null,
    productos: [],
    carrito: JSON.parse(localStorage.getItem('carrito')) || [],
    pedidos: []
  },
  getters: {
    isAuthenticated: s => !!s.token,
    isAdmin: s => s.usuario?.rol === 'admin',
    usuarioNombre: s => s.usuario?.nombre || '',
    productos: s => s.productos,
    productosDestacados: s => s.productos.slice(0, 4),
    carrito: s => s.carrito,
    cantidadCarrito: s => s.carrito.reduce((t, i) => t + i.cantidad, 0),
    totalCarrito: s => s.carrito.reduce((t, i) => t + i.precio * i.cantidad, 0),
    pedidos: s => s.pedidos
  },
  mutations: {
    SET_AUTH(state, { token, usuario }) {
      state.token = token; state.usuario = usuario;
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
    },
    LOGOUT(state) {
      state.token = null; state.usuario = null;
      localStorage.removeItem('token'); localStorage.removeItem('usuario');
    },
    SET_PRODUCTOS(state, productos) { state.productos = productos },
    SET_PEDIDOS(state, pedidos) { state.pedidos = pedidos },
    AGREGAR_CARRITO(state, producto) {
      const existente = state.carrito.find(i => i._id === producto._id);
      if (existente) existente.cantidad++;
      else state.carrito.push({ ...producto, cantidad: 1 });
      localStorage.setItem('carrito', JSON.stringify(state.carrito));
    },
    QUITAR_CARRITO(state, id) {
      state.carrito = state.carrito.filter(i => i._id !== id);
      localStorage.setItem('carrito', JSON.stringify(state.carrito));
    },
    LIMPIAR_CARRITO(state) {
      state.carrito = []; localStorage.removeItem('carrito');
    }
  },
  actions: {
    async login({ commit }, datos) {
      const { data } = await authService.login(datos);
      commit('SET_AUTH', data);
      return data.usuario.rol;
    },
    async registrar({ commit }, datos) {
      const { data } = await authService.registrar(datos);
      commit('SET_AUTH', data);
    },
    logout({ commit }) { commit('LOGOUT') },
    async cargarProductos({ commit }) {
      const { data } = await productoService.obtener();
      commit('SET_PRODUCTOS', data);
    },
    async crearProducto({ dispatch }, datos) {
      await productoService.crear(datos); dispatch('cargarProductos');
    },
    async actualizarProducto({ dispatch }, datos) {
      await productoService.actualizar(datos._id, datos); dispatch('cargarProductos');
    },
    async eliminarProducto({ dispatch }, id) {
      await productoService.eliminar(id); dispatch('cargarProductos');
    },
    agregarAlCarrito({ commit }, producto) { commit('AGREGAR_CARRITO', producto) },
    quitarDelCarrito({ commit }, id) { commit('QUITAR_CARRITO', id) },
    async realizarPedido({ state, commit }) {
      const productos = state.carrito.map(i => ({ productoId: i._id, cantidad: i.cantidad }));
      await pedidoService.crear({ productos });
      commit('LIMPIAR_CARRITO');
    },
    async cargarMisPedidos({ commit }) {
      const { data } = await pedidoService.misPedidos();
      commit('SET_PEDIDOS', data);
    },
    async cargarTodosPedidos({ commit }) {
      const { data } = await pedidoService.todos();
      commit('SET_PEDIDOS', data);
    }
  }
})
