import { Link } from "react-router-dom";

export default function SecondaryNavBar({ title }) {
	return (
		<nav className="secondarynav">
			<Link to="/">
				<button className="sn-home sn-btn">Home</button>
			</Link>
			<p>{title}</p>
			<Link to="/favorites">
				<button className="sn-fav sn-btn">Favorites</button>
			</Link>
		</nav>
	);
}
