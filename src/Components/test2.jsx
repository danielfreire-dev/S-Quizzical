export default function Questions({
	question,
	answers,
	selectedAnswer,
	handleQuizzChange,
	quizzSubmited,
}) {
	return (
		<div className="question-container">
			<h3>{question}</h3>
			<div className="answers-container">
				{answers.map((answerObj) => {
					// Determine if the selected answer is correct or wrong
					let answerClass = "";
					if (quizzSubmited) {
						if (selectedAnswer === answerObj.answer) {
							// If the selected answer is the correct one
							answerClass = answerObj.correct ? "correct" : "wrong";
						}
					}

					return (
						<div key={nanoid()}>
							<label className={`answer ${answerClass}`}>
								<input
									type="radio"
									name={question}
									value={answerObj.answer}
									checked={selectedAnswer === answerObj.answer}
									onChange={() => handleQuizzChange(question, answerObj.answer)}
									disabled={quizzSubmited} // Disable selection after submission
								/>
								{answerObj.answer}
							</label>
						</div>
					);
				})}
			</div>
		</div>
	);
}
