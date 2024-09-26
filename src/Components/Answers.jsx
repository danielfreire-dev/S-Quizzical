/* eslint-disable react/prop-types */

export default function Answers(props) {
	let {
		question,
		quizzzSubmited,
		answer,
		handleQuizzChange,
		correctAnswer,
		selectedAnswer,
	} = props;

	let answerClass = "";
	if (quizzzSubmited) {
		if (selectedAnswer === answer) {
			// If the selected answer is the correct one
			answerClass = answer === correctAnswer ? "correct" : "wrong";
		}
	}
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
