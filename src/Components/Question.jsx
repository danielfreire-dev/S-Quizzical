/* eslint-disable react/prop-types */

/* import { useEffect, useState } from "react"; */

export default function Questions(props) {
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
			<hr />
		</>
	);
}
