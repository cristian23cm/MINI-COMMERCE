import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:3000/api' })

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const authService = {
  login: (data) => api.post('/auth/login', data),
  registrar: (data) => api.post('/auth/registro', data)
}

export const productoService = {
  obtener: () => api.get('/productos'),
  obtenerUno: (id) => api.get(`/productos/${id}`),
  crear: (data) => api.post('/productos', data),
  actualizar: (id, data) => api.put(`/productos/${id}`, data),
  eliminar: (id) => api.delete(`/productos/${id}`)
}

export const pedidoService = {
  crear: (data) => api.post('/pedidos', data),
  misPedidos: () => api.get('/pedidos/mis-pedidos'),
  todos: () => api.get('/pedidos/todos')
}

export default api
