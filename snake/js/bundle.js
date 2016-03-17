/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(2);
	var SnakeView = __webpack_require__(3);
	
	$l(function () {
	
	  var $gameFigure = $l("figure");
		var board = new Board();
		var view = new SnakeView(board, $gameFigure);
	
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	var STEPS = {
		N: [-1, 0],
		E: [0, 1],
		S: [1, 0],
		W: [0, -1]
	};
	
	var Snake = function (startPos) {
		this.direction = null;
		// 0 is the head, last is the tail
		this.segments = [startPos, [startPos[0] - 1, startPos[1]]];
		this.nextDirection = this.direction;
	};
	
	Snake.prototype.move = function () {
		this.direction = this.nextDirection;
		if (this.direction === null) return;
		var step = STEPS[this.direction];
		var nextStep = [this.segments[0][0] + step[0], this.segments[0][1] + step[1]];
		this.segments.pop();
		this.segments.unshift(nextStep);
	};
	
	Snake.prototype.grow = function (numSquares) {
		for (var i = 0; i < numSquares; i++) {
			this.segments.push(this.segments[this.segments.length - 1]);
		}
	};
	
	Snake.prototype.isCollidedSelf = function () {
	  var head = this.segments[0];
		for (var i = 1; i < this.segments.length; i++) {
			if (head[0] === this.segments[i][0] &&
			  head[1] === this.segments[i][1]) {
					return true;
			}
		}
		return false;
	};
	
	Snake.prototype.turn = function (direction) {
		var currentStep = STEPS[this.direction] || [-2, -2]; // never happens
		var newStep = STEPS[direction];
	
		if (currentStep[0] + newStep[0] === 0 && currentStep[1] + newStep[1] === 0) {
			return;
		}
	  this.nextDirection = direction;
		// this.direction = direction;
	};
	
	module.exports = Snake;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Snake = __webpack_require__(1);
	
	var Board = function () {
	  this.height = 30;
		this.width = 30;
		this.snake = new Snake(this.getRandomPos());
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
	  var occupiedSquares = this.snake.segments;
		if (this.apple) occupiedSquares.concat([this.apple]);
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
				this.snake.grow(1);
				this.addApple();
			}
			this.snake.move();
		}
	};
	
	module.exports = Board;


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map