import { useState } from "react";
import { Link } from "react-router-dom";

export default function Card({ pokemon }) {
	const [isShiny, setIsShiny] = useState(false);

	const handleClick = () => {
		setIsShiny(!isShiny);
	};

	return (
		<>
			<Link to={`/pokemon/${pokemon.name}`}>
				<img
					className="pokemon-img"
					src={
						isShiny
							? pokemon.sprites.front_shiny
							: pokemon.sprites.front_default
					}
					alt={`${pokemon.name} pokemon sprite`}
					loading="lazy"
				/>
			</Link>
			<button className="shiny" onClick={handleClick}>
				{isShiny ? "VIEW NORMAL" : "VIEW SHINY"}
			</button>
			<p>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
		</>
	);
}
