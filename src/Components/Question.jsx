/* eslint-disable react/prop-types */

import { nanoid } from "nanoid";

import { useState } from "react";
import Categories from "./Category";
import Difficulty from "./Difficulty";
import Answers from "./Answers";

export default function Questions(props) {
	const {
		quizzDisplayArray,
		question,
		answers,
		category,
		difficulty,
		handleQuizzChange,
	} = props;

	/* Maps per answer */
	console.log(quizzDisplayArray);
	console.log(answers);

	const answerElements = answers.map((answer) => (
		<Answers key={nanoid()} question={question} answers={answer.answer} />
	));

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
