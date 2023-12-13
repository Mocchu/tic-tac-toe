game = (function () {
	function Tile(initIndex) {
		// Init tile
		let marker = 0;
		const index = initIndex;
		const tile = document.createElement("div");
		tile.classList.add("tile");
		tile.setAttribute("index", index);

		// Functions
		function setMarker(newMarker) {
			if (marker === 0) {
				marker = newMarker;
			}
		}

		function getMarker() {
			return marker;
		}

		function getTile() {
			return tile;
		}

		function getIndex() {
			return index;
		}

		return { setMarker, getMarker, getTile, getIndex };
	}

	const player1 = (function () {
		const marker = "red";

		function getMarker() {
			return marker;
		}

		return { getMarker };
	})();

	const player2 = (function () {
		const marker = "blue";

		function getMarker() {
			return marker;
		}

		return { getMarker };
	})();

	// Cache DOM
	const boardNode = document.querySelector(".board");
	const tileNodes = boardNode.childNodes;

	// Init game
	let board = [];
	let currentPlayer = player1;
	fillBoard();

	// Bind events
	boardNode.addEventListener("click", (e) => {
		setTileMarker(e);
	});

	// Functions
	function fillBoard() {
		for (let index = 0; index < 9; index++) {
			const tile = Tile(index);
			board.push(tile);
			boardNode.append(tile.getTile());
		}
	}

	function setTileMarker(e) {
		const tileIndex = e.target.getAttribute("index");
		const tile = board[tileIndex];

		tile.setMarker(currentPlayer.getMarker());
		console.log(tile.getMarker());
		render();
	}

	function render() {
		console.log(tileNodes);
		tileNodes.forEach((tileNode, index) => {
			tileNode.style.backgroundColor = board[index].getMarker();
		});
	}
})();
