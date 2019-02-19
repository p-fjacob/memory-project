// Create a list that holds all of your cards
 
let setOfCards = ['fa-diamond', 'fa-diamond',
             'fa-paper-plane-o', 'fa-paper-plane-o',
             'fa-anchor', 'fa-anchor',
             'fa-bolt', 'fa-bolt',
             'fa-cube', 'fa-cube',
             'fa-leaf', 'fa-leaf',
             'fa-bicycle', 'fa-bicycle',
             'fa-bomb', 'fa-bomb'];



function builtCard(card) {
    return `<li class="card"><i class="fa ${card}"></i></li>`;
}


// Prepare the game, shuffle cards, display the cards on the page

function prepareGame() {
    let deck = document.querySelector('.deck');
    let cardDescription = shuffle(setOfCards).map(function(card) {
        return builtCard(card);
    });
        deck.innerHTML = cardDescription.join('');
}

prepareGame();


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

// Timer function

function takeTime() {

}

// set up the event listener for a card. If a card is clicked:

let anyCard = document.querySelectorAll('.card');
let moves = document.querySelector('.moves');
let openCards = [];
let moveCounter = 0;

anyCard.forEach(function(card) {
    card.addEventListener('click', function(openMax2) {

            moveCounter = moveCounter+1;
            moves.innerText = moveCounter;
            console.log(moveCounter);


        // block clicking an open card twice 

        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {

        // write open cards into array 'openCards'

        openCards.push(card);

        // flip not more than two cards

        card.classList.add('open', 'show');
        console.log('Open cards:', openCards.length);

        // make open cards flip back after timeout 

            if (openCards.length == 2) {
                setTimeout(function() {
                    openCards.forEach(function(card) {
                        card.classList.remove('open', 'show');
                        openCards = [];
                    });
                }, 1000); 
            }
        }
    });
});

 /*
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
