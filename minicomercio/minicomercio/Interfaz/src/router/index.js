import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

// Layouts
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

// Views
import HomeView from '@/views/client/HomeView.vue'
import ShopView from '@/views/client/ShopView.vue'
import CartView from '@/views/client/CartView.vue'
import OrdersView from '@/views/client/OrdersView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import DashboardView from '@/views/admin/DashboardView.vue'
import ProductsAdminView from '@/views/admin/ProductsAdminView.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', name: 'home', component: HomeView },
      { path: 'tienda', name: 'tienda', component: ShopView },
      { path: 'carrito', name: 'carrito', component: CartView, meta: { requiresAuth: true } },
      { path: 'mis-pedidos', name: 'pedidos', component: OrdersView, meta: { requiresAuth: true } }
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      { path: '', name: 'dashboard', component: DashboardView },
      { path: 'productos', name: 'admin-productos', component: ProductsAdminView }
    ]
  },
  {
    path: '/',
    component: AuthLayout,
    children: [
      { path: 'login', name: 'login', component: LoginView },
      { path: 'registro', name: 'registro', component: RegisterView }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = store.getters.isAuthenticated
  const admin = store.getters.isAdmin

  if (to.meta.requiresAuth && !auth) return next('/login')
  if (to.meta.requiresAdmin && !admin) return next('/')
  next()
})

export default router
