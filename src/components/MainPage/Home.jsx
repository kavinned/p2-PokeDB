import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import PokeContainer from "./PokeContainer";
import Pagination from "./Pagination";
import Loader from "./Loader";
import { useNavigate, useParams } from "react-router-dom";

export default function Home() {
	const [pokemonData, setData] = useState([]);
	const [URL, setURL] = useState(
		"https://pokeapi.co/api/v2/pokemon?limit=9&offset=0"
	);
	const [prevURL, setPrev] = useState("");
	const [nextURL, setNext] = useState("");
	const [count, setCount] = useState(1);
	const [disableReset, setDisableReset] = useState(true);
	const [searchError, setSearchError] = useState("");
	const [isLoading, setIsLoading] = useState();

	const navigate = useNavigate();

	const { pokeType } = useParams();
	const { searchedPokemon } = useParams();

	useEffect(() => {
		(searchedPokemon || pokeType) && setDisableReset(false);
	}, [searchedPokemon, pokeType]);

	useEffect(() => {
		async function fetchPokemon() {
			setIsLoading(true);
			let url = "";

			if (pokeType) {
				url = `https://pokeapi.co/api/v2/type/${pokeType}`;
			} else {
				url = URL;
			}

			const res = await fetch(url);
			const data = await res.json();
			let result = "";

			if (pokeType) {
				result = data.pokemon.map((pokemon) => pokemon.pokemon);
			} else {
				result = data.results;
			}

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
			if (!searchedPokemon) {
				setData(pokemonInfo);
			}
			setIsLoading(false);
		}
		fetchPokemon();

		async function searchPokemon() {
			setIsLoading(true);
			if (searchedPokemon) {
				const res = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${searchedPokemon}`
				);
				if (res.ok) {
					const data = await res.json();
					setData([data]);
					setSearchError("");
				} else {
					setSearchError("There is no such Pokémon");
				}
				setIsLoading(false);
			}
		}
		searchPokemon();
	}, [URL, pokeType, searchedPokemon]);

	const handleClick = (searchTerm) => {
		setData([]);
		setDisableReset(false);
		setIsLoading(false);
		navigate(`/home/search/${searchTerm}`);
	};

	const handleFilter = (type) => {
		setData([]);
		setDisableReset(false);
		setIsLoading(false);
		navigate(`/home/filter/${type}`);
	};

	const Reset = () => {
		setData([]);
		setSearchError("");
		setDisableReset(true);
		navigate("/home");
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
					filter={pokeType}
				/>
			)}
		</div>
	);
}
