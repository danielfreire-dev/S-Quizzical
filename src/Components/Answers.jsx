/* eslint-disable react/prop-types */

/* import { nanoid } from "nanoid"; */

export default function Answers(props) {
	let { question, answers, answer, category, difficulty } = props;

	return (
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
	);
}
