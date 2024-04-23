import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import PokeContainer from "./PokeContainer";
import Pagination from "./Pagination";

export default function Home() {
	const [pokemon, setPokemon] = useState([]);
	const [pokemonData, setData] = useState([]);
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
			<NavBar />
			<PokeContainer pokemonData={pokemonData} />
			<Pagination
				pokemonData={pokemonData}
				nextPage={nextPage}
				prevPage={prevPage}
				count={count}
			/>
		</div>
	);
}
