function HumanAI(color, board){
	var self = {};
	self.color = color;
	var selected = null;
	self.handleClick = function(i, j){
		if (board[i][j].color == color){
			selected = {i:i, j:j};
		} else if (board[i][j].color == ""){
			switch (color){
				// Add a piece next to an existing one
				case board[i-1] && board[i-1][j-1] && board[i-1][j-1].color:
				case board[i-1] && board[i-1][j+1] && board[i-1][j+1].color:
				case board[i+1] && board[i+1][j-1] && board[i+1][j-1].color:
				case board[i+1] && board[i+1][j+1] && board[i+1][j+1].color:
				case board[i][j-1] && board[i][j-1].color:
				case board[i][j+1] && board[i][j+1].color:
				case board[i-1] && board[i-1][j].color:
				case board[i+1] && board[i+1][j].color:
					setTimeout(function(){
						callback([{i:i, j:j, color:color}]);
					}, 1);
					selected = null;
					break;

				// Jump a piece
				case board[i-2] && board[i-2][j-2] && board[i-2][j-2].color:
				case board[i-2] && board[i-2][j+2] && board[i-2][j+2].color:
				case board[i+2] && board[i+2][j-2] && board[i+2][j-2].color:
				case board[i+2] && board[i+2][j+2] && board[i+2][j+2].color:
				case board[i-2] && board[i-2][j].color:
				case board[i+2] && board[i+2][j].color:
				case board[i][j-2] && board[i][j-2].color:
				case board[i][j+2] && board[i][j+2].color:
					if (selected){
						setTimeout(function(){
							callback([{i:selected.i, j:selected.j, color:""}, {i:i, j:j, color:color}]);
						}, 1);
						selected = null;
					}

					break;
			}
		}
	};

	self.handlePass = function(){
		callback([]);
		selected = null;
	}

	self.choose = function(cb){
		callback = cb;
	};

	return self;
}