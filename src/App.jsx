import { useState, useEffect } from "react";

import Home from "./Components/Home";
/* import Questions from "./Components/Question";
import Answers from "./Components/Answers";
import Counter from "./Components/AnswersCounter"; */
import { Header } from "./Components/Header";
import Quizz from "./Components/Quizz";
import Footer from "./Components/Footer";

import "./App.css";
import "./style/style.css";

/* Figma Draft */
/* https://www.figma.com/design/E9S5iPcm10f0RIHK8mCqKL/Quizzical-App?node-id=0-1&node-type=canvas&t=qocSgDNnSXpzHIGr-0 */

function App() {
	const [quizzStarted, setQuizzStarted] = useState(false);
	const [quizzData, setQuizzData] = useState({});
	const [quizzSettings, setQuizzSettings] = useState({
		amountQuestions: 5,
		category: 0,
		difficulty: "any-diff",
		questionType: "any-type",
	});

	/* console.log("quizzStarted: " + quizzStarted);
	console.log(quizzData);
 */
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
			try {
				const res = await fetch(linkFetch);
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`);
				}
				const data = await res.json();
				setQuizzData((prevState) => ({ ...prevState, ...data }));
			} catch (error) {
				console.log("There was an error fetching the API: ", error);
			}
		}

		fetchAPI(linkFetch);
	}, [quizzStarted]); // Only run this effect if quizzStarted changes

	function setQuizz(e) {
		e.preventDefault();

		/* Declares whether the quizz has started or not */
		beginQuizz();

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
	}

	function beginQuizz() {
		setQuizzStarted(!quizzStarted);
	}

	/* Timeout message to be tested */

	return (
		<>
			<Header />
			{quizzData.response_code === 0 ? (
				<div>
					{quizzStarted ? (
						<>
							<hr />

							{quizzData && (
								<Quizz
									quizzData={quizzData}
									amountQuestions={amountQuestions}
									setQuizz={setQuizz}
									beginQuizz={beginQuizz}
								/>
							)}
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
					<p> If server is not working please try refreshing.</p>
				</div>
			)}
			<Footer />
		</>
	);
}

export default App;
