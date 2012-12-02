//// STATE ////

// NOTE: initialize WITH "new" keyword
function State(board, color){
	this.board = board;
	this.color = color; // who makes the next move
	// NOTE: changes stores the changes made to the board
	// e.g., this.move = changes[0] = [{i:0, j:0, color:"white"}, ...]
	this.move = null;
	this.changes = [];
}


//// HELPER FUNCTIONS ////

function overAddChildren(state, cb){
	var i, j, child, board = state.board, color = state.color, opcolor = color=="white"?"black":"white";
	var called = false;
	var changes = [], c = state.changes.length;
	for (i = 0; i < state.changes.length; ++i){
		changes.push(state.changes[i]);
	}

	changes.push(null);

	i = 7;
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
						child.changes = changes;
						changes[c] = [{i:i, j:j, color:color}];
						child.move = child.changes[0];
						cb(child);
						called = true;
						break;
				}
			}
		}
	}

	return called;
}

function overJumpChildren(state, cb){
	var i, j, child, board = state.board, color = state.color, opcolor = color=="white"?"black":"white";
	var changes = [], c = state.changes.length;
	for (i = 0; i < state.changes.length; ++i){
		changes.push(state.changes[i]);
	}

	changes.push(null);

	i = 7;
	while (i--){
		j = 7;
		while (j--){
			if (board[i][j].color == color){
				// Jump a piece
				if (board[i-2] && board[i-2][j-2] && board[i-2][j-2].color == ""){
					child = new State(board, opcolor);
					child.changes = changes;
					changes[c] = [{i:i, j:j, color:""}, {i:i-2, j:j-2, color:color}];
					child.move = child.changes[0];
					cb(child);
				}

				if (board[i-2] && board[i-2][j+2] && board[i-2][j+2].color == ""){
					child = new State(board, opcolor);
					child.changes = changes;
					changes[c] = [{i:i, j:j, color:""}, {i:i-2, j:j+2, color:color}];
					child.move = child.changes[0];
					cb(child);
				}

				if (board[i+2] && board[i+2][j-2] && board[i+2][j-2].color == ""){
					child = new State(board, opcolor);
					child.changes = changes;
					changes[c] = [{i:i, j:j, color:""}, {i:i+2, j:j-2, color:color}];
					child.move = child.changes[0];
					cb(child);
				}

				if (board[i+2] && board[i+2][j+2] && board[i+2][j+2].color == ""){
					child = new State(board, opcolor);
					child.changes = changes;
					changes[c] = [{i:i, j:j, color:""}, {i:i+2, j:j+2, color:color}];
					child.move = child.changes[0];
					cb(child);
				}

				if (board[i-2] && board[i-2][j].color == ""){
					child = new State(board, opcolor);
					child.changes = changes;
					changes[c] = [{i:i, j:j, color:""}, {i:i-2, j:j, color:color}];
					child.move = child.changes[0];
					cb(child);
				}

				if (board[i+2] && board[i+2][j].color == ""){
					child = new State(board, opcolor);
					child.changes = changes;
					changes[c] = [{i:i, j:j, color:""}, {i:i+2, j:j, color:color}];
					child.move = child.changes[0];
					cb(child);
				}

				if (board[i][j-2] && board[i][j-2].color == ""){
					child = new State(board, opcolor);
					child.changes = changes;
					changes[c] = [{i:i, j:j, color:""}, {i:i, j:j-2, color:color}];
					child.move = child.changes[0];
					cb(child);
				}

				if (board[i][j+2] && board[i][j+2].color == ""){
					child = new State(board, opcolor);
					child.changes = changes;
					changes[c] = [{i:i, j:j, color:""}, {i:i, j:j+2, color:color}];
					child.move = child.changes[0];
					cb(child);
				}
			}
		}
	}
}

function overChildren(state, cb){
	overAddChildren(state, cb) || overJumpChildren(state, cb);
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
	var value = 0, board = state.board, semiboard = [], neighbors;

	applyChanges(board, state.changes);

	// First Pass: count white - black, init semiboard
	for (var i = 0; i < 7; ++i){
		semiboard.push([]);
		for (var j = 0; j < 7; ++j){
			semiboard[i][j] = {w:0, b:0};

			if (board[i][j].color == "white"){
				++value;
			} else if (board[i][j].color == "black"){
				--value;
			}
		}
	}

	// Second Pass: give values to semiboard
	for (var i = 0; i < 7; ++i){
		for (var j = 0; j < 7; ++j){
			switch (board[i][j].color){
				default: break;
				case "white": 
				case "black":
					neighbors = [board[i-1] && board[i-1][j-1] && board[i-1][j-1].color, i-1, j-1,
						board[i-1] && board[i-1][j+1] && board[i-1][j+1].color, i-1, j+1,
						board[i+1] && board[i+1][j-1] && board[i+1][j-1].color, i+1, j-1,
						board[i+1] && board[i+1][j+1] && board[i+1][j+1].color, i+1, j+1,
						board[i][j-1] && board[i][j-1].color, i, j-1,
						board[i][j+1] && board[i][j+1].color, i, j+1,
						board[i-1] && board[i-1][j].color, i-1, j,
						board[i+1] && board[i+1][j].color, i+1, j];

					for (var k = 0; k < 25; k += 3){
						if (neighbors[k] == "" && board[i][j].color == "white"){
							semiboard[neighbors[k+1]][neighbors[k+2]].w = 1;
						} else if (neighbors[k] == "" && board[i][j].color == "black"){
							semiboard[neighbors[k+1]][neighbors[k+2]].b = 1;
						}
					}
			}
		}
	}

	// Third Pass: use semiboard values to count semiwhite - semiblack
	for (var i = 0; i < 7; ++i){
		for (var j = 0; j < 7; ++j){
			switch (board[i][j].color){
				default: break;
				case "":
					neighbors = [board[i-1] && board[i-1][j-1] && board[i-1][j-1].color, i-1, j-1,
						board[i-1] && board[i-1][j+1] && board[i-1][j+1].color, i-1, j+1,
						board[i+1] && board[i+1][j-1] && board[i+1][j-1].color, i+1, j-1,
						board[i+1] && board[i+1][j+1] && board[i+1][j+1].color, i+1, j+1,
						board[i][j-1] && board[i][j-1].color, i, j-1,
						board[i][j+1] && board[i][j+1].color, i, j+1,
						board[i-1] && board[i-1][j].color, i-1, j,
						board[i+1] && board[i+1][j].color, i+1, j];

					var semiwhite = semiboard[i][j].w && !semiboard[i][j].b;
					var semiblack = !semiboard[i][j].w && semiboard[i][j].b;
					for (var k = 0; k < 25; k += 3){
						if (typeof neighbors[k] != "undefined"){ // undefined means not on the board

							// if a neighbor is white or a neighbor is touching white, i can't be black
							if (neighbors[k] == "white" || semiboard[neighbors[k+1]][neighbors[k+2]].w){
								semiblack = false;
							}

							// vice versa
							if (neighbors[k] == "black" || semiboard[neighbors[k+1]][neighbors[k+2]].b){
								semiwhite = false;
							}
						}
					}

					if (semiwhite){
						++value;
					} else if (semiblack){
						--value;
					}
			}
		}
	}

	undoChanges(board, state.changes);
	return {white: value, black: -value}; // naturally, white maximizes and black minimizes
}

