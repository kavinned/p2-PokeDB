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
			const count = document.querySelectorAll(".card").length;
			setCardCount(count);
			if (count === totalCount || pokemonData === 1) {
				return;
			}
			if (count <= totalCount - 1) {
				console.log(count);
				console.log("LESS THAN COUNT");
				setIsLoading(true);
			} else {
				setIsLoading(false);
				return;
			}
		}
	}, [pokemonData, totalCount]);

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
			if (search) {
				const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
				const data = await res.json();
				setData([data]);
			} else {
				for (let i = 0; i < pokemon.length; i++) {
					const res = await fetch(pokemon[i].url);
					const data = await res.json();
					setData((prev) => [...prev, data]);
					if (filter) {
						setData((data) =>
							data.filter((item) =>
								item.types.some((type) => type.type.name === filter)
							)
						);
					}
				}
			}
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
		cardCount < 9 && setIsLoading(true);
	};

	const prevPage = () => {
		setURL(prevURL);
		setPokemon([]);
		setData([]);
		setCount(count - 1);
	};

	return (
		<div className="container">
			{!search && pokemonData.length < 9 && <Loader />}
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
			{isLoading && <Loader />}
		</div>
	);
}
