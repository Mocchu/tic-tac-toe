game = (function () {
	function Tile(index) {
		// Init
		let marker = 0;
		const tile = document.createElement("div");
		tile.classList.add("tile");
		tile.setAttribute("index", index);

		// Functions
		function setMarker(newMarker) {
			if (marker === 0) marker = newMarker;
		}
		getMarker = () => marker;
		getTile = () => tile;

		return { setMarker, getMarker, getTile };
	}

	const Player = function (markerInit) {
		const marker = markerInit;
		getMarker = () => marker;
		return { getMarker };
	};

	player1 = Player("blue");
	player2 = Player("red");

	// Cache DOM
	const boardNode = document.querySelector(".board");
	const tileNodes = boardNode.childNodes;

	// Init game
	let board = [];
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
		let tileIndex;
		if (typeof e === "number") {
			tileIndex = e;
		} else {
			if (!e.target.classList.contains("tile")) return;
			tileIndex = e.target.getAttribute("index");
		}

		const tile = board[tileIndex];

		tile.setMarker(currentPlayer.getMarker());
		currentPlayer = currentPlayer === player1 ? player2 : player1;

		// checkWin();
		render();
	}

	function checkWin() {
		pass;
	}

	// function unflattenBoard() {
	// 	for ((tile, index) of board){
	//         if tile
	//     };
	// }

	function render() {
		tileNodes.forEach((tileNode, index) => {
			tileNode.style.backgroundColor = board[index].getMarker();
		});
	}

	return { setTileMarker };
})();
