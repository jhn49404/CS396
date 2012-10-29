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
	$scope.shitbrix = function(msg){
		console.log(msg)
	};

	$scope.add = function(){
		$scope.names.push({});
	};

	$scope.names = [{
		text: "World"
	}];
}