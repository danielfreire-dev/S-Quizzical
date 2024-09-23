/* eslint-disable react/prop-types */

export default function Home(props) {
	return (
		<>
			<form onSubmit={props.startQuiz}>
				<div className="div-options">
					<label htmlFor="amountQuestions">Number of Questions: </label>
					<input
						type="number"
						name="amountQuestions"
						defaultValue={"5"}
						id="amountQuestions"
					/>
				</div>
				<div className="div-options">
					<label htmlFor="category-select" className="quizz-label ">
						Select Category:
					</label>
					<select name="category" id="category-select" defaultValue={"0"}>
						<option value="0">Any Category</option>
						<option value="9">General Knowledge</option>
						<option value="10">Entertainment: Books</option>
						<option value="11">Entertainment: Film</option>
						<option value="12">Entertainment: Music</option>
						<option value="13">Entertainment: Musicals &amp; Theatres</option>
						<option value="14">Entertainment: Television</option>
						<option value="15">Entertainment: Video Games</option>
						<option value="16">Entertainment: Board Games</option>
						<option value="17">Science &amp; Nature</option>
						<option value="18">Science: Computers</option>
						<option value="19">Science: Mathematics</option>
						<option value="20">Mythology</option>
						<option value="21">Sports</option>
						<option value="22">Geography</option>
						<option value="23">History</option>
						<option value="24">Politics</option>
						<option value="25">Art</option>
						<option value="26">Celebrities</option>
						<option value="27">Animals</option>
						<option value="28">Vehicles</option>
						<option value="29">Entertainment: Comics</option>
						<option value="30">Science: Gadgets</option>
						<option value="31">
							Entertainment: Japanese Anime &amp; Manga
						</option>
						<option value="32">Entertainment: Cartoon &amp; Animations</option>
					</select>
				</div>
				<div className="div-options">
					<label htmlFor="difficulty-select" className="quizz-label">
						Select Difficulty:
					</label>
					<select name="difficulty" id="difficulty-select">
						<option className="quizz-options" value="any-diff">
							Any difficulty
						</option>
						<option className="quizz-options" value="easy">
							Easy
						</option>
						<option className="quizz-options" value="medium">
							Medium
						</option>
						<option className="quizz-options" value="hard">
							Hard
						</option>
					</select>
				</div>
				<div className="div-options">
					<label htmlFor="type-select" className="quizz-label">
						Select Type:
					</label>
					<select name="questionType" id="questionType">
						<option className="quizz-options" value="any-type">
							Any type
						</option>
						<option className="quizz-options" value="multiple">
							Multipe options
						</option>
						<option className="quizz-options" value="boolean">
							True / False
						</option>
					</select>
				</div>
				<button type="submit" className="start">
					Start quiz
				</button>
			</form>
			{/* <pre>{props.json}</pre> */}
		</>
	);
}
