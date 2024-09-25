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

function handleQuizzSubmit(e) {
	e.preventDefault();
	console.log(e.target);

	// Extract user answers from the form (implementation depends on your form structure)
	/* const userAnswers =  */ /* logic to get user answers */ // Evaluate user answers and update correct count
	let updatedCorrectCount = 0;
	for (let i = 0; i < quizzData.results.length; i++) {
		if (userAnswers[i] === quizzData.results[i].correct_answer) {
			updatedCorrectCount++;
		}
	}
	setCorrectCount(updatedCorrectCount);

	// Set quiz submitted to true
	setQuizzSubmited(true);
}

const { name, value, type, checked } = event.target;
setFormData((prevFormData) => {
	return {
		...prevFormData,
		[name]: type === "checkbox" ? checked : value,
	};
});
let quizzDisplayData = {
	question: "",
	answers: [
		{
			answer: "",
			correct: false,
			checked: false,
			selected: false,
		},
	],
	category: "",
	difficulty: "",
};
