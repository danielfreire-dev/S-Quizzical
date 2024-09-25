/* eslint-disable react/prop-types */
import { useState } from "react";
import { nanoid } from "nanoid/non-secure";
import { decode } from "html-entities";
/* import Questions from "./Question"; */
import Counter from "./AnswersCounter";

export default function Quizz(props) {
	const [correctCount, setCorrectCount] = useState(0);
	const [quizzSubmited, setQuizzSubmited] = useState(false);
	const [quizzDisplay, setQuizzDisplay] = useState();

	const { quizzData, amountQuestions, setQuizz, correct_answer } = props;

	let quizzDisplayArray = [];

	let quizz = quizzData.results.map((item) => {
		let questiond = decode(item.question);
		let correct = decode(item.correct_answer);
		let incorrect = decode(item.incorrect_answers);
		let categoryd = decode(item.category);

		let answers = [...incorrect];
		answers.splice(
			Math.floor(Math.random() * incorrect.length + 1),
			0,
			correct,
		);
		console.log(answers);

		let object = {
			question: questiond,
			answers: [],
			category: categoryd,
			difficulty: item.difficulty,
		};
		answers.map((answer) => {
			let answersObj = { answer: answer, correct: false, checked: false };

			if (answer === correct) {
				answersObj.correct = true;
			}

			object.answers.push(answersObj);
		});

		console.log(object);

		quizzDisplayArray.push(object);
	});

	console.log(quizzDisplayArray);
	setQuizzDisplay(quizzDisplayArray);

	/* console.log(quizzDisplay); */
	/* console.log(quizzDisplayData); */

	function handleQuizzChange(e) {
		e.preventDefault();
		const { name, value, type, checked } = e.target;
		console.log(e.target);
		console.log(name);
		console.log(value);

		setSelectedAnswer((prevSelected) => {
			return {
				...prevSelected,
				[name]: value,
			};
		});

		console.log(checked);
	}

	/* console.log(selectedAnswer); */
	/* console.log(Object.values(selectedAnswer)); */

	function handleQuizzSubmit(e) {
		e.preventDefault();
		let keyNames = Object.keys(selectedAnswer);
		console.log(keyNames);

		if (
			questiond === Object.keys(selectedAnswer) &&
			correct === Object.values(selectedAnswer)
		) {
			setQuizzSubmited(true);
			setSelectedAnswer([]);
			setCorrectCount((prevCount) => prevCount++);
			console.log(correctCount);
			return;
		}

		/* setQuizzSubmited(!quizzSubmited); */
	}

	/* const questionsElement =
		quizzData.response_code === 0
			?
			  quizzData.results.map((item) => {
					return (
						<div key={nanoid()} className="question-div">
							<Questions
								key={nanoid()}
								question={item.question}
								incorrect_answers={item.incorrect_answers}
								correct_answer={item.correct_answer}
								category={item.category}
								difficulty={item.difficulty}
								handleQuizzChange={handleQuizzChange}
								selectedAnswer={selectedAnswer}
							/>

							<hr />
						</div>
					);
			  })
			: ""; */

	return (
		<>
			{quizzSubmited ? (
				<form onSubmit={setQuizz}>
					{/* {questionsElement} */}
					<Counter
						quizzSubmited={quizzSubmited}
						correctAnswers={correctCount}
						amountQuestions={amountQuestions.split("=").pop()}
					/>
				</form>
			) : (
				<form onSubmit={handleQuizzSubmit}>
					{/* {questionsElement} */}
					<Counter
						quizzSubmited={quizzSubmited}
						correctAnswers={correctCount}
						amountQuestions={amountQuestions.split("=").pop()}
					/>
				</form>
			)}
		</>
	);
}
