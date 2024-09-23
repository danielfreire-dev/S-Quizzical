import { useState, useEffect } from "react";

import Home from "./Components/Home";
import Questions from "./Components/Question";
import Answers from "./Components/Answers";
import Counter from "./Components/AnswersCounter";
import { nanoid } from "nanoid";

import "./App.css";
import "./style/style.css";
import { Header } from "./Components/Header";

/* Figma Draft */
/* https://www.figma.com/design/E9S5iPcm10f0RIHK8mCqKL/Quizzical-App?node-id=0-1&node-type=canvas&t=qocSgDNnSXpzHIGr-0 */

function App() {
	const [quizzStarted, setQuizzStarted] = useState(true);
	const [quizzData, setQuizzData] = useState({});
	const [quizzSettings, setQuizzSettings] = useState({
		amountQuestions: "5",
		category: "0",
		difficulty: "any-diff",
		questionType: "any-type",
	});
	const [correctCount, setCorrectCount] = useState(0);

	/* Creating the API link */
	let amountQuestions = "amount=" + quizzSettings.amountQuestions || "amount=5";
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
		async function fetchAPI(linkFetch) {
			const res = await fetch(linkFetch);
			const data = await res.json();
			setQuizzData(data);
		}
		fetchAPI(linkFetch);
	}, [quizzStarted]);

	function setQuizz(e) {
		e.preventDefault();

		/* Declares whether the quizz has started or not */
		setQuizzStarted(!quizzStarted);

		/* Saves input data */
		const form = e.target;
		const formData = new FormData(form);
		const formJson = Object.fromEntries(formData.entries());
		handleStartForm(formJson);
	}

	function handleStartForm(json) {
		setQuizzSettings({
			amountQuestions: json.amountQuestions,
			category: json.category,
			difficulty: json.difficulty,
			questionType: json.questionType,
		});
		/* return quizzSettings; */
	}

	console.log(quizzData.results);

	/* Maps Section */
	const questionsElement =
		quizzData.response_code === 0
			? /* Maps per question */
			  quizzData.results.map((item) => {
					return (
						<div key={nanoid()} className="question-div">
							<Questions
								key={nanoid()}
								question={item.question}
								incorrect_answers={item.incorrect_answers}
								correct_answer={item.correct_answer}
								category={item.category}
							/>

							<hr />
						</div>
					);
			  })
			: "";

	return (
		<>
			<Header />
			{quizzData.response_code === 0 ? (
				<div>
					{quizzStarted ? (
						<>
							<hr />
							{quizzData && questionsElement}

							<Counter
								correctAnswers={correctCount}
								amountQuestions={amountQuestions.split("=").pop()}
							/>
						</>
					) : (
						<Home
							startQuiz={setQuizz}
							json={JSON.stringify(quizzData, null, 2)}
						/>
					)}
				</div>
			) : (
				<div>
					<p>Server not working. Try again</p>
				</div>
			)}
		</>
	);
}

export default App;
