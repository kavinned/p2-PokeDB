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
	const [disableReset, setDisableReset] = useState(true);
	const [searchError, setSearchError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchPokemon() {
			setIsLoading(true);
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
			setIsLoading(false);
			if (!search && !filter) {
				setData(pokemonInfo);
			}
		}
		fetchPokemon();

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
			!search && setData(pokemonInfo);
		}
		fetchPokemonByType(filter);

		async function searchPokemon() {
			if (search !== "") {
				const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
				if (res.ok) {
					const data = await res.json();
					setData([data]);
					setSearchError("");
				} else {
					setSearchError("There is no such Pokémon");
					setIsLoading(false);
				}
			}
		}
		searchPokemon();
	}, [URL, filter, search]);
	useEffect(() => {}, [search]);

	const handleClick = (searchTerm) => {
		setSearch(searchTerm);
		setData([]);
		setDisableReset(false);
	};

	const handleFilter = (type) => {
		setFilter(type);
		setSearch("");
		setData([]);
		setDisableReset(false);
	};

	const Reset = () => {
		setSearch("");
		setFilter("");
		setData([]);
		setSearchError("");
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
			{isLoading && <Loader />}
			<NavBar
				handleClick={handleClick}
				Reset={Reset}
				handleFilter={handleFilter}
				disableReset={disableReset}
				isLoading={isLoading}
			/>
			{searchError && (
				<div className="error-msg">
					<h1>{searchError}</h1>
				</div>
			)}
			{!isLoading && <PokeContainer pokemonData={pokemonData} />}
			{!isLoading && (
				<Pagination
					pokemonData={pokemonData}
					nextPage={nextPage}
					prevPage={prevPage}
					count={count}
					filter={filter}
				/>
			)}
		</div>
	);
}
