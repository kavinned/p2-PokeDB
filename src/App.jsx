import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [pokemon, setPokemon] = useState([]);
	const [pokemonData, setData] = useState([]);
	console.log(pokemon);
	useEffect(() => {
		fetchPokemon();
		async function fetchPokemon() {
			const URL = "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20";
			const res = await fetch(URL);
			const data = await res.json();
			const result = data.results;
			setPokemon(result);
		}
	}, []);
	useEffect(() => {
		async function fetchAllPokemonData() {
			let allPokemonData = [];
			for (let i = 0; i < pokemon.length; i++) {
				const data = await fetchPokemonData(pokemon[i].url);
				allPokemonData.push(data);
			}
			setData(allPokemonData);
		}
		fetchAllPokemonData();
		async function fetchPokemonData(url) {
			const res = await fetch(url);
			const data = await res.json();
			console.log(data);
			return data;
		}
	}, [pokemon]);

	return (
		<div>
			{pokemonData.map((pokemon) => (
				<div key={pokemon.id}>
					<img src={pokemon.sprites.front_default} alt={pokemon.name} />
					<p>{pokemon.name}</p>
				</div>
			))}
		</div>
	);
}

export default App;
