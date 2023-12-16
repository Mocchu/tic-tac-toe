game = (function () {
	// Define objects
	function Tile(index) {
		let marker = false;
		const tile = document.createElement("div");
		tile.classList.add("tile");
		tile.setAttribute("index", index);

		setMarker = (newMarker) => (marker = newMarker);
		getMarker = () => marker;
		getTile = () => tile;

		return { setMarker, getMarker, getTile };
	}

	const Player = function (nameInit, markerInit) {
		const name = nameInit;
		const marker = markerInit;

		getMarker = () => marker;
		getName = () => name;

		return { getMarker, getName };
	};

	// Cache DOM
	const menuNode = document.querySelector(".menu");
	const startGameBtn = document.querySelector(".start-game");
	const gameNode = document.querySelector(".game");
	const boardNode = document.querySelector(".board");
	const resetGameBtn = document.querySelector(".reset-game");
	const gameOverNode = document.querySelector(".gameover");
	const gameOverMsg = document.querySelector(".gameover-msg");
	const tileNodes = boardNode.childNodes;

	// Init game
	let board = [];
	const player1 = Player("Player 1", "blue");
	const player2 = Player("Player 2", "red");
	let currentPlayer = player1;
	fillBoard();

	// Bind events
	boardNode.addEventListener("click", (e) => setTileMarker(e));
	resetGameBtn.addEventListener("click", resetBoard);
	startGameBtn.addEventListener("click", (e) => {
		e.preventDefault();
		displayGame();
	});

	// Define functions
	function displayGame() {
		[menuNode, gameNode].forEach((x) => x.classList.toggle("hidden"));
	}

	function displayWin() {
		[boardNode, gameOverNode].forEach((x) => x.classList.toggle("hidden"));
		gameOverMsg.textContent = "hello";
	}

	function fillBoard() {
		for (let index = 0; index < 9; index++) {
			const tile = Tile(index);
			board.push(tile);
			boardNode.append(tile.getTile());
		}
	}

	function resetBoard() {
		board = [];
		boardNode.innerHTML = "";
		fillBoard();
	}

	function setTileMarker(e) {
		// :param e: event or index (int)

		// Set tile status and set current player
		if (typeof e === "object" && !e.target.classList.contains("tile"))
			return;

		const tileIndex =
			typeof e === "object" ? e.target.getAttribute("index") : e;
		const tile = board[tileIndex];

		if (tile.getMarker() !== false) return; // Only edit empty tiles

		tile.setMarker(currentPlayer.getMarker());
		currentPlayer = currentPlayer === player1 ? player2 : player1;

		// Check for win
		if (checkWin()) displayWin();

		render();
	}

	function checkWin() {
		const unflatBoard = unflattenBoard();
		if (
			checkDiagonalWin(unflatBoard) ||
			checkRowOrColumnWin(unflatBoard, "row") ||
			checkRowOrColumnWin(unflatBoard, "column")
		)
			return true;
		return false;
	}

	function unflattenBoard() {
		const unflatBoard = [[], [], []];

		for (let i = 0; i < 3; i++) {
			unflatBoard[i] = board.slice(i * 3, (i + 1) * 3);
		}
		return unflatBoard;
	}

	function checkRowOrColumnWin(unflatBoard, direction) {
		// :param direction: "row" || "column"
		if (direction !== "row" && direction !== "column") return;

		for (let row = 0; row < 3; row++) {
			let markers = [];
			for (let col = 0; col < 3; col++) {
				// Reverse indexes based on direction argument
				const i = direction === "row" ? row : col;
				const j = direction === "row" ? col : row;
				markers.push(unflatBoard[i][j].getMarker());
			}
			if (
				markers[0] === markers[1] &&
				markers[1] === markers[2] &&
				markers[0] !== false // Stop empty tiles winning
			)
				return true;
		}
		return false;
	}

	function checkDiagonalWin(unflatBoard) {
		const nw = unflatBoard[0][0].getMarker();
		const center = unflatBoard[1][1].getMarker();
		const se = unflatBoard[2][2].getMarker();
		const ne = unflatBoard[0][2].getMarker();
		const sw = unflatBoard[2][0].getMarker();

		return (
			(nw === center && center === se && nw !== false) ||
			(ne === center && center === sw && ne !== false)
		);
	}

	function render() {
		tileNodes.forEach((tileNode, index) => {
			tileNode.style.backgroundColor = board[index].getMarker();
		});
	}

	unflattenBoard();

	return { setTileMarker };
})();
