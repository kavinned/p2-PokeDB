import { useState } from "react";

export default function NavBar({
	handleClick,
	Reset,
	handleFilter,
	isLoading,
	disableReset,
}) {
	const [input, setInput] = useState("");

	const handleSearch = (event) => {
		const value = event.target.value;
		const lowerCaseValue = value.toLowerCase();
		setInput(lowerCaseValue);
	};

	const handleSubmit = () => {
		handleClick(input);
	};

	const handleChange = (event) => {
		const type = event.target.value;
		handleFilter(type);
	};

	return (
		<nav>
			<p>PokéDB</p>
			<div className="searchfield">
				<input
					value={input}
					className="search"
					type="text"
					onChange={handleSearch}
					onKeyDown={(event) => {
						if (event.key === "Enter") {
							handleSubmit();
						}
					}}
					disabled={isLoading}
				/>
				<button
					disabled={isLoading}
					className="search"
					type="button"
					onClick={handleSubmit}
				>
					Search
				</button>
				<span
					style={{ borderLeft: "3px solid rgba(0,0,0,0.5)", height: "20px" }}
				></span>
				<button
					disabled={isLoading || disableReset}
					className="reset"
					onClick={Reset}
				>
					Reset
				</button>
				<span
					style={{ borderRight: "3px solid rgba(0,0,0,0.5)", height: "20px" }}
				></span>
				<label htmlFor="filter">Filter by Type:</label>
				<select
					disabled={isLoading}
					defaultValue="select an option"
					onChange={handleChange}
					name="filter"
					id="type-filter"
				>
					<option disabled value={null}>
						select an option
					</option>
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
