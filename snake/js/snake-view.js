// up is 38
// right is 39
// left is 37
// down is 40

var SNAKE_ONE_CODE = {
	38: "N",
	39: "E",
	37: "W",
	40: "S"
};

// W is 87
// D is 68
// S is 83
// A is 65
var SNAKE_TWO_CODE = {
  87: "N",
	68: "E",
	65: "W",
	83: "S"
};

var SnakeView = function (board, $gameFigure) {
  this.board = board;
	this.$gameFigure = $gameFigure;
	this.setUpBoard();
	this.render();
	this.bindKeys();

	this.intervalHandler = setInterval(this.step.bind(this), 75);
};

SnakeView.prototype.bindKeys = function () {
	$l("body").on('keydown', this.handleKeyEvent.bind(this));
};

SnakeView.prototype.handleKeyEvent = function (e) {
  if (SNAKE_ONE_CODE[e.keyCode]) {
		this.board.snakeOne.turn(SNAKE_ONE_CODE[e.keyCode]);
	}
	if (SNAKE_TWO_CODE[e.keyCode]) {
		this.board.snakeTwo.turn(SNAKE_TWO_CODE[e.keyCode]);
	}
};

SnakeView.prototype.step = function () {
	this.board.step();
	if (this.board.isGameOver()) {
    alert("You died!");
		window.clearInterval(this.intervalHandler);
		return;
	}
	this.render();
};

SnakeView.prototype.setUpBoard = function () {
  var numSquares = this.board.height * this.board.width;
  this.$gameFigure.append("<ul></ul>");
	var $gameUl = this.$gameFigure.find("ul");
	$gameUl.addClass('group');
	for (var i = 0; i < numSquares; i++) {
		$gameUl.append("<li id='id" + i + "'></li>");
	}
};

SnakeView.prototype.render = function () {
	this.$gameFigure.find('li').removeClass();
	for (var i = 0; i < this.board.snakeOne.segments.length; i++) {
    var snakeOneId = this.posToId(this.board.snakeOne.segments[i]);
		var $snakeOneSquare = $l("#id" + snakeOneId);
		$snakeOneSquare.addClass('snake-one-square');
	}

	for (i = 0; i < this.board.snakeTwo.segments.length; i++) {
    var snakeTwoId = this.posToId(this.board.snakeTwo.segments[i]);
		var $snakeTwoSquare = $l("#id" + snakeTwoId);
		$snakeTwoSquare.addClass('snake-two-square');
	}

	var appleId = this.posToId(this.board.apple);
	var $appleSquare = $l('#id' + appleId);
	$appleSquare.addClass('apple-square');
};

SnakeView.prototype.posToId = function (pos) {
  return pos[0] * this.board.height + pos[1];
};

module.exports = SnakeView;
