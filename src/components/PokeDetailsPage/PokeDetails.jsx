import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

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

	return (
		<div className="detail-container">
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
				</>
			)}
		</div>
	);
}
