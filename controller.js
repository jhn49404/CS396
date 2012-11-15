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
	$scope.counts = {white:2, black:2};

	var whiteAI = HumanAI("white", $scope.board);
	//var whiteAI = RandomAI("white", $scope.board);
	//var whiteAI = MinimaxAI("white", $scope.board, 1);
	//var blackAI = MinimaxAI("black", $scope.board, 3);
	//var blackAI = RandomAI("black", $scope.board);
	var blackAI = HumanAI("black", $scope.board);
	$scope.activeAI = whiteAI;

	function endGame(){
		$scope.activeAI = null;
		// TODO
	}

	function passTurn(){
		console.log("passTurn", $scope.activeAI.color);
		$scope.activeAI = $scope.activeAI==whiteAI? blackAI : whiteAI;
		makeMove();
	}

	function winOrPass(){
		console.log("winOrPass", $scope.activeAI.color);
		if ($scope.counts.white + $scope.counts.black == 49){
			endGame();
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
				if (change.color == ""){
					--$scope.counts[$scope.board[change.i][change.j].color];
				} else {
					++$scope.counts[change.color];
				}

				$scope.board[change.i][change.j].color = change.color;
			}

			setTimeout(function(){
				// NOTE: have to call apply here because the changes
				// made in this thread are not tracked by angular.
				// It will be best to remove this when we turn in
				// the final, human vs AI, version.
				$scope.$apply();
				winOrPass();
			}, 10);
		});
	}

	makeMove();
}