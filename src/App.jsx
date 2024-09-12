import { useState, useEffect } from "react";

import Home from "./Components/Home";
import Questions from "./Components/Question";

import "./App.css";
import "./style/style.css";

/* Figma Draft */
/* https://www.figma.com/design/E9S5iPcm10f0RIHK8mCqKL/Quizzical-App?node-id=0-1&node-type=canvas&t=qocSgDNnSXpzHIGr-0 */

function App() {
	const [quizzStarted, setQuizzStarted] = useState(false);
	const [quizzData, setQuizzData] = useState({});
	const [categories, setCategories] = useState({});

	let amountQuestions = 5;
	let linkFetch = `https://opentdb.com/api.php?amount=${amountQuestions}`;

	useEffect(() => {
		fetch(linkFetch)
			.then((res) => res.json())
			.then((data) => setQuizzData(data));
		console.log("API fetch");
	}, [quizzStarted]);

	useEffect(() => {
		fetch("https://opentdb.com/api_category.php")
			.then((res) => res.json())
			.then((newCategories) => setCategories(newCategories));
		console.log(categories);
	}, [quizzStarted]);

	function setQuizz() {
		setQuizzStarted(!quizzStarted);
		console.log(quizzStarted);
	}

	function createAnswersArray(quizzData) {
		let incorrect = quizzData.results[0].incorrect_answers[0];
		let correct = quizzData.results[0].correct_answer;
		let newPos = Math.ceil(Math.random() * incorrect.length);
		let answersArray = incorrect.splice(newPos, 0, correct);

		console.log(answersArray);

		return answersArray;
	}

	/* createAnswersArray(); */
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

			<Home startQuiz={setQuizz} />
			<hr />

			<Questions
				handleClick={console.log("handleClick")}
				json={JSON.stringify(quizzData, null, 2)}
				question={"INSERT QUESTION HERE "}
				amountQuestions={amountQuestions}
				answers={answersArray}
			/>
		</div>
	);
}

export default App;
