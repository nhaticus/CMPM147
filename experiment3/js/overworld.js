function generateOverworldGrid(numCols, numRows) {
    let grid = [];
    // grass
    for (let i = 0; i < numRows; i++) {
        let row = [];
        for (let j = 0; j < numCols; j++) {
            row.push("_");
        }
        grid.push(row);
    }

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const noiseVal = noise(i * 0.1, j * 0.1);

            if (noiseVal < 0.4) {
                grid[i][j] = "w"; // water
            } else if (noiseVal >= 0.4 && noiseVal < 0.45) {
                grid[i][j] = "t"; // trees
            } else if (noiseVal >= 0.45 && noiseVal < 0.55) {
                grid[i][j] = "d"; // dirt
            }
        }
    }

    return grid;
}

function drawOverworldGrid(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (gridCheck(grid, i, j, '_')) {   // grass
                placeTile(i, j, random(3), 6); // random variations of same color scheme 
            } else if (gridCheck(grid, i, j, 'w')) { // water
                drawOverworldContext(grid, i, j, 'w', 0, 14);
            } else if (gridCheck(grid, i, j, 't')) { // tree
                placeTile(i, j, random(3), 6);
                if (random() < 0.33) {
                    placeTile(i, j, 14, 6);
                } else {
                    placeTile(i, j, 20, 6);
                }
            } else if (gridCheck(grid, i, j, 'd')) { // dirt
                drawOverworldContext(grid, i, j, 'd', 0, 7);
            }
            // snowstorm
            let b = noise(i * 0.01 + millis() / 1500, j * 0.01 + millis()/ 1500);
            let a = map(b, 0, 1, 0, 150);
            noStroke();
            fill(100, 255, 255, a);
            rect(j * 16, i * 16, 16, 16);  
        }
    }
}

function gridCheck(grid, i, j, target) {
    if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length) {
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

function drawOverworldContext(grid, i, j, target, ti, tj) {
    const code = gridCode(grid, i, j, target);
    let lookup;
    if (target === 'd') {
        lookup = lookupDirt;
    }
    else if (target === 'w') {
        lookup = lookupWater;
    } else {
        return;
    }

    let [tiOffset, tjOffset] = lookup[code];
    placeTile(i, j, random(3), tj);
    if (tiOffset >= 4) {
        if (code == 0) {
            placeTile(i, j, ti + tiOffset + 2, tj + tjOffset);
            placeTile(i, j, ti + tiOffset, tj + tjOffset + 2);
            placeTile(i, j, ti + tiOffset + 2, tj + tjOffset + 2);
        }
        if (code == 1) {
            placeTile(i, j, ti + tiOffset + 2, tj + tjOffset);
        }
        if (code == 2) {
            placeTile(i, j, ti + tiOffset + 2, tj + tjOffset);
        }
        if (code == 3) {
            placeTile(i, j, ti + tiOffset + 2, tj + tjOffset);
        }
        if (code == 4) {
            placeTile(i, j, ti + tiOffset, tj + tjOffset+ 2);
        }
        if (code == 8) {
            placeTile(i, j, ti + tiOffset, tj + tjOffset + 2);
        }
        if (code == 12) {
            placeTile(i, j, ti + tiOffset, tj + tjOffset + 2);
        }
        placeTile(i, j, ti + tiOffset, tj + tjOffset);
    }
}

const lookupWater = [
    [4, -8], // 0 - 0000 - no neighbors*
    [4, -6], // 1 - 0001 - up*
    [4, -8], // 2 - 0010 - down*
    [4, -7], // 3 - 0011 - up & down*
    [6, -8], // 4 - 0100 - left*
    [6, -6], // 5 - 0101 - up & left
    [6, -8], // 6 - 0110 - down & left
    [6, -7], // 7 - 0111 - up & down & left
    [4, -8], // 8 - 1000 - right*
    [4, -6], // 9 - 1001 - right & up
    [4, -8], // 10 - 1010 - right & down
    [4, -7], // 11 - 1011 - right & up & down
    [5, -8], // 12 - 1100 - right & left*
    [5, -6], // 13 - 1101 - right & left & up
    [5, -8], // 14 - 1110 - right & left & down
    [0, 0]  // 15 - 1111 - all sides*
];

const lookupDirt = [
    [4, -1], // 0 - 0000 - no neighbors*
    [4, 1], // 1 - 0001 - up*
    [4, -1], // 2 - 0010 - down*
    [4, 0], // 3 - 0011 - up & down*
    [6, -1], // 4 - 0100 - left*
    [6, 1], // 5 - 0101 - up & left
    [6, -1], // 6 - 0110 - down & left
    [6, 0], // 7 - 0111 - up & down & left
    [4, -1], // 8 - 1000 - right*
    [4, 1], // 9 - 1001 - right & up
    [4, -1], // 10 - 1010 - right & down
    [4, 0], // 11 - 1011 - right & up & down
    [5, -1], // 12 - 1100 - right & left*
    [5, 1], // 13 - 1101 - right & left & up
    [5, -1], // 14 - 1110 - right & left & down
    [0, 0]  // 15 - 1111 - all sides*
];

