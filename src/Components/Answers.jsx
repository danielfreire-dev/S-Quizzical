/* eslint-disable react/prop-types */

/* import { nanoid } from "nanoid"; */

export default function Answers(props) {
	let incorrect = props.incorrect_answers;

	let correct = props.correct_answer;

	let randomPos = Math.ceil(Math.random() * incorrect.length);

	incorrect.splice(randomPos, 0, correct);

	let answersArray = [...new Set(incorrect)];
	console.log(answersArray);

	return (
		<>
			{answersArray.map((answer) => {
				<div>
					<input
						type="radio"
						name={"question" + answer}
						value={"question" + answer}
						id={answer}
					/>
					<label htmlFor={"question" + answer}>{answer}</label>
				</div>;
			})}

			<div>
				<input
					type="radio"
					name={"question"}
					value={"answer" + " answer"}
					id={"answer"}
				/>
				<label htmlFor={"question" + " answer"}>{"answer"}</label>
			</div>
		</>
	);

	/* return { answersElement }; */
}
