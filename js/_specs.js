describe('Game constructor', function() {
  it('returns an object an array of six colors and one selected as the one to guess', function() {
    var game = new Game();
    game.randomizeColors();
    expect(game.colors.length).toBe(6);
    expect(typeof game.secret).toBe('number');
  });
  it('has 6 colors that are distinct from each other', function() {
    var game = new Game();
    for (var i = 0; i < 100; i++) {
      game.randomizeColors();
      expect(differentEnough(rgbToArray(game.colors[0]), rgbToArray(game.colors[1]))).toBe(true);
      expect(differentEnough(rgbToArray(game.colors[2]), rgbToArray(game.colors[3]))).toBe(true);
      expect(differentEnough(rgbToArray(game.colors[4]), rgbToArray(game.colors[5]))).toBe(true);
      expect(differentEnough(rgbToArray(game.colors[2]), rgbToArray(game.colors[1]))).toBe(true);
      expect(differentEnough(rgbToArray(game.colors[4]), rgbToArray(game.colors[3]))).toBe(true);
      expect(differentEnough(rgbToArray(game.colors[0]), rgbToArray(game.colors[5]))).toBe(true);
    }
  });
});

describe('uniqueColor function', function() {
  it('compares a color to an array of colors and determines if it is unique enough from others', function() {
    var colors = [ 'rgb(16, 16, 32)' ];
    var color1 = 'rgb(16, 16, 64)';
    var color2 = 'rgb(32, 32, 64)';
    expect(uniqueColor(colors, color1)).toBe(false);
    expect(uniqueColor(colors, color2)).toBe(true);
  });
});

describe('randomNum function', function() {
  it('returns a random integer between 0 and n', function() {
    var num = randomNum(255);
    expect(Number.isNaN(num)).not.toBe(true);
    for (var i = 0; i < 1000; i++) {
      num = randomNum(i + 5);
      expect(num).toBeGreaterThan(-1);
      expect(num).toBeLessThan(i + 5);
    }
  });
  it('returns a number using the increment provided', function() {
    for (var i = 0; i < 20; i++) {
      var num = randomNum(255, 32);
      expect(num % 32).toBe(31);
    }
  })
});

describe('randomColor function', function() {
  it('returns a random color as an string in rgb format', function() {
    var color = randomColor();
    expect(color).toMatch(/rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/);
  });
});

describe('differentEnough function', function() {
  it('compares to two arrays of length 3 to make sure they are different enough from each other', function() {
    var color1 = [192, 16, 32];
    var color2 = [192, 16, 96];
    var color3 = [16, 192, 64];
    expect(differentEnough(color1, color2)).toBe(false);
    expect(differentEnough(color3, color2)).toBe(true);
    expect(differentEnough(color1, color3)).toBe(true);

  });
});

describe('rgbToArray function', function() {
  it('converts an rgb string to an array of three numbers', function() {
    var str = 'rgb(255, 255, 255)';
    expect(rgbToArray(str)).toEqual([255, 255, 255]);
  })
})

describe('percent function', function() {
  it('takes two numbers as arguments and returns a string', function() {
    expect(percent(7, 7)).toBe('50%');
    expect(percent(0, 7)).toBe('0%');
    expect(percent(7, 0)).toBe('100%');
    expect(percent(3, 9)).toBe('25%');
  });
});
