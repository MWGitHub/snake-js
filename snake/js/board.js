var Snake = require("./snake.js");

var Board = function () {
  this.height = 30;
	this.width = 30;
	this.snakeOne = new Snake(this.getRandomPos());
	this.snakeTwo = new Snake(this.getRandomPos());
	this.apple = null;
	this.addApple();
};

Board.prototype.getRandomPos = function () {
	return [1 + Math.floor(Math.random() * (this.height - 2)),
		1 + Math.floor(Math.random() * (this.width - 2))];
};

Board.prototype.addApple = function () {
  var applePos = this.getRandomPos();
	while (this.isOccupied(applePos)) {
		applePos = this.getRandomPos();
	}
	this.apple = applePos;
};

Board.prototype.isOccupied = function (pos) {
  var occupiedSquares = this.snakeOne.segments.concat(this.snakeTwo.segments);
	if (this.apple) occupiedSquares.concat([this.apple]);
	for (var i = 1; i < occupiedSquares.length; i++) {
		if (pos[0] === occupiedSquares[i][0] &&
			pos[1] === occupiedSquares[i][1]) {
				return true;
		}
	}
	return false;
};

Board.prototype.isSnakeHitWall = function (snake) {
	var head = snake.segments[0];
	if (head[0] < 0 || head[0] >= this.height ||
		head[1] < 0 || head[1] >= this.width) {
			return true;
	}
	return false;
};

Board.prototype.isSnakeHitOtherSnake = function (deadSnake, liveSnake) {
	var head = deadSnake.segments[0];
	for (var i = 1; i < liveSnake.segments.length; i++) {
		if (head[0] === liveSnake.segments[i][0] &&
		  head[1] === liveSnake.segments[i][1]) {
				return true;
		}
	}
	return false;
};

Board.prototype.isSnakeEatApple = function (snake) {
	var head = snake.segments[0];
	if (head[0] === this.apple[0] &&
		head[1] === this.apple[1]) {
	  return true;
  }
	return false;
};

Board.prototype.isGameOver = function () {
	return this.isSnakeHitWall(this.snakeOne) ||
	  this.isSnakeHitWall(this.snakeTwo) ||
		this.snakeOne.isCollidedSelf() ||
		this.snakeTwo.isCollidedSelf() ||
		this.isSnakeHitOtherSnake(this.snakeOne, this.snakeTwo) ||
		this.isSnakeHitOtherSnake(this.snakeTwo, this.snakeOne);
};

Board.prototype.step = function () {
	if (this.isGameOver()) {
    return;
	} else {
    if (this.isSnakeEatApple(this.snakeOne)) {
			this.snakeOne.grow(1);
			this.addApple();
		}
		this.snakeOne.move();

		if (this.isSnakeEatApple(this.snakeTwo)) {
			this.snakeTwo.grow(1);
			this.addApple();
		}
		this.snakeTwo.move();
	}
};

module.exports = Board;
