# Back-Ecom: Backend de E-commerce

Este proyecto es un backend robusto para una plataforma de comercio electrónico, desarrollado con Node.js y Express. El sistema implementa una arquitectura moderna y escalable con las siguientes características principales:

## Características

### Gestión de Productos

- CRUD completo de productos
- Sistema de paginación
- Filtrado y ordenamiento
- Categorización de productos
- Control de stock

### Carrito de Compras

- Creación y gestión de carritos
- Agregar/eliminar productos
- Modificar cantidades
- Persistencia de carritos por usuario

### Sistema de Usuarios

- Registro y autenticación de usuarios
- Roles de usuario (admin, user, guest)
- Sistema de recuperación de contraseña
- Autenticación con JWT
- Sesiones persistentes con MongoDB

### Características Técnicas

- Framework: Express.js
- Base de datos: MongoDB con Mongoose
- Autenticación: Passport.js + JWT
- Motor de plantillas: Handlebars
- Paginación integrada
- Manejo de errores personalizado
- Arquitectura en capas (MVC)

## Estructura del Proyecto

```plaintext
src/
├── config/         # Configuraciones (env, passport)
├── controllers/    # Controladores de la aplicación
├── daos/          # Capa de acceso a datos
│   └── mongo/     # Modelos y DAOs de MongoDB
├── middleware/    # Middlewares personalizados
├── routes/        # Rutas de la API
├── services/      # Lógica de negocio
├── utils/         # Utilidades y helpers
└── views/         # Plantillas Handlebars
```

## Modelos de Datos

### Productos

- Título
- Descripción
- Código
- Precio
- Estado
- Stock
- Categoría
- Imágenes

### Carritos

- Items
  - Producto (referencia)
  - Cantidad

### Usuarios

- Nombre
- Apellido
- Email
- Edad
- Contraseña (hasheada)
- Rol
- Carrito asociado

## Tecnologías Utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- Passport.js
- JWT
- Handlebars
- bcrypt
- express-session
- cookie-parser
- mongoose-paginate-v2

## Características de Implementación

- Arquitectura en capas
- Manejo de errores centralizado
- Autenticación segura
- Variables de entorno para configuración
- Middleware de formato y validación
- Paginación eficiente

## Configuración e Instalación

### Software Necesario

- Node.js 18 o superior
- MongoDB 6.0 o superior
- npm o yarn

### Pasos de Configuración

Para comenzar con el proyecto, sigue estos pasos en orden:

```bash
# 1. Clonar el repositorio
git clone https://github.com/ghertzan/back-ecom.git
cd back-ecom

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
```

Edita el archivo `.env` con tus configuraciones:

```plaintext
# Configuración del servidor y base de datos
PORT=8080
MONGODB_LOCAL_URL=mongodb://localhost:27017/ecomm
MONGODB_ATLAS_URL=tu_url_de_mongodb_atlas
SECRET="tu_secret_key"
JWT_SECRET="tu_jwt_secret"
```

### Ejecución del Servidor

Para desarrollo (con hot-reload):

```bash
npm run dev
```

El servidor estará disponible en: `http://localhost:8080`

## Documentación de la API

### Endpoints de Productos

- `GET /api/products` - Listar todos los productos
- `GET /api/products/:id` - Obtener un producto
- `POST /api/products` - Crear producto
- `PUT /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto

### Endpoints de Carritos

- `POST /api/carts` - Crear carrito
- `GET /api/carts/:cid` - Ver carrito
- `POST /api/carts/:cid/products/:pid` - Agregar producto
- `DELETE /api/carts/:cid/products/:pid` - Eliminar producto
- `PUT /api/carts/:cid/products/:pid` - Actualizar cantidad

### Endpoints de Usuarios

- `POST /api/session/register` - Registro
- `POST /api/session/login` - Login
- `POST /api/session/logout` - Logout
- `GET /api/session/current` - Usuario actual

## Ejemplos de Uso

### Registro de Usuario

```bash
curl -X POST http://localhost:8080/api/session/register \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Juan",
    "last_name": "Pérez",
    "email": "juan@email.com",
    "password": "password123",
    "age": 30,
    "role": "user"
  }'
```

### Iniciar Sesión

```bash
curl -X POST http://localhost:8080/api/session/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@email.com",
    "password": "password123"
  }'
```

### Crear Producto

```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Producto Nuevo",
    "description": "Descripción del producto",
    "code": "PRD001",
    "price": 299.99,
    "stock": 100,
    "category": "Categoría"
  }'
