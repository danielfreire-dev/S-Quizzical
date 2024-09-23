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
								<Education size={24} />
							</div>
						);

					case "Entertainment: Books":
						return (
							<div className="category">
								<p>{category}</p>
								<Book size={24} />
							</div>
						);

					case "Entertainment: Film":
						return (
							<div className="category">
								<p>{category}</p>
								<Video size={24} />
							</div>
						);

					case "Entertainment: Music":
						return (
							<div className="category">
								<p>{category}</p>
								<Music size={24} />
							</div>
						);

					case "Entertainment: Musicals & Theatres":
						return (
							<div className="category">
								<p>{category}</p>
								<Event size={24} />
							</div>
						);

					case "Entertainment: Television":
						return (
							<div className="category">
								<p>{category}</p>
								<Screen size={24} />
							</div>
						);

					case "Entertainment: Video Games":
						return (
							<div className="category">
								<p>{category}</p>
								<GameConsole size={24} />
							</div>
						);

					case "Entertainment: Board Games":
						return (
							<div className="category">
								<p>{category}</p>
								<BastionHost size={24} />
							</div>
						);

					case "Science & Nature":
						return (
							<div className="category">
								<p>{category}</p>
								<Mountain size={24} />
							</div>
						);

					case "Science: Computers":
						return (
							<div className="category">
								<p>{category}</p>
								<Laptop size={24} />
							</div>
						);

					case "Science: Mathematics":
						return (
							<div className="category">
								<p>{category}</p>
								<Calculation size={24} />
							</div>
						);

					case "Mythology":
						return (
							<div className="category">
								<p>{category}</p>
								<Worship size={24} />
							</div>
						);

					case "Sports":
						return (
							<div className="category">
								<p>{category}</p>
								<Cyclist size={24} />
							</div>
						);

					case "Geography":
						return (
							<div className="category">
								<p>{category}</p>
								<Compass size={24} />
							</div>
						);

					case "History":
						return (
							<div className="category">
								<p>{category}</p>
								<Monument size={24} />
							</div>
						);

					case "Politics":
						return (
							<div className="category">
								<p>{category}</p>
								<Bullhorn size={24} />
							</div>
						);

					case "Art":
						return (
							<div className="category">
								<p>{category}</p>
								<ColorPalette size={24} />
							</div>
						);

					case "Celebrities":
						return (
							<div className="category">
								<p>{category}</p>
								<UserCertification size={24} />
							</div>
						);

					case "Animals":
						return (
							<div className="category">
								<p>{category}</p>
								<DogWalker size={24} />
							</div>
						);

					case "Vehicles":
						return (
							<div className="category">
								<p>{category}</p>
								<Car size={24} />
							</div>
						);

					case "Entertainment: Comics":
						return (
							<div className="category">
								<p>{category}</p>
								<Notebook size={24} />
							</div>
						);

					case "Science: Gadgets":
						return (
							<div className="category">
								<p>{category}</p>
								<Tools size={24} />
							</div>
						);

					case "Entertainment: Japanese Anime & Manga":
						return (
							<div className="category">
								<p>{category}</p>
								<Notebook size={24} />
							</div>
						);

					case "Entertainment: Cartoon & Animations":
						return (
							<div className="category">
								<p>{category}</p>
								<Demo size={24} />
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
