// up is 38
// right is 39
// left is 37
// down is 40

var CODE = {
	38: "N",
	39: "E",
	37: "W",
	40: "S"
};

var SnakeView = function (board, $gameFigure) {
  this.board = board;
	this.$gameFigure = $gameFigure;
	this.setUpBoard();
	this.render();
	this.bindKeys();

	setInterval(this.step.bind(this), 100);
};

SnakeView.prototype.bindKeys = function () {
	$l("body").on('keydown', this.handleKeyEvent.bind(this));
};

SnakeView.prototype.handleKeyEvent = function (e) {
  if (CODE[e.keyCode]) {
		this.board.snake.turn(CODE[e.keyCode]);
	}
};

SnakeView.prototype.step = function () {
	this.board.step();
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
	for (var i = 0; i < this.board.snake.segments.length; i++) {
    var id = this.posToId(this.board.snake.segments[i]);
		var $square = $l("#id" + id);
		$square.addClass('snake-square');
	}

	var appleId = this.posToId(this.board.apple);
	var $appleSquare = $l('#id' + appleId);
	$appleSquare.addClass('apple-square');
};

SnakeView.prototype.posToId = function (pos) {
  return pos[0] * this.board.height + pos[1];
};

module.exports = SnakeView;
