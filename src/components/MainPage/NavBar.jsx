export default function NavBar() {
	return (
		<nav>
			<p>PokéDB</p>
			<div className="searchfield">
				<input className="search" type="text" />
				<button className="search" type="button">
					Search
				</button>
				<span
					style={{ borderLeft: "3px solid rgba(0,0,0,0.5)", height: "20px" }}
				></span>
				<label htmlFor="filter">Filter by Type:</label>
				<select name="filter" id="type-filter">
					<option value="rock">Rock</option>
					<option value="grass">Grass</option>
					<option value="normal">Normal</option>
					<option value="fire">Fire</option>
					<option value="water">Water</option>
					<option value="electric">Electric</option>
					<option value="ice">Ice</option>
					<option value="fighting">Fighting</option>
					<option value="poison">Poison</option>
					<option value="flying">Flying</option>
					<option value="psychic">Psychic</option>
					<option value="bug">Bug</option>
					<option value="ghost">Ghost</option>
					<option value="dragon">Dragon</option>
					<option value="dark">Dark</option>
					<option value="steel">Steel</option>
					<option value="fairy">Fairy</option>
				</select>
			</div>
			<button className="fav-btn">Favorites</button>
		</nav>
	);
}
