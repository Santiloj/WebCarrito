# Documentación Completa del Proyecto: Tienda de Útiles Escolares

## Descripción General
Este proyecto es una tienda web de útiles escolares que permite a los usuarios buscar productos, agregarlos a un carrito, gestionar la compra y visualizar información institucional. Utiliza HTML, CSS, JavaScript, Bootstrap y FontAwesome.

---

## Índice
1. Estructura de Carpetas
2. Componentes Principales
3. Flujo de Usuario
4. Explicación de Archivos y Funciones
5. Ejemplo de Uso
6. Buenas Prácticas
7. Preguntas Frecuentes
8. Personalización y Extensión
9. Dependencias
10. Créditos
11. Contacto

---

## 1. Estructura de Carpetas

- **Index.html**: Página principal de la tienda.
- **JavaScript/**
  - `Carrito.js`: Lógica del carrito de compras, alertas y modales.
  - `BarraBusqueda.js`: Filtro de productos por búsqueda.
- **Styles/**
  - `Styles.css`: Estilos personalizados para toda la web.
- **Image/**
  - `Imagenes/`: Imágenes de fondo y de la institución.
  - `Productos/`: Imágenes de los productos.
- **Plugins/**
  - `fontawesome/`: Iconos FontAwesome locales.
  - `poppins/`: Fuentes Poppins.

---

## 2. Componentes Principales

### Página Principal (`Index.html`)
- **Header**: Incluye el logo, barra de búsqueda y acceso al carrito.
- **Main**: Muestra los productos en una cuadrícula, cada uno con imagen, descripción, precio y botón para agregar al carrito.
- **Paginación**: Navegación entre páginas de productos usando Bootstrap.
- **Modal de Compra**: Formulario para finalizar la compra y mostrar mensaje de confirmación.
- **Footer**: Información institucional y redes sociales.

### Estilos (`Styles/Styles.css`)
- Personalización de fuentes, colores, espaciados y animaciones.
- Estilos para productos, botones, alertas, modales y footer.
- Animación para alertas (`fadeInOut`).
- Responsive para dispositivos móviles.

### Carrito de Compras (`JavaScript/Carrito.js`)
- **Variables principales**:
  - `productsArray`: Array de productos en el carrito.
- **Funciones clave**:
  - `eventListeners()`: Inicializa eventos y carga productos desde localStorage.
  - `selectData(prod)`: Agrega productos al carrito, verifica duplicados y muestra alerta.
  - `productsHtml()`: Renderiza el contenido del carrito en la tabla.
  - `updateCartCount()`: Actualiza el contador de productos en el carrito.
  - `updateTotal()`: Calcula y muestra el total de la compra.
  - `destroyProduct(idProd)`: Elimina productos del carrito y muestra alerta.
  - `showAlert(message, type)`: Muestra una alerta animada en el centro de la pantalla.
  - `vaciarCarrito()`: Vacía el carrito tras la compra.
  - `mostrarFormularioCompra()`: Muestra el modal de compra.
  - `mostrarMensajeCompra(mensaje)`: Muestra el mensaje de confirmación de compra.
  - `saveLocalStorage()`: Guarda el carrito en localStorage.

### Barra de Búsqueda (`JavaScript/BarraBusqueda.js`)
- Filtra los productos en tiempo real según el texto ingresado en el input de búsqueda.
- Permite limpiar el filtro con la tecla Escape.

---

## 3. Flujo de Usuario

1. El usuario ingresa a la tienda y visualiza los productos.
2. Puede buscar productos usando la barra de búsqueda.
3. Agrega productos al carrito usando el botón correspondiente.
4. Visualiza el carrito y puede modificar cantidades o eliminar productos.
5. Finaliza la compra llenando el formulario de datos personales.
6. Recibe una alerta y un mensaje de confirmación.

---

## 4. Explicación de Archivos y Funciones

### `Index.html`
- Estructura principal de la web.
- Incluye los enlaces a los estilos, scripts y dependencias externas.
- Contiene la cuadrícula de productos, el carrito, el formulario de compra y el footer.

### `Styles/Styles.css`
- Define la apariencia visual de todos los componentes.
- Utiliza fuentes personalizadas y colores institucionales.
- Incluye animaciones para alertas y modales.
- Ejemplo de animación para alertas:
```css
@keyframes fadeInOut {
    0% { opacity: 0; transform: scale(0.8); }
    15% { opacity: 1; transform: scale(1); }
    85% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(0.8); }
}
```

### `JavaScript/Carrito.js`
- Maneja la lógica de agregar, eliminar y modificar productos en el carrito.
- Controla la persistencia usando localStorage.
- Muestra alertas animadas y modales de compra.
- Ejemplo de función para mostrar alerta:
```js
function showAlert(message, type) {
    const nonRepeatedAlert = document.querySelector('.alert');
    if (nonRepeatedAlert) nonRepeatedAlert.remove();
    const div = document.createElement('div');
    div.classList.add('alert', type);
    div.textContent = message;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 5000);
}
```

### `JavaScript/BarraBusqueda.js`
- Filtra los productos en tiempo real según el texto ingresado.
- Ejemplo de filtro:
```js

document.addEventListener("keyup", e => {
    if(e.target.matches("#buscador")) {
        if(e.key === "Escape") e.target.value = ""
        document.querySelectorAll(".producto").forEach(producto => {
            producto.textContent.toLowerCase().includes(e.target.value.toLowerCase())
            ?producto.classList.remove("filtro")
            :producto.classList.add("filtro")
        })
    }
})
```

---

## 5. Ejemplo de Uso

- Buscar "Cuaderno" en la barra de búsqueda y ver cómo se filtran los productos.
- Agregar un producto al carrito y ver la alerta de confirmación.
- Eliminar un producto y ver la alerta correspondiente.
- Finalizar la compra y recibir el mensaje de agradecimiento.

---

## 6. Buenas Prácticas

- Mantén los archivos organizados y con nombres descriptivos.
- Haz commits frecuentes y claros en Git.
- Usa comentarios en el código para facilitar el mantenimiento.
- Revisa la consola del navegador para depurar errores.
- No almacenes datos sensibles en localStorage.
- Haz pruebas en diferentes navegadores y dispositivos.
- Utiliza imágenes optimizadas para mejorar el rendimiento.
- Documenta cualquier cambio importante en el código.

---

## 7. Preguntas Frecuentes

**¿Cómo agrego más productos?**
Edita el HTML y agrega nuevos bloques `.producto` en la cuadrícula.

**¿Cómo cambio los colores o fuentes?**
Modifica los valores en `Styles.css`.

**¿Cómo puedo agregar nuevas funcionalidades?**
Extiende los archivos JS siguiendo la lógica actual y agrega nuevos eventos o funciones.

**¿Cómo restauro el proyecto si se daña?**
Usa Git para volver a un commit anterior con `git reset --hard <commit>`.

**¿Cómo puedo hacer el sitio más seguro?**
No guardes datos sensibles en localStorage y valida los datos del formulario antes de procesar la compra.

---

## 8. Personalización y Extensión
- Puedes agregar más productos editando el HTML.
- Los estilos pueden modificarse en `Styles.css`.
- Para agregar nuevas funcionalidades, extiende los archivos JS según la lógica actual.
- Puedes cambiar las imágenes en la carpeta `Image/Productos`.
- Personaliza el footer con tus propias redes sociales.
- Agrega validaciones extra en el formulario de compra.
- Integra pasarelas de pago si lo requieres.

---

## 9. Dependencias
- **Bootstrap 5.3.2**: Para la paginación y estilos base.
- **FontAwesome**: Para los iconos sociales y de carrito.
- **Poppins**: Fuente principal personalizada.

---

## 10. Créditos
- Desarrollado por: [Santiago Lopez Jaramillo - Santiago Osorio Montoya]
- Institución: Institución Universitaria Pascual Bravo

---

## 11. Contacto
Para soporte o sugerencias, contacta a la institución o al desarrollador principal.
