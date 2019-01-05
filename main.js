let currentPlayer;
let player1, player2;
const winningMoves = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 4, 8],
	[0, 3, 6],
	[2, 5, 8],
	[1, 4, 7],
	[2, 4, 6]
];

let player1moves = [];
let player2moves = [];
let allMoves = [];

const contains = function(allMoves, element) {
	return allMoves.includes(element);
};

const getUserInfo = function() {
	player1 = document.getElementById("player1").value;
	player2 = document.getElementById("player2").value;
	currentPlayer = player1;
};

const getBoard = function() {
	let id = document.getElementById("board");
	id.style.display = "block";
	whoseMove(player1);
};

const isSubset = function(userMoves, winningMove) {
	isPresent = function(x) {
		return userMoves.includes(x);
	};
	let checkSubset = winningMove.every(isPresent);
	return checkSubset;
};

const checkWin = function(winningMoves, playerMoves) {
	checker = isSubset.bind(null, playerMoves);
	let result = winningMoves.map(checker);
	return result.includes(true);
};

const checkWinner = checkWin.bind(null, winningMoves);

const announceWinner = function(player) {
	document.getElementById("winner").innerHTML = "Winner is " + player + "!!";
	document.getElementById("board").style.pointerEvents = "none";
};

const announceDraw = function() {
	document.getElementById("winner").innerHTML = "It's a draw";
};

const whoseMove = function(player) {
	document.getElementById("whoseMove").innerHTML = player + "'s turn";
};

const isDraw = function() {
	return !checkWinner(player1moves) && !checkWinner(player2moves);
};

const getMove = function(event) {
	let id = event.target.id;
	if (contains(allMoves, +id)) {
		return;
	}
	allMoves.push(+id);
	console.log(currentPlayer);

	if (currentPlayer == player1) {
		document.getElementById("" + id).style.backgroundColor = "blue";
		document.getElementById("" + id).innerText = "x";
		player1moves.push(+id);
		player1Winner = checkWinner(player1moves);
		if (player1Winner) {
			announceWinner(player1);
		}
		whoseMove(player2);
		currentPlayer = player2;
	} else {
		document.getElementById(id).style.backgroundColor = "green";
		document.getElementById(id).innerHTML = "O";
		player2moves.push(+id);
		player2Winner = checkWinner(player2moves);
		if (player2Winner) {
			announceWinner(player2);
		}
		whoseMove(player1);
		currentPlayer = player1;
	}

	if (allMoves.length == 9 && isDraw(player1Winner, player2Winner)) {
		announceDraw();
	}
};
