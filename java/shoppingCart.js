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
    ${counter}</h6> </div>
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



export {filter, find};

window.addItems = addItems;
window.generateCart = generateCart;