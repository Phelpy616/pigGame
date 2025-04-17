"use strict";

const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const score0El = document.querySelector("#current--0");
const score1El = document.querySelector("#current--1");
const btnHold = document.querySelector(".btn--hold");
const totalScore0 = document.querySelector("#score--0");
const totalScore1 = document.querySelector("#score--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//1.btn roll dive 1-6, 2. img equals to dice, 3. shows img
btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);

    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove("hidden");

    if (dice !== 1) {
      currentScore += dice; // currentScore 0 plus dice 1-6
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      currentScore = 0;
      document.querySelector(`#current--${activePlayer}`).textContent = 0; //this has to reset the current score because rolled 1.
      if (activePlayer === 0) {
        //if the active player is current 0, ex: when player 0 was playing his dice rolled 1, so it needs to update to the other player wich corresponds to 1,
        //if you do not update the active players will always the active player 0
        activePlayer = 1;
      } else {
        activePlayer = 0; //if the player 1 is playing, and his dice rolled 1, then the turn will be reset to player 0;
      }
      player0El.classList.toggle("player--active");
      player1El.classList.toggle("player--active");
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore; //scores[1] = scores[1] + currentScore, or scores[0] = scores[0] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 200) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
    } else {
      currentScore = 0;
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      if (activePlayer === 0) {
        //if the active player is current 0, ex: when player 0 was playing his dice rolled 1, so it needs to update to the other player wich corresponds to 1,
        //if you do not update the active players will always the active player 0
        activePlayer = 1;
      } else {
        activePlayer = 0; //if the player 1 is playing, and his dice rolled 1, then the turn will be reset to player 0;
      }
      player0El.classList.toggle("player--active");
      player1El.classList.toggle("player--active");
    }
  }
});

btnNew.addEventListener("click", function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  totalScore0.textContent = 0;
  totalScore1.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
});
