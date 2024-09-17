/* eslint-disable react/prop-types */

export default function Answers(props) {
	let qi = 0;

	return (
		<>
			<input type="radio" name="question" value={qi} id="q1o0" />
			<label htmlFor="q1o0">{props.answer}</label>
		</>
	);
}
