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
	$scope.board.counts = {white:2, black:2};
	$scope.template = "start_template.html";

	var whiteAI = HumanAI("white", $scope.board);
	//var whiteAI = RandomAI("white", $scope.board);
	//var whiteAI = MinimaxAI("white", $scope.board, 1);
	var blackAI = MinimaxAI("black", $scope.board, 3);
	//var blackAI = RandomAI("black", $scope.board);
	//var blackAI = HeuristicAI("black", $scope.board);

	$scope.whiteAI = whiteAI;
	$scope.blackAI = blackAI;
	$scope.start = function(first){
		$scope.template = "game_template.html";		
		$scope.activeAI = first;
		makeMove();
	};

	function endGame(){
		$scope.activeAI = null;
		// case of reloading page on "ok", nothing on "cancel"
		if ($scope.board.counts.white > $scope.board.counts.black){
			var r = confirm("You win! Start a new game?");
			if (r == true){location.href = 'index.html';}	// refresh the page
		} else {
			var r = confirm("You lost... Start a new game?");
			if (r == true){location.href = 'index.html';}	// refresh the page
		}
	}

	function passTurn(){
		$scope.activeAI = $scope.activeAI==whiteAI? blackAI : whiteAI;
		makeMove();
	}

	function winOrPass(){
		if ($scope.board.counts.white + $scope.board.counts.black == 49){
			endGame();
		} else {
			passTurn();
		}
	}

	function makeMove(){
		$scope.activeAI.choose(function(move){
			// NOTE: move stores the changes to be made to the board
			// e.g., move = [{i:0, j:0, color:"white"}, ...]
			for (m in move){
				var change = move[m];
				if (change.color == ""){
					--$scope.board.counts[$scope.board[change.i][change.j].color];
				} else {
					++$scope.board.counts[change.color];
				}

				$scope.board[change.i][change.j].color = change.color;
			}

			setTimeout(function(){
				// NOTE: have to call apply here because the changes
				// made in this thread are not tracked by angular.
				$scope.$apply();
				winOrPass();
			}, 1);
		});
	}
}