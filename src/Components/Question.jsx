/* eslint-disable react/prop-types */

/* import { useEffect, useState } from "react"; */

export default function Questions(props) {
	let qi = 0;
	let c = 3;

	console.log("render");

	/* const answersList = props.answers.map(
		<div>
			<input type="radio" name="question" value={qi} id="q1o3" />
			<label htmlFor="q1o3">OPTION J=3</label>
		</div>,
	); */

	return (
		<>
			<pre>{props.json}</pre>
			<h2 className="question">{props.question}</h2>
			{/* Radio buttons for answers exlusivity (question i / option j) */}
			{/* <input
				type="radio"
				onClick={props.handleClick}
				name="question"
				value={qi}
				id="q1o0"
			/>
			<label htmlFor="q1o0" className="correct">
				OPTION J=0
			</label> */}

			{/* {answersList} */}

			<input
				type="radio"
				onClick={props.handleClick}
				name="question"
				value={qi}
				id="q1o1"
			/>
			<label htmlFor="q1o1" className="wrong">
				OPTION J=1
			</label>

			<input
				type="radio"
				onClick={props.handleClick}
				name="question"
				value={qi}
				id="q1o2"
			/>
			<label htmlFor="q1o2">OPTION J=2</label>

			<input
				type="radio"
				onClick={props.handleClick}
				name="question"
				value={qi}
				id="q1o3"
			/>
			<label htmlFor="q1o3">OPTION J=3</label>
			<hr />
			<div className="final-div">
				<h2 className="final-result">
					You scored {c}/{props.amountQuestions} answers.
				</h2>
				<button type="reset" className="play-again">
					Play again
				</button>
			</div>
			<div className="awsesome"></div>
		</>
	);
}
