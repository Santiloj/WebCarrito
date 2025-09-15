// BarraBusqueda.js
// -------------------------------------------------------------
// Lógica para el filtrado dinámico de productos en la tienda.
// Este archivo está diseñado para ser claro y eficiente para desarrolladores profesionales.
// -------------------------------------------------------------

// Listener global para detectar teclas en el input de búsqueda
// Filtra los productos en tiempo real según el texto ingresado
// Permite limpiar el filtro con la tecla Escape

document.addEventListener("keyup", e => {
    // Verifica si el evento proviene del input de búsqueda
    if(e.target.matches("#buscador")) {
        // Limpia el input si se presiona Escape
        if(e.key === "Escape") e.target.value = ""

        // Itera sobre todos los productos y aplica el filtro
        document.querySelectorAll(".producto").forEach(producto => {
            // Si el texto del producto incluye el valor buscado, lo muestra; si no, lo oculta
            producto.textContent.toLowerCase().includes(e.target.value.toLowerCase())
            ?producto.classList.remove("filtro")
            :producto.classList.add("filtro")
        })
    }
})
