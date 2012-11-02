function isTerminal(state){
	// TODO
}

function overChildren(state, cb){
	// TODO
	// build a child state, cb(child), repeat for all children
	// remember to use palindromic pruning to not send two equivalent children
}

function RandomAI(color, board){
	var self = {};
	self.color = color;
	self.board = board;
	self.choose = function(cb){
		// NOTE: using setTimeout to implement concurrency
		setTimeout(function(){
			// ...
		}, 50);
	};

	// ...
	return self;
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

		// NOTE: use callback form to simulate python's yield keyword
		overChildren(state, function(child){
			alpha = max(alpha, -minimax(child, ply-1));
		});

		return alpha;
	}
}

function MinimaxAI(color, board){
	var self = {};
	self.board = board;
	self.color = color;
	self.choose = function(cb){
		// NOTE: using setTimeout to implement concurrency
		setTimeout(function(){
			// ...
		}, 50);
	};

	// ...
	return self;
}