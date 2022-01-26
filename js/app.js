'use strict';

// listen to the container for voting
let myContainer = document.getElementById('container');

// listen to click on the "button" to display results
let showResults = document.getElementById('show-results');

// js will populate the src - display images
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

// reference our canvas element for bar chart
const ctx = document.getElementById('myChart').getContext('2d');

let productArr = [];
let maxPicks = 15;
let counter = 0;

// ************ CONSTRUCTOR FUNCTION TO INSTANTIATE PRODUCTS

function Product(name, fileExtension = 'jpg') {
  //                    ^default parameter
  // default parameters are going to be very helpful feature
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.picks = 0;
  // properties with this attached
  productArr.push(this);
  // this is connected to the objected that is predated.
}

// Step: Get goats out of local storage:
let retrievedProd = localStorage.getItem('products');

let parsedProd = JSON.parse(retrievedProd);

// let parsedProd = JSON.parse(localStorage.getItem('products')) < a one liner from the above
// console.log(parsedProd);

// Step 4: If I have goats in LS, use those, if not then instantiate new goats. 

if(retrievedProd) {
  productArr = parsedProd;
} else {

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
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

}

// ******** EXECUTABLE CODE
function getRandomIndex() {
  return Math.floor(Math.random() * productArr.length);
}


let indexCollection = [];
function renderImages() {

  while (indexCollection.length < 6) {
    let randoNum = getRandomIndex();
    while (!indexCollection.includes(randoNum)) {
      indexCollection.push(randoNum);
    }
  }

  // array = queue
  // first in first out

  let productOneIndex = indexCollection.shift();
  let productTwoIndex = indexCollection.shift();
  let productThreeIndex = indexCollection.shift();

  // validation - to make sure images are unique per round
  // while (productOneIndex === productTwoIndex || productOneIndex === productThreeIndex || productOneIndex !== null) {
  //   productThreeIndex = getRandomIndex();
  // }

  // grab the images and assign src attribute
  imgOne.src = productArr[productOneIndex].src;
  imgOne.id = productArr[productOneIndex].name;
  productArr[productOneIndex].views++

  imgTwo.src = productArr[productTwoIndex].src;
  imgTwo.id = productArr[productTwoIndex].name;
  productArr[productTwoIndex].views++

  imgThree.src = productArr[productThreeIndex].src;
  imgThree.id = productArr[productThreeIndex].name;
  productArr[productThreeIndex].views++
}

renderImages();

function renderChart (){
  // chart label
  let productNames = [];

  // values for datasets
  let productVotes = [];
  let productViews = [];

  // for loop to go through our product array to fill in our arrays declared above to use in our chart
  for(let i = 0; i < productArr.length; i++){
    productNames.push(productArr[i].name);
    productVotes.push(productArr[i].picks);
    productViews.push(productArr[i].views);
  }

  const chartObj = {
    type: 'bar',
    data: {
      labels: productNames, // labels for the chart
      datasets: [{
        label: '# of Votes', // value for the dataset
        data: productVotes,
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      { //second dataset
        label: '# of Views',
        data: productViews,
        backgroundColor: 'rgba(232, 212, 212 0.7)',
        borderColor: 'grey',
        borderWidth: 1
      }
    ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  // Pull in our chart code: 2 args: Dom reference & object that will build out our chart
  const myChart = new Chart(ctx, chartObj); // eslint-disable-line
}
// *********EVENTS

//events - click images

function handleClick(event) {
  //max clicks 25 - decriment... 5 for testing and decriment
  maxPicks--;

  let imgClicked = event.target.id;

  for (let i = 0; i < productArr.length; i++) {
    // console.log(productArr[i]);
    if (imgClicked === productArr[i].name) {
      productArr[i].picks++;
      console.log(productArr[i]);
    }
  }

  renderImages();

  

  if (maxPicks === 0) {
    myContainer.removeEventListener('click', handleClick);
  }
}

function handleShowResults(event) {
  if (maxPicks === 0) {
    renderChart();
  }

  // **** LOCAL STORAGE 

  // Step 1: Stringify our data

  let stringifiedProd = JSON.stringify(productArr);

  console.log(stringifiedProd)

  // Step 2: Set the item in local storage
  localStorage.setItem('products', stringifiedProd);
 

  let resultsList = document.getElementById('display-results');
  if (maxPicks === 0) {
    for (let i = 0; i < productArr.length; i++) {
      let li = document.createElement('li');
      li.textContent = `${productArr[i].name} had ${productArr[i].picks} votes, and was seen ${productArr[i].views} times.`;
      resultsList.appendChild(li);
    }
  }
}


myContainer.addEventListener('click', handleClick);

// EVENT #2
showResults.addEventListener('click', handleShowResults);

// *********** CHART

// DOM Reference





// constructor - 2 args: 1st is my reference to the DOM, 2nd is large objec