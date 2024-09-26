/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { nanoid } from "nanoid/non-secure";
import { decode } from "html-entities";
import Questions from "./Question";
import Counter from "./AnswersCounter";

export default function Quizz(props) {
	const [correctCount, setCorrectCount] = useState(0);
	const [quizzSubmited, setQuizzSubmited] = useState(false);
	const [processedData, setProcessedData] = useState([]);
	const [selectedAnswers, setSelectedAnswers] = useState({}); // Object to store selected answers

	const { quizzData, amountQuestions } = props;

	console.log(selectedAnswers);
	console.log(processedData);

	function processQuizzData(data) {
		const processedQuestions = data.results.map((item) => {
			const questiond = decode(item.question);
			const correct = decode(item.correct_answer);
			const incorrect = decode(item.incorrect_answers);

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
				answers: answers.map((answer) => ({
					answer,
					correct: answer === correct,
					checked: selectedAnswers[questiond] === answer || false, // Set based on user selection
				})),
			};
		});

		setProcessedData(processedQuestions);
	}

	useEffect(() => {
		if (quizzData) {
			processQuizzData(quizzData);
		}
	}, [quizzData]); // Run only when quizzData changes

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
		console.log(formJson);
		console.log(selectedAnswers);

		//Check if selected answers are correct
		processedData.forEach((question) => {
			const selectedAnswer = formJson[question.question];

			if (
				selectedAnswer ===
				question.answers.find((answer) => answer.correct).answer
			) {
				//update processedData
				const index = processedData.findIndex(
					(item) => item.question === question.question,
				);
				processedData[index].correctAnswer = selectedAnswer;

				userScore++;
			}
			setCorrectCount(userScore);
		});

		setCorrectCount(userScore);
		setQuizzSubmited((prevState) => !prevState);
	}

	function newQuizz() {
		setQuizzSubmited(false);
		console.log(quizzSubmited);
		setCorrectCount(0);
		setSelectedAnswers({});
	}

	const questionsElement = processedData.map((item) => (
		<div key={nanoid()} className="question-div">
			<Questions
				key={item.question}
				{...item} // Spread the properties because they align with the props needed
				handleQuizzChange={handleQuizzChange}
				selectedAnswer={selectedAnswers[item.question] || ""} // Pass selected answer if available
				quizzSubmited={quizzSubmited}
				correctAnswer={item.correct_answer}
			/>

			<hr />
		</div>
	));

	console.log(processedData);

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
