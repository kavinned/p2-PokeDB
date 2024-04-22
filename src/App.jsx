import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [pokemon, setPokemon] = useState([]);
	const [pokemonData, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchPokemon();
		async function fetchPokemon() {
			const URL = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
			const res = await fetch(URL);
			const data = await res.json();
			const result = data.results;
			setLoading(true);
			setTimeout(() => {
				setPokemon(result);
				setLoading(false);
			}, 5000);
		}
	}, []);
	useEffect(() => {
		async function fetchAllPokemonData() {
			for (let i = 0; i < pokemon.length; i++) {
				const res = await fetch(pokemon[i].url);
				const data = await res.json();
				console.log(data);
				setData((prev) => [...prev, data]);
			}
		}
		fetchAllPokemonData();
	}, [pokemon]);

	return (
		<div className="container">
			<nav>
				<p>PokeDB</p>
				<div className="searchfield">
					<input type="text" />
					<button type="button">Search</button>
				</div>
			</nav>

			<div className="pokecontainer">
				{loading && <div className="loader"></div>}
				{pokemonData.map((pokemon) => (
					<div className="card" key={pokemon.id}>
						<img src={pokemon.sprites.front_default} alt={pokemon.name} />
						<p>{pokemon.name}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
