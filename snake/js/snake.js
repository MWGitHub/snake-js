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
};

module.exports = Snake;
