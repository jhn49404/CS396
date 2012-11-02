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

function isTerminal(state){
	// TODO
}

function heuristicValue(state){
	// TODO
	// blob field of white - blob field of black
}

function overChildren(state, cb){
	// TODO
	// build a child, cb(child), repeat for all children
}

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