/* eslint-disable react/prop-types */

/* import { useEffect, useState } from "react"; */
import Answers from "./Answers";
import { nanoid } from "nanoid";

export default function Questions(props) {
	const { question, incorrect_answers, correct_answer } = props;

	const shuffledAnswers = [...incorrect_answers];
	shuffledAnswers.splice(
		Math.floor(Math.random() * shuffledAnswers.length),
		0,
		correct_answer,
	);
	console.log(shuffledAnswers);

	const answerElements = shuffledAnswers.map((answer) => (
		<>
			<input
				key={nanoid()}
				type="radio"
				name="question"
				value={answer}
				id={answer}
			/>
			<label htmlFor={answer}>{answer}</label>
		</>
	));

	return (
		<div>
			<h2 className="question">{question}</h2>
			{answerElements}
		</div>
	);
}
