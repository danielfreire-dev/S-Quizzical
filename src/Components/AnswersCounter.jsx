/* eslint-disable react/prop-types */

export default function Counter(props) {
	const { hasStarted, correctAnswers, amountQuestions, handleQuizzSubmit } =
		props;

	return (
		<div className="final-div">
			<>
				{hasStarted ? (
					<div>
						<button
							type="reset"
							className="play-again"
							onClick={handleQuizzSubmit}
						>
							Check answers
						</button>
					</div>
				) : (
					<div>
						<h2 className="final-result">
							You scored {correctAnswers}/{amountQuestions} answers.
						</h2>
						<button type="reset" className="play-again">
							Play again
						</button>
					</div>
				)}
			</>
			<div className="awesome"></div>
		</div>
	);
}
