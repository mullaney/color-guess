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

function differentEnough(color1, color2) {
  var differences = 0;
  for (var i = 0; i < color1.length; i++) {
    if (color1[i] !== color2[i]) {
      differences++;
    }
  }
  if (differences > 1) return true;
  return false;
}

function rgbToArray(colorStr) {
  return colorStr.slice(4, -1)
                 .split(', ')
                 .map(function(numStr) {
                   return Number(numStr);
                 });
}

function uniqueColor(arr, color) {
  return arr.every(function(inArr) {
    return differentEnough(rgbToArray(inArr), rgbToArray(color)) === true;
  })
}

function Game() {
  this.colors = [];
  this.secret = randomNum(6);
}

Game.prototype.randomizeColors = function() {
  this.colors = [];
  for (var i = 0; i < 6; i++) {
    while (this.colors.length <= i) {
      var color = randomColor();
      if (uniqueColor(this.colors, color)) {
        this.colors.push(color);
      }
    }
  }
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
resetGame();

resetButton.addEventListener('click', function() {
  resetGame();
});

resetButton.addEventListener('mouseover', function() {
  this.classList.add('buttonHover');
});

resetButton.addEventListener('mouseout', function() {
  this.classList.remove('buttonHover');
});

// for (var i = 0; i < choices.length; i++) {
//   choices[i].addEventListener('click', function() {
//     if (this.backgroundColor === )
//   });
// }

function resetGame() {
  game = new Game();
  game.randomizeColors();
  game.showColorChoices();
  game.showColorToGuess();
}



// reset.addEventListener('click', );
