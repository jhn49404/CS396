function RandomAI(color){
	var self = {};
	self.choose = function(cb){
		var move = 0;
		cb(move);
	};

	return self;
}




// move = choose();
// dosomething(move);

// ...
// choose(function(move){
// 	dosomething(move)
// 	$scope.$$apply();
// });