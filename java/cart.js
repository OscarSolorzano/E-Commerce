"use strict";
//El carrito obtiene informacion desde la clase shoppingCart
let shoppingCart = localStorage.getItem('ShoppingCart');
if (shoppingCart){
  shoppingCart = JSON.parse(shoppingCart);
}else{
  shoppingCart = [];
}

//Genero la lista del carrito en base a un div con la clase container-cart
function generateCardCart() {
  let shoppingCart = JSON.parse(localStorage.getItem('ShoppingCart')) || [];
  const container = document.getElementById("home");
  let html = '';
  for (let i = 0; i < shoppingCart.length; i++) {
    html += `<div class="container-item">
                        <img src="${shoppingCart[i].colors[0].pictures[0]}" alt="Imagen de producto">
                        <p>${shoppingCart[i].name}</p>
                        <p>$${shoppingCart[i].price}</p>
                        <button class="remove" onclick=removeCart(${shoppingCart[i].id})>X</button>
                      </div>`;
  }
  html += `<div id="total"></div>`
  container.innerHTML = html;
}


let pagoTotal = 0;
for (let l = 0; l < shoppingCart.length; l++) {
  let pago = shoppingCart[l].price;
  pagoTotal += pago;
}
//Otro div para la seccion de pago donde aparecerá la opcion de finalizar la compra
function totalPago(pagoTotal){
  let containerPago = document.getElementById("total");
  let htmlPago = `<p>$${pagoTotal}</p><button onclick="fin()" class="finalizar">Finalizar Compra</button>`;
  containerPago.innerHTML = htmlPago;
}
totalPago(pagoTotal);
function find(array, cb){
  for(let j=0; j<array.length; j++){
    let result = cb(array[j]);
    if(result===true){
      return array[j];
    }
  }
}


function find1(array, cb){
  for(let j=0; j<array.length; j++){
    let result = cb(array[j]);
    if(result===true){
      return array[j];
    }
  }
}
//funcion donde remuevo la carta
function removeCart(id) {
  let shoppingTemp = JSON.parse(localStorage.getItem('ShoppingCart'));
  function cbFindById(product){
    return product.id == id;
  }
  let product = find1(shoppingTemp, cbFindById);
  for (let k = 0; k < shoppingTemp.length; k++) {
      if (product.id === shoppingTemp[k].id) {
        shoppingTemp.splice(k,1)
      }
    }
  localStorage.setItem('ShoppingCart', JSON.stringify(shoppingTemp));
  window.location.reload();
}
function fin(){
  localStorage.clear();
  window.location.reload();
}


window.generateCardCart = generateCardCart;
window.fin = fin;
window.removeCart = removeCart;

