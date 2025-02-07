/* eslint-disable react/prop-types */

import { nanoid } from "nanoid";
import Categories from "./Category";
import Difficulty from "./Difficulty";
import Answers from "./Answers";

export default function Questions(props) {
	const {
		question,
		answers,
		category,
		difficulty,
		correctAnswer,
		quizzSubmited,
		selectedAnswer,
	} = props;

	/* console.log(quizzSubmited); */

	/* Maps per answer */
	const answerElements = answers.map((answer, index) => {
		let answerClass = "";
		let indexAnswer = index;
		/* console.log("correctAnswer: " + correctAnswer); */
		/* console.log("selectedAnswer: " + selectedAnswer); */
		/* console.log("answer.answer: " + answer.answer); */
		/* console.log("answer.checked: " + answer.checked); */

		// Check if quiz is submitted and the selected answer
		if (quizzSubmited === true) {
			if (selectedAnswer === answer.answer) {
				// If the selected answer is correct or wrong
				answerClass = answer.answer === correctAnswer ? "correct" : "wrong";
			}
		}

		return (
			<Answers
				key={nanoid()}
				question={question}
				answer={answer.answer}
				index={indexAnswer}
				correctAnswer={correctAnswer}
				answerClass={answerClass} // Pass the class for styling
			/>
		);
	});

	return (
		<div>
			<div className="question-container">
				<h2 className="question">{question}</h2>
				<Difficulty difficulty={difficulty} />
				<Categories key={nanoid()} category={category} />
			</div>
			{answerElements}
		</div>
	);
}
