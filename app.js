/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. 
After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var currentScore, activePlayer, scores, gamePlaying;

init();
function init() {
    gamePlaying = true;
    activePlayer = 0;
    scores = [0, 0];
    currentScore = 0;
    document.querySelector('.dice').style.display = 'none ';
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.getElementById('name-0').textContent = 'Player 0';
    document.getElementById('name-1').textContent = 'Player 1';
    document.querySelector('.player-0-panel').classList.add('active');
}


document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        let dice = Math.floor(Math.random() * 6 + 1);
        console.log(dice);

        if (dice != 1) {
            currentScore = currentScore + dice;
        }
        else {
            currentScore = 0
            document.querySelector('#current-' + activePlayer).textContent = currentScore;
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            activePlayer = +(!activePlayer);
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
        }

        document.querySelector('#current-' + activePlayer).textContent = currentScore;
        queryDom = document.querySelector('.dice');

        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        queryDom.style.display = 'block';
        queryDom.src = 'dice-' + dice + '.png';
    }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
    if (gamePlaying) {
        scores[activePlayer] = scores[activePlayer] + currentScore;
        if (scores[activePlayer] >= 100 || scores[+(!activePlayer)] >= 100) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        document.querySelector('#current-' + activePlayer).textContent = 0;
        currentScore = 0;
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        activePlayer = +(!activePlayer);
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    }
});

document.querySelector('.btn-new').addEventListener('click', () => {

    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    init();
});