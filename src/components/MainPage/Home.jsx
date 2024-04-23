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
	const [search, setSearch] = useState("");
	const [initData, setInit] = useState([]);
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
			if (search) {
				const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
				const data = await res.json();
				setData([]);
				setData([data]);
			} else {
				for (let i = 0; i < pokemon.length; i++) {
					const res = await fetch(pokemon[i].url);
					const data = await res.json();
					setData((prev) => [...prev, data]);
					setInit((prev) => [...prev, data]);
				}
			}
		}
		fetchAllPokemonData();
	}, [pokemon, search]);

	console.log(pokemonData);

	const handleClick = (searchTerm) => {
		setSearch(searchTerm);
		setData([]);
	};

	const Reset = () => {
		setSearch("");
		setData(initData);
	};

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
			<NavBar handleClick={handleClick} Reset={Reset} />
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
