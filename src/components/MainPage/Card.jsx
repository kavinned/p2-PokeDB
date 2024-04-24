export default function Card({ pokemon }) {
	return (
		<>
			<img
				src={pokemon.sprites.front_default}
				alt={`${pokemon.name} pokemon sprite`}
				loading="lazy"
			/>
			<p>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
		</>
	);
}
