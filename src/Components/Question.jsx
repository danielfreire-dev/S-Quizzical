/* eslint-disable react/prop-types */

import { nanoid } from "nanoid";
import { decode } from "html-entities";
import { useState } from "react";
import Categories from "./Category";

export default function Questions(props) {
	const { question, incorrect_answers, correct_answer, category } = props;

	let questiond = decode(question);
	let correct = decode(correct_answer);
	let incorrect = decode(incorrect_answers);
	let categoryd = decode(category);

	const shuffledAnswers = [...incorrect];
	shuffledAnswers.splice(
		Math.ceil(Math.random() * shuffledAnswers.length),
		0,
		correct,
	);

	const [answerState, setAnswerState] = useState({
		question: questiond,
		category: categoryd,
		correctAnswer: correct,
		answers: shuffledAnswers,
		isCorrect: false,
	});

	console.log(answerState.categoryd);
	console.log(answerState.correct);
	console.log(answerState.shuffledAnswers);
	console.log(answerState.answerState);

	/* Maps per answer */
	const answerElements = answerState.answers.map((answer) => (
		<>
			<input
				type="radio"
				name={question}
				value={answer}
				id={answer}
				className="radio-answer"
			/>
			<label htmlFor={answer}>{answer}</label>
		</>
	));

	return (
		<div>
			<div className="question-container">
				<h2 className="question">{questiond}</h2>
				<Categories category={categoryd} />
			</div>
			{answerElements}
		</div>
	);
}
