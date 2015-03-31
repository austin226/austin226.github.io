// Solver for 0h-h1

var BLACK = 0;
var RED = 1;
var BLUE = 2;

var S_BLACK = '#444';
var S_RED = '#F44';
var S_BLUE = '#88F';

var S_BAD = '#D00';

var boardSize;
var cellColors;

function solve() {
	var edit = false;
	
	do {
		var newColor;
		var edit = false; // If a change is made, set to true.
		
		for (var row = 0; row < boardSize; row++) {
			for (var col = 0; col < boardSize; col++) {
				// Check if there are 2 in a line horizontally
				if (getColor(row, col-1) == getColor(row, col) && getColor(row, col) != BLACK) {
					if (getColor(row, col) == RED) {
						newColor = BLUE;
					} else {
						newColor = RED;
					}
					edit = setColor(row, col-2, newColor) || edit;
					edit = setColor(row, col+1, newColor) || edit;
				}
				if (getColor(row, col) == getColor(row, col+1) && getColor(row, col) != BLACK) {
					if (getColor(row, col) == RED) {
						newColor = BLUE;
					} else {
						newColor = RED;
					}
					edit = setColor(row, col-1, newColor) || edit;
					edit = setColor(row, col+2, newColor) || edit;
				}
				// Check if there are 2 in a line vertically
				if (getColor(row-1, col) == getColor(row, col) && getColor(row, col) != BLACK) {
					if (getColor(row, col) == RED) {
						newColor = BLUE;
					} else {
						newColor = RED;
					}
					edit = setColor(row-2, col, newColor) || edit;
					edit = setColor(row+1, col, newColor) || edit;
				}
				if (getColor(row, col) == getColor(row+1, col) && getColor(row, col) != BLACK) {
					if (getColor(row, col) == RED) {
						newColor = BLUE;
					} else {
						newColor = RED;
					}
					edit = setColor(row-1, col, newColor) || edit;
					edit = setColor(row+2, col, newColor) || edit;
				}
				// Check for a gap between two like cells
				if (getColor(row, col) == getColor(row, col+2) && getColor(row, col) != BLACK) {
					if (getColor(row, col) == RED) {
						newColor = BLUE;
					} else {
						newColor = RED;
					}
					edit = setColor(row, col+1, newColor) || edit;
				}
				if (getColor(row, col) == getColor(row+2, col) && getColor(row, col) != BLACK) {
					if (getColor(row, col) == RED) {
						newColor = BLUE;
					} else {
						newColor = RED;
					}
					edit = setColor(row+1, col, newColor) || edit;
				}
			}
		}
		
		// Count same colors in a row
		for (var row = 0; row < boardSize; row++) {
			var reds = 0;
			var blues = 0;
			for (var col = 0; col < boardSize; col++) {
				if (getColor(row, col) == RED) {
					reds++;
				} else if (getColor(row, col) == BLUE) {
					blues++;
				}
			}
			if (reds == boardSize / 2) {
				edit = fillRow(row, BLUE) || edit;
			}
			if (blues == boardSize / 2) {
				edit = fillRow(row, RED) || edit;
			}
		}
		
		// Count same colors in a column
		for (var col = 0; col < boardSize; col++) {
			var reds = 0;
			var blues = 0;
			for (var row = 0; row < boardSize; row++) {
				if (getColor(row, col) == RED) {
					reds++;
				} else if (getColor(row, col) == BLUE) {
					blues++;
				}
			}
			if (reds == boardSize / 2) {
				edit = fillCol(col, BLUE) || edit;
			}
			if (blues == boardSize / 2) {
				edit = fillCol(col, RED) || edit;
			}
		}
		
		// Check for rows missing 2 that match another row
		for (var row = 0; row < boardSize; row++) {
			var blacks = 0;
			for (var col = 0; col < boardSize; col++) {
				if (getColor(row, col) == BLACK) {
					blacks++;
				}
			}
			if (blacks == 2) {
				// Look for similar rows
				for (var otherRow = 0; otherRow < boardSize; otherRow++) {
					if (row != otherRow) {
						var same = true;
						for (var col = 0; col < boardSize; col++) {
							if (getColor(row, col) != BLACK && getColor(row, col) != getColor(otherRow, col)) {
								same = false;
							}
						}
						if (same) {
							for (var col = 0; col < boardSize; col++) {
								if (getColor(row, col) == BLACK) {
									if (getColor(otherRow, col) == RED) {
										edit = setColor(row, col, BLUE) || edit;
									} else if (getColor(otherRow, col) == BLUE) {
										edit = setColor(row, col, RED) || edit;
									}
								}
							}
						}
					}
				}
			}
		}
		
		// Check for columns missing 2 that match another column
		for (var col = 0; col < boardSize; col++) {
			var blacks = 0;
			for (var row = 0; row < boardSize; row++) {
				if (getColor(row, col) == BLACK) {
					blacks++;
				}
			}
			if (blacks == 2) {
				// Look for similar columns
				for (var otherCol = 0; otherCol < boardSize; otherCol++) {
					if (col != otherCol) {
						var same = true;
						for (var row = 0; row < boardSize; row++) {
							if (getColor(row, col) != BLACK && getColor(row, col) != getColor(row, otherCol)) {
								same = false;
							}
						}
						if (same) {
							for (var row = 0; row < boardSize; row++) {
								if (getColor(row, col) == BLACK) {
									if (getColor(row, otherCol) == RED) {
										edit = setColor(row, col, BLUE) || edit;
									} else if (getColor(row, otherCol) == BLUE) {
										edit = setColor(row, col, RED) || edit;
									}
								}
							}
						}
					}
				}
			}
		}
	} while (edit);
}

