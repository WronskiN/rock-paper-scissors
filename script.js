const rulesBtn = document.querySelector('.rules__btn');
const hands = [...document.querySelectorAll('.box div')];
const viewStepOne = document.querySelector('.triangle');
const viewSelectedHands = document.querySelector('.container__result');
let resultText = document.querySelector('.result__text');
let score = document.querySelector('.score__number');


const playerHand = document.querySelector('.hand__player');
const aiHand = document.querySelector('.hand__ai');

// rock, paper, scissors
const rock = `<div class="hand__rock">
<img class="rock__img" src="images/icon-rock.svg" alt="">
</div>`;
const paper = `<div class="hand__paper">
<img class="paper__img" src="images/icon-paper.svg" alt="">
</div>`;
const scissors = `<div class="hand__scissors">
<img class="scissors__img" src="images/icon-scissors.svg" alt="">
</div>`;

const gameSummary = {
  numbers: '0',
};

const game = {
  playerHand: '',
  aiHand: '',
};

function aiChoice() {
  return game.aiHand = hands[Math.floor(Math.random() * 3)].dataset.option;
};

// Select hand by player and ai amd show hand in Step 2
function handSelection() {
  // Player hand selection
  game.playerHand = this.dataset.option;
  console.log(game.playerHand);
  if(game.playerHand === 'rock') {
    playerHand.insertAdjacentHTML('afterbegin', rock);
  } else if (game.playerHand === 'paper') {
    playerHand.insertAdjacentHTML('afterbegin', paper);
  } else {
    playerHand.insertAdjacentHTML('afterbegin', scissors);
  }
  // Computer hand selection
  aiChoice();
  if(game.aiHand === 'rock') {
    aiHand.insertAdjacentHTML('afterbegin', rock);
  } else if (game.aiHand === 'paper') {
    aiHand.insertAdjacentHTML('afterbegin', paper);
  } else {
    aiHand.insertAdjacentHTML('afterbegin', scissors);
  }
  viewStepOne.style.display = 'none';
  viewSelectedHands.style.display = 'flex';

  publishResult()
};

// Return game result 
function checkResult(player, ai) {
  if (player === ai) {
    return 'draw';
  } else if ((player === 'paper' && ai === 'rock') || (player === 'scissors' && ai === 'paper') || (player === 'rock' && ai === 'scissors')) {
    return 'win';
  } else { return 'loss'; }
};

// Publish the result
function publishResult(result) {
  const gameResult = checkResult(game.playerHand, game.aiHand);
  result = gameResult;

  if (result === 'win') {
    score.textContent = ++gameSummary.numbers;
    resultText.textContent = 'You Win';
    persistData();
  } else if (result === 'loss') {
    score.textContent = --gameSummary.numbers;
    resultText.textContent = 'You Lose';
    persistData();
  } else {
    resultText.textContent = 'draw!';
  }
};

// Restore score number on page loead
// window.addEventListener('load', () => {
//   // score.textContent = gameSummary.numbers;
//   score.textContent = readStorage();
// });

// Return to the Step 1 and reset ai & player hand
function playAgain() {
  viewStepOne.style.display = 'block';
  viewSelectedHands.style.display = 'none';
  aiHand.innerHTML = `<p class="hand__text">the house picked</p>`;
  playerHand.innerHTML = `<p class="hand__text">your picked</p>`;
};

const playBtn = document.querySelector('.play__btn').addEventListener('click', playAgain);
hands.forEach(hand => hand.addEventListener('click', handSelection));

// Show/Hide rules information
rulesBtn.addEventListener('click', () => {
  const rulesInfo = document.querySelector('.rules__container');
  rulesInfo.style.display = 'flex';
  
  document.querySelector('.closeIcon').addEventListener('click', () => {
    rulesInfo.style.display = 'none';
  });
});

/////////////// local storage --- NOT WORKING YET ! //////////////////
// function persistData() {
//   'use strict';
  
//   window.localStorage.setItem('score', JSON.stringify(gameSummary.numbers));
//   console.log(localStorage.getItem('score'));

//   // function localStorageTest(){
//   //   const test = "test" + new Date().valueOf();
//   //   try {
//   //       localStorage.setItem(test, test);
//   //       localStorage.removeItem(test);
//   //       return true;
//   //   } catch(e) {
//   //       return false;
//   //   }
//   // }

//   // if (localStorageTest()) {
//   //   localStorage.setItem("myElement", JSON.stringify(gameSummary.numbers));
//   // }
// };

// function readStorage() {
//   const storage = JSON.parse(localStorage.getItem('score'));
//   // Restore score from localStorage
//   if (storage) { return score = storage };
// };