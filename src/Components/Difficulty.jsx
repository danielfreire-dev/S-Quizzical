/* eslint-disable react/prop-types */

export default function Difficulty({ difficulty }) {
	const difficultyMeasure =
		difficulty === "easy"
			? "easy 🟢"
			: difficulty === "medium"
			? "medium 🟡"
			: difficulty === "hard"
			? "hard 🔴"
			: console.log("Something wrong with difficultyMeasure");

	return <div className="difficulty">{difficultyMeasure}</div>;
}
