describe('Game constructor', function() {
  // beforeEach(function() {
  // });
  it('returns an object an array of six colors and one selected as the one to guess', function() {
    var game = new Game();
    expect(game.colors.length).toBe(6);
    expect(typeof game.secret).toBe('number');
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
      expect(num % 32).toBe(0);
    }
  })
});

describe('randomColor function', function() {
  it('returns a random color as an string in rgb format', function() {
    var color = randomColor();
    expect(color).toMatch(/rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/);
  });
});

//
