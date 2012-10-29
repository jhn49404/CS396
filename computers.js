function RandomAI(color, board){
	var self = {};
	self.color = color;
	self.board = board;
	self.choose = function(cb){
		// NOTE: use setTimeout to implement concurrency
		setTimeout(function(){
			// ...
		}, 50);
	};

	// ...
	return self;
}

function MinimaxAI(color, board){
	var self = {};
	self.board = board;
	self.color = color;
	self.choose = function(cb){
		// NOTE: use setTimeout to implement concurrency
		setTimeout(function(){
			// ...
		}, 50);
	};

	// ...
	return self;
}