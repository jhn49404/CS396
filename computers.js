//// STATE ////

// NOTE: initialize WITH "new" keyword
function State(board, color){
	this.board = board;
	this.color = color; // who makes the next move
	// NOTE: changes stores the changes made to the board
	// e.g., changes[0] = [{i:0, j:0, color:"white"}, ...]
	this.changes = [];
}


//// HELPER FUNCTIONS ////

function overChildren(state, cb){
	// TODO use palindromic pruning to not send two equivalent children
	var i = 7, j, child, board = state.board, color = state.color, opcolor = color=="white"?"black":"white";
	while (i--){
		j = 7;
		while (j--){
			if (board[i][j].color == ""){
				// Add a piece next to an existing one
				switch (color){
					case board[i-1] && board[i-1][j-1] && board[i-1][j-1].color:
					case board[i-1] && board[i-1][j+1] && board[i-1][j+1].color:
					case board[i+1] && board[i+1][j-1] && board[i+1][j-1].color:
					case board[i+1] && board[i+1][j+1] && board[i+1][j+1].color:
					case board[i][j-1] && board[i][j-1].color:
					case board[i][j+1] && board[i][j+1].color:
					case board[i-1] && board[i-1][j].color:
					case board[i+1] && board[i+1][j].color:
						child = new State(board, opcolor);
						child.changes.push([{i:i, j:j, color:color}]);
						cb(child);
						break;
				}
			} else if (board[i][j].color == color){
				// Jump a piece
				if (board[i-2] && board[i-2][j-2] && board[i-2][j-2].color == ""){
					child = new State(board, opcolor);
					child.changes.push([{i:i, j:j, color:""}, {i:i-2, j:j-2, color:color}]);
					cb(child);
				}

				if (board[i-2] && board[i-2][j+2] && board[i-2][j+2].color == ""){
					child = new State(board, opcolor);
					child.changes.push([{i:i, j:j, color:""}, {i:i-2, j:j+2, color:color}]);
					cb(child);
				}

				if (board[i+2] && board[i+2][j-2] && board[i+2][j-2].color == ""){
					child = new State(board, opcolor);
					child.changes.push([{i:i, j:j, color:""}, {i:i+2, j:j-2, color:color}]);
					cb(child);
				}

				if (board[i+2] && board[i+2][j+2] && board[i+2][j+2].color == ""){
					child = new State(board, opcolor);
					child.changes.push([{i:i, j:j, color:""}, {i:i+2, j:j+2, color:color}]);
					cb(child);
				}

				if (board[i-2] && board[i-2][j].color == ""){
					child = new State(board, opcolor);
					child.changes.push([{i:i, j:j, color:""}, {i:i-2, j:j, color:color}]);
					cb(child);
				}

				if (board[i+2] && board[i+2][j].color == ""){
					child = new State(board, opcolor);
					child.changes.push([{i:i, j:j, color:""}, {i:i+2, j:j, color:color}]);
					cb(child);
				}

				if (board[i][j-2] && board[i][j-2].color == ""){
					child = new State(board, opcolor);
					child.changes.push([{i:i, j:j, color:""}, {i:i, j:j-2, color:color}]);
					cb(child);
				}

				if (board[i][j+2] && board[i][j+2].color == ""){
					child = new State(board, opcolor);
					child.changes.push([{i:i, j:j, color:""}, {i:i, j:j+2, color:color}]);
					cb(child);
				}
			}
		}
	}
}

function isTerminal(state){
	// TODO
	return false;
}

// changes = [[{i:0, j:0, color:"white"}, ...], ...]
function applyChanges(board, changes){
	for (i in changes){
		var change = changes[i];
		for (j in change){
			var piece = change[j];
			board[piece.i][piece.j].color = piece.color;
		}
	}
}

function undoChanges(board, changes){
	var i = changes.length;
	while (i--){
		var change = changes[i];
		if (change.length == 1){
			var piece = change[0];
			board[piece.i][piece.j].color = "";
		} else if (change.length == 2){
			var blank, piece;
			if (change[0].color == ""){
				blank = change[0];
				piece = change[1];
			} else {
				blank = change[1];
				piece = change[0];
			}

			board[piece.i][piece.j].color = "";
			board[blank.i][blank.j].color = piece.color;
		}
	}
}

