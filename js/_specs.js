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
      expect(num).toBeLessThan(i + 10);
    }
  });
});

describe('randomColor function', function() {
  it('returns a random color as an array with 3 numbers', function() {
    var color = randomColor();
    expect(color.length).toBe(3);
    expect(Array.isArray(color)).toBe(true);
  });
})
