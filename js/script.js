var rgb = document.querySelector('div#rgb');
var reset = document.querySelector('span#reset');
var easy = document.querySelector('span#easy');
var hard = document.querySelector('span#hard');
var choices = [
  document.querySelector('div#choice-0'),
  document.querySelector('div#choice-1'),
  document.querySelector('div#choice-2'),
  document.querySelector('div#choice-3'),
  document.querySelector('div#choice-4'),
  document.querySelector('div#choice-5'),
];

function randomNum(n) {
  return Math.floor(Math.random() * n);
}

function randomColor() {
  return [randomNum(255), randomNum(255), randomNum(255)];
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
    choices[i].style.backgroundColor = "rgb(" + this.colors[i][0] + ", " + this.colors[i][1] + ", " + this.colors[i][2] + ")"
  }
}

var game = new Game();
game.showColorChoices();

// reset.addEventListener('click', );
