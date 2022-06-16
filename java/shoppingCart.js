"use strict"

import { stock } from './stock.js';


function filter(array, cb) {
    let filteredData = [];
    for(let i = 0; i < array.length; i++) {
        let result = cb(array[i]);
        if(result) {
            filteredData.push(array[i]);
        }
    }
    return filteredData;
}

function find(array, cb) {
    for(let i=0; i<array.length; i++) {
        let result = cb(array[i]);
        if(result===true) {
            return array[i];
        }
    }
}

let ShoppingCartItems = JSON.parse(localStorage.getItem('ShoppingCart')) || [];

function generateCart(){
    let array= ShoppingCartItems;
    let counter = 0
    let html =`<div class="shopping-cart px-5 d-flex">
    <h5>Shopping Cart</h5>`
    for (let i = 0; i < array.length; i++) {
        html += `<div class="my-4">
                <div class="card d-flex flex-row">
                    <div class="shop-img">
                        <img src="${array[i].colors[0].pictures[0]}" class="card-img-top" alt="...">
                    </div>
                    <div class="shop-card">
                        <p>${array[i].name}</p>
                        <p class="text-end">$ ${array[i].price}</p>
                    </div>
                </div>
            </div>`;
    }
    for (let i = 0; i < array.length; i++) {
        counter += array[i].price;
    }
    html += ` <div> <h6>$ Subtotal &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp 
                        ${counter}</h6> 
                </div>
                <div> <button class="btn btn-outline-secondary" onClick="generateCardCart()">Go to Cart</button> </div>
            </div>`
    let container = document.getElementById('preview-cart-container')
    container.innerHTML = html;
}



function addItems(id){
    function cbFindById(product){
        return product.id == id;
      }
    
    let product = find(stock,cbFindById);
    ShoppingCartItems.push(product)
    localStorage.setItem('ShoppingCart',JSON.stringify(ShoppingCartItems))
}


//Genero la lista del carrito en base a un div con la clase container-cart
function generateCardCart() {
    let shoppingCart = ShoppingCartItems
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
    totalPago();
  }
  
  
  let pagoTotal = 0;
  for (let l = 0; l < ShoppingCartItems.length; l++) {
    let pago = ShoppingCartItems[l].price;
    pagoTotal += pago;
  }
  //Otro div para la seccion de pago donde aparecerá la opcion de finalizar la compra
  function totalPago(){
    pagoTotal
    let containerPago = document.getElementById("total");
    let htmlPago = `<p>$${pagoTotal}</p><button onclick="fin()" class="finalizar">Finalizar Compra</button>`;
    containerPago.innerHTML = htmlPago;
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
  


export {filter, find};


window.generateCardCart = generateCardCart;
window.totalPago = totalPago;
window.fin = fin;
window.removeCart = removeCart;


window.addItems = addItems;
window.generateCart = generateCart;