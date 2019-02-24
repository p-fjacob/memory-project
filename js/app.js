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

  // Set up the event listener for a card. If a card is clicked:
  anyCard.forEach(function(card) {
    card.addEventListener('click', function() {
      // Block clicking an open card twice 
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

// Move counter settings
function setMoveCounter(count) {
  moveCounter = count;
  moves.innerText = moveCounter;
  console.log(moveCounter);
}

// Scoreboard

for(let i=0; i<matchedCards.lenght; i++) {
  let scoreBoard = document.querySelector('.stars');
  scoreBoard.innerHTML = '<li><i class="fa fa-star"></i></li>';
  console.log(matchedCards.length / 2);
}

function playCard(card) {
  // Flip not more than two cards
  // Return early if enough cards have already been selected
  if (openCards.length === 2) {
    return;
  }
  
  card.classList.add('open', 'show');

  setMoveCounter(moveCounter + 1);

  // Write open cards into array 'openCards'
  openCards.push(card);
  
  if (openCards.length === 1) {
    // Not enough cards played
    return;
  }

  let firstMatch = openCards[0].getAttribute('title');
  let secondMatch = openCards[1].getAttribute('title');
  console.log(firstMatch);
  console.log(secondMatch);

  // See if cards match

  if (firstMatch === secondMatch) {
    openCards = [];
    matchedCards.push(firstMatch, secondMatch);
    console.log(matchedCards.length);
    // Check if all cards are flipped over
    checkGameFinished();
  } else {
    // Make open cards flip back after timeout 
    setTimeout(function() {
      openCards.forEach(resetCard);
      openCards = [];
    }, 1000);
  }
}

function resetCard(card) {
  card.classList.remove('open', 'show', 'match');
}

function checkGameFinished() {
  if (matchedCards.length === setOfCards.length) {
    // Use a timeout to ensure all cards are rendered before the alert
    setTimeout(function() {
      alert("You won!");
    }, 300);
  }
}

// Finally re-start the game
prepareGame();

// Add the prepareGame function to the reset button click
resetButton.addEventListener('click', prepareGame);

