var easyMode = true;

var rgbDiv = document.querySelector('div#rgb');
var resetButton = document.querySelector('span#reset');
var easyButton = document.querySelector('span#easy');
var hardButton = document.querySelector('span#hard');
var choices = [
  document.querySelector('div#choice-0'),
  document.querySelector('div#choice-1'),
  document.querySelector('div#choice-2'),
  document.querySelector('div#choice-3'),
  document.querySelector('div#choice-4'),
  document.querySelector('div#choice-5'),
];

function randomNum(num, inc) {
  if (inc === undefined) {
    inc = 1;
  }
  return Math.floor(Math.random() * (Math.floor(num / inc))) * inc;
}

function randomColor() {
  var incr = 8;
  if (easyMode === true) {
    incr = 32;
  }
  return 'rgb(' + randomNum(256, incr) + ', ' + randomNum(256, incr) + ', ' + randomNum(256, incr) + ')';
}

function Game() {
  this.colors = [];
  for (var i = 0; i < 6; i++) {
    this.colors.push(randomColor());
  }
  this.secret = randomNum(6);
}

Game.prototype.showColorChoices = function() {
  for (var i = 0; i < choices.length; i++) {
    choices[i].style.backgroundColor = this.colors[i];
  }
}

Game.prototype.showColorToGuess = function () {
  rgbDiv.innerText = this.colors[this.secret];
};

var game = {};

resetButton.addEventListener('click', function() {
  resetGame();
});

resetButton.addEventListener('mouseover', function() {
  this.classList.add('buttonHover');
});

resetButton.addEventListener('mouseout', function() {
  this.classList.remove('buttonHover');
})

function resetGame() {
  game = new Game();
  game.showColorChoices();
  game.showColorToGuess();
}



// reset.addEventListener('click', );
