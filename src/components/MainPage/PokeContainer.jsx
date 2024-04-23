import Card from "./Card";
import Loader from "./Loader";

export default function PokeContainer({ pokemonData }) {
	return (
		<>
			{/* <Loader pokemonData={pokemonData} /> */}
			<div className="pokecontainer">
				{/* {pokemonData.length > 8 && */}
				{pokemonData.map((pokemon) => (
					<div className="card" key={pokemon.id}>
						<Card pokemon={pokemon} />
					</div>
				))}
			</div>
		</>
	);
}
