'use strict';

var allPrices = [];
var currency = '';
var recipeName = '';
var shippingPrice = 0;
var priceToButton = 0;
var itemsChecked = 0;
var titleRecipe = document.querySelector('.tittle');
var ingredients = document.querySelector('.ingredients__list');
var shippingCost = document.querySelector('.shipping__cost');
var totalPriceCont = document.querySelector('.total__price');
var priceContainer = document.querySelector('.price__title');
var subtotalContainer = document.querySelector('.subtotal');
var subtotalContainerButton = document.querySelector('.buy__button');


function addIngredients() {
  fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
  .then(function(response){
    return response.json();
    });
}