export default function Difficulty(props) {
	const { difficulty } = props;

	const difficultyMeasure =
		difficulty === "easy"
			? "Easy"
			: difficulty === "medium"
			? "Medium"
			: difficulty === "hard"
			? "Hard"
			: console.log("Something wrong with difficultyMeasure");

	return <div>{difficultyMeasure}</div>;
}
