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

	const { quizzData, amountQuestions, setQuizz } = props;

	console.log(quizzData);

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

		processedData.forEach((question) => {
			const selectedAnswer = selectedAnswers[question.question];
			if (selectedAnswer && selectedAnswer === question.correct_answer) {
				userScore++;
			}
		});

		setCorrectCount(userScore);
		setQuizzSubmited(true);
	}

	const questionsElement = processedData.map((item) => (
		<div key={nanoid()} className="question-div">
			<Questions
				key={nanoid()}
				quizzDisplayArray={item}
				question={item.question}
				answers={item.answers}
				category={item.category}
				difficulty={item.difficulty}
				handleQuizzChange={handleQuizzChange}
				selectedAnswer={selectedAnswers[item.question] || ""} // Pass selected answer if available
			/>

			<hr />
		</div>
	));

	return (
		<>
			{quizzSubmited ? (
				<form onSubmit={handleQuizzSubmit}>
					{questionsElement}
					<Counter
						quizzSubmited={quizzSubmited}
						correctAnswers={correctCount}
						amountQuestions={amountQuestions.split("=").pop()}
					/>
				</form>
			) : (
				<form>
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
