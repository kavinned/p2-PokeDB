import { Link } from "react-router-dom";

export default function FavCard({ favorite, handleDelete }) {
	async function deleteFavorite() {
		const url = `https://api.airtable.com/v0/appSk5cmn3M9kchEe/tbl5JNznTkKDnZFMT/${favorite.id}`;
		const options = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization:
					"Bearer patguYBloFNALqIbK.8ffe2ff9c2968ed3db810f476026d7d5e09272b5a1f5c224bd3213110a7e7c06",
			},
		};
		await fetch(url, options);
		handleDelete(favorite.id);
	}

	return (
		<div className="card fav-card">
			<span className="fav-details">
				<Link to={`/pokemon/${favorite.fields.name}`}>
					<img
						className="pokemon-img"
						height="150px"
						src={favorite.fields.sprite}
						alt={favorite.fields.name}
						loading="lazy"
					/>
				</Link>
				<h2 className="addFavName">{favorite.fields.name}</h2>
				<p>Type: {favorite.fields.type}</p>
			</span>
			<button onClick={() => deleteFavorite()} className="del-btn">
				Delete
			</button>
		</div>
	);
}
