game = (function () {
	function Box() {
		// Init box
		let marker;
		const box = document.createElement("div");
		box.classList.add("box");

		// Functions
		function setMarker(newMarker) {
			marker = newMarker;
		}

		function getMarker() {
			return marker;
		}

		function getBox() {
			return box;
		}

		return { setMarker, getMarker, getBox };
	}

	// Cache DOM
	const container = document.querySelector(".wrapper");
	console.log(container);

	// Init game
	fillContainer();

	// Functions
	function fillContainer() {
		for (let i = 0; i < 9; i++) {
			box = Box();
			container.append(box.getBox());
		}
	}

	return;
})();
