var Snake = require("./snake.js");

var Board = function () {
  this.height = 30;
	this.width = 30;
	this.snake = new Snake(this.getRandomPos());
	this.apple = null;
	this.addApple();
};

Board.prototype.getRandomPos = function () {
	return [1 + Math.floor(Math.rand() * this.height - 1),
		1 + Math.floor(Math.rand() * this.width - 1)];
};

Board.prototype.addApple = function () {
  var applePos = this.getRandomPos();
	while (this.isOccupied(applePos)) {
		applePos = this.getRandomPos();
	}
	this.apple = applePos;
};

Board.prototype.isOccupied = function (pos) {
  var occupiedSquares = this.snake.segments.concat([this.apple]);
	for (var i = 1; i < occupiedSquares.length; i++) {
		if (pos[0] === occupiedSquares[i][0] &&
			pos[1] === occupiedSquares[i][1]) {
				return true;
		}
	}
	return false;
};

Board.prototype.isSnakeHitWall = function () {
	var head = this.snake.segments[0];
	if (head[0] < 0 || head[0] >= this.height ||
		head[1] < 0 || head[1] >= this.width) {
			return true;
	}
	return false;
};

Board.prototype.isSnakeEatApple = function () {
	var head = this.snake.segments[0];
	if (head[0] === this.apple[0] &&
		head[1] === this.apple[1]) {
	  return true;
  }
	return false;
};

Board.prototype.isSnakeDead = function () {
	return this.isSnakeHitWall() || this.snake.isCollidedSelf();
};

Board.prototype.step = function () {
	if (this.isSnakeDead()) {
    return;
	} else {
    if (this.isSnakeEatApple()) {
			snake.grow();
			this.addApple();
		}
		snake.move();
	}
};

module.exports = Board;
