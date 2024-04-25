import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import SecondaryNavBar from "../SecondaryNavBar";

export default function PokeDetails() {
	const { name } = useParams();
	const [pokemon, setPokemon] = useState([]);

	useEffect(() => {
		async function fetchPokemon() {
			const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
			const data = await res?.json();
			setPokemon(data);
		}
		fetchPokemon();
	}, [name]);

	async function setFavorites() {
		const url =
			"https://api.airtable.com/v0/appSk5cmn3M9kchEe/tbl5JNznTkKDnZFMT";
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization:
					"Bearer patguYBloFNALqIbK.8ffe2ff9c2968ed3db810f476026d7d5e09272b5a1f5c224bd3213110a7e7c06",
			},
			body: JSON.stringify({
				fields: {
					name: pokemon.name,
					type: pokemon.types.map((type) => type.type.name).join(" / "),
					sprite: pokemon?.sprites?.other["official-artwork"]?.front_default,
				},
			}),
		};

		const response = await fetch(url, options);
		const data = await response.json();
		console.log(data);
	}

	return (
		<div className="detail-container">
			<SecondaryNavBar />
			<div className="details">
				{pokemon?.length < 1 ? (
					<div className="loader2"></div>
				) : (
					<>
						<h1>{pokemon.name}</h1>
						<img
							height="200px"
							src={pokemon?.sprites?.other["official-artwork"].front_default}
							alt={pokemon.name}
						/>
						<div className="info">
							<fieldset className="types">
								<legend>Types</legend>
								<ul>
									{pokemon.types?.map((type) => (
										<li key={type.type.name}>{type.type.name}</li>
									))}
								</ul>
							</fieldset>
							<fieldset className="abilities">
								<legend>Abilities</legend>
								<ul>
									{pokemon.abilities?.map((ability) => (
										<li key={ability.ability.name}>{ability.ability.name}</li>
									))}
								</ul>
							</fieldset>
							<fieldset className="stats">
								<legend>Stats</legend>
								<ul>
									{pokemon.stats?.map((stat) => (
										<li key={stat.stat.name}>
											{stat.stat.name}: {stat.base_stat}
										</li>
									))}
								</ul>
							</fieldset>
						</div>
						<button onClick={setFavorites}>Add to Favorites</button>
					</>
				)}
			</div>
		</div>
	);
}
