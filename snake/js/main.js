var Board = require("./board");
var SnakeView = require("./snake-view");

$l(function () {

  var $gameFigure = $l("figure");
	var board = new Board();
	var view = new SnakeView(board, $gameFigure);

});
