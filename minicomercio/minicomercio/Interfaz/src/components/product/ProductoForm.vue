<template>
  <div class="form-overlay">
    <div class="form-box">
      <h3>{{ form._id ? 'Editar' : 'Nuevo' }} Producto</h3>
      <form @submit.prevent="$emit('guardar', form)">
        <input v-model="form.nombre" placeholder="Nombre del producto" required />
        <input v-model="form.descripcion" placeholder="Descripción" />
        <input v-model.number="form.precio" type="number" placeholder="Precio" required />
        <input v-model.number="form.stock" type="number" placeholder="Stock" />
        <input v-model="form.categoria" placeholder="Categoría" />
        <input v-model="form.imagen" placeholder="URL de imagen (opcional)" />
        <div class="actions">
          <button type="button" @click="$emit('cancelar')" class="btn-cancel">Cancelar</button>
          <button type="submit" class="btn-save">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductoForm',
  props: { productoEditar: { type: Object, default: null } },
  emits: ['guardar', 'cancelar'],
  data() {
    return {
      form: this.productoEditar ? { ...this.productoEditar } : { nombre: '', descripcion: '', precio: 0, stock: 0, categoria: '', imagen: '' }
    }
  }
}
</script>

<style scoped>
.form-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 100; }
.form-box { background: white; border-radius: 12px; padding: 32px; width: 100%; max-width: 480px; }
h3 { margin-bottom: 20px; color: #2d3748; }
input { display: block; width: 100%; padding: 10px 14px; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 12px; font-size: 1rem; box-sizing: border-box; }
.actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 8px; }
.btn-cancel { padding: 10px 20px; border: 1px solid #e2e8f0; border-radius: 8px; cursor: pointer; background: white; }
.btn-save { padding: 10px 20px; background: #48bb78; color: white; border: none; border-radius: 8px; cursor: pointer; }
</style>
