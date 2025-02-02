import { useState, useEffect /*,  useRef */ } from "react";

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
		questionType: "multiple",
	});

	/* Creating the API link */
	let amountQuestions = "amount=" + quizzSettings.amountQuestions || "amount=5";
	let category =
		quizzSettings.category === 0 ? "" : "&category=" + quizzSettings.category;
	let difficulty =
		quizzSettings.difficulty !== "any-diff"
			? "&difficulty=" + quizzSettings.difficulty
			: "";
	/* Fix true/false issue */

	// Define the API endpoint URL
	let linkFetch = `https://opentdb.com/api.php?${amountQuestions}${category}${difficulty}&type=multiple`;
	/* console.log(linkFetch); */

	//const lastFetchTimeRef = useRef(0);
	let timer; // Declare timer variable

	useEffect(() => {
		async function fetchAPI(linkFetch, timeout = 5000) {
			// Create a controller to handle timeout
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), timeout);

			try {
				const res = await fetch(linkFetch, { signal: controller.signal });

				// Check if the response is not OK (status code not in the range 200-299)
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`);
				}

				// Check if the response is JSON
				const contentType = res.headers.get("content-type");
				if (!contentType || !contentType.includes("application/json")) {
					throw new Error("Response is not JSON");
				}

				const data = await res.json();
				console.log("Response code:", data.response_code);
				console.log("Data:", data);

				// Clear the timeout
				clearTimeout(timeoutId);

				return data; // Return the data
			} catch (error) {
				console.error("Error fetching API:", error);
				setQuizzData((prevState) => ({ ...prevState, error: error.message }));

				// Clear the timeout
				clearTimeout(timeoutId);

				return { error: error.message }; // Return an error object
			}
		}

		async function fetchDataWithRetries() {
			let data = await fetchAPI(linkFetch);
			let retries = 0;
			const maxRetries = 3;

			while (
				retries < maxRetries &&
				(!data || !data.results || data.results.length === 0)
			) {
				retries++;
				console.log(`Retrying fetch (${retries}/${maxRetries})...`);
				await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds before retrying
				data = await fetchAPI(linkFetch);
			}

			if (data !== null && data !== undefined) {
				setQuizzData(data);
			}
		}

		fetchDataWithRetries();
	}, [quizzStarted, linkFetch]);
	/* console.log(quizzData); */

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
	if (!quizzData) {
		return <h2>Loading...</h2>;
	}

	return (
		<>
			<Header />

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

			<Footer />
		</>
	);
}

export default App;
