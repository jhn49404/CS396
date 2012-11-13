function Piece(color, i, j){
	var self = {};
	self.color = color;
	self.i = i;
	self.j = j;
	return self;
}

function BlobsCtrl($scope){
	$scope.board = [];
	for (var i = 0; i < 7; ++i){
		$scope.board.push([]);
		for (var j = 0; j < 7; ++j){
			$scope.board[i].push(Piece("", i, j));
		}
	}

	$scope.board[0][0].color = $scope.board[6][6].color = "black";
	$scope.board[0][6].color = $scope.board[6][0].color = "white";

	var whiteAI = HumanAI("white", $scope.board);
	var blackAI = RandomAI("black", $scope.board);
	$scope.activeAI = whiteAI;

	// NOTE: makeMove will be defined by the time passTurn is called
	function passTurn(){
		console.log("passTurn", $scope.activeAI.color);
		$scope.activeAI = $scope.activeAI==whiteAI? blackAI : whiteAI;
		makeMove();
	}

	function winOrPass(){
		console.log("winOrPass", $scope.activeAI.color);
		if (false){ // TODO check for endgame
			// ...
		} else {
			passTurn();
		}
	}

	function makeMove(){
		console.log("makeMove", $scope.activeAI.color);
		$scope.activeAI.choose(function(move){
			// NOTE: move stores the changes to be made to the board
			// e.g., move = [{i:0, j:0, color:"white"}, ...]
			for (m in move){
				var change = move[m];
				$scope.board[change.i][change.j].color = change.color;
			}

			winOrPass();
		});
	}

	makeMove();
}