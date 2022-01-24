'use strict';

// listen to the container for voting
let myContainer = document.getElementById('container');

// listen to click on the "button" to display results
let showResults = document.getElementById('show-results');

// js will populate the src - display images
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

const productArr = [];
let maxPicks = 5; //< ******CHANGE TO 25********
let counter = 0;

// ************ CONSTRUCTOR FUNCTION TO INSTANTIATE PRODUCTS

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = null;
  this.picks = 0
  productArr.push(this);
}

// INSTANTIATE PRODUCTS

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');


// ******** EXECUTABLE CODE

function getRandomIndex() {
  return Math.floor(Math.random() * productArr.length);
}

let indexCollection = [];

function renderImages() {
  let productOneIndex = getRandomIndex();
  let productTwoIndex = getRandomIndex();
  let productThreeIndex = getRandomIndex();

  // validation - to make sure images are unique per round
  while (productOneIndex === productTwoIndex && productOneIndex === productThreeIndex && productOneIndex !== null) {
    productThreeIndex = getRandomIndex();
  }

  // grab the images and assign src attribute
  imgOne.src = productArr[productOneIndex].src;
  imgOne.alt = productArr[productOneIndex].alt;
  productArr[productOneIndex].views++

  imgTwo.src = productArr[productTwoIndex].src;
  imgTwo.alt = productArr[productTwoIndex].alt;
  productArr[productTwoIndex].views++

  imgThree.src = productArr[productThreeIndex].src;
  imgTwo.alt = productArr[productThreeIndex].alt;
  productArr[productThreeIndex].views++
}

renderImages();

// *********EVENTS

//events - click images

function handleClick(event) {
  //max clicks 25 - decriment... 5 for testing and decriment
  maxPicks--;

  let imgClicked = event.target.alt;
  for (let i = 0; i < productArr.length; i++) {
    if (imgClicked === productArr[i].name) {
      productArr[i].picks++;
    }
  }

  renderImages();

  if(maxPicks === 0) {
    myContainer.removeEventListener('click', handleClick);
  }
}

function handleShowResults(event) {
  let resultsList = document.getElementById('display-results');
  if(maxPicks === 0){
    for (let i = 0; i  < productArr.length; i++) {
      let li = document.createElement('li');
      li.textContent = `${productArr[i].name} had ${productArr[i].picks} votes, and was seen ${productArr[i].views} times`;
      resultsList.appendChild(li)
    }
  }
}

// Step #1 - Event Listener

myContainer.addEventListener('click', handleClick);

// EVENT #2
showResults.addEventListener('click',handleShowResults);
