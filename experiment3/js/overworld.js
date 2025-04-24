function generateOverworldGrid(numCols, numRows) {
    let grid = [];
    //ground
    for (let i = 0; i < numRows; i++) {
        let row = [];
        for (let j = 0; j < numCols; j++) {
        row.push("_");
        }
        grid.push(row);
    }
    
    return grid;
}

function drawOverworldGrid(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (gridCheck(grid, i, j, '_')) {   // grass
                placeTile(i, j, random(3), 7); // random variations of same color scheme 
            }
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
    
}

const lookupDirt = [
    [0, 0], // 0 - 0000 - no neighbors
    [0, 0], // 1 - 0001 - up
    [0, 0], // 2 - 0010 - down
    [0, 0], // 3 - 0011 - up & down
    [0, 0], // 4 - 0100 - left
    [0, 0], // 5 - 0101 - up & left
    [0, 0], // 6 - 0110 - down & left
    [0, 0], // 7 - 0111 - up & down & left
    [0, 0], // 8 - 1000 - right
    [0, 0], // 9 - 1001 - right & up
    [0, 0], // 10 - 1010 - right & down
    [0, 0], // 11 - 1011 - right & up & down
    [0, 0], // 12 - 1100 - right & left
    [0, 0], // 13 - 1101 - right & left & up
    [0, 0], // 14 - 1110 - right & left & down
    [0, 0]  // 15 - 1111 - all sides
];

const lookupWater = [
    [0, 0], // 0 - 0000 - no neighbors
    [0, 0], // 1 - 0001 - up
    [0, 0], // 2 - 0010 - down
    [0, 0], // 3 - 0011 - up & down
    [0, 0], // 4 - 0100 - left
    [0, 0], // 5 - 0101 - up & left
    [0, 0], // 6 - 0110 - down & left
    [0, 0], // 7 - 0111 - up & down & left
    [0, 0], // 8 - 1000 - right
    [0, 0], // 9 - 1001 - right & up
    [0, 0], // 10 - 1010 - right & down
    [0, 0], // 11 - 1011 - right & up & down
    [0, 0], // 12 - 1100 - right & left
    [0, 0], // 13 - 1101 - right & left & up
    [0, 0], // 14 - 1110 - right & left & down
    [0, 0]  // 15 - 1111 - all sides
]

const lookupTrees = [
    [0, 0], // 0 - 0000 - no neighbors
    [0, 0], // 1 - 0001 - up
    [0, 0], // 2 - 0010 - down
    [0, 0], // 3 - 0011 - up & down
    [0, 0], // 4 - 0100 - left
    [0, 0], // 5 - 0101 - up & left
    [0, 0], // 6 - 0110 - down & left
    [0, 0], // 7 - 0111 - up & down & left
    [0, 0], // 8 - 1000 - right
    [0, 0], // 9 - 1001 - right & up
    [0, 0], // 10 - 1010 - right & down
    [0, 0], // 11 - 1011 - right & up & down
    [0, 0], // 12 - 1100 - right & left
    [0, 0], // 13 - 1101 - right & left & up
    [0, 0], // 14 - 1110 - right & left & down
    [0, 0]  // 15 - 1111 - all sides
]
