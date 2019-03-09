// Create a list that holds all of your cards
let singleSetOfCards = ['fa-diamond',
             'fa-paper-plane-o',
             'fa-anchor',
             'fa-bolt',
             'fa-cube',
             'fa-leaf',
             'fa-bicycle',
             'fa-bomb'];

let setOfCards = singleSetOfCards.concat(singleSetOfCards); 
let moves = document.querySelector('.moves');
let resetButton = document.querySelector('.restart');
let score = document.querySelector('.stars');
let time = document.querySelector('.time');
let winScreen = document.querySelector('.win-screen');


let openCards = [];
let matchedCards = 0;
let moveCounter = 0;

/* Timer */
let timer = null;
let startTime = null;

function startTimer() {
  // Skip starting the timer, if it was already set
  if(timer) {
    return;
  }
  resetTimer();
  renderCurrentTime();
  timer = setInterval(renderCurrentTime, 1000);
}

function stopTimer() {
  getGameDuration()
  clearInterval(timer);
  timer = null;
  renderCurrentTime();
}

function resetTimer() {
  stopTimer();
  startTime = Date.now();
  renderCurrentTime();
}

function getGameDuration() {
  return parseInt((Date.now() - startTime) / 1000);
}

function renderCurrentTime() {
  time.innerHTML = `${getGameDuration()} s`;
}

/* HTML templating functions */
function buildCard(card) {
  return `<li class="card" title="${card}"><i class="fa ${card}"></i></li>`;
}

function buildScore(moves) {
  let count = 3;
  if (moves >= 20) {
    count = 2;
  }
  if (moves >= 30) {
    count = 1;
  }
  return new Array(count).fill('<li><i class="fa fa-star"></i></li>').join('');
}

/* Rendering Functions */

function renderScore(moves) {
  score.innerHTML = buildScore(moves);
}

function renderMoves(count) {
  moves.innerText = `${count} Moves`;
}

function renderWinScreen() {
  winScreen.innerHTML = `
    <div>
      <h1>Congratulations, you won! How about an other try?</h1>
      <span>You mastered the game in ${getGameDuration()} seconds with ${moveCounter} moves, deserving <ul class="stars">${buildScore(moveCounter)}</ul></span>
    </div>
  `;
  winScreen.classList.add('show')
}

function hideWinScreen() {
  winScreen.classList.remove('show');
}

/* Setting Data Function */
function setMoves(count) {
  moveCounter = count;
  renderMoves(count)
  renderScore(count);
}

/* EventListener Helpers */
function eventListenerFor(card) {
  return function () {
    // Block clicking an open card twice 
    if (!card.classList.contains('open') 
    && !card.classList.contains('show') 
    && !card.classList.contains('match')) {
      playCard(card);
    }
  }
}

/* Game Functions */
// Prepare the game, shuffle cards, display the cards on the page
function prepareGame() {
  resetTimer();
  hideWinScreen();
  setMoves(0);
  matchedCards = 0;

  let deck = document.querySelector('.deck');
  deck.classList.remove('animated');
  deck.innerHTML = shuffle(setOfCards).map(buildCard).join('');
    
  // Set up the event listener for a card. If a card is clicked:
  let allCards = document.querySelectorAll('.card');
  allCards.forEach(function(card) {
    card.addEventListener('click', eventListenerFor(card))
  });
  // Add the transition animations to the cards after they have been rendered
  setTimeout(function() {
    deck.classList.add('animated');
  }, 0);
}

function endGame() {
  // stop Timer
  stopTimer();
  // show win div
  renderWinScreen();
}

/* Utility Functions */

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

/* Handle playing a card */
function playCard(card) {
  startTimer();
  // Flip not more than two cards
  // Return early if enough cards have already been selected
  if (openCards.length === 2) {
    return;
  }
  
  card.classList.add('open');
  // Synchronise with the CSS animation
  setTimeout(function() {
    card.classList.add('show');
  }, 200);

  // Write open cards into array 'openCards'
  openCards.push(card);
  
  if (openCards.length === 1) {
    // Not enough cards played
    return;
  }

  setMoves(moveCounter + 1);

  // See if cards match
  if (cardsMatch(openCards)) {
    onMatchedCards();
  } else {
    // Make open cards flip back after timeout 
    setTimeout(resetCards, 1000);
  }
}

function cardsMatch(cards) {
  return cards[0].getAttribute('title') === cards[1].getAttribute('title');
}

function onMatchedCards() {
  matchedCards = matchedCards + 2;
  openCards.forEach(function (card) {
    setTimeout(function() {
      card.classList.add('match');
    }, 200);
  });
  openCards = [];
  // Check if all cards are flipped over
  if (matchedCards === setOfCards.length) {
    endGame();
  }
}

function resetCards() {
  openCards.forEach(resetCard);
  openCards = [];
}

function resetCard(card) {
  card.classList.remove('open');
  // Synchronise with the CSS animation
  setTimeout(function () {
    card.classList.remove('show');
  }, 150);

}

// Add the prepareGame function to the reset button click
resetButton.addEventListener('click', prepareGame);

// Hide the Win screen on click
winScreen.addEventListener('click', prepareGame);

// Finally re-start the game
prepareGame();
