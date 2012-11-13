//// STATE ////

// NOTE: initialize WITH "new" keyword
function State(board){
	// this.asdfasrgwerg = asdgasfdgasg
	// ...

	// NOTE: changes stores the changes made to the board
	// e.g., changes[0] = [{i:0, j:0, color:"white"}, ...]
	this.changes = [];
}


//// HELPER FUNCTIONS ////

function overChildren(state, cb){
	// TODO
	// build a child state, cb(child), repeat for all children
	// remember to use palindromic pruning to not send two equivalent children
}

function isTerminal(state){
	// TODO
}

function heuristicValue(state){
	// TODO
	// blob field of white - blob field of black
}

// NOTE: minimax is a depth first search, so we can't use a timer based method
function minimax(state, ply){
	if (isTerminal(state) || ply <= 0){
		return heuristicValue(state);
	} else {
		alpha = -Infinity;

		// NOTE: using callback form to simulate python's yield keyword
		overChildren(state, function(child){
			alpha = max(alpha, -minimax(child, ply-1));
		});

		return alpha;
	}
}


//// AI CLASSES ////

// NOTE: initialize WITHOUT "new" keyword
function RandomAI(color, board){
	var self = {};
	self.color = color;
	self.board = board;
	self.choose = function(cb){
		var root = new State(board);
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

		cb([{i:1, j:1, color:color}]);
		//cb(choice.changes[0]);
	};

	// ...
	return self;
}

// NOTE: initialize WITHOUT "new" keyword
function MinimaxAI(color, board){
	var self = {};
	self.board = board;
	self.color = color;
	self.choose = function(cb){
		// ...
	};

	// ...
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