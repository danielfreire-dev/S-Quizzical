/* eslint-disable react/prop-types */

import { nanoid } from "nanoid";
import { decode } from "html-entities";
import { useState } from "react";
import Categories from "./Category";
import Difficulty from "./Difficulty";

export default function Questions(props) {
	const { categoryd, difficulty, handleQuizzChange } = props;

	/* Maps per answer */
	const answerElements = shuffledAnswers.map((answer) => (
		<>
			<input
				key={nanoid()}
				type="radio"
				name={answerState.question}
				value={answer}
				id={answer}
				className="radio-answer"
				onChange={handleQuizzChange}
				checked={answerState.checked}
			/>
			<label key={nanoid()} htmlFor={answer}>
				{answer}
			</label>
		</>
	));

	return (
		<div>
			<div className="question-container">
				<h2 className="question">{questiond}</h2>
				<Difficulty difficulty={difficulty} />
				<Categories key={nanoid()} category={categoryd} />
			</div>
			{answerElements}
		</div>
	);
}
