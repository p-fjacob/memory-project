// Create a list that holds all of your cards
let setOfCards = ['fa-diamond', 'fa-diamond',
             'fa-paper-plane-o', 'fa-paper-plane-o',
             'fa-anchor', 'fa-anchor',
             'fa-bolt', 'fa-bolt',
             'fa-cube', 'fa-cube',
             'fa-leaf', 'fa-leaf',
             'fa-bicycle', 'fa-bicycle',
             'fa-bomb', 'fa-bomb'];

let moves = document.querySelector('.moves');
let resetButton = document.querySelector('.restart');

let openCards = [];
let matchedCards = [];
let moveCounter = 0;

function buildCard(card) {
    return `<li class="card" title="${card}"><i class="fa ${card}"></i></li>`;
}

// Prepare the game, shuffle cards, display the cards on the page
function prepareGame() {
  let deck = document.querySelector('.deck');
  let cardDescription = shuffle(setOfCards).map(buildCard);
  deck.innerHTML = cardDescription.join('');
  matchedCards = [];
  setMoveCounter(0);
    
  let anyCard = document.querySelectorAll('.card');

  // set up the event listener for a card. If a card is clicked:
  anyCard.forEach(function(card) {
    card.addEventListener('click', function() {
      // block clicking an open card twice 
      if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
        playCard(card);
      }
    })
  })
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function setMoveCounter(count) {
  moveCounter = count;
  moves.innerText = moveCounter;
  console.log(moveCounter);
}

function playCard(card) {
  // flip not more than two cards
  // Return early if enough cards have already been selected
  if (openCards.length === 2) {
    return;
  }
  
  card.classList.add('open', 'show');

  setMoveCounter(moveCounter + 1);

  // write open cards into array 'openCards'
  openCards.push(card);
  
  if (openCards.length === 1) {
    // not enough cards played
    return;
  }

  let firstMatch = openCards[0].getAttribute('title');
  let secondMatch = openCards[1].getAttribute('title');
  console.log(firstMatch);
  console.log(secondMatch);

  // see if cards match

  if (firstMatch === secondMatch) {
    openCards = [];
    matchedCards.push(firstMatch, secondMatch);
    console.log(matchedCards.length);
    // check if we finished
    checkGameFinished();
  } else {
    // make open cards flip back after timeout 
    setTimeout(function() {
      openCards.forEach(resetCard);
      openCards = [];
    }, 1000);
  }
}

function resetCard(card) {
  card.classList.remove('open', 'show', 'mactch');
}

function checkGameFinished() {
  if (matchedCards.length === setOfCards.length) {
    // use a timeout to ensure all cards are rendered before the alert
    setTimeout(function() {
      alert("You won!");
    }, 300);
  }
}

// finally start the game
prepareGame();

// add the prepareGame function to the reset button click
resetButton.addEventListener('click', prepareGame);