```

## Notas de Implementación

- Los endpoints protegidos requieren el token JWT en el header de la petición
- Las contraseñas se almacenan hasheadas usando bcrypt
- Las sesiones se mantienen usando cookies
- Los errores devuelven respuestas JSON con mensajes descriptivos

## Instalación y Uso

### Prerrequisitos

- Node.js 18 o superior
- MongoDB 6.0 o superior
- npm o yarn

### Pasos de Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/ghertzan/back-ecom.git
cd back-ecom
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno:

```bash
cp .env.example .env
```

4. Editar el archivo `.env` con tus configuraciones:

```plaintext
PORT=8080
MONGODB_LOCAL_URL=mongodb://localhost:27017/ecomm
MONGODB_ATLAS_URL=tu_url_de_mongodb_atlas
SECRET="tu_secret_key"
JWT_SECRET="tu_jwt_secret"
```

### Iniciar el Servidor

Para desarrollo (con hot-reload):

```bash
npm run dev
```

El servidor estará disponible en: `http://localhost:8080`

### API Endpoints

#### API de Productos

- `GET /api/products` - Listar todos los productos
- `GET /api/products/:id` - Obtener un producto
- `POST /api/products` - Crear producto
- `PUT /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto

#### API de Carritos

- `POST /api/carts` - Crear carrito
- `GET /api/carts/:cid` - Ver carrito
- `POST /api/carts/:cid/products/:pid` - Agregar producto
- `DELETE /api/carts/:cid/products/:pid` - Eliminar producto
- `PUT /api/carts/:cid/products/:pid` - Actualizar cantidad

#### API de Usuarios

- `POST /api/session/register` - Registro
- `POST /api/session/login` - Login
- `POST /api/session/logout` - Logout
- `GET /api/session/current` - Usuario actual

### Ejemplos de Uso

#### Registro de Usuario

```bash
curl -X POST http://localhost:8080/api/session/register \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Juan",
    "last_name": "Pérez",
    "email": "juan@email.com",
    "password": "password123",
    "age": 30,
    "role": "user"
  }'
```

#### Iniciar Sesión

```bash
curl -X POST http://localhost:8080/api/session/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@email.com",
    "password": "password123"
  }'
```

#### Crear Producto

```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Producto Nuevo",
    "description": "Descripción del producto",
    "code": "PRD001",
    "price": 299.99,
    "stock": 100,
    "category": "Categoría"
  }'
```

### Notas Adicionales

- Los endpoints protegidos requieren el token JWT en el header de la petición
- Las contraseñas se almacenan hasheadas usando bcrypt
- Las sesiones se mantienen usando cookies
- Los errores devuelven respuestas JSON con mensajes descriptivos

## Instalación y Uso

### Prerrequisitos

- Node.js 18 o superior
- MongoDB 6.0 o superior
- npm o yarn

### Pasos de Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/ghertzan/back-ecom.git
cd back-ecom
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno:

```bash
cp .env.example .env
```

4. Editar el archivo `.env` con tus configuraciones:

```plaintext
PORT=8080
MONGODB_LOCAL_URL=mongodb://localhost:27017/ecomm
MONGODB_ATLAS_URL=tu_url_de_mongodb_atlas
SECRET="tu_secret_key"
JWT_SECRET="tu_jwt_secret"
```

### Iniciar el Servidor

Para desarrollo (con hot-reload):

```bash
npm run dev
```

El servidor estará disponible en: `http://localhost:8080`

### Endpoints Principales

#### Productos

- `GET /api/products` - Listar todos los productos
- `GET /api/products/:id` - Obtener un producto
- `POST /api/products` - Crear producto
- `PUT /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto

#### Carritos

- `POST /api/carts` - Crear carrito
- `GET /api/carts/:cid` - Ver carrito
- `POST /api/carts/:cid/products/:pid` - Agregar producto
- `DELETE /api/carts/:cid/products/:pid` - Eliminar producto
- `PUT /api/carts/:cid/products/:pid` - Actualizar cantidad

#### Usuarios

- `POST /api/session/register` - Registro
- `POST /api/session/login` - Login
- `POST /api/session/logout` - Logout
- `GET /api/session/current` - Usuario actual

### Ejemplos de Uso

#### Registro de Usuario

```bash
curl -X POST http://localhost:8080/api/session/register \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Juan",
    "last_name": "Pérez",
    "email": "juan@email.com",
    "password": "password123",
    "age": 30,
    "role": "user"
  }'
```

#### Login

```bash
curl -X POST http://localhost:8080/api/session/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@email.com",
    "password": "password123"
  }'
```

#### Crear Producto

```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Producto Nuevo",
    "description": "Descripción del producto",
    "code": "PRD001",
    "price": 299.99,
    "stock": 100,
    "category": "Categoría"
  }'
```

### Notas Adicionales

- Los endpoints protegidos requieren el token JWT en el header de la petición
- Las contraseñas se almacenan hasheadas usando bcrypt
- Las sesiones se mantienen usando cookies
- Los errores devuelven respuestas JSON con mensajes descriptivos
