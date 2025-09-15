const listProductos = document.getElementById('listProductos');
const contentProducts = document.querySelector('#contentProducts');
const emptyCart = document.querySelector('#emptyCart');

let productsArray = [];

document.addEventListener('DOMContentLoaded', function()  {
    eventListeners();

    const finalizarCompraBtn = document.getElementById('finalizarCompra');
    if (finalizarCompraBtn) {
        finalizarCompraBtn.addEventListener('click', mostrarFormularioCompra);
    }
     // Modal y formulario
    const modal = document.getElementById('formularioCompra');
    const closeModal = document.getElementById('closeModal');
    const personalDataForm = document.getElementById('datosPeronalesForm');

    if (closeModal) {
        closeModal.onclick = function() {
            modal.style.display = "none";
        }
    }

    if (personalDataForm) {
        personalDataForm.onsubmit = function(e) {
            e.preventDefault();
            modal.style.display = "none";
            mostrarMensajeCompra('¡Gracias por tu compra! Tu pedido ha sido procesado.');
            vaciarCarrito(); // Usa tu función para limpiar el carrito
        }
    }
});

function mostrarFormularioCompra() {
    document.getElementById('formularioCompra').style.display = 'flex';
}

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
function vaciarCarrito() {
    productsArray = [];
    productsHtml();
    updateCartCount();
    updateTotal();
    saveLocalStorage();
    showAlert('SIN PRODUCTOS EN EL CARRITO', 'success');
};

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

function updateCartCount() {
    const cartCount = document.querySelector('#cartCount');
    cartCount.textContent = productsArray.length;
}

function updateTotal() {
    const total = document.querySelector('#total');
    let totalProducto = productsArray.reduce( (total, prod) => total + prod.precio * prod.cantidad, 0);
    total.textContent = `$${totalProducto.toFixed(3)}`;
    
}

function getDataElements(e) {
    if(e.target.classList.contains('btn-add')) {
       const elementHTML = e.target.parentElement.parentElement;
       selectData(elementHTML);
    }
}  

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

function productsHtml() {

    clearHTML();

    productsArray.forEach( prod => {
        const {img, title, precio, cantidad, id} = prod;

        const tr = document.createElement('tr');

        const tdImg = document.createElement('td');
        const prodImg = document.createElement('img');
        prodImg.src = img;
        prodImg.alt = 'image product';
        tdImg.appendChild(prodImg);

        const tdTitle = document.createElement('td');
        tdTitle.textContent = title;

        const tdPrice = document.createElement('td');
        const prodPrice = document.createElement('p');
        const nuevoprecio = precio * cantidad;
        prodPrice.textContent = `$${nuevoprecio.toFixed(3)}`;
        tdPrice.appendChild(prodPrice);

        const tdCantidad = document.createElement('td');
        const prodCantidad = document.createElement('input');
        prodCantidad.type = 'number';
        prodCantidad.min = '1';
        prodCantidad.value = cantidad;
        prodCantidad.dataset.id = id;
        prodCantidad.oninput = updateCantidad;
        tdCantidad.appendChild(prodCantidad);

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

function saveLocalStorage() {
    localStorage.setItem('products', JSON.stringify(productsArray));   

}

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

function destroyProduct(idProd) {
    productsArray = productsArray.filter( prod => prod.id !== idProd );
    showAlert('PRODUCTO ELIMINADO', 'success');
    productsHtml();
    updateCartCount();
    updateTotal();
    saveLocalStorage();

}


function clearHTML() {
    contentProducts.innerHTML = '';
}

function showAlert(message, type) {

    const nonRepeatedAlert = document.querySelector('.alert');
    if (nonRepeatedAlert) nonRepeatedAlert.remove();
    const div = document.createElement('div');
    div.classList.add('alert', type);
    div.textContent = message;

    document.body.appendChild(div);

    setTimeout(() => div.remove(), 5000);
}