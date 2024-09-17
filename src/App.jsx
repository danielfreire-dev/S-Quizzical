import { useState, useEffect } from "react";

import Home from "./Components/Home";
import Questions from "./Components/Question";
import Answers from "./Components/Answers";
import Counter from "./Components/AnswersCounter";

import "./App.css";
import "./style/style.css";

/* Figma Draft */
/* https://www.figma.com/design/E9S5iPcm10f0RIHK8mCqKL/Quizzical-App?node-id=0-1&node-type=canvas&t=qocSgDNnSXpzHIGr-0 */

function App() {
	const [quizzStarted, setQuizzStarted] = useState(false);
	const [quizzData, setQuizzData] = useState({});
	const [quizzSettings, setQuizzSettings] = useState({
		amountQuestions: "5",
		category: "0",
		difficulty: "any-diff",
		questionType: "any-type",
	});

	/* Creating the API link */
	let amountQuestions = "amount=" + quizzSettings.amountQuestions || 5;
	let category =
		quizzSettings.category === 0 ? "" : "&category=" + quizzSettings.category;
	let difficulty =
		quizzSettings.difficulty !== "any-diff"
			? "&difficulty=" + quizzSettings.difficulty
			: "";
	let questionType =
		quizzSettings.questionType !== "any-type"
			? "&type=" + quizzSettings.questionType
			: "";

	let linkFetch = `https://opentdb.com/api.php?${amountQuestions}${category}${difficulty}${questionType}`;

	useEffect(() => {
		fetch(linkFetch)
			.then((res) => res.json())
			.then((data) => setQuizzData(data));
	}, [quizzStarted]);

	function setQuizz(e) {
		e.preventDefault();

		/* Declares whether the quizz has started or not */
		setQuizzStarted(!quizzStarted);
		console.log(quizzStarted);

		/* Saves input data */
		const form = e.target;
		const formData = new FormData(form);
		const formJson = Object.fromEntries(formData.entries());
		handleStartForm(formJson);

		/* Create arrays with questions and answers */
		createQuestionsArray(quizzData);
		createAnswersArray(quizzData);
	}

	function handleStartForm(json) {
		setQuizzSettings({
			amountQuestions: json.amountQuestions,
			category: json.category,
			difficulty: json.difficulty,
			questionType: json.questionType,
		});
		return quizzSettings;
	}

	function createQuestionsArray(quizzData) {
		let fullQuestionsArray = [];

		for (let j = 0; j < quizzSettings.amountQuestions; j++) {
			let questions = quizzData.results[j].question;

			fullQuestionsArray.push(questions);
		}

		return fullQuestionsArray;
	}

	function createAnswersArray(quizzData) {
		let fullAnswersArray = [];
		let correctArray = [];
		for (let i = 0; i < quizzSettings.amountQuestions; i++) {
			let incorrect = quizzData.results[i].incorrect_answers;
			let correct = quizzData.results[i].correct_answer;
			let randomPos = Math.ceil(Math.random() * incorrect.length);
			incorrect.splice(randomPos, 0, correct);

			/* incorrect is no longer an array exclusive to wrong answers, so I create a new variable for easy reading */
			const answersArray = incorrect;

			correctArray.push(correct);
			fullAnswersArray.push(answersArray);
		}
		/* console.log(fullAnswersArray);
		console.log(correctArray); */

		return fullAnswersArray;
	}

	/* Array [#] will state which question we're talking about -1 */
	/* console.log(quizzData.results[0].category); */

	/* Incorrect answers are also an array */
	/* console.log(quizzData.results[0].incorrect_answers[0]); */

	/* console.log(quizzData);
	console.log(quizzData.results); */

	/* console.log(fullQuestionsArray);
	console.log(fullAnswersArray);
 */
	function QuestionList(quizzData) {
		quizzData.results.map(
			<Questions
				handleClick={console.log("handleClick")}
				json={JSON.stringify(quizzData, null, 2)}
				question={question}
				amountQuestions={amountQuestions}
			/>,
		);
	}

	return (
		<>
			{quizzData.response_code === 0 ? (
				<div>
					{/* {quizzStarted ? (
				<QuestionList />
			) : (
				<Home startQuiz={() => setQuizzStarted(!quizzStarted)} />
			)} */}

					<Home startQuiz={setQuizz} />
					<hr />
					<form action="">
						<Questions
							json={JSON.stringify(quizzData, null, 2)}
							question={"INSERT QUESTION HERE"}
						/>
						{/* {fullAnswersArray.map((answerGroup) => {
					answerGroup.map((answer) => {
						<Answers answer={answer} />;
					});
				})} */}
					</form>
					<Counter
						correctAnswers={1}
						amountQuestions={amountQuestions.split("=").pop()}
					/>
				</div>
			) : (
				<div>
					<p>Server not working. Try again</p>
				</div>
			)}
		</>
	);
}
/*
					quizzData.response == 0
						? JSON.stringify(quizzData, null, 2)
						: "Server is overloaded. Try again later!" */
export default App;
