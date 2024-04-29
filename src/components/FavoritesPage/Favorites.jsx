import { useEffect, useState } from "react";
import SecondaryNavBar from "../SecondaryNavBar";
import FavCard from "./FavCard";

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

	async function handleDelete(deletedFavorite) {
		setFavorites(
			favorites.filter((favorite) => favorite.id !== deletedFavorite)
		);
	}

	return (
		<div className="favorite-container">
			<SecondaryNavBar title="Favorites" />
			<div className="favorites">
				{favorites.map((favorite) => (
					<FavCard
						favorite={favorite}
						key={favorite.id}
						handleDelete={handleDelete}
					/>
				))}
			</div>
		</div>
	);
}
