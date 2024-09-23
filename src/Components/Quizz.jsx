/* eslint-disable react/prop-types */
import { useState } from "react";
import Questions from "./Question";
import Counter from "./AnswersCounter";
import { nanoid } from "nanoid/non-secure";

export default function Quizz(props) {
	const [correctCount, setCorrectCount] = useState(0);
	const { quizzData, amountQuestions } = props;

	const questionsElement =
		quizzData.response_code === 0
			? /* Maps per question */
			  quizzData.results.map((item) => {
					return (
						<div key={nanoid()} className="question-div">
							<Questions
								key={nanoid()}
								question={item.question}
								incorrect_answers={item.incorrect_answers}
								correct_answer={item.correct_answer}
								category={item.category}
							/>

							<hr />
						</div>
					);
			  })
			: "";

	return (
		<>
			<form action="">
				{questionsElement}
				<Counter
					correctAnswers={correctCount}
					amountQuestions={amountQuestions.split("=").pop()}
				/>
			</form>
		</>
	);
}
