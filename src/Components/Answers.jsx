/* eslint-disable react/prop-types */

export default function Answers(props) {
	let {
		question,

		answer,

		answerClass,
	} = props;

	return (
		<>
			<input
				type="radio"
				name={question}
				value={answer}
				id={answer}
				className="radio-answer"
			/>
			<label htmlFor={answer} className={`answer ${answerClass}`}>
				{answer}
			</label>
		</>
	);
}
