# back-ecom

Proyecto backend para e-commerce de muebles y decoración.

## Descripción

Este proyecto implementa una API RESTful para la gestión de productos de un e-commerce, permitiendo operaciones CRUD (crear, leer, actualizar y eliminar) sobre productos. Además, utiliza Socket.io para notificar en tiempo real a los clientes sobre cambios en el catálogo.

## Tecnologías utilizadas

- **Node.js**
- **Express**
- **Socket.io**
- **JavaScript ES6+**
- **Persistencia en archivos JSON**
- **Middlewares personalizados**
- **Nodemon** (para desarrollo)

## Estructura del proyecto

```
src/
  routes/
    product-router.js
  managers/
    product-manager.js
  middleware/
    abmForm-formatter.js
  data/
    products.json
  utils/
    utils.js
README.md
package.json
```

## Endpoints principales

- `GET /api/products`  
  Lista todos los productos.

- `GET /api/products/:pid`  
  Obtiene un producto por su ID.

- `POST /api/products`  
  Crea un nuevo producto.

- `PUT /api/products/:pid`  
  Actualiza un producto existente.

- `DELETE /api/products/:pid`  
  Elimina un producto.

## Websockets

Cada vez que se agrega, actualiza o elimina un producto, se emite un evento a través de Socket.io para actualizar en tiempo real a los clientes conectados.

## Instalación

1. Clona el repositorio.
2. Ejecuta `npm install` para instalar las dependencias.
3. Inicia el servidor con `npm run dev` (requiere nodemon) o `node src/server.js`.

## Notas

- Los productos se almacenan en el archivo `src/data/products.json`.
- El proyecto no incluye autenticación ni autorización.
- Se recomienda validar los datos antes de
