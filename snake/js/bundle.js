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

	var Snake = __webpack_require__(1);
	var SnakeView = __webpack_require__(3);
	
	$l(function () {
	
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
	};
	
	Snake.prototype.move = function () {
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
		var currentStep = STEPS[this.direction];
		var newStep = STEPS[direction];
	
		if (currentStep[0] + newStep[0] === 0 && currentStep[1] + newStep[1] === 0) {
			return;
		}
	
		this.direction = direction;
	};
	
	module.exports = Snake;


/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	var SnakeView = function (game) {
	
	};
	
	module.exports = SnakeView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map