import Card from "./Card";

export default function PokeContainer({ pokemonData }) {
	return (
		<div className="pokecontainer">
			{pokemonData.map((pokemon) => (
				<div className="card" key={pokemon.id}>
					<Card pokemon={pokemon} />
				</div>
			))}
		</div>
	);
}
