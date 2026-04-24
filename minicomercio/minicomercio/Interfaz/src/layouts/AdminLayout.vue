<template>
  <div class="layout-admin">
    <SidebarAdmin />
    <div class="admin-content">
      <header class="admin-header">
        <h2>Panel de Administración</h2>
        <span>{{ usuarioNombre }}</span>
      </header>
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import SidebarAdmin from '@/components/common/SidebarAdmin.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'AdminLayout',
  components: { SidebarAdmin },
  computed: {
    ...mapGetters(['usuarioNombre'])
  }
}
</script>

<style scoped>
.layout-admin { display: flex; min-height: 100vh; }
.admin-content { flex: 1; display: flex; flex-direction: column; }
.admin-header { background: #2d3748; color: white; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; }
main { padding: 24px; flex: 1; }
</style>
