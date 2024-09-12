export default function Home(props) {
	return (
		<>
			<h1>Quizzical</h1>
			<p className="intro-text">This app will quizz your trivia knowledge</p>
			<p className="intro-text">Are you ready?</p>
			<div className="multiple-options">
				<h3 className="select-category">Category:</h3>
				<select name="" id="">
					<option value="">Random</option>
					<option value="">Not so Random</option>
					<option value="">Definitely not Random</option>
				</select>
			</div>
			<button type="button" className="start" onClick={props.startQuiz}>
				Start quiz
			</button>
		</>
	);
}
