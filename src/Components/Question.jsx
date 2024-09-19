/* eslint-disable react/prop-types */

import Answers from "./Answers";

/* import { useEffect, useState } from "react"; */

export default function Questions(props) {
	return (
		<div className="question-div">
			<h2 className="question">{props.question}</h2>
			<hr />
			{/* <Answers /> */}
		</div>
	);
}
