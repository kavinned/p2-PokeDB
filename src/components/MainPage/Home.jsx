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
	const [totalCount, setTotalCount] = useState(0);
	const [searchError, setSearchError] = useState("");

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
			if (!search && !filter) {
				setData(pokemonInfo);
			}
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

		async function searchPokemon() {
			if (search !== "") {
				const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
				if (res.ok) {
					const data = await res.json();
					setData([data]);
					setSearchError("");
				} else {
					setSearchError("There is no such Pokémon");
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
			{!search && !filter && pokemonData.length < 9 && <Loader />}
			{filter && pokemonData.length < totalCount && <Loader />}
			<NavBar
				handleClick={handleClick}
				Reset={Reset}
				handleFilter={handleFilter}
				disableReset={disableReset}
			/>
			{searchError && (
				<div className="error-msg">
					<h1>{searchError}</h1>
				</div>
			)}
			<PokeContainer pokemonData={pokemonData} />
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