// Fills in blank cells in a row
// Return true if any cells were changed
function fillRow(row, color) {
	var edit = false;
	for (var col = 0; col < boardSize; col++) {
		if (getColor(row, col) == BLACK) {
			edit = setColor(row, col, color) || edit;
		}
	}
	return edit;
}

// Fills in blank cells in a column
// Return true if any cells were changed
function fillCol(col, color) {
	var edit = false;
	for (var row = 0; row < boardSize; row++) {
		if (getColor(row, col) == BLACK) {
			edit = setColor(row, col, color) || edit;
		}
	}
	return edit;
}

function getColor(row, col) {
	if (row < 0 || col < 0 || row >= boardSize || col >= boardSize) {
		return null;
	}
	return cellColors[row][col];
}

function checkSolved() {
	return true;
}

function error(text) {
	window.alert(text);
}

function formSubmit() {
	drawBoard();
	return false;
}

function drawBoard() {
	boardSize = document.getElementById('board-size').value;
	if (boardSize == null || boardSize < 2 || boardSize % 2 != 0) {
		error("Invalid board size: '" + boardSize + "'. Please enter an even value of at least 2.");
		return;
	}
	
	cellColors = new Array(boardSize);
	
	var boardDiv = document.getElementById('board-div');
	var boardTable = document.createElement('table');
	
	boardDiv.innerHTML = '';
	
	for (var row = 0; row < boardSize; row++) {
		cellColors[row] = new Array(boardSize);
		
		var newRow = document.createElement('tr');
		newRow.id = 'row-' + row;
		for (var col = 0; col < boardSize; col++) {			
			var cell = document.createElement('td');
			cell.id = 'cell-' + row + '-' + col;
			cell.className = 'board-cell';
			cell.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
			cell.setAttribute('onclick', 'changeColor('+row+','+col+');');
			
			newRow.appendChild(cell);
		}
		boardTable.appendChild(newRow);
	}
	boardDiv.appendChild(boardTable);
	
	for (var row = 0; row < boardSize; row++) {
		for (var col = 0; col < boardSize; col++) {
			setColor(row, col, BLACK);
		}
	}
}

function getCell(row, col) {
	return document.getElementById('cell-' + row + '-' + col);
}

function changeColor(row, col) {
	var cellColor = cellColors[row][col];
	var newColor;
	
	if (cellColor == BLACK) {
		newColor = RED;
	} else if (cellColor == RED) {
		newColor = BLUE;
	} else if (cellColor == BLUE) {
		newColor = BLACK;
	} else {
		return;
	}
	
	setColor(row, col, newColor);
}

// Returns true if color was changed
function setColor(row, col, color) {
	// If out of range, just return.
	if (row < 0 || col < 0 || row >= boardSize || col >= boardSize) {
		return false;
	}
	
	var cell = getCell(row, col);
	var oldColor = cellColors[row][col];
	var newStyle;
	
	if (color == BLACK) {
		newStyle = S_BLACK;
	} else if (color == RED) {
		newStyle = S_RED;
	} else if (color == BLUE) {
		newStyle = S_BLUE;
	}
	
	cellColors[row][col] = color;
	cell.style.background = newStyle;
	
	return oldColor != color;
}