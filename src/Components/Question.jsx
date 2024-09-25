/* eslint-disable react/prop-types */

import { nanoid } from "nanoid";

import { useState } from "react";
import Categories from "./Category";
import Difficulty from "./Difficulty";
import Answers from "./Answers";

export default function Questions(props) {
	const { quizzDisplayArray, question, answers, category, difficulty } = props;

	/* Maps per answer */

	const answerElements = answers.map((answer, index) => (
		<Answers key={nanoid()} question={question} answer={answer.answer} />
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
