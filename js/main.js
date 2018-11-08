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


// function getData:
function addIngredients() {
  fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
  .then(function(response){
    return response.json();
  })
  .then(function(json){
    var recipe = json.recipe;
    var recipeIngredients = recipe.ingredients;
    var listHTML = '';

    for (var i = 0; i < recipeIngredients.length; i++) {
      var brand = (recipeIngredients[i].brand != undefined) ? recipeIngredients[i].brand : "";
      listHTML += '<li class="item"><input type="checkbox" class="checkbox checkbox__input" id="checkbox__input_'+ i +'" name="checkbox__input" onclick="checkArticle()">' +
      '<div class="quantity__container"><input type="number" class="quantity__input quantity__input_'+ i +'" onchange="getValorInput('+ i +')" value="1" min="0">' +
      '</div><div class="descripcion__container"><h3>'
      + recipeIngredients[i].product + '</h3><p>' + brand + '</p><p>' + recipeIngredients[i].quantity +
      '</p></div><div class="price__container"><h3 class="price__title' + i + '">'+ recipeIngredients[i].price + recipe.currency +'</h3></div></li>';
      allPrices.push(recipeIngredients[i].price);
      currency = recipe.currency;
      recipeName = recipe.name;
      shippingPrice = parseFloat(recipe['shipping-cost']);
    };
    ingredients.innerHTML += listHTML;
    titleRecipe.innerHTML += recipeName
    paintSubtotal();
  });

};
function getValorInput(i) {
  var quantityInput = document.querySelector('.quantity__input_'+ i +'').value;
  var quantityValue = parseInt(document.querySelector('.quantity__input_'+ i +'').value);
  var priceContainer = document.querySelector('.price__title' + i + '');
  var resultPrice = quantityInput * allPrices[i];
  var result = resultPrice.toFixed(2);
  priceContainer.innerHTML = result + currency;
};

function checkArticle() {
  var allCheckbox = document.querySelectorAll('.checkbox__input');
  var itemsCheckedContainer = document.querySelector('.items__checked');
  var subtotal = 0;
  var itemsChecked = 0;
  for (var i = 0; i < allCheckbox.length; i++) {
    if (allCheckbox[i].checked) {
      var finishPriceContainer = document.querySelector('.price__title' + i + '');
      var finishPriceArticle = parseFloat(finishPriceContainer.innerHTML);
      subtotal += finishPriceArticle;
      itemsChecked += +1;
    }
    itemsCheckedContainer.innerHTML = 'Items: ' + itemsChecked;
    priceToButton = subtotal;
    paintSubtotal();
    paintTotal();

  }

}

function paintSubtotal() {
  subtotalContainer.innerHTML = priceToButton + currency;
  shippingCost.innerHTML = shippingPrice + currency;
}

function paintTotal() {
 var addShippingPrice = false;
 var allCheckbox = document.querySelectorAll('.checkbox__input');
 for (var i = 0; i < allCheckbox.length; i++) {
   if (allCheckbox[i].checked) {
     addShippingPrice = true;
   }
 }
 if (addShippingPrice) {
   var totalPrice = priceToButton + shippingPrice + currency;
   totalPriceCont.innerHTML =  totalPrice;
   subtotalContainerButton.innerHTML = 'Comprar ingredientes: ' + totalPrice;
 } else {
   totalPrice = priceToButton + currency;
   totalPriceCont.innerHTML =  totalPrice;
   subtotalContainerButton.innerHTML = 'Comprar ingredientes: ' + totalPrice;
}
}
  //función para seleccionar todos los checkbox
  function checkAll(){
    var items = document.querySelectorAll('.checkbox__input');
    for(let i=0; i<items.length; i++){
      document.querySelector('#checkbox__input_'+ i ).checked = true;
  
    }
  paintTotal()
  paintSubtotal()
  }
  
  //función para deseleccionar todos los checkbox
  function uncheckAll(e){
    var items = document.querySelectorAll('.checkbox__input');
    for(let i=0; i<items.length; i++){
      document.querySelector('#checkbox__input_'+ i ).checked = false;
    }
  }
  
  document.querySelector('.select__all').addEventListener('click', checkAll);
  document.querySelector('.unselect__all').addEventListener('click', uncheckAll);
  addIngredients();