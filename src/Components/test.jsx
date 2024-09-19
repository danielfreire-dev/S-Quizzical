function createQuestionsArray(quizzData) {
	let fullQuestionsArray = [];
	for (let j = 0; j < quizzSettings.amountQuestions; j++) {
		let questions = quizzData.results[j].question;

		fullQuestionsArray.push(questions);
	}
	return fullQuestionsArray;
}

function createAnswersArray(quizzData) {
	for (let i = 0; i < quizzSettings.amountQuestions; i++) {
		let incorrect = quizzData.results[i].incorrect_answers;

		let correct = quizzData.results[i].correct_answer;
		let randomPos = Math.ceil(Math.random() * incorrect.length);
		incorrect.splice(randomPos, 0, correct);

		/* incorrect is no longer an array exclusive to wrong answers, so I create a new variable for easy reading */
		/* answersArray = incorrect;
			console.log(answersArray); */
	}
	/* return answersArray; */
}
