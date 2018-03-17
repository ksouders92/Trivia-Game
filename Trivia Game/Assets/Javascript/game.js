// Create a trivia game
// "play now" button to start
// 10 timed questions displayed one at a time
// If correct, notify player they are correct w/ text & a picture
// If incorrect or timer runs out, notify player incorrect or times up w/ a text & a picture
// When game is over display score and some text & a picture
// ***Create a play again button!***

// **** Global variables ****
// Trivia questions contain the question, answer list and answer
var triviaQuestions = [{
    question: "What is a dog’s most highly developed sense?",
    answerList: ["taste", "sight", "smell", "hearing"],
    answer: 2
}, {
    question: "Puppies are delivered how many weeks after conception?",
    answerList: ["9", "16", "18", "22"],
    answer: 0
}
    , {
    question: "How old was the world’s oldest dog, an Australian cattle hound named Bluey, in human years?",
    answerList: ["27", "29", "31", "32"],
    answer: 1
}
    , {
    question: "Normal adult dogs have how many teeth?",
    answerList: ["30", "32", "36", "42"],
    answer: 3
}
    , {
    question: "Through what part of the body do dogs sweat?",
    answerList: ["mouth", "nose", "paws", "ears"],
    answer: 2
}
    , {
    question: "Which dog breed has a black tongue?",
    answerList: ["Doberman", "Husky", "Chow Chow", "Weimaraner"],
    answer: 2
}
    , {
    question: "What is the most popular breed of dog, according to the American Kennel Club’s registrations?",
    answerList: ["Golden Retriever", "Beagle", "German Shepherd", "Labrador Retriever"],
    answer: 3
}
    , {
    question: "What is the most common training command taught to dogs?",
    answerList: ["sit", "stay", "fetch", "rollover"],
    answer: 0
}
    , {
    question: "Which of these dog breeds is the smallest?",
    answerList: ["Dachshund", "Boxer", "Chihuahua", "Pomeranian"],
    answer: 2
}
    , {
    question: "Which dog breed yodels instead of barks?",
    answerList: ["Bassett Hound", "Basenji", "Border Collie", "Komondor"],
    answer: 1
}]

// To hold the images that go with each question
var picArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];

// Other variables needed to send object to the DOM
var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelect;

// Messages/ alerts given to the user
var messages = {
    correct: "Awesome job!",
    incorrect: "Sorry, that's not correct.",
    endTime: "Out of time!",
	finished: "Let's see how you did...",
	perfectScore: "You know your dog knowledge!",
	goodScore: "Pretty impressive",
	okayScore: "You know some stuff but have some learning to do!",
	badScore: "Not the best...",
	terribleScore: "Yikes...are you a cat person?"
}

// Start button
$('#startBtn').on('click', function () {
    $(this).hide();
    newGame();
});

// Play again button
// Not sure how to get this to stay hidden until end of the game
$('#playAgain').on('click', function () {
    $(this).hide();
    newGame();
});

// **** Functions ****
// new game

function newGame() {
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    $('#unanswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
}

// new question
function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#jpg').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 10;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	// learned in slideshow class activity 5.2
	$('#jpg').html('<img src = "./Assets/Images/'+ picArray[currentQuestion] +'.jpg" width = "300px" height = "300px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 3000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 3000);
	}	

// Not sure where to put this code so that it waits until the end of the game to start displaying messages 

//	if (correctAnswer === 10){
//		$('#message').html(messages.perfectScore)

//	}
//	if (correctAnswer > 7){
//		$('#message').html(messages.goodScore)

//	}
//	if (correctAnswer > 4){
//		$('#message').html(messages.okayScore)

//	}

//	if (correctAnswer > 0){
//		$('#message').html(messages.badScore)

//	}

//	if (correctAnswer === 0){
//		$('#message').html(messages.terribleScore)

//	}
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#jpg').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#playAgainBtn').addClass('reset');
	$('#playAgainBtn').show();
	$('##playAgainBtn').html('Start Over?');
}