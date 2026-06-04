# StreetSync + DEUSS

Plataforma web completa que combina un **sistema ERP administrativo** (StreetSync) con una **tienda de ropa online** (DEUSS). El proyecto es 100% estático — no requiere servidor, base de datos ni PHP. Toda la persistencia de datos se maneja con `localStorage` del navegador.

---

## Tabla de contenido

- [Vista general](#vista-general)
- [Tecnologías](#tecnologías)
- [Cómo ejecutar](#cómo-ejecutar)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Módulo DEUSS — Tienda Online](#módulo-deuss--tienda-online)
- [Módulo StreetSync — Sistema ERP](#módulo-streetsync--sistema-erp)
- [Almacenamiento de datos](#almacenamiento-de-datos)
- [Flujo de compra completo](#flujo-de-compra-completo)
- [Autores](#autores)

---

## Vista general

El sistema tiene dos grandes secciones accesibles desde la página principal (`index.html`):

| Sección | Descripción | Acceso |
|---------|-------------|--------|
| **DEUSS** | Tienda de ropa urbana con catálogo para hombre y mujer, carrito de compras y módulo de pago simulado | Botón "Tu estilo urbano" |
| **StreetSync** | Panel administrativo ERP con 5 módulos de gestión empresarial | Botón "Iniciar" |

---

## Tecnologías

- **HTML5** — Estructura de todas las páginas
- **CSS3** — Estilos, animaciones fade-in y diseño responsive
- **JavaScript (Vanilla ES6+)** — Toda la lógica de negocio, CRUD y carrito
- **localStorage** — Persistencia de datos en el navegador (sin backend)
- **Font Awesome 6.5** — Iconografía

> No se requiere Node.js, PHP, Python ni ningún servidor. El proyecto funciona abriéndolo directamente en un navegador.

---

## Cómo ejecutar

### Opción 1 — Abrir directamente
1. Descargar o clonar el repositorio
2. Abrir el archivo `index.html` con cualquier navegador moderno (Chrome, Firefox, Edge)

### Opción 2 — Servidor local (recomendado para evitar restricciones CORS)
```bash
# Con Python
python -m http.server 8080

# Con Node.js (npx)
npx serve .

# Con VS Code: instalar extensión "Live Server" y hacer clic en "Go Live"
```
Luego abrir `http://localhost:8080` en el navegador.

### Opción 3 — Despliegue estático
El proyecto puede publicarse directamente en:
- **GitHub Pages** — subir el repositorio y activar Pages desde la rama `main`
- **Netlify** — arrastrar la carpeta del proyecto al panel de Netlify
- **Vercel** — importar el repositorio y desplegar como sitio estático

---

## Estructura del proyecto

```
Erp/
├── index.html                  ← Página de inicio (punto de entrada)
├── styles.css
├── script.js
├── Imagenes/                   ← Todos los recursos gráficos (95+ archivos)
│
├── deuss/                      ← Tienda online DEUSS
│   ├── eleccion_genero/        ← Selector Hombre / Mujer
│   ├── login_pagina/           ← Inicio de sesión
│   ├── crear_usuario/          ← Registro de cuenta
│   ├── editar_perfil/          ← Gestión de perfil
│   ├── carrito/                ← Carrito de compras
│   ├── pago/                   ← Módulo de pago simulado
│   └── generos/
│       ├── parte_hombre/       ← Sección Hombre
│       │   ├── camisetas/      ← 4 modelos de camisetas
│       │   ├── jeans/          ← 4 modelos de jeans
│       │   ├── sudaderas/      ← 4 modelos de sudaderas
│       │   └── shorts/         ← 4 modelos de shorts
│       └── parte_mujer/        ← Sección Mujer
│           ├── vestidos/       ← 4 modelos de vestidos
│           ├── jeans/          ← 4 modelos de jeans
│           ├── tops/           ← 4 modelos de tops
│           ├── shorts/         ← 4 modelos de shorts
│           └── pantalones/     ← 4 modelos de pantalones
│
└── streetsync/                 ← Sistema ERP administrativo
    ├── inicio_admi/            ← Panel principal
    └── modulos/
        ├── ventas/             ← Módulo de Ventas
        ├── clientes/           ← Módulo de Clientes
        ├── comprasinventario/  ← Módulo de Inventario
        ├── rrhh/               ← Módulo de RRHH / Nómina
        └── contabilidad/       ← Módulo de Contabilidad
```

---

## Módulo DEUSS — Tienda Online

### Catálogo de productos

**Sección Hombre** — 16 productos en 4 categorías:

| Categoría | Productos |
|-----------|-----------|
| Camisetas | Camisa cuadros, Tie-dye celeste, Rayada clásica, Beige lino |
| Jeans | 4 modelos de jeans masculinos |
| Sudaderas | 4 modelos con y sin capucha |
| Shorts | 4 modelos de shorts deportivos |

**Sección Mujer** — 20 productos en 5 categorías:

| Categoría | Productos |
|-----------|-----------|
| Vestidos | Floral midi, Negro tubo, Casual rayas, Boho tropical |
| Jeans | Skinny push-up, Ripped, Mom fit, Wide leg |
| Tops | Cropped encaje, Seda strappy, Estampado floral, Básico beige |
| Shorts | Denim azul, Floral verano, Negro elegante, Deportivo rosa |
| Pantalones | Palazzo beige, Entubado negro, Cargo militar, Plisado camel |

### Funcionalidades de la tienda

- **Registro e inicio de sesión** — Cuentas almacenadas en localStorage. Validación de correo único y contraseña con requisitos de seguridad.
- **Perfil de usuario** — Editar nombre, correo, dirección y teléfono. Cerrar sesión.
- **Selección de productos** — Galería de imágenes, selector de talla (XS–XL o numérico para jeans), selector de cantidad (1–10).
- **Carrito de compras** — Añadir, modificar cantidad y eliminar productos. Persiste entre páginas.
- **Módulo de pago** — Resumen del pedido, formulario de envío (calle, barrio, destinatario) y datos de tarjeta (número, nombre, cuotas, vencimiento, CVV). Al confirmar: limpia el carrito y simula aprobación de transacción.

---

## Módulo StreetSync — Sistema ERP

Cada módulo cuenta con tabla dinámica, búsqueda en tiempo real y operaciones CRUD completas (Crear, Leer, Actualizar, Eliminar) mediante ventanas modales.

### Módulo de Ventas
Registro de reportes de ventas por cliente y producto.

| Campo | Descripción |
|-------|-------------|
| Fecha | Fecha y hora de la venta |
| Cliente | Nombre del cliente |
| Producto | Nombre del producto vendido |
| Cantidad | Unidades vendidas |
| Precio unitario | Precio por unidad (COP) |
| Total | Calculado automáticamente |

### Módulo de Clientes / Proveedores
Gestión del directorio de clientes y proveedores.

Campos: nombre, correo, teléfono, dirección, fecha de registro.

### Módulo de Inventario / Compras
Control del stock de la tienda.

Campos: nombre del producto, categoría, talla, color, cantidad, precio unitario, ubicación en almacén, fecha de entrada.

### Módulo de RRHH / Nómina
Registro y administración de empleados.

Campos: nombre, correo, teléfono, cargo, salario, fecha de ingreso.

### Módulo de Contabilidad
Registro de movimientos financieros con reporte mensual.

Campos: fecha, tipo (Ingreso / Egreso), concepto, monto.

**Reporte mensual:** Seleccionando mes y año se genera un reporte con total de ingresos, total de egresos y balance final (en color verde si positivo, rojo si negativo).

---

## Almacenamiento de datos

Todo el estado de la aplicación vive en el `localStorage` del navegador bajo las siguientes claves:

| Clave | Contenido |
|-------|-----------|
| `deuss_usuarios` | Array de cuentas registradas (nombre, correo, contraseña, dirección, teléfono) |
| `nombreUsuario` | Nombre del usuario con sesión activa |
| `correoUsuario` | Correo del usuario con sesión activa |
| `carrito` | Array de productos añadidos al carrito |
| `erp_ventas` | Array de reportes de ventas |
| `erp_clientes` | Array de clientes/proveedores |
| `erp_inventario` | Array de productos en inventario |
| `erp_rrhh` | Array de empleados |
| `erp_contabilidad` | Array de movimientos contables |

> **Nota:** Los datos se pre-cargan con información de demo la primera vez que se accede a cada módulo. Para reiniciar los datos, borrar el localStorage desde las herramientas de desarrollador del navegador (`F12 → Application → Local Storage → Clear All`).

---

## Flujo de compra completo

```
index.html
    ↓
eleccion_genero/eleccion.html   → Elegir Hombre o Mujer
    ↓
parte_hombre/hombre.html        → Elegir categoría (Camisetas / Jeans / Sudaderas / Shorts)
parte_mujer/mujer.html          → Elegir categoría (Vestidos / Jeans / Tops / Shorts / Pantalones)
    ↓
[categoria].html                → Ver los 4 modelos disponibles
    ↓
[producto].html                 → Seleccionar talla + cantidad → "Añadir a cesta"
    ↓
carrito/carrito.html            → Revisar pedido, modificar cantidades o eliminar
    ↓
pago/pago.html                  → Ingresar dirección de envío + datos de tarjeta
    ↓
"Comprar ahora"                 → Transacción aprobada ✓ (carrito vacío, regresa al inicio)
```

---

## Autores

Proyecto desarrollado como trabajo universitario 

Tienda: **DEUSS** | Sistema ERP: **StreetSync**
