import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import PokeContainer from "./PokeContainer";
import Pagination from "./Pagination";
import Loader from "./Loader";

export default function Home() {
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

			setNext(data.next);
			setPrev(data.previous);
			const pokemonInfo = await Promise.all(
				result.map(async (pokemon) => {
					const res = await fetch(
						`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
					);
					return res.json();
				})
			);
			setData(pokemonInfo);
		}
		fetchPokemon();

		async function fetchCount() {
			const res = await fetch(`https://pokeapi.co/api/v2/type/${filter}`);
			const data = await res.json();
			const pokemonCount = data?.pokemon?.length;
			setTotalCount(pokemonCount);
		}
		fetchCount();

		async function fetchPokemonByType(type) {
			setData([]);
			const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
			const data = await res.json();
			const pokemonList =
				data.pokemon?.map((pokemon) => pokemon.pokemon.name) || [];
			const pokemonInfo = await Promise.all(
				pokemonList.map(async (name) => {
					const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
					return res.json();
				})
			);
			setData(pokemonInfo);
		}
		fetchPokemonByType(filter);
	}, [URL, filter]);
	useEffect(() => {
		async function searchPokemon() {
			setIsLoading(true);
			let fetchedData = [];
			if (search) {
				setIsLoading(true);
				const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
				const data = await res.json();
				fetchedData = [data];
			}
			setData(fetchedData);
			setIsLoading(false);
		}
		searchPokemon();
	}, [search]);

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
		setSearch("");
		setFilter("");
		setData([]);
		setDisableReset(true);
	};

	const nextPage = () => {
		setURL(nextURL);

		setData([]);
		setCount(count + 1);
	};

	const prevPage = () => {
		setURL(prevURL);

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