function heuristicValue(state){
	// TODO
	// blob field of white - blob field of black
	// state.board is board at root state
	// state.changes is changes on top of that
	//// FOREACH SPACE
	//// IF SPACE IS WHITE, ++
	//// IF SPACE IS BLACK, --
	//// IF SPACE IS BLANK AND TOUCHES WHITE AND NOT BLACK, ++
	//// IF SPACE IS BLANK AND TOUCHES BLACK AND NOT WHITE, --
	var i = 7, j, k, w, b, wvalue = 0, bvalue = 0, board = state.board, neighbors, worth;
	applyChanges(board, state.changes);
	while (i--){
		j = 7;
		while (j--){
			worth = (i == 0 || i == 6) + (j == 0 || j == 6) + (i == 0 || i == 6)*(j == 0 || j == 6) + 1;
			worth = 1;
			switch (board[i][j].color){
				case "white": wvalue += worth; break;
				case "black": bvalue += worth; break;
				case "":
					neighbors = [board[i-1] && board[i-1][j-1] && board[i-1][j-1].color,
						board[i-1] && board[i-1][j+1] && board[i-1][j+1].color,
						board[i+1] && board[i+1][j-1] && board[i+1][j-1].color,
						board[i+1] && board[i+1][j+1] && board[i+1][j+1].color,
						board[i][j-1] && board[i][j-1].color,
						board[i][j+1] && board[i][j+1].color,
						board[i-1] && board[i-1][j].color,
						board[i+1] && board[i+1][j].color];

					k = 8;
					w = 0;
					b = 0;
					while (k-- && !(w||b)){
						if (neighbors[k] == "white"){
							w = 1;
						} else if (neighbors[k] == "black"){
							b = 1;
						}
					}

					if (w && !b){
						++wvalue;
					} else if (b && !w){
						++bvalue;
					}

					break;
			}
		}
	}

	undoChanges(board, state.changes);
	return {white:wvalue, black:bvalue};
}

function minimax(state, ply){
	if (isTerminal(state) || ply <= 0){
		return {value:heuristicValue(state), state:state};
	} else {
		var value = null;
		var smallest = Infinity;
		var largest = -Infinity;
		var shortest = Infinity;
		var best = null;
		var color = state.color;
		var opcolor = color=="white"?"black":"white";

		overChildren(state, function(child){
			//if (child.changes[child.changes.length-1].length == 1){
				var X = minimax(child, ply-1);
				if (X.value[opcolor] < smallest ||
					(X.value[opcolor] == smallest && X.value[color] > largest) ||
					(X.value[opcolor] == smallest &&
						X.value[color] == largest &&
						child.changes[child.changes.length-1].length < shortest)){
					value = X.value;
					smallest = X.value[opcolor];
					largest = X.value[color];
					shortest = child.changes[child.changes.length-1].length;
					best = child;
				}
			//}
		});

		return {value:value, state:best};
	}
}


//// AI CLASSES ////

// NOTE: initialize WITHOUT "new" keyword
function RandomAI(color, board){
	var self = {};
	self.color = color;
	self.board = board;
	self.choose = function(cb){
		var root = new State(board, color);
		var most = -Infinity;
		var choice = null;

		// NOTE: assigning each child a random value,
		// keeping only the highest assigned.
		overChildren(root, function(child){
			var X = Math.random();
			if (X > most){
				most = X;
				choice = child;
			}
		});

		cb(choice.changes[0]);
	};

	return self;
}

// NOTE: initialize WITHOUT "new" keyword
function MinimaxAI(color, board){
	var self = {};
	self.board = board;
	self.color = color;
	self.choose = function(cb){
		var root = new State(board, color);
		var most = -Infinity;
		var choice = minimax(root, 1).state;
		if (choice == null){
			cb([]);
		} else {
			cb(choice.changes[0]);
		}
	};

	return self;
}

// NOTE: State is initialized with the "new" keyword,
// whereas the AI classes are not. This is because,
// in Javascript, objects initialized using the "new"
// method are initialized faster, whereas those initialized
// with the "self" method have their properties looked up faster.
// Because we are making a LOT of states in overChildren,
// we want them to be initialized as quickly as possible.
// Because we only initialize the AI once (when BlobCtrl loads),
// we use the "self" method for them.
// Think of "new" style objects as c structs, and "self" style
// objects as python objects.