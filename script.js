game = (function () {
	function Tile(index) {
		// Init
		let marker = false;
		const tile = document.createElement("div");
		tile.classList.add("tile");
		tile.setAttribute("index", index);

		// Functions
		setMarker = (newMarker) => {
			if (!marker) marker = newMarker;
		};
		getMarker = () => marker;
		getTile = () => tile;

		return { setMarker, getMarker, getTile };
	}

	const Player = function (markerInit) {
		const marker = markerInit;
		getMarker = () => marker;
		return { getMarker };
	};

	// Cache DOM
	const boardNode = document.querySelector(".board");
	const tileNodes = boardNode.childNodes;

	// Init game
	let board = [];
	const player1 = Player("blue");
	const player2 = Player("red");
	let currentPlayer = player1;
	fillBoard();

	// Bind events
	boardNode.addEventListener("click", (e) => setTileMarker(e));

	// Functions
	function fillBoard() {
		for (let index = 0; index < 9; index++) {
			const tile = Tile(index);
			board.push(tile);
			boardNode.append(tile.getTile());
		}
	}

	function setTileMarker(e) {
		// param: e = event or index (int)
		if (typeof e === "object" && !e.target.classList.contains("tile"))
			return;

		const tileIndex =
			typeof e === "object" ? e.target.getAttribute("index") : e;

		const tile = board[tileIndex];
		tile.setMarker(currentPlayer.getMarker());
		currentPlayer = currentPlayer === player1 ? player2 : player1;

		// checkWin();
		render();
	}

	function checkWin() {
		const unflatBoard = unflattenBoard();
	}

	function unflattenBoard() {
		const unflatBoard = [[], [], []];

		for (let i = 0; i < 3; i++) {
			unflatBoard[i] = board.slice(i * 3, (i + 1) * 3);
		}
		return unflatBoard;
	}

	function render() {
		tileNodes.forEach((tileNode, index) => {
			tileNode.style.backgroundColor = board[index].getMarker();
		});
	}

	unflattenBoard();

	return { setTileMarker };
})();
