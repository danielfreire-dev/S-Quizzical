/* eslint-disable react/prop-types */
import {
	Education,
	Book,
	Laptop,
	Video,
	Music,
	Event,
	Screen,
	GameConsole,
	Compass,
	Mountain,
	Calculation,
	Worship,
	Cyclist,
	Monument,
	ColorPalette,
	UserCertification,
	DogWalker,
	Bullhorn,
	Car,
	Notebook,
	Tools,
	BastionHost,
	Demo,
} from "@carbon/icons-react";

export default function Categories(props) {
	const { category } = props;

	return (
		<>
			{(() => {
				switch (category) {
					case "General Knowledge":
						return (
							<div className="category">
								<p>{category}</p>
								<Education size={42} alt="individual with a graduation cap" />
							</div>
						);

					case "Entertainment: Books":
						return (
							<div className="category">
								<p>{category}</p>
								<Book size={30} alt="book icon" />
							</div>
						);

					case "Entertainment: Film":
						return (
							<div className="category">
								<p>{category}</p>
								<Video size={30} alt="video camera" />
							</div>
						);

					case "Entertainment: Music":
						return (
							<div className="category">
								<p>{category}</p>
								<Music size={30} alt="music note" />
							</div>
						);

					case "Entertainment: Musicals & Theatres":
						return (
							<div className="category">
								<p>{category}</p>
								<Event size={48} alt="Billboard with a star" />
							</div>
						);

					case "Entertainment: Television":
						return (
							<div className="category">
								<p>{category}</p>
								<Screen size={36} alt="television screen" />
							</div>
						);

					case "Entertainment: Video Games":
						return (
							<div className="category">
								<p>{category}</p>
								<GameConsole size={48} alt="console controller" />
							</div>
						);

					case "Entertainment: Board Games":
						return (
							<div className="category">
								<p>{category}</p>
								<BastionHost size={30} alt="chess tower" />
							</div>
						);

					case "Science & Nature":
						return (
							<div className="category">
								<p>{category}</p>
								<Mountain size={42} alt="mountain" />
							</div>
						);

					case "Science: Computers":
						return (
							<div className="category">
								<p>{category}</p>
								<Laptop size={30} alt="laptop" />
							</div>
						);

					case "Science: Mathematics":
						return (
							<div className="category">
								<p>{category}</p>
								<Calculation size={30} alt="mathematical symbols" />
							</div>
						);

					case "Mythology":
						return (
							<div className="category">
								<p>{category}</p>
								<Worship size={30} alt="individual praying" />
							</div>
						);

					case "Sports":
						return (
							<div className="category">
								<p>{category}</p>
								<Cyclist size={30} alt="individual in a bycicle" />
							</div>
						);

					case "Geography":
						return (
							<div className="category">
								<p>{category}</p>
								<Compass size={30} alt="compass" />
							</div>
						);

					case "History":
						return (
							<div className="category">
								<p>{category}</p>
								<Monument size={30} alt="historical monument" />
							</div>
						);

					case "Politics":
						return (
							<div className="category">
								<p>{category}</p>
								<Bullhorn size={30} alt="bullhorn" />
							</div>
						);

					case "Art":
						return (
							<div className="category">
								<p>{category}</p>
								<ColorPalette size={30} alt="palette" />
							</div>
						);

					case "Celebrities":
						return (
							<div className="category">
								<p>{category}</p>
								<UserCertification size={30} alt="individual with a star" />
							</div>
						);

					case "Animals":
						return (
							<div className="category">
								<p>{category}</p>
								<DogWalker size={30} alt="dog walking" />
							</div>
						);

					case "Vehicles":
						return (
							<div className="category">
								<p>{category}</p>
								<Car size={30} alt="car" />
							</div>
						);

					case "Entertainment: Comics":
						return (
							<div className="category">
								<p>{category}</p>
								<Notebook size={36} alt="comic book" />
							</div>
						);

					case "Science: Gadgets":
						return (
							<div className="category">
								<p>{category}</p>
								<Tools size={36} alt="wrench" />
							</div>
						);

					case "Entertainment: Japanese Anime & Manga":
						return (
							<div className="category">
								<p>{category}</p>
								<Notebook size={56} alt="anime book" />
							</div>
						);

					case "Entertainment: Cartoon & Animations":
						return (
							<div className="category">
								<p>{category}</p>
								<Demo size={30} alt="television with a star" />
							</div>
						);

					default:
						return (
							<div className="category">
								<p>{category}</p>
							</div>
						);
				}
			})()}
		</>
	);
}
