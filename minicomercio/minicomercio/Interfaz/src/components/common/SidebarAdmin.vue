<template>
  <aside class="sidebar">
    <div class="logo">🛒 Admin</div>
    <nav>
      <router-link to="/admin"><span>📊</span> Dashboard</router-link>
      <router-link to="/admin/productos"><span>📦</span> Productos</router-link>
      <router-link to="/admin/pedidos"><span>📋</span> Pedidos</router-link>
      <router-link to="/tienda"><span>🏪</span> Ver Tienda</router-link>
    </nav>
  </aside>
</template>

<script>
export default { name: 'SidebarAdmin' }
</script>

<style scoped>
.sidebar { width: 220px; background: #1a202c; min-height: 100vh; padding: 24px 0; }
.logo { color: #48bb78; font-size: 1.3rem; font-weight: bold; padding: 0 20px 24px; border-bottom: 1px solid #2d3748; }
nav { display: flex; flex-direction: column; padding-top: 16px; }
nav a { display: flex; align-items: center; gap: 10px; padding: 12px 20px; color: #a0aec0; text-decoration: none; transition: all 0.2s; }
nav a:hover, nav a.router-link-active { background: #2d3748; color: #48bb78; }
</style>
