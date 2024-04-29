import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import PokeContainer from "./PokeContainer";
import Pagination from "./Pagination";
import Loader from "./Loader";
import { useNavigate, useParams } from "react-router-dom";

export default function Home() {
	const [pokemonData, setData] = useState([]);
	const [count, setCount] = useState(1);
	const [disableReset, setDisableReset] = useState(true);
	const [searchError, setSearchError] = useState("");
	const [isLoading, setIsLoading] = useState();
	const [offset, setOffset] = useState(0);

	const navigate = useNavigate();

	const { pokeType } = useParams();
	const { searchedPokemon } = useParams();
	const { pageNum } = useParams();

	useEffect(() => {
		(searchedPokemon || pokeType) && setDisableReset(false);
	}, [searchedPokemon, pokeType]);

	useEffect(() => {
		if (pageNum > 1) {
			setCount(parseInt(pageNum));
		} else if (pageNum === 1) {
			setCount(1);
		}
		async function fetchPokemon() {
			setIsLoading(true);
			let url = "";

			if (pokeType) {
				url = `https://pokeapi.co/api/v2/type/${pokeType}`;
			} else {
				url = `https://pokeapi.co/api/v2/pokemon?limit=9&offset=${
					(pageNum - 1) * 9
				}`;
			}

			const res = await fetch(url);
			const data = await res.json();
			let result = "";

			if (pokeType) {
				result = data.pokemon.map((pokemon) => pokemon.pokemon);
			} else {
				result = data.results;
			}

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
	}, [offset, pokeType, searchedPokemon, pageNum, count]);

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

	const reset = () => {
		setData([]);
		setSearchError("");
		setDisableReset(true);
		navigate("/home/1");
	};

	const nextPage = () => {
		setOffset(offset + 9);
		setData([]);
		setCount(count - 1);
		navigate(`/home/${count + 1}`);
	};

	const prevPage = () => {
		setOffset(offset - 9);
		setData([]);
		setCount(count - 1);
		navigate(`/home/${count - 1}`);
	};

	return (
		<div className="container">
			{isLoading && <Loader />}
			<NavBar
				handleClick={handleClick}
				reset={reset}
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
