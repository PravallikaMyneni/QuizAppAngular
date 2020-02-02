var app = angular.module("myApp", []);
app.directive("appDirective", function (quizFactory) {
	return {
		restrict: "E",
		templateUrl: "appTemplate.html",
		scope: { selectedValue: '=' },
		link: function ($scope, elem, attrs) {
			$scope.start = function () {
				$scope.id = 0;
				$scope.score = 0;
				$scope.quizOver = false;
				$scope.inProgress = true;
				$scope.goToNext = false;
				$scope.getQuestion($scope.id);
			};
			$scope.reset = function () {
				$scope.id = 0;
				$scope.score = 0;
				$scope.quizOver = false;
				$scope.inProgress = true;
				$scope.answerMode = false;
			};
			$scope.validateAns = function () {
				var ans = $scope.selectedValue;
				if (ans) {
					if (ans === $scope.answer) {
						$scope.correctAns = true;
						$scope.score = $scope.score + 10;
					} else {
						$scope.correctAns = false;
					}
				} else {
                    $scope.correctAns = false;
				}
				$scope.goToNext = true;
			};
			$scope.getQuestion = function () {

				var ques = quizFactory.getQuestion($scope.id);
				if (ques) {
					$scope.question = ques.question;
					$scope.options = ques.options;
					$scope.answer = ques.answer;
					$scope.id = $scope.id + 1;
				} else {
					$scope.quizOver = true;
				}

			};
			$scope.showQuestion = function () {
				$scope.selectedValue = "";
				$scope.goToNext = false;
				$scope.getQuestion();
			};
			$scope.reset();
		}
	};
});



app.factory('quizFactory', function () {

	var questions = [
		{
			question: "Which is the world's largest desert?",
			options: ["Thar", "Kalahari", "Sahara", "Sonoran"],
			answer: "Sahara"
		},
		{
			question: "When did the second world war end?",
			options: ["1945", "1939", "1944", "1942"],
			answer: "1945"
		},
		{
			question: "Which is considered as the biggest port of India?",
			options: ["Kolkata", "Cochin", "Chennai", "Mumbai"],
			answer: "Mumbai"
		},
		{
			question: "The largest fresh water lake in India is ?",
			options: ["Pulicat Lake", "Veeranam Lake", "Chilka Lake", "Kolleru Lake"],
			answer: "Kolleru Lake"
		},
		{
			question: "Who invented telephone?",
			options: ["Albert Einstein", "Alexander Graham Bell", "Isaac Newton", "Marie Curie"],
			answer: "Alexander Graham Bell"
		}
	];
	return {
		getQuestion: function (id) {
			if (id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
});