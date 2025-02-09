/* eslint-disable react/prop-types */

export default function Answers({ question, answer, answerClass }) {
	let idAnswer = `${answer}_${question}`;
	return (
		<>
			<input
				type="radio"
				name={question}
				value={answer}
				id={idAnswer}
				className="radio-answer"
			/>
			<label htmlFor={idAnswer} className={`answer label ${answerClass}`}>
				{answer}
			</label>
		</>
	);
}
