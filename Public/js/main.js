
var positions = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0]
];


var gameFinished = false;

const nPlayer1 = 1;
const nPlayer2 = 2;

var scorePlayer1 = 0;
var scorePlayer2 = 0;

var startingPlayer = nPlayer1;

const imgPlayer1 = 'url("Public/img/p1.img")';
const imgPlayer2 = 'url("Public/img/p2.img")';

var board = document.getElementById("board");
var scoreboard = document.getElementById("scoreboard");
var winnerMessageBox = document.getElementById("winnerMessageBox");
var playAgainButton  = document.getElementById("playAgainButton");
var selectDifficulty = document.getElementById("difficulty-select");

var difficulty = selectDifficulty.options[selectDifficulty.selectedIndex].value;

const rows = board.rows.length;
const cols = board.rows[0].cells.length;

for (var row = 0; row < rows; row++) {
	for (var col = 0; col < cols; col++) {
		board.rows[row].cells[col].onclick = function () {
			onCellClicked(this);
		};
	}
}

function onCellClicked(tableCell) {
	if (gameFinished) {
		return;
	}
	if(selectDifficulty.disabled == false ) {
		difficulty = selectDifficulty.options[selectDifficulty.selectedIndex].value;
		selectDifficulty.disabled = true;
	}

	var content = tableCell.innerHTML.split(",");

	var row = content[0]
	var col = content[1]

	if (positions[row][col] == 0) {

		tableCell.style.backgroundImage = imgPlayer1;

		positions[row][col] = nPlayer1

		var winnerNumber = getTheWinner();
		if( winnerNumber != -1 ) {

			showWinner(winnerNumber);
		} else {
			robotTurn();
		}
	}
}


function randomInt(min, max) {
	return Math.floor((Math.random() * max) + min);
}

function robotTurn() {
	if (difficulty == "easy") {
		robotEasy();
	} else {
		robotNormal();
	}
}

function makeRobotPlay(row, col) {
	if (row >= 0 && row < rows) {
		if (col >= 0 && col < cols) {

			board.rows[row].cells[col].style.backgroundImage = imgPlayer2;

			positions[row][col] = nPlayer2;

			var winnerNumber = getTheWinner();
			if( winnerNumber != -1 ) {
				showWinner(winnerNumber);
			}
		}
	}
}


function robotEasy() {
	if (gameFinished) {
		return;
	}
	var row = -1;
	var col = -1;
	var found = false;


	for (var index = 0; index < 10; index++) {
		var r = randomInt(0,2);
		var c = randomInt(0,2);
		if (positions[r][c] == 0) {
			row = r;
			col = c;
			found = true;
			break;
		}
	}


	if (!found) {
		for (var r = 0; r < positions.length; r++) {
			for (var c = 0; c < positions[r].length; c++) {
				if (positions[r][c] == 0) {
					row = r;
					col = c;
					found = true;
					break;
				}
			}
			if (found == true) {
				break;
			}
		}
	}


	if (found) {
		makeRobotPlay(row, col);
	}
}

function robotNormal() {
	if (gameFinished) {
		return;
	}
	var row = -1;
	var col = -1;
	var found = false;

	for (var r = 0; r < positions.length; r++) {
		if (positions[r][0] != 0 &&
			positions[r][2] == 0 &&
			positions[r][0] == positions[r][1]) {
			row = r;
			col = 2;
			found = true;
			break;
		}
		if (positions[r][1] != 0 &&
			positions[r][0] == 0 &&
			positions[r][1] == positions[r][2]) {
			row = r;
			col = 0;
			found = true;
			break;
		}
		if (positions[r][0] != 0 &&
			positions[r][1] == 0 &&
			positions[r][0] == positions[r][2]) {
			row = r;
			col = 1;
			found = true;
			break;
		}
	}

	if (!found) {
		for (var c = 0; c < positions[0].length; c++) {
			if (positions[0][c] != 0 &&
				positions[2][c] == 0 &&
				positions[0][c] == positions[1][c]) {
				row = 2;
				col = c;
				found = true;
				break;
			}
			if (positions[1][c] != 0 && 
				positions[0][c] == 0 &&
				positions[1][c] == positions[2][c]) {
				row = 0;
				col = c;
				found = true;
				break;
			}
			if (positions[0][c] != 0 &&
				positions[1][c] == 0 &&
				positions[0][c] == positions[2][c]) {
				row = 1;
				col = c;
				found = true;
				break;
			}
		}
	}
	if (!found) {
		if (positions[0][0] != 0 &&
			positions[2][2] == 0 &&
			positions[0][0] == positions[1][1]) {
			row = 2;
			col = 2;
			found = true;
		} else if (positions[0][0] != 0 &&
				   positions[1][1] == 0 &&
				   positions[0][0] == positions[2][2]) {
			row = 1;
			col = 1;
			found = true;
		} else if (positions[1][1] != 0 &&
				   positions[0][0] == 0 &&
				   positions[1][1] == positions[2][2]) {
			row = 0;
			col = 0;
			found = true;
		} else if (positions[0][2] != 0 &&
				   positions[2][0] == 0 &&
				   positions[0][2] == positions[1][1]) {
			row = 2;
			col = 0;
			found = true;
		} else if (positions[0][2] != 0 &&
				   positions[1][1] == 0 &&
				   positions[0][2] == positions[2][0]) {
			row = 1;
			col = 1;
			found = true;
		} else if (positions[1][1] != 0 &&
				   positions[0][2] == 0 &&
				   positions[1][1] == positions[2][0]) {
			row = 0;
			col = 2;
			found = true;
		}
	}
	if (!found) {
		robotEasy();
	} else if (found) {
		makeRobotPlay(row, col);
	}
}

