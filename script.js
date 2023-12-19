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
		let name = nameInit;
		const marker = markerInit;

		setName = (newName) => (name = newName);
		getMarker = () => marker;
		getName = () => name;

		return { setName, getMarker, getName };
	};

	// Cache DOM
	const menuNode = document.querySelector(".menu");
	const startGameBtn = document.querySelector(".start-game");
	const gameNode = document.querySelector(".game");
	const boardNode = document.querySelector(".board");
	const resetBoardBtn = document.querySelector(".reset-board");
	const gotoMenuBtn = document.querySelector(".goto-menu");
	const gameOverMsg = document.querySelector(".gameover-msg");
	const tileNodes = boardNode.childNodes;

	// Init game
	let board = [];
	const player1 = Player("Player 1", "#29ab9a");
	const player2 = Player("Player 2", "#e0b02b");
	let currentPlayer = player1;
	fillBoard();

	// Bind events
	resetBoardBtn.addEventListener("click", resetBoard);

	gotoMenuBtn.addEventListener("click", () => {
		resetBoard();
		displayGame();
	});

	boardNode.addEventListener("click", (e) => {
		// Triggers when a tile is clicked on
		setTileMarker(e);

		if (checkWin()) {
			displayGameover(`${currentPlayer.getName()} won!`);
		} else if (checkBoardFull()) {
			displayGameover("It's a tie");
		}
		render();
	});

	startGameBtn.addEventListener("click", (e) => {
		setPlayerNames();
		e.preventDefault();
		displayGame();
	});

	// Define functions
	function displayGame() {
		[menuNode, gameNode].forEach((x) => x.classList.toggle("hidden"));
	}

	function displayGameover(msg) {
		// Disable tile clicking on gameover
		tileNodes.forEach((tile) => (tile.style.pointerEvents = "none"));
		gameOverMsg.textContent = msg;
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
		gameOverMsg.textContent = "";
		tileNodes.forEach((tile) => (tile.style.pointerEvents = "auto"));

		fillBoard();
	}

	function setTileMarker(e) {
		// :param e: event or index (int)

		// Set tile marker and set current player
		if (typeof e === "object" && !e.target.classList.contains("tile"))
			return;

		const tile =
			board[typeof e === "object" ? e.target.getAttribute("index") : e];

		// Only edit empty tiles
		if (tile.getMarker() !== false) return;

		tile.setMarker(currentPlayer.getMarker());
		currentPlayer = currentPlayer === player1 ? player2 : player1;
	}

	function checkWin() {
		const unflatBoard = unflattenBoard();
		return (
			checkDiagonalWin(unflatBoard) ||
			checkRowOrColumnWin(unflatBoard, "row") ||
			checkRowOrColumnWin(unflatBoard, "column")
		);
	}

	function unflattenBoard() {
		const unflatBoard = [[], [], []];

		for (let i = 0; i < 3; i++) {
			unflatBoard[i] = board.slice(i * 3, (i + 1) * 3);
		}
		return unflatBoard;
	}

	function checkBoardFull() {
		return board.every((tile) => tile.getMarker());
	}

	function checkRowOrColumnWin(unflatBoard, direction) {
		// :param direction: "row" || "column"
		if (direction !== "row" && direction !== "column") return;

		for (let row = 0; row < 3; row++) {
			let markers = [];
			for (let col = 0; col < 3; col++) {
				// Swap indexes based on direction argument
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

	function setPlayerNames() {
		const player1Name = document.querySelector("#player-1-name");
		const player2Name = document.querySelector("#player-2-name");

		if (player1Name.value) {
			player1.setName(player1Name.value);
		} else {
			player1.setName("Player 1");
		}
		if (player2Name.value) {
			player2.setName(player2Name.value);
		} else {
			player2.setName("Player 2");
		}
		[player1Name, player2Name].forEach((x) => (x.value = ""));
	}

	function render() {
		tileNodes.forEach((tileNode, index) => {
			tileNode.style.backgroundColor = board[index].getMarker();
		});
	}

	return { setTileMarker, render };
})();
