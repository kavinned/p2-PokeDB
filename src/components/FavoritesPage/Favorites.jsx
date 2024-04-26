import { useEffect, useState } from "react";
import SecondaryNavBar from "../SecondaryNavBar";
import { Link } from "react-router-dom";

export default function Favorites() {
	const [favorites, setFavorites] = useState([]);
	useEffect(() => {
		async function fetchFavorites() {
			const url =
				"https://api.airtable.com/v0/appSk5cmn3M9kchEe/tbl5JNznTkKDnZFMT";
			const options = {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization:
						"Bearer patguYBloFNALqIbK.8ffe2ff9c2968ed3db810f476026d7d5e09272b5a1f5c224bd3213110a7e7c06",
				},
			};
			const res = await fetch(url, options);
			const data = await res.json();
			const records = data.records;
			setFavorites(records);
		}
		fetchFavorites();
	}, []);

	async function handleDelete(favitem) {
		const url = `https://api.airtable.com/v0/appSk5cmn3M9kchEe/tbl5JNznTkKDnZFMT/${favitem.id}`;
		const options = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization:
					"Bearer patguYBloFNALqIbK.8ffe2ff9c2968ed3db810f476026d7d5e09272b5a1f5c224bd3213110a7e7c06",
			},
		};
		await fetch(url, options);
		setFavorites(favorites.filter((favorite) => favorite.id !== favitem.id));
	}

	return (
		<div className="favorite-container">
			<SecondaryNavBar title="Favorites" />
			<div className="favorites">
				{favorites.map((favorite) => (
					<div className="card fav-card" key={favorite.id}>
						<span>
							<Link to={`/pokemon/${favorite.fields.name}`}>
								<img
									className="pokemon-img"
									height="150px"
									src={favorite.fields.sprite}
									alt={favorite.fields.name}
								/>
							</Link>
							<h2>{favorite.fields.name}</h2>
							<p>Type: {favorite.fields.type}</p>
						</span>
						<button onClick={() => handleDelete(favorite)} className="del-btn">
							Delete
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
