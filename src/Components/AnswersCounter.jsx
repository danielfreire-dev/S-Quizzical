/* eslint-disable react/prop-types */

export default function Counter(props) {
	const {
		hasStarted,
		correctAnswers,
		amountQuestions,
		handleQuizzSubmit,
		quizzSubmited,
	} = props;

	/* console.log(quizzSubmited); */

	return (
		<div className="final-div">
			<>
				{quizzSubmited ? (
					<div className="final-div">
						<h2 className="final-result">
							You scored {correctAnswers}/{amountQuestions} answers.
						</h2>
						<button type="reset" className="play-again">
							Play again
						</button>
					</div>
				) : (
					<div>
						<button className="play-again">Check answers</button>
					</div>
				)}
			</>
			<div className="awesome"></div>
		</div>
	);
}