function isRowFilled(row) {
	if (positions[row][0] != 0 && 
		positions[row][0] == positions[row][1] && 
		positions[row][1] == positions[row][2]) {
		return true;
	}
	return false;
}


function isColumnFilled(col) {
	if (positions[0][col] != 0 &&
		positions[0][col] == positions[1][col] &&
		positions[1][col] == positions[2][col]) {
		return true;
	}
	return false;
}


function isDiagonalFilled(diag) {
	if (diag == 1) {
		if (positions[0][0] != 0 &&
			positions[0][0] == positions[1][1] &&
			positions[1][1] == positions[2][2]) {
			return true;
		}
	} else if (diag == 2) {
		if (positions[2][0] != 0 &&
			positions[2][0] == positions[1][1] &&
			positions[1][1] == positions[0][2]) {
			return true;
		}
	}
	return false;
}

function getTheWinner() {
	if (isRowFilled(0)) {
		applyOpacityRow(0);
		return positions[0][0];
	} 
	if (isRowFilled(1)) {
		applyOpacityRow(1);
		return positions[1][0];
	} 
	if (isRowFilled(2)) {
		applyOpacityRow(2);
		return positions[2][0];
	} 
	if (isColumnFilled(0)) {
		applyOpacityColumn(0);
		return positions[0][0];
	} 
	if (isColumnFilled(1)) {
		applyOpacityColumn(1);
		return positions[0][1];
	}
	if (isColumnFilled(2)) {
		applyOpacityColumn(2);
		return positions[0][2];
	} 
	if (isDiagonalFilled(1)) {
		applyOpacityDiagonal(1);
		return positions[0][0];
	} 
	if (isDiagonalFilled(2)) {
		applyOpacityDiagonal(2);
		return positions[2][0];
	} 

	for (var row = 0; row < positions.length; row++) {
		for (var col = 0; col < positions[row].length; col++) {
			if (positions[row][col] == 0) {
				return -1;
			}
		}
	}
	
	return 0;
}


function applyOpacity() {
	for (var row = 0; row < rows; row++) {
		for (var col = 0; col < cols; col++) {
			board.rows[row].cells[col].style.opacity = 0.5;
		}
	}
}


function applyOpacityRow(row) {
	applyOpacity();
	for (var col = 0; col < cols; col++) {
		board.rows[row].cells[col].style.opacity = 1.0;
	}
}


function applyOpacityColumn(col) {
	applyOpacity();
	for (var row = 0; row < rows; row++) {
		board.rows[row].cells[col].style.opacity = 1.0;
	}
}


function applyOpacityDiagonal(diag) {
	applyOpacity();
	if (diag == 1) {
		board.rows[0].cells[0].style.opacity = 1.0;
		board.rows[1].cells[1].style.opacity = 1.0;
		board.rows[2].cells[2].style.opacity = 1.0;
	} else {
		board.rows[0].cells[2].style.opacity = 1.0;
		board.rows[1].cells[1].style.opacity = 1.0;
		board.rows[2].cells[0].style.opacity = 1.0;
	}
}


function showWinner(winnerNumber) {

	gameFinished = true;

	if (winnerNumber == nPlayer1) {
		scorePlayer1 += 1;
		scoreboard.rows[1].cells[0].innerHTML = scorePlayer1;
		winnerMessageBox.innerHTML = "YOU WIN!";
	} else if (winnerNumber == nPlayer2) {
		scorePlayer2 += 1;
		scoreboard.rows[1].cells[1].innerHTML = scorePlayer2;
		winnerMessageBox.innerHTML = "YOU LOSE!";
	} else if (winnerNumber == 0) {
		winnerMessageBox.innerHTML = "DRAW!";
	}

	winnerMessageBox.style.display = 'block';
	playAgainButton.style.display  = 'block';
	selectDifficulty.disabled = false;
}


function reset() {
	positions = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	];


	for (var row = 0; row < rows; row++) {
		for (var col = 0; col < cols; col++) {
			board.rows[row].cells[col].style.backgroundImage = '';
			board.rows[row].cells[col].style.opacity = 1.0;
		}
	}


	winnerMessageBox.innerHTML = "";

	winnerMessageBox.style.display = 'none';
	playAgainButton.style.display  = 'none';


	gameFinished = false;


	difficulty = selectDifficulty.options[selectDifficulty.selectedIndex].value;
	selectDifficulty.disabled = true;


	if (startingPlayer == nPlayer1) {
		startingPlayer = nPlayer2;
		robotTurn();
	} else {
		startingPlayer = nPlayer1;
	}
}
