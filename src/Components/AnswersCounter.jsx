/* eslint-disable react/prop-types */

export default function Counter(props) {
	let c = 3;

	return (
		<>
			<div className="final-div">
				<h2 className="final-result">
					You scored {props.correctAnswers}/{props.amountQuestions} answers.
				</h2>
				<button type="reset" className="play-again">
					Play again
				</button>
			</div>
			<div className="awesome"></div>
		</>
	);
}
