"use strict";
import { stock } from './stock.js';
// agregar a carrito

let initialValue = [];


function find(array, cb){
  for(let j=0; j<array.length; j++){
    let result = cb(array[j]);
    if(result===true){
      return array[j];
    }
  }
}

function addCart(id) {

  function cbFindById(stock){
    return stock.id == id;
  }

  let product = find(stock, cbFindById)
  initialValue.push(product)
  localStorage.setItem('shoppingCart',JSON.stringify(initialValue))
  }

window.addCart = addCart;

