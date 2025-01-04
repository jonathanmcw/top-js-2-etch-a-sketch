const newSketchButton = document.querySelector("#new-sketch");
const container = document.querySelector("#container");

const MAX_GRID_SIZE = 32;
const MIN_GRID_SIZE = 2;
const TILE_SIZE = 20; // Size of each tile in pixels
const DARKNESS_INCREMENT = 60;
const DARKNESS_DECREMENT = 5;
const INTERVAL_DELAY = 2000; // Conntrol spped of color fade out

function promptGridSize() {
    const gridSize = parseInt(prompt(`Enter size of new grid ( ${MIN_GRID_SIZE} to ${MAX_GRID_SIZE} )`));

    if (!Number.isInteger(gridSize) || gridSize < MIN_GRID_SIZE || gridSize > MAX_GRID_SIZE ) {
        return promptGridSize();
    }
    return gridSize;
}

function updateTileColor(tile, increment) {
    let darkness = parseInt(tile.dataset.darkness);
    darkness = Math.min(darkness + increment, 100); // Increase darkness 
    tile.dataset.darkness = darkness;
    let v = 255 - (darkness * 2.55); // convert percentage to RBG value
    tile.style.backgroundColor = `rgb(${v},${v*2},${v})`;
}

function fadeOutTileColor(tile) {
    const intervalId = setInterval(() => {
        let darkness = parseInt(tile.dataset.darkness);
        if ( darkness > 1 ) {
            darkness -= DARKNESS_DECREMENT;
            tile.dataset.darkness = darkness;
            const v = 255 - (darkness * 2.55);
            tile.style.backgroundColor = `rgb(${v},${v*2},${v})`;
        } else {
            clearInterval(intervalId);
        }
    }, INTERVAL_DELAY);
}

function createSketchPad(gridSize) {

    container.innerHTML = ''; // Clear existing grid
    container.style.width = `${gridSize*20}px`;
    container.style.height = `${gridSize*20}px`;

    for ( let i = 0; i < gridSize * gridSize; i++ ) {
        const tile = document.createElement("div");
        tile.dataset.darkness = 0; // Initialize darkness level
        container.appendChild(tile);
    };

    const gridItems = document.querySelectorAll("#container > div");

    gridItems.forEach((item) => {
        item.addEventListener("mouseenter", (e) => {
            updateTileColor(e.target, DARKNESS_INCREMENT);
            fadeOutTileColor(e.target);
        });
    });

}

newSketchButton.addEventListener("click", () => {
    const gridSize = promptGridSize();
    if (gridSize) {
        createSketchPad(gridSize);
    }
});

createSketchPad(16);

