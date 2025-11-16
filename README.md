# 🛒 Backend E-Commerce

Backend completo para una plataforma de e-commerce construida con **Node.js**, **Express** y **MongoDB**. Sistema de autenticación JWT, gestión de productos, carritos de compra y procesamiento de órdenes.

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Modelos de Datos](#modelos-de-datos)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Autenticación y Autorización](#autenticación-y-autorización)
- [Ejemplos de Uso](#ejemplos-de-uso)

---

## ✨ Características

- ✅ **Autenticación JWT**: Sistema seguro de login/registro con tokens
- ✅ **Roles y Permisos**: USER, ADMIN, GUEST con control de acceso
- ✅ **Gestión de Productos**: CRUD completo con paginación
- ✅ **Carrito de Compras**: Agregar, modificar, eliminar items
- ✅ **Procesamiento de Órdenes**: Sistema de tickets/compras
- ✅ **Control de Stock**: Validación y actualización automática
- ✅ **Base de Datos MongoDB**: Con Mongoose y validaciones
- ✅ **Encriptación de Contraseñas**: Bcrypt para seguridad
- ✅ **CORS**: Habilitado para frontend en `http://localhost:5173` - Ignorar

---

## 🔧 Tecnologías

```json
{
	"runtime": "Node.js (ES Modules)",
	"framework": "Express 5.1.0",
	"database": "MongoDB + Mongoose 8.18.0",
	"authentication": "JWT + Passport.js",
	"encryption": "bcrypt 6.0.0",
	"validation": "Express Handlebars 8.0.3",
	"session": "Express Session + MongoDB Store"
}
```

---

## 📦 Instalación

### Prerrequisitos

- Node.js v18+
- MongoDB (Atlas o Local)
- npm o yarn

### Pasos

1. **Clonar el repositorio**

```bash
git clone <repo-url>
cd back-ecom
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Crear archivo `.env`**

```bash
# Las variables necesarias están en la sección Configuración
```

4. **Iniciar servidor**

```bash
npm run dev
```

El servidor estará disponible en: `http://localhost:8080`

---

## ⚙️ Configuración

### Archivo `.env` Requerido

Crear un archivo `.env` en la raíz del proyecto:

```env
# Puerto del servidor
PORT=8080

# MongoDB - Conexión Local (opcional)
MONGODB_LOCAL_URL=mongodb://localhost:27017/ecomm

# MongoDB - Atlas (Recomendado)
MONGODB_ATLAS_URL=mongodb+srv://usuario:contraseña@cluster.mongodb.net/ecomm?appName=Cluster0

# Secretos
SECRET=tu_secret_session_aleatorio_aqui
JWT_SECRET=tu_jwt_secret_aleatorio_aqui

# Persistencia (mongodb o file)
PERSISTENCE=mongodb - No implementado IGNORAR
```

### Obtener credenciales MongoDB Atlas

1. Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crear cluster gratuito
3. Crear usuario de base de datos
4. Copiar connection string y reemplazar `<user>`, `<password>`, `<cluster>`

---

## 📊 Modelos de Datos

### User (Usuarios)

```javascript
{
  _id: ObjectId,
  first_name: String (requerido),
  last_name: String (requerido),
  email: String (requerido, único),
  age: Number (requerido),
  password: String (requerido, hasheado con bcrypt),
  cart: ObjectId (referencia a Cart),
  role: String (enum: ['user', 'admin', 'guest']),
  createdAt: Date (automático)
}
```

**Ejemplo de documento:**

```json
{
	"_id": "507f1f77bcf86cd799439011",
	"first_name": "Juan",
	"last_name": "Pérez",
	"email": "juan@example.com",
	"age": 25,
	"password": "$2b$10$encrypted...",
	"role": "user",
	"cart": "507f1f77bcf86cd799439012"
}
```

---

### Product (Productos)

```javascript
{
  _id: ObjectId,
  title: String (3-25 caracteres, requerido, indexado),
  description: String (3-50 caracteres, requerido),
  code: String (3-10 caracteres, requerido, único, indexado),
  price: Number (≥0, requerido),
  status: Boolean (default: true),
  stock: Number (requerido),
  category: String (3-15 caracteres, requerido),
  thumbnails: [String] (array de URLs),
  createdAt: Date (automático)
}
```

**Ejemplo de documento:**

```json
{
	"_id": "507f1f77bcf86cd799439013",
	"title": "Laptop HP",
	"description": "Laptop de alta performance",
	"code": "LAP001",
	"price": 1200.5,
	"status": true,
	"stock": 15,
	"category": "Electrónica",
	"thumbnails": ["https://example.com/img1.jpg"]
}
```

---

### Cart (Carrito)

```javascript
{
  _id: ObjectId,
  user: ObjectId (referencia a User),
  items: [
    {
      product: ObjectId (referencia a Product),
      qty: Number (cantidad, default: 1)
    }
  ],
  createdAt: Date (automático)
}
```

**Ejemplo de documento:**

```json
{
	"_id": "507f1f77bcf86cd799439014",
	"user": "507f1f77bcf86cd799439011",
	"items": [
		{
			"product": "507f1f77bcf86cd799439013",
			"qty": 2
		},
		{
			"product": "507f1f77bcf86cd799439015",
			"qty": 1
		}
	]
}
```

---

### Ticket (Compra/Orden)

```javascript
{
  _id: ObjectId,
  code: String (único, UUID generado automáticamente),
  amount: Number (monto total de la compra),
  purchaser: String (email del comprador),
  createdAt: Date (timestamp automático),
  updatedAt: Date (timestamp automático)
}
```

**Ejemplo de documento:**

```json
{
	"_id": "507f1f77bcf86cd799439016",
	"code": "550e8400-e29b-41d4-a716-446655440000",
	"amount": 1500.75,
	"purchaser": "juan@example.com",
	"createdAt": "2025-11-16T10:30:00Z",
	"updatedAt": "2025-11-16T10:30:00Z"
}
```

---

## 🏗️ Estructura del Proyecto

```
src/
├── server.js                 # Punto de entrada
├── config/
│   ├── envs.js              # Variables de entorno
│   └── passport.config.js   # Configuración Passport JWT
├── controllers/             # Lógica de negocio
│   ├── user.controller.js
│   ├── product.controller.js
│   ├── carts.controller.js
│   └── ticket.controller.js
├── services/                # Servicios (capa intermedia)
│   ├── user.services.js
│   ├── product.services.js
│   ├── cart.services.js
│   └── ticket.services.js
├── daos/                    # Data Access Objects
│   ├── mongo/
│   │   ├── user.dao.js
│   │   ├── product.dao.js
│   │   ├── cart.dao.js
│   │   ├── ticket.dao.js
│   │   └── models/          # Esquemas Mongoose
│   ├── mappers/             # DTOs (Data Transfer Objects)
│   └── DTOs/
├── routes/                  # Definición de rutas
│   ├── session.router.js    # Auth
│   ├── product.router.js
│   ├── cart.router.js
│   └── view.router.js
├── middleware/              # Middlewares
│   ├── policiesHandler.js   # Autorización JWT
│   ├── error-handler.js
│   └── abmForm-formatter.js
├── utils/
│   ├── utils.js             # Utilidades (hash, token, etc)
│   └── CustomError.js       # Error personalizado
└── data/
    └── db.connection.js     # Conexión MongoDB
```

---

## 🔌 API Endpoints

### 🔐 Autenticación (POST /api/session)

| Método | Ruta        | Autorización | Descripción             |
| ------ | ----------- | ------------ | ----------------------- |
| POST   | `/register` | PUBLIC       | Registrar nuevo usuario |
| POST   | `/login`    | PUBLIC       | Login y obtener JWT     |
| GET    | `/current`  | JWT          | Obtener usuario actual  |
| POST   | `/logout`   | JWT          | Cerrar sesión           |
| POST   | `/recupero` | PUBLIC       | Recuperar contraseña    |

---

### 📦 Productos (GET/POST /api/products)

| Método | Ruta   | Autorización | Descripción                   |
| ------ | ------ | ------------ | ----------------------------- |
| GET    | `/`    | PUBLIC       | Listar todos (con paginación) |
| GET    | `/:id` | PUBLIC       | Obtener producto por ID       |
| POST   | `/`    | ADMIN        | Crear producto                |
| PUT    | `/:id` | ADMIN        | Actualizar producto           |
| DELETE | `/:id` | ADMIN        | Eliminar producto             |

**Query Parameters (GET /):**

- `page` (default: 1)
- `limit` (default: 10)
- `query` (búsqueda en title/code)
- `sort` (ordenamiento)

---

### 🛒 Carrito (POST/GET /api/carts)

| Método | Ruta                  | Autorización | Descripción                        |
| ------ | --------------------- | ------------ | ---------------------------------- |
| GET    | `/`                   | ADMIN        | Listar todos los carritos          |
| POST   | `/{:uid}`             | PUBLIC       | Crear carrito para usuario         |
| GET    | `/:cid`               | ADMIN, USER  | Obtener carrito por ID             |
| POST   | `/:cid/products/:pid` | USER         | Agregar producto al carrito        |
| PUT    | `/:cid/products/:pid` | USER         | Cambiar cantidad de producto       |
| DELETE | `/:cid/products/:pid` | USER         | Eliminar producto del carrito      |
| DELETE | `/:cid`               | USER         | Vaciar carrito                     |
| POST   | `/:cid/purchase`      | USER         | **Procesar compra (crear ticket)** |

---

## 🔐 Autenticación y Autorización

### JWT (Token-based)

El sistema usa **JWT (JSON Web Tokens)** para autenticación:

1. Usuario hace login → recibe JWT en cookie `authCookie`
2. En cada request autenticado, el token se extrae de la cookie
3. Se verifica la firma con `JWT_SECRET`
4. Se valida el rol del usuario contra las políticas

### Roles y Permisos

```javascript
"PUBLIC"; // Sin autenticación requerida
"USER"; // Usuario logueado (rol: user)
"ADMIN"; // Administrador (rol: admin)
"GUEST"; // Invitado
```

### Header de Autorización

Para endpoints protegidos, incluir:

```
Authorization: Bearer <JWT_TOKEN>
```

O automáticamente se obtiene de la cookie `authCookie`.

---

## 💡 Ejemplos de Uso

### 1️⃣ Registrarse

**Endpoint:** `POST /api/session/register`

**Body:**

```json
{
	"first_name": "Juan",
	"last_name": "Pérez",
	"email": "juan@example.com",
	"age": 25,
	"password": "miContraseña123",
	"role": "user"
}
```

**Response (200):**

```json
{
	"status": "Usuario creado",
	"payload": {
		"id": "507f1f77bcf86cd799439011",
		"first_name": "Juan",
		"email": "juan@example.com",
		"role": "user"
	}
}
```

---

### 2️⃣ Login

**Endpoint:** `POST /api/session/login`

**Body:**

```json
{
	"email": "juan@example.com",
	"password": "miContraseña123"
}
```

**Response (200):**

```
Set-Cookie: authCookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly
```

---

### 3️⃣ Listar Productos con Paginación

**Endpoint:** `GET /api/products?page=1&limit=10&query=laptop`

**Response (200):**

```json
{
	"payload": [
		{
			"_id": "507f1f77bcf86cd799439013",
			"title": "Laptop HP",
			"description": "Laptop de alta performance",
			"price": 1200.5,
			"stock": 15,
			"category": "Electrónica"
		}
	],
	"info": {
		"count": 1,
		"totalPages": 1,
		"page": 1,
		"hasNextPage": false,
		"hasPrevPage": false,
		"nextPage": null,
		"prevPage": null
	}
}
```

---

### 4️⃣ Crear Carrito

**Endpoint:** `POST /api/carts/{:uid}`

**URL Params:**

- `uid`: ID del usuario

**Response (200):**

```json
{
	"_id": "507f1f77bcf86cd799439014",
	"user": "507f1f77bcf86cd799439011",
	"items": []
}
```

---

### 5️⃣ Agregar Producto al Carrito

**Endpoint:** `POST /api/carts/:cid/products/:pid`

**URL Params:**

- `cid`: ID del carrito
- `pid`: ID del producto

**Response (200):**

```json
{
	"_id": "507f1f77bcf86cd799439014",
	"user": "507f1f77bcf86cd799439011",
	"items": [
		{
			"product": {
				"_id": "507f1f77bcf86cd799439013",
				"title": "Laptop HP",
				"price": 1200.5
			},
			"qty": 1
		}
	]
}
```

---

### 6️⃣ Cambiar Cantidad de Producto

**Endpoint:** `PUT /api/carts/:cid/products/:pid`

**URL Params:**

- `cid`: ID del carrito
- `pid`: ID del producto

**Body:**

```json
{
	"quantity": 3
}
```

**Response (200):**

```json
{
	"message": "Cantidad actualizada",
	"cart": {
		/* carrito actualizado */
	}
}
```

---

### 7️⃣ Procesar Compra (Crear Ticket)

**Endpoint:** `POST /api/carts/:cid/purchase`

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Requerimientos:**

- Usuario autenticado (JWT en header Authorization)
- Carrito con items
- Stock disponible para los productos

**Response (200):**

```json
{
	"status": "Success",
	"payload": {
		"ticket": {
			"_id": "507f1f77bcf86cd799439016",
			"code": "550e8400-e29b-41d4-a716-446655440000",
			"amount": 1500.75,
			"purchaser": "juan@example.com",
			"createdAt": "2025-11-16T10:30:00Z"
		},
		"excluded": [
			{
				"product": {
					/* producto sin stock */
				},
				"qty": 2
			}
		]
	}
}
```

**Lógica del flujo:**

- ✅ Valida stock de cada producto en el carrito
- ✅ Actualiza inventario de productos comprados
- ✅ Genera ticket con UUID único
- ✅ Calcula monto total de la compra
- ✅ **IMPORTANTE**: Deja en carrito los items sin stock disponible para reintentar después
- ✅ Retorna ticket y array de items excluidos

---

### 8️⃣ Crear Producto (ADMIN)

**Endpoint:** `POST /api/products`

**Headers:**

```
Authorization: Bearer <ADMIN_JWT_TOKEN>
```

**Body:**

```json
{
	"title": "Laptop HP",
	"description": "Laptop de alta performance",
	"code": "LAP001",
	"price": 1200.5,
	"stock": 15,
	"category": "Electrónica",
	"thumbnails": ["https://example.com/img1.jpg"]
}
```

**Response (200):**

```json
{
	"_id": "507f1f77bcf86cd799439013",
	"title": "Laptop HP",
	"price": 1200.5,
	"stock": 15,
	"status": true
}
```

---

### 9️⃣ Eliminar Producto del Carrito

**Endpoint:** `DELETE /api/carts/:cid/products/:pid`

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**URL Params:**

- `cid`: ID del carrito
- `pid`: ID del producto

**Response (200):**

```json
{
	"message": "Producto eliminado del carrito",
	"cart": {
		/* carrito actualizado */
	}
}
```

---

### 🔟 Vaciar Carrito

**Endpoint:** `DELETE /api/carts/:cid`

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**URL Params:**

- `cid`: ID del carrito

**Response (200):**

```json
{
	"message": "Carrito vaciado",
	"cart": {
		"_id": "507f1f77bcf86cd799439014",
		"items": []
	}
}
```

---

## 🧪 Testing con Postman/Insomnia

### Flujo Completo de Compra:

1. **POST** `/api/session/register` → Registrarse
2. **POST** `/api/session/login` → Login (guardar token)
3. **GET** `/api/products` → Ver productos disponibles
4. **POST** `/api/carts/{:uid}` → Crear carrito
5. **POST** `/api/carts/:cid/products/:pid` → Agregar producto
6. **PUT** `/api/carts/:cid/products/:pid` → Modificar cantidad (opcional)
7. **POST** `/api/carts/:cid/purchase` → Procesar compra
8. **GET** `/api/carts/:cid` → Ver carrito (items sin stock)

---

## 🐛 Troubleshooting

### Error: "No autorizado"

- Verificar que el JWT está en la cookie `authCookie`
- Hacer login primero: `POST /api/session/login`

### Error: "Sin acceso, sin permiso"

- El usuario no tiene el rol requerido
- Para ADMIN, cambiar el rol en la base de datos a "admin"

### Error: "Carrito no encontrado"

- Verificar que el `cid` es correcto
- Crear carrito primero: `POST /api/carts/{:uid}`

### Error de stock en compra

- Los items sin stock quedarán en `excluded` en la respuesta
- Se deben reintentar o eliminar del carrito manualmente

### MongoDB no conecta

- Verificar `MONGODB_ATLAS_URL` en `.env`
- Agregar IP a whitelist en MongoDB Atlas
- Revisar credenciales usuario/contraseña

---

## 📝 Scripts Disponibles

```bash
# Desarrollo con hot reload (recomendado)
npm run dev

# Desarrollo alternativo con nodemon
npm run devIndex

# Tests (pendiente de implementar)
npm test
```

---

## ⚠️ Notas Importantes

1. **JWT expira**: Configurar tiempo de expiración en `passport.config.js` si es necesario
2. **Contraseñas**: Siempre se hashean con bcrypt antes de guardar
3. **Carritos**: Los items sin stock NO se eliminan, quedan para reintentar
4. **Productos**: El campo `code` debe ser único
5. **Roles**: Los roles válidos son: `user`, `admin`, `guest`

---

## 📄 Licencia

ISC

---

## 👨‍💻 Autor

Proyecto de e-commerce desarrollado con Node.js, Express y MongoDB. Gabriel Hertzan
