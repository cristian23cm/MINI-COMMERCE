<template>
  <div class="layout-auth">
    <div class="auth-box">
      <h1 class="brand">🛒 MiniComercio</h1>
      <router-view />
    </div>
  </div>
</template>

<script>
export default { name: 'AuthLayout' }
</script>

<style scoped>
.layout-auth { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f7fafc; }
.auth-box { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.1); width: 100%; max-width: 420px; }
.brand { text-align: center; margin-bottom: 24px; color: #2d3748; font-size: 1.8rem; }
</style>
