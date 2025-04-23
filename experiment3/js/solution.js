function generateGrid(numCols, numRows) {
    let grid = [];
    
    for (let i = 0; i < numRows; i++) {
        let row = [];
        for (let j = 0; j < numCols; j++) {
        row.push("_");
        }
        grid.push(row);
    }
    
    const min = 4; // minimum room size is 4x4
    
    let numRooms = floor(random(3, floor((numCols * numRows) / min^2)));   // the min is 3 because why not and the cap is area of room divided by area of the min room
    for (let r = 0; r < numRooms; r++) {
        let roomWidth = floor(random(min, floor((numCols - min) / 2)));
        let roomHeight = floor(random(min, floor((numRows - min) / 2)));

        let startCol, startRow;
        let attempts = 0;
        let maxAttempts = 100;

        do {
            startCol = floor(random(numCols - roomWidth));
            startRow = floor(random(numRows - roomHeight));
            attempts++;
        } while (
            attempts < maxAttempts &&
            !canPlaceRoom(grid, startRow, startCol, roomWidth, roomHeight)
        );

        if (attempts < maxAttempts) {
            for (let i = 0; i < roomHeight; i++) {
                for (let j = 0; j < roomWidth; j++) {
                    grid[startRow + i][startCol + j] = "r";
                }
            }
        }
    }

    return grid;
}

function canPlaceRoom(grid, startRow, startCol, roomWidth, roomHeight) {
    for (let i = -1; i <= roomHeight; i++) {
        for (let j = -1; j <= roomWidth; j++) {
            let row = startRow + i;
            let col = startCol + j;
            if (
                row >= 0 &&
                col >= 0 &&
                row < grid.length &&
                col < grid[0].length &&
                gridCheck(grid, row, col, 'r')  // if a piece of a room already exists
            ) {
                return false;
            }
        }
    }
    return true;
}

function drawGrid(grid) {
    background(128);

    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[i].length; j++) {
        if (gridCheck(grid, i, j, '_')) {
            placeTile(i, j, random(3), 16); // random variations of same color scheme 
        }
        else if (gridCheck(grid, i, j, 'r')) {
            drawContext(grid, i, j, 'r', 10, 21);   // base tile I picked was a nice pastel purple
        }
            
        let b = noise(i + millis() / 1500, j + millis()/ 1500);
        let a = map(b, 0, 1, 0, 100);
        noStroke();
        fill(0, 0, 10, a);
        rect(j*16, i*16, 16, 16);  
        }
    }
}

function gridCheck(grid, i, j, target) {
    if (i < 0 || j < 0 || i >= grid.length || j >= grid.length[0]) {
        return false;
    } else {
        return grid[i][j] == target;
    }
}

function gridCode(grid, i, j, target) {
    let up = gridCheck(grid, i - 1, j, target) ? 1 : 0;
    let down = gridCheck(grid, i + 1, j, target) ? 1 : 0;
    let left  = gridCheck(grid, i, j - 1, target) ? 1 : 0;
    let right  = gridCheck(grid, i, j + 1, target) ? 1 : 0;

    return (right << 3) + (left << 2) + (down << 1) + (up << 0);
}

function drawContext(grid, i, j, target, ti, tj) {
    const code = gridCode(grid, i, j, target);
    let lookup;
    if (gridCheck(grid, i, j, 'r')) {
        lookup = lookupRoom;
    }
    else if (gridCheck(grid, i, j, 'g')) {
        lookup = lookupGrass;
    } else {
        return;
    }
    const [tiOffset, tjOffset] = lookup[code];
    placeTile(i, j, ti, tj);
    placeTile(i, j, ti + tiOffset, tj + tjOffset);

    if (code == 14 || code == 6 || code == 10) { // top part of the room
        if (random() < 0.50) { 
            placeTile(i, j, floor(random(2)), floor(random(28, 30)));
        }
    }

    if (code == 15 || code == 11 || code == 7) { // all sides
        if (random() < 0.25) {
            placeTile(i, j, floor(random(3)), floor(random(26, 28)));   // random assets to fill the room
        }
    }
}

const lookupRoom = [
    [6, 3], // 0 - 0000 - no neighbors
    [7, 5], // 1 - 0001 - up
    [6, 0], // 2 - 0010 - down
    [1, 0], // 3 - 0011 - up & down
    [7, 1], // 4 - 0100 - left
    [7, 2], // 5 - 0101 - up & left
    [7, 0], // 6 - 0110 - down & left
    [7, 1], // 7 - 0111 - up & down & left
    [5, 1], // 8 - 1000 - right
    [5, 2], // 9 - 1001 - right & up
    [5, 0], // 10 - 1010 - right & down
    [5, 1], // 11 - 1011 - right & up & down
    [0, 0], // 12 - 1100 - right & left
    [6, 2], // 13 - 1101 - right & left & up
    [6, 0], // 14 - 1110 - right & left & down
    [0, 3]  // 15 - 1111 - all sides
];

