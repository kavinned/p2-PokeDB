import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [pokemon, setPokemon] = useState([{}]);
	const [pokemonImg, setImg] = useState("");
	useEffect(() => {
		async function fetchAPI() {
			const currPokemon = "monferno";
			const res = await fetch(
				`https://pokeapi.co/api/v2/pokemon/${currPokemon}`
			);
			const data = await res.json();
			console.log([data]);
			setPokemon([data]);
			setImg(data.sprites.front_default);
		}
		fetchAPI();
	}, []);

	console.log(pokemon);
	console.log(pokemonImg);
	// useEffect(() => {
	// 	async function fetchAPI() {
	// 		const res = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
	// 		const data = await res.json();
	// 		console.log(data);
	// 		setPokemon(data);
	// 	}
	// 	fetchAPI();
	// }, []);
	// console.log(pokemonImg);
	// console.log(pokemon);

	// return (
	// 	<div>
	// 		{pokemon.map((pokemon) => (
	// 			<div key={pokemon.name}>
	// 				<h1>{pokemon.name}</h1>
	// 				<img src="" alt="" />
	// 			</div>
	// 		))}
	// 	</div>
	// );

	return (
		<>
			<h1>Hello</h1>
			<div>
				{pokemon.map((mon) => (
					<div key={pokemon.order}>
						<p>{mon.name}</p>
						<img src={pokemonImg} alt={mon.name} />
					</div>
				))}
			</div>
		</>
	);
}

export default App;
