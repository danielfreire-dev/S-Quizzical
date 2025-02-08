import React, { useState, useEffect } from "react";
import Home from "./Components/Home";
import { Header } from "./Components/Header";
import Quizz from "./Components/Quizz";
import Footer from "./Components/Footer";
import "./App.css";
import "./style/style.css";
import Loading from "./Components/Loading";

function App() {
	const [quizzStarted, setQuizzStarted] = useState(false);
	const [quizzData, setQuizzData] = useState({});
	const [quizzSettings, setQuizzSettings] = useState({
		amountQuestions: 5,
		category: 0,
		difficulty: "",
		questionType: "",
	});
	const [loading, setLoading] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false);

	/* Creating the API link */
	let amountQuestions = "amount=" + quizzSettings.amountQuestions || "amount=5";
	let category =
		quizzSettings.category === "0" ? "" : "&category=" + quizzSettings.category;

	let difficulty =
		quizzSettings.difficulty !== "any-diff"
			? "&difficulty=" + quizzSettings.difficulty
			: "";
	/* Fix true/false issue */
	let questionType =
		quizzSettings.questionType !== "any-type"
			? "&type=" + quizzSettings.questionType
			: "";

	// Define the API endpoint URL
	let linkFetch = `https://opentdb.com/api.php?${amountQuestions}${category}${difficulty}${questionType}`;

	useEffect(() => {
		setLoading(true);
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
				console.info("Response code:", data.response_code);

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
			const maxRetries = 5;

			while (
				retries < maxRetries &&
				(!data || !data.results || data.results.length === 0)
			) {
				retries++;
				console.info(`Retrying fetch (${retries}/${maxRetries})...`);
				await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds before retrying
				data = await fetchAPI(linkFetch);
			}

			if (data !== null && data !== undefined) {
				setQuizzData(data);
				setLoading(false);
			} else {
				setQuizzData((prevState) => ({
					...prevState,
					error: "Failed to fetch data after multiple retries.",
				}));
				setLoading(false);
			}
		}

		fetchDataWithRetries();
	}, [quizzStarted, linkFetch]);

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme) {
			setIsDarkMode(savedTheme === "dark");
		} else {
			setIsDarkMode(
				window.matchMedia &&
					window.matchMedia("(prefers-color-scheme: dark)").matches,
			);
		}
	}, []);

	useEffect(() => {
		document.body.classList.toggle("dark-mode", isDarkMode);
		localStorage.setItem("theme", isDarkMode ? "dark" : "light");
	}, [isDarkMode]);

	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode);
	};

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
				<button onClick={toggleTheme}>
					Switch to {isDarkMode ? "Light" : "Dark"} Mode
				</button>
			</div>

			{loading ? (
				<Loading />
			) : (
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
			)}

			<Footer />
		</>
	);
}

export default App;
