<template>
  <div class="layout-default">
    <NavBar />
    <main class="main-content">
      <router-view />
    </main>
    <FooterApp />
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar.vue'
import FooterApp from '@/components/common/FooterApp.vue'

export default {
  name: 'DefaultLayout',
  components: { NavBar, FooterApp }
}
</script>

<style scoped>
.layout-default { display: flex; flex-direction: column; min-height: 100vh; }
.main-content { flex: 1; padding: 20px; }
</style>
