// Factory for a HumanAI object
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
				default:
					if (selected){
						if ((Math.abs(selected.i - i) == 2 && Math.abs(selected.j - j) == 2) ||
							(Math.abs(selected.i - i) == 2 && selected.j - j == 0) ||
							(selected.i - i == 0 && Math.abs(selected.j - j) == 2)){
							callback([{i:selected.i, j:selected.j, color:""}, {i:i, j:j, color:color}]);
							selected = null;
						}
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