import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import PokeContainer from "./PokeContainer";
import Pagination from "./Pagination";
import Loader from "./Loader";

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
	const [filter, setFilter] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [disableReset, setDisableReset] = useState(true);
	const [totalCount, setTotalCount] = useState(0);
	const [cardCount, setCardCount] = useState(0);

	useEffect(() => {
		if (pokemonData.length > 0) {
			const pokeCount = pokemonData.length;
			setCardCount(pokeCount);
		}
		if (cardCount < totalCount - 1) {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [pokemonData, totalCount, cardCount]);

	useEffect(() => {
		async function fetchPokemon() {
			let url = URL;
			if (filter) {
				url = "https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0";
			}
			const res = await fetch(url);
			const data = await res.json();
			const result = data.results;
			setPokemon(result);
			setNext(data.next);
			setPrev(data.previous);
		}
		fetchPokemon();
	}, [URL, filter]);

	useEffect(() => {
		async function fetchCount() {
			const res = await fetch(`https://pokeapi.co/api/v2/type/${filter}`);
			const data = await res.json();
			const pokemonCount = data?.pokemon?.length;
			setTotalCount(pokemonCount);
		}
		fetchCount();
	}, [filter]);

	useEffect(() => {
		async function fetchAllPokemonData() {
			setIsLoading(true);
			let fetchedData = [];
			if (search) {
				const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
				const data = await res.json();
				fetchedData = [data];
			} else {
				for (let i = 0; i < pokemon.length; i++) {
					const res = await fetch(pokemon[i].url);
					const data = await res.json();
					fetchedData.push(data);
				}
			}
			if (filter) {
				fetchedData = fetchedData.filter((item) =>
					item.types.some((type) => type.type.name === filter)
				);
			}
			setData(fetchedData);
		}
		fetchAllPokemonData();
	}, [pokemon, search, filter]);

	const handleClick = (searchTerm) => {
		setSearch(searchTerm);
		setData([]);
		setDisableReset(false);
	};

	const handleFilter = (type) => {
		setFilter(type);
		setData([]);
		setDisableReset(false);
	};

	const Reset = () => {
		if (filter) {
			setPokemon([]);
		}
		setSearch("");
		setFilter("");
		setData([]);
		setDisableReset(true);
		setURL("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0");
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
			{!search && pokemonData.length < cardCount && <Loader />}
			<NavBar
				handleClick={handleClick}
				Reset={Reset}
				handleFilter={handleFilter}
				disableReset={disableReset}
				isLoading={isLoading}
			/>
			<PokeContainer pokemonData={pokemonData} isLoading={isLoading} />
			<Pagination
				pokemonData={pokemonData}
				nextPage={nextPage}
				prevPage={prevPage}
				count={count}
				filter={filter}
			/>
		</div>
	);
}
