function BlobsCtrl($scope){
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