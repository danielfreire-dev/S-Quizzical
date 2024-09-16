import { useState, useEffect } from "react";

import Home from "./Components/Home";
import Questions from "./Components/Question";

import "./App.css";
import "./style/style.css";
import Options from "./Components/Options";

/* Figma Draft */
/* https://www.figma.com/design/E9S5iPcm10f0RIHK8mCqKL/Quizzical-App?node-id=0-1&node-type=canvas&t=qocSgDNnSXpzHIGr-0 */

function App() {
	const [quizzStarted, setQuizzStarted] = useState(false);
	const [quizzData, setQuizzData] = useState({});

	let amountQuestions = 5;
	let linkFetch = `https://opentdb.com/api.php?amount=${amountQuestions}`;

	useEffect(() => {
		fetch(linkFetch)
			.then((res) => res.json())
			.then((data) => setQuizzData(data));
		/* console.log("API fetch"); */
	}, [quizzStarted]);

	function setQuizz() {
		setQuizzStarted(!quizzStarted);

		console.log(quizzStarted);

		createQuestionsArray(quizzData);
		createAnswersArray(quizzData);
	}

	function createQuestionsArray(quizzData) {
		let fullQuestionsArray = [];

		for (let j = 0; j < amountQuestions; j++) {
			let questions = quizzData.results[j].question;

			fullQuestionsArray.push(questions);
		}

		return fullQuestionsArray;
	}

	function createAnswersArray(quizzData) {
		let fullAnswersArray = [];
		let correctArray = [];
		for (let i = 0; i < amountQuestions; i++) {
			let incorrect = quizzData.results[i].incorrect_answers;
			let correct = quizzData.results[i].correct_answer;
			let randomPos = Math.ceil(Math.random() * incorrect.length);
			incorrect.splice(randomPos, 0, correct);

			/* incorrect is no longer an array exclusive to wrong answers, so I create a new variable for easy reading */
			const answersArray = incorrect;

			correctArray.push(correct);
			fullAnswersArray.push(answersArray);
		}
		/* console.log(fullAnswersArray); */
		/* console.log(correctArray); */

		return fullAnswersArray;
	}

	/* Array [#] will state which question we're talking about -1 */
	/* console.log(quizzData.results[0].category); */

	/* Incorrect answers are also an array */
	/* console.log(quizzData.results[0].incorrect_answers[0]); */

	return (
		<div>
			{/* {quizzStarted ? (
				<Questions handleClick={console.log("handleClick")} />
			) : (
				<Home startQuiz={()=>setQuizzStarted(!quizzStarted)} />
			)} */}

			<Home startQuiz={setQuizz}></Home>
			<hr />

			<Questions
				handleClick={console.log("handleClick")}
				json={JSON.stringify(quizzData, null, 2)}
				question={"INSERT QUESTION HERE "}
				amountQuestions={amountQuestions}
			/>
		</div>
	);
}
/*
					quizzData.response == 0
						? JSON.stringify(quizzData, null, 2)
						: "Server is overloaded. Try again later!" */
export default App;
