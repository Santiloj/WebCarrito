// Carrito.js
// -------------------------------------------------------------
// Lógica principal para la gestión del carrito de compras, alertas y modales.
// Este archivo está diseñado para ser mantenible y extensible por desarrolladores profesionales.
// -------------------------------------------------------------

// Elementos principales del DOM
const listProductos = document.getElementById('listProductos'); // Contenedor de productos
const contentProducts = document.querySelector('#contentProducts'); // Tabla del carrito
const emptyCart = document.querySelector('#emptyCart'); // Elemento para mostrar carrito vacío (no implementado)

let productsArray = []; // Array que almacena los productos en el carrito

// Inicialización de eventos y modales al cargar el DOM
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function()  {
    eventListeners();

    // Botón para finalizar compra y mostrar formulario
    const finalizarCompraBtn = document.getElementById('finalizarCompra');
    if (finalizarCompraBtn) {
        finalizarCompraBtn.addEventListener('click', mostrarFormularioCompra);
    }
    // Modal y formulario de compra
    const modal = document.getElementById('formularioCompra');
    const closeModal = document.getElementById('closeModal');
    const personalDataForm = document.getElementById('datosPeronalesForm');

    // Cierre del modal de compra
    if (closeModal) {
        closeModal.onclick = function() {
            modal.style.display = "none";
        }
    }

    // Envío del formulario de compra
    if (personalDataForm) {
        personalDataForm.onsubmit = function(e) {
            e.preventDefault();
            modal.style.display = "none";
            mostrarMensajeCompra('¡Gracias por tu compra! Tu pedido ha sido procesado.');
            vaciarCarrito(); // Limpia el carrito tras la compra
        }
    }
});

// Muestra el formulario de compra (modal)
function mostrarFormularioCompra() {
    document.getElementById('formularioCompra').style.display = 'flex';
}

// Muestra el mensaje de confirmación de compra
function mostrarMensajeCompra(mensaje) {
    const purchaseModal = document.getElementById('mensajeCompra');
    const purchaseText = document.getElementById('mensajeCompraTexto');
    const closeBtn = document.getElementById('cerrarMensajeCompra');

    purchaseText.textContent = mensaje;
    purchaseModal.style.display = 'flex';

    closeBtn.onclick = function() {
        purchaseModal.style.display = 'none';
    };
}

// Vacía el carrito y actualiza la interfaz
function vaciarCarrito() {
    productsArray = [];
    productsHtml();
    updateCartCount();
    updateTotal();
    saveLocalStorage();
    showAlert('SIN PRODUCTOS EN EL CARRITO', 'success');
};

// Inicializa los listeners y carga el carrito desde localStorage
function eventListeners() {
    listProductos.addEventListener('click', getDataElements);
    const loadProducts = localStorage.getItem('products');
    if(loadProducts) {
        productsArray = JSON.parse(loadProducts);
        productsHtml();
        updateCartCount();
        updateTotal();
    }else {
        productsArray = [];
    }  
}

// Actualiza el contador de productos en el carrito
function updateCartCount() {
    const cartCount = document.querySelector('#cartCount');
    cartCount.textContent = productsArray.length;
}

// Calcula y muestra el total de la compra
function updateTotal() {
    const total = document.querySelector('#total');
    let totalProducto = productsArray.reduce( (total, prod) => total + prod.precio * prod.cantidad, 0);
    total.textContent = `$${totalProducto.toFixed(3)}`;
}

// Obtiene los datos del producto seleccionado y lo agrega al carrito
function getDataElements(e) {
    if(e.target.classList.contains('btn-add')) {
       const elementHTML = e.target.parentElement.parentElement;
       selectData(elementHTML);
    }
}  

// Agrega un producto al carrito, verifica duplicados y muestra alerta
function selectData(prod) {
    const productObj = {
        img: prod.querySelector('img').src,
        title: prod.querySelector('h4').textContent,
        precio: parseFloat(prod.querySelector('#currentprice').textContent.replace('$', '')),
        id: parseInt(prod.querySelector('button[type="button"]').dataset.id, 10),
        cantidad: 1
    }

    const exist = productsArray.some( prod => prod.id === productObj.id );

    if(exist) {
        showAlert('PRODUCTO YA EN EL CARRITO', 'error');
        return;
    }

    productsArray = [...productsArray, productObj];
    showAlert('PRODUCTO AGREGADO', 'success');
    productsHtml();
    updateCartCount();
    updateTotal();
}

// Renderiza el contenido del carrito en la tabla
function productsHtml() {

    clearHTML();

    productsArray.forEach( prod => {
        const {img, title, precio, cantidad, id} = prod;

        const tr = document.createElement('tr');

        // Imagen del producto
        const tdImg = document.createElement('td');
        const prodImg = document.createElement('img');
        prodImg.src = img;
        prodImg.alt = 'image product';
        tdImg.appendChild(prodImg);

        // Título
        const tdTitle = document.createElement('td');
        tdTitle.textContent = title;

        // Precio
        const tdPrice = document.createElement('td');
        const prodPrice = document.createElement('p');
        const nuevoprecio = precio * cantidad;
        prodPrice.textContent = `$${nuevoprecio.toFixed(3)}`;
        tdPrice.appendChild(prodPrice);

        // Cantidad
        const tdCantidad = document.createElement('td');
        const prodCantidad = document.createElement('input');
        prodCantidad.type = 'number';
        prodCantidad.min = '1';
        prodCantidad.value = cantidad;
        prodCantidad.dataset.id = id;
        prodCantidad.oninput = updateCantidad;
        tdCantidad.appendChild(prodCantidad);

        // Botón eliminar
        const tdDelete = document.createElement('td');
        const prodDelete = document.createElement('button');
        prodDelete.textContent = 'X';
        prodDelete.type = 'button';
        prodDelete.onclick = () => destroyProduct(id);
        tdDelete.appendChild(prodDelete);

        tr.append(tdImg, tdTitle, tdPrice, tdCantidad, tdDelete);

        contentProducts.appendChild(tr);
    });
    saveLocalStorage();
}

// Guarda el carrito en localStorage
function saveLocalStorage() {
    localStorage.setItem('products', JSON.stringify(productsArray));   
}

// Actualiza la cantidad de un producto en el carrito
function updateCantidad(e) {
     const newCantidad = parseInt(e.target.value, 10);
     const idProd = parseInt(e.target.dataset.id, 10);   

     const product = productsArray.find( prod => prod.id === idProd );
     if (product && newCantidad > 0) {
        product.cantidad = newCantidad;
     }
    productsHtml();
    updateTotal();
    saveLocalStorage();
}

// Elimina un producto del carrito y muestra alerta
function destroyProduct(idProd) {
    productsArray = productsArray.filter( prod => prod.id !== idProd );
    showAlert('PRODUCTO ELIMINADO', 'success');
    productsHtml();
    updateCartCount();
    updateTotal();
    saveLocalStorage();
}

// Limpia el contenido HTML del carrito
function clearHTML() {
    contentProducts.innerHTML = '';
}

// Muestra una alerta animada en el centro de la pantalla
function showAlert(message, type) {

    const nonRepeatedAlert = document.querySelector('.alert');
    if (nonRepeatedAlert) nonRepeatedAlert.remove();
    const div = document.createElement('div');
    div.classList.add('alert', type);
    div.textContent = message;

    document.body.appendChild(div);

    setTimeout(() => div.remove(), 5000);
}