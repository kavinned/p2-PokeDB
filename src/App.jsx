import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [pokemon, setPokemon] = useState([]);
	const [pokemonData, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [URL, setURL] = useState(
		"https://pokeapi.co/api/v2/pokemon?limit=9&offset=0"
	);
	const [prevURL, setPrev] = useState("");
	const [nextURL, setNext] = useState("");
	const [count, setCount] = useState(1);

	useEffect(() => {
		fetchPokemon();
		async function fetchPokemon() {
			const res = await fetch(URL);
			const data = await res.json();
			const result = data.results;
			setPokemon(result);
			setNext(data.next);
			setPrev(data.previous);
			setLoading(true);
			setTimeout(() => {
				setLoading(false);
			}, 3000);
		}
	}, [URL]);
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

	const nextPage = () => {
		setURL(nextURL);
		setPokemon([]);
		setData([]);
		setCount(count + 1);
	};

	const prevPage = () => {
		setURL(prevURL);
		setPokemon([]);
		setData([]);
		setCount(count - 1);
	};

	return (
		<div className="container">
			<nav>
				<p>PokéDB</p>
				<div className="searchfield">
					<input className="search" type="text" />
					<button className="search" type="button">
						Search
					</button>
				</div>
			</nav>

			<div className="pokecontainer">
				{loading && (
					<div className="loader-container">
						<div className="loader"></div>
					</div>
				)}
				{!loading &&
					pokemonData.map((pokemon) => (
						<div className="card" key={pokemon.id}>
							<img
								src={pokemon.sprites.front_default}
								alt={pokemon.name}
								loading="lazy"
							/>
							<p>
								{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
							</p>
						</div>
					))}
			</div>
			{!loading && pokemonData.length > 0 && (
				<div className="pagination">
					<button className="prev" onClick={prevPage}>
						Previous Page
					</button>
					<h4 className="count">PAGE {count}</h4>
					<button className="next" onClick={nextPage}>
						Next Page
					</button>
				</div>
			)}
		</div>
	);
}

export default App;
