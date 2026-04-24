# 🛒 MiniComercio Electrónico

Mini tienda online construida con **Vue 3 + Node.js + JWT + MongoDB**

## Estructura del proyecto

```
minicomercio/
├── backend/                 # API REST con Node.js
│   ├── config/              # Configuración DB y JWT
│   ├── controllers/         # Lógica de negocio
│   ├── middleware/          # Autenticación JWT
│   ├── models/              # Esquemas MongoDB
│   ├── routes/              # Rutas de la API
│   └── server.js            # Punto de entrada
│
├── Interfaz/                # Frontend Vue 3
│   └── src/
│       ├── layouts/         # DefaultLayout, AdminLayout, AuthLayout
│       ├── views/
│       │   ├── auth/        # Login, Registro
│       │   ├── client/      # Home, Tienda, Carrito, Pedidos
│       │   └── admin/       # Dashboard, Productos
│       ├── components/
│       │   ├── common/      # NavBar, Footer, Sidebar
│       │   ├── product/     # ProductoCard, ProductoForm
│       │   └── cart/        # CartItem
│       ├── router/          # Rutas con guards
│       ├── store/           # Estado global (Vuex)
│       └── services/        # Llamadas a la API
│
└── minicomercio electronico/
    └── README.md
```

## Instalación y uso en VS Code

### 1. Backend
```bash
cd backend
npm install
npm run dev     # Inicia en http://localhost:3000
```

### 2. Frontend
```bash
cd Interfaz
npm install
npm run dev     # Inicia en http://localhost:5173
```

### Requisitos
- Node.js 18+
- MongoDB (local o Atlas)
- Editar `backend/.env` con tus credenciales

## Endpoints API

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /api/auth/registro | Registrar usuario |
| POST | /api/auth/login | Iniciar sesión |
| GET | /api/productos | Listar productos |
| POST | /api/productos | Crear producto (Admin) |
| PUT | /api/productos/:id | Editar producto (Admin) |
| DELETE | /api/productos/:id | Eliminar producto (Admin) |
| POST | /api/pedidos | Crear pedido |
| GET | /api/pedidos/mis-pedidos | Ver mis pedidos |
| GET | /api/pedidos/todos | Ver todos los pedidos (Admin) |
