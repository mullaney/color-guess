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
var header = document.querySelector('header');
var notice = document.querySelector('#notice');
var correctGuesses = 0;
var incorrectGuesses = 0;

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

function percent(correct, incorrect) {
  return Math.round((correct / (correct + incorrect)) * 100) + '%';
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

hardButton.addEventListener('click', function() {
  if (easyMode === true) {
    easyMode = false;
    this.classList.add('highlighted');
    easyButton.classList.remove('highlighted');
    resetGame();
  }
});

easyButton.addEventListener('click', function() {
  if (easyMode === false) {
    easyMode = true;
    this.classList.add('highlighted');
    hardButton.classList.remove('highlighted');
    resetGame();
  }
});

for (var i = 0; i < choices.length; i++) {
  choices[i].addEventListener('click', function() {
    if (this.style.backgroundColor === game.colors[game.secret]) {
      header.style.backgroundColor = game.colors[game.secret];
      for (var j = 0; j < choices.length; j++) {
        choices[j].classList.remove('poofed');
        choices[j].style.backgroundColor = game.colors[game.secret];
      }
      correctGuesses++;
    } else {
      this.classList.add('poofed');
      this.removeAttribute('style');
      incorrectGuesses++;
    }
    notice.innerText = 'You have been correct ' + percent(correctGuesses, incorrectGuesses) + ' of the time.'
  });
}

function resetGame() {
  game = new Game();
  game.randomizeColors();
  game.showColorChoices();
  game.showColorToGuess();
  header.removeAttribute('style');
}



// reset.addEventListener('click', );
