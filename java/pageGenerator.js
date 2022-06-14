"use strict"
import { stock } from './stock.js';

function generateCard(objectArray) {
    let html = '';
    for(let i = 0; i < objectArray.length; i++) {
        html += `<div class="col-2-5 my-4">
                        <div class="card">
                            <img src="${objectArray[i].colors[0].pictures[0]}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <p>${objectArray[i].name}</p>
                                <div class="color-container d-flex">
                                    <div class="color-circle mx-1 mb-1" style="background:${objectArray[i].colors[0].colorid}"></div>
                                    <div class="color-circle mx-1 mb-1" style="background:${objectArray[i].colors[1].colorid}"></div>
                            </div>
                                <p class="text-end">${objectArray[i].price}</p>
                            </div>
                        </div>
                    </div>`;
    }
    const container = document.getElementById('product-container');
    container.innerHTML = html;
}
generateCard(stock);