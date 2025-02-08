/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";
import Questions from "./Question";
import Counter from "./AnswersCounter";

export default function Quizz(props) {
	const [correctCount, setCorrectCount] = useState(0);
	const [quizzSubmited, setQuizzSubmited] = useState(false);
	const [processedData, setProcessedData] = useState([]);
	const [selectedAnswers, setSelectedAnswers] = useState({}); // Object to store selected answers

	const { quizzData, amountQuestions, beginQuizz } = props;

	useEffect(() => {
		if (quizzData) {
			processQuizzData(quizzData);
		}
	}, [quizzData]); // Run only when quizzData changes

	function processQuizzData(data) {
		if (!data || !data.results) {
			console.error("Invalid data structure:", data);
			return;
		}

		const processedQuestions = data.results.map((item) => {
			let questiond = item.question;
			let correct = item.correct_answer;
			let incorrect = item.incorrect_answers;

			// Ensure that the inputs are strings before decoding
			if (typeof questiond !== "string") {
				questiond = String(questiond);
			}
			if (typeof correct !== "string") {
				correct = String(correct);
			}
			if (Array.isArray(incorrect)) {
				incorrect = incorrect.map((answer) =>
					typeof answer === "string" ? answer : String(answer),
				);
			}

			questiond = decode(questiond);
			correct = decode(correct);
			incorrect = incorrect.map(decode);

			// Make answer options identical for identical answers
			if (incorrect.filter((answer) => answer === correct).length > 1) {
				incorrect[0] = correct;
			}

			const answers = [...incorrect];
			answers.splice(
				Math.floor(Math.random() * incorrect.length + 1),
				0,
				correct,
			);

			return {
				question: questiond,
				category: decode(item.category),
				difficulty: item.difficulty,
				correctAnswer: correct,
				answers: answers.map((answer) => ({
					answer,
					correct: answer === correct,
					checked: selectedAnswers[questiond] === answer || false, // Set based on user selection
				})),
			};
		});

		setProcessedData(processedQuestions);
	}

	function handleQuizzChange(question, answer) {
		setSelectedAnswers({ ...selectedAnswers, [question]: answer });
	}

	function handleQuizzSubmit(e) {
		e.preventDefault();
		let userScore = 0;

		const form = e.target;
		const formData = new FormData(form);
		const formJson = Object.fromEntries(formData.entries());
		setSelectedAnswers(formJson);

		// Create a copy of processedData to avoid direct mutation
		const updatedProcessedData = [...processedData];

		// Check if selected answers are correct
		updatedProcessedData.forEach((question) => {
			const selectedAnswer = formJson[question.question];

			if (
				selectedAnswer ===
				question.answers.find((answer) => answer.correct).answer
			) {
				// Update processedData
				const index = updatedProcessedData.findIndex(
					(item) => item.question === question.question,
				);
				updatedProcessedData[index].correctAnswer = selectedAnswer;

				userScore++;
			}
		});

		setCorrectCount(userScore);
		setQuizzSubmited((prevState) => !prevState);
		setProcessedData(updatedProcessedData); // Update the state with the new array
	}

	function newQuizz() {
		setQuizzSubmited(false);
		setCorrectCount(0);
		setSelectedAnswers({});
		beginQuizz();
	}

	const questionsElement =
		processedData.length !== 0 ? (
			processedData.map((item) => (
				<div key={nanoid()} className="question-div">
					<Questions
						key={item.question}
						{...item} // Spread the properties because they align with the props needed
						handleQuizzChange={handleQuizzChange}
						selectedAnswer={selectedAnswers[item.question] || ""} // Pass selected answer if available
						quizzSubmited={quizzSubmited}
						correctAnswer={item.correctAnswer}
					/>

					<hr />
				</div>
			))
		) : (
			<div className="error-quizz">
				<h2 className="error-quizz-text">
					We are having an issue with our servers. Please come back later.
				</h2>
				<hr />
			</div>
		);

	return (
		<>
			{quizzSubmited ? (
				<form onSubmit={newQuizz}>
					{questionsElement}
					<Counter
						quizzSubmited={quizzSubmited}
						correctAnswers={correctCount}
						amountQuestions={amountQuestions.split("=").pop()}
					/>
				</form>
			) : (
				<form onSubmit={handleQuizzSubmit}>
					{questionsElement}
					<Counter
						quizzSubmited={quizzSubmited}
						correctAnswers={correctCount}
						amountQuestions={amountQuestions.split("=").pop()}
					/>
				</form>
			)}
		</>
	);
}
