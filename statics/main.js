/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

//Get the DOM elements
//Player One Elements
let score0 = document.querySelector('#score-0');
let current0 = document.querySelector('#current-0');
let panel0 = document.querySelector('.player-0-panel');

//Player Two Elements
let score1 = document.querySelector('#score-1');
let current1 = document.querySelector('#current-1');
let panel1 = document.querySelector('.player-1-panel');

//Global Elements
let dice = document.querySelector('.dice');
let btnRoll = document.querySelector('.btn-roll');
let btnHold = document.querySelector('.btn-hold')
let btnNewGame = document.querySelector('.btn-new');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

btnRoll.addEventListener('click', (event) => {
    
    // Generating the random number between 0 and 7
    let result = Math.floor(Math.random() * 6) + 1;

    //Set the dice image
    dice.setAttribute('src', `./images/dice-${result}.png`)

    // If the value of dice is 1, reset the current Score and switch the player
    if(result == 1) {
        currentScore = 0;
        clearCurrent(activePlayer);
        activePlayer = activePlayer == 0 ? 1 : 0;
        setUpdateStatus(activePlayer);

    } else {
        currentScore += result;
        // winning condition
        if((scores[activePlayer] + currentScore) >= 100) {
            setWinner(activePlayer);
            scores = [0, 0];
            currentScore = 0;
        }else {
            if(activePlayer == 0) {
                current0.textContent = currentScore;
            } else {
                current1.textContent = currentScore;
            }
        }
    }
});

btnHold.addEventListener('click', (event) => {
    // Add currentScore to activePlayer's main score
    scores[activePlayer] += currentScore;
    currentScore = 0;
    updateScore(activePlayer);
    clearCurrent(activePlayer);
    activePlayer = activePlayer == 0 ? 1 : 0;
    setUpdateStatus(activePlayer);

});

btnNewGame.addEventListener('click', (event) => {

    // Reset everything (values and DOM elements)
    scores = [0, 0];
    currentScore = 0;
    score0.textContent = 00;
    score1.textContent = 00;
    current0.textContent = 0;
    current1.textContent = 0;
    panel0.classList = 'player-0-panel active';
});

//Change the active state of the user
function setUpdateStatus(player) {
    if(player == 0) {
        panel1.classList = 'player-1-panel';
        panel0.classList = 'player-0-panel active';
    } else {
        panel0.classList = 'player-0-panel';
        panel1.classList = 'player-1-panel active';
    }
}

// reset the current score
function clearCurrent(player) {
    if (player == 0) {
        current0.textContent = 0;
    }else {
        current1.textContent = 0;
    }
}

// Update the player's main score
function updateScore(player) {
    if (player == 0) {
        score0.textContent = scores[player];
    }else {
        score1.textContent = scores[player];
    }
}


// Set winner banner
function setWinner(player) {
    if (player == 0) {
        score0.textContent = 'WINNER';
    }else {
        score1.textContent = 'WINNER';
    }
}
