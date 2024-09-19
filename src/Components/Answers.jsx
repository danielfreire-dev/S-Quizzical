/* eslint-disable react/prop-types */

import { nanoid } from "nanoid";

export default function Answers(props) {
	const answersElement = props.answers.map((item) => {
		let incorrect = item.incorrect_answers;

		let correct = item.correct_answer;
		let randomPos = Math.ceil(Math.random() * incorrect.length);
		incorrect.splice(randomPos, 0, correct);
		item.map((answer) => {
			return (
				<>
					<input
						type="radio"
						name={"question" + answer.question}
						value={answer.answer}
						id={nanoid}
					/>
					<label htmlFor={answer.question}>{answer.answer}</label>
				</>
			);
		});
	});
	return { answersElement };
}
