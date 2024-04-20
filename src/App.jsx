import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [pokemon, setPokemon] = useState([]);
	const [pokemonData, setData] = useState([]);

	console.log(pokemon);
	useEffect(() => {
		fetchPokemon();
		async function fetchPokemon() {
			const URL = "https://pokeapi.co/api/v2/pokemon";
			const res = await fetch(URL);
			const data = await res.json();
			const result = data.results;
			setPokemon(result);
		}
	}, []);
	useEffect(() => {
		async function fetchAllPokemonData() {
			for (let i = 0; i < pokemon.length; i++) {
				const res = await fetch(pokemon[i].url);
				const data = await res.json();
				setData((prev) => [...prev, data]);
			}
		}
		fetchAllPokemonData();
	}, [pokemon]);

	return (
		<>
			<nav>
				<p>PokeDB</p>
				<div className="searchfield">
					<input type="text" />
					<button type="button">Search</button>
				</div>
			</nav>
			<div className="pokecontainer">
				{pokemonData.map((pokemon) => (
					<div className="card" key={pokemon.id}>
						<img src={pokemon.sprites.front_default} alt={pokemon.name} />
						<p>{pokemon.name}</p>
					</div>
				))}
			</div>
		</>
	);
}

export default App;
