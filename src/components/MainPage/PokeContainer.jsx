import Card from "./Card";
import Loader from "./Loader";

export default function PokeContainer({ pokemonData, isLoading }) {
	return (
		isLoading && <Loader />,
		!isLoading && (
			<div className="pokecontainer">
				{pokemonData.map((pokemon) => (
					<div className="card" key={pokemon.id}>
						<Card pokemon={pokemon} />
					</div>
				))}
			</div>
		)
	);
}
