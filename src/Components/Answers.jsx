/* eslint-disable react/prop-types */

export default function Answers({
	question,
	answer,
	answerClass,
	quizzSubmited,
}) {
	let idAnswer = `${answer}_${question}`;

	return (
		<>
			<input
				type="radio"
				name={question}
				value={answer}
				id={idAnswer}
				className="radio-answer"
				disabled={quizzSubmited}
			/>
			<label
				htmlFor={idAnswer}
				className={`answer label ${answerClass} ${
					answerClass !== "correct" && quizzSubmited && "disabled"
				}`}
			>
				{answer}
			</label>
		</>
	);
}
