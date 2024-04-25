import { Link } from "react-router-dom";

export default function SecondaryNavBar() {
	return (
		<nav className="secondarynav">
			<Link to="/">
				<button className="sn-home sn-btn">Home</button>
			</Link>
			<Link to="/">
				<p>PokéDB</p>
			</Link>
			<Link to="/favorites">
				<button className="sn-fav sn-btn">Favorites</button>
			</Link>
		</nav>
	);
}