// Compiled version for a little extra speed
// Compiled with http://closure-compiler.appspot.com/home
heuristicValue=function(h){var g=0,c=h.board,f=[],e;applyChanges(c,h.changes);for(var a=0;7>a;++a){f.push([]);for(var b=0;7>b;++b)f[a][b]={b:0,a:0},"white"==c[a][b].color?++g:"black"==c[a][b].color&&--g}for(a=0;7>a;++a)for(b=0;7>b;++b)switch(c[a][b].color){case "white":case "black":e=[c[a-1]&&c[a-1][b-1]&&c[a-1][b-1].color,a-1,b-1,c[a-1]&&c[a-1][b+1]&&c[a-1][b+1].color,a-1,b+1,c[a+1]&&c[a+1][b-1]&&c[a+1][b-1].color,a+1,b-1,c[a+1]&&c[a+1][b+1]&&c[a+1][b+1].color,a+1,b+1,c[a][b-1]&&c[a][b-1].color,a,b-1,c[a][b+
1]&&c[a][b+1].color,a,b+1,c[a-1]&&c[a-1][b].color,a-1,b,c[a+1]&&c[a+1][b].color,a+1,b];for(var d=0;25>d;d+=3)""==e[d]&&"white"==c[a][b].color?f[e[d+1]][e[d+2]].b=1:""==e[d]&&"black"==c[a][b].color&&(f[e[d+1]][e[d+2]].a=1)}for(a=0;7>a;++a)for(b=0;7>b;++b)switch(c[a][b].color){case "":e=[c[a-1]&&c[a-1][b-1]&&c[a-1][b-1].color,a-1,b-1,c[a-1]&&c[a-1][b+1]&&c[a-1][b+1].color,a-1,b+1,c[a+1]&&c[a+1][b-1]&&c[a+1][b-1].color,a+1,b-1,c[a+1]&&c[a+1][b+1]&&c[a+1][b+1].color,a+1,b+1,c[a][b-1]&&c[a][b-1].color,
a,b-1,c[a][b+1]&&c[a][b+1].color,a,b+1,c[a-1]&&c[a-1][b].color,a-1,b,c[a+1]&&c[a+1][b].color,a+1,b];for(var i=f[a][b].b&&!f[a][b].a,j=!f[a][b].b&&f[a][b].a,d=0;25>d;d+=3)if("undefined"!=typeof e[d]){if("white"==e[d]||f[e[d+1]][e[d+2]].b)j=!1;if("black"==e[d]||f[e[d+1]][e[d+2]].a)i=!1}i?++g:j&&--g}undoChanges(c,h.changes);return{white:g,black:-g}};

function minimax(state, ply){
	if (isTerminal(state) || ply <= 0){
		return {value:heuristicValue(state)[state.color], state:state};
	} else {
		var value = -Infinity;
		var localvalue = -Infinity;
		var best = null;
		overChildren(state, function(child){
				var X = minimax(child, ply-1);
				if (-X.value > value){
					value = -X.value;
					best = child;
				} else if (-X.value == value){
					var Y = heuristicValue(child)[state.color];
					if (Y > localvalue){
						localvalue = Y;
						best = child;
					}
				}
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

		cb(choice.move);
	};

	return self;
}

// NOTE: initialize WITHOUT "new" keyword
function HeuristicAI(color, board){
	var self = {};
	self.color = color;
	self.board = board;
	self.choose = function(cb){
		var root = new State(board, color);
		var most = -Infinity;
		var choice = null;
		overChildren(root, function(child){
			var X = heuristicValue(child)[color];
			if (X > most){
				most = X;
				choice = child;
			}
		});

		cb(choice.move);
	};

	return self;
}

// NOTE: initialize WITHOUT "new" keyword
function MinimaxAI(color, board, ply){
	var self = {};
	self.board = board;
	self.color = color;
	self.choose = function(cb){
		var root = new State(board, color);
		var most = -Infinity;
		var choice = minimax(root, ply).state;
		if (choice == null){
			cb([]);
		} else {
			cb(choice.move);
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