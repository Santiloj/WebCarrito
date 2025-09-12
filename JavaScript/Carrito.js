const listProductos = document.getElementById('listProductos');

let productsArray = [];

document.addEventListener('DOMContentLoaded', function()  {
    eventListeners();
});

function eventListeners() {
    listProductos.addEventListener('click', getDataElements);
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

    productsArray = [...productsArray, productObj];

    productsHtml();
}