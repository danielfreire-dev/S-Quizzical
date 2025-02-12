import { useState, useEffect } from "react";

import Home from "./Components/Home";
import { Header } from "./Components/Header";
import Quizz from "./Components/Quizz";
import Footer from "./Components/Footer";

import "./App.css";
import "./style/style.css";
import Loading from "./Components/Loading";

import "./Analytics/analytics";
import { CookieManager } from "react-cookie-manager";
import "./style/cookie-banner.css";
import useAnalyticsEventTracker from "./Analytics/useAnalyticsEventTracker";
/* import { default as i18next } from "i18next"; */

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
	const [acceptCookies, setAcceptCookies] = useState(false);

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
		if (acceptCookies) {
			useAnalyticsEventTracker;
		}
	}, [acceptCookies]);

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

	function HandleCookiePreferences(preferences) {
		if (preferences.Analytics) {
			setAcceptCookies(true);
		}
		if (preferences.Social) {
			console.log("Social Cookies Activated");
		}
		if (preferences.Adverstising) {
			console.log("Advertising Cookies Activated");
		}
	}

	return (
		<>
			<CookieManager
				translations={{
					title: "Would You Like A Cookie? 🍪",
					message:
						"We value your privacy. Choose which cookies, if any,  you want to allow. Essential cookies are always enabled as they are necessary for the website to function properly.",
				}}
				theme="dark"
				cookieName="cookie-manager"
				displayType="modal"
				showManageButton={true}
				onAccept={() => setAcceptCookies(true)}
				onDecline={() => HandleCookiePreferences()}
				onManage={HandleCookiePreferences}
			>
				<Header />
				<main>
					{loading ? (
						<Loading />
					) : (
						<>
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
						</>
					)}
				</main>
				<Footer />
			</CookieManager>
		</>
	);
}

export default App;
