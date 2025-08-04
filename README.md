# 🛒 back-ecom

**back-ecom** es un backend simple para un sistema de e-commerce, desarrollado en **Node.js** con **Express**, que permite gestionar productos y carritos utilizando rutas personalizadas y clases de manejo de archivos JSON como persistencia local. Para la primera entrega del curso de BackEnd en **CoderHouse**

## 🚀 Tecnologías

- Node.js
- Express
- FS (sistema de archivos de Node)
- ESM Modules (`type: module`)

## 🧠 Funcionalidades

### 📦 Productos

- Crear un nuevo producto
- Obtener todos los productos
- Obtener un producto por ID
- Actualizar producto
- Eliminar producto

### 🛒 Carritos

- Crear un nuevo carrito
- Agregar producto a un carrito
- Obtener productos de un carrito

## 🔌 Endpoints

### Productos

- `GET /api/products`: Lista todos los productos
- `GET /api/products/:pid`: Obtiene un producto por ID
- `POST /api/products`: Crea un nuevo producto
- `PUT /api/products/:pid`: Actualiza un producto existente
- `DELETE /api/products/:pid`: Elimina un producto

### Carritos

- `GET /api/carts/:cid`: Muestra los productos de un carrito
- `POST /api/carts`: Crea un carrito nuevo
- `POST /api/carts/:cid/product/:pid`: Agrega un producto a un carrito

## 🧪 Ejemplo de uso

```json
// Crear un producto
POST /api/products
{
  "title": "Silla de madera",
  "description": "Silla artesanal",
  "price": 1500,
  "stock": 10,
  "category": "muebles",
  "thumbnails": [
      "/images/silla-madera.jpg"
    ]
}
```

## ▶️ Instalación y ejecución

1. Clonar el repositorio:

```bash
git clone https://github.com/ghertzan/back-ecom.git
cd back-ecom
```

1. Instalar dependencias:

```bash
npm install
```

1. Ejecutar en modo desarrollo:

```bash
npm run dev
```

1. El servidor corre por defecto en: `http://localhost:8080`

## ⚙️ Utilidades destacadas

- Generador de IDs aleatorios en `utils.js` usando prefijos por entidad.
- Persistencia local con archivos `.json` usando el módulo `fs.promises`.

## 📌 Notas

- No requiere base de datos, ideal para testing o proyectos de práctica.
- Se puede extender fácilmente para conectar con MongoDB o añadir autenticación.

## 🪪 Licencia

Licenciado bajo ISC.
