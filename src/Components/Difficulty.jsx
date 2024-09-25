export default function Difficulty(props) {
	const { difficulty } = props;

	const difficultyMeasure =
		difficulty === "easy"
			? ""
			: difficulty === "medium"
			? ""
			: difficulty === "hard"
			? ""
			: console.log("Something wrong with difficultyMeasure");
	return <></>;
}
