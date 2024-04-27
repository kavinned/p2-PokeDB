import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar({
	handleClick,
	reset,
	handleFilter,
	disableReset,
	isLoading,
}) {
	const [input, setInput] = useState("");
	const [selected, setSelected] = useState("select an option");
	const [disableSearch, setDisableSearch] = useState(true);
	const [types, setTypes] = useState([]);

	useEffect(() => {
		async function fetchTypes() {
			const res = await fetch("https://pokeapi.co/api/v2/type");
			const data = await res.json();
			const types = data.results;
			setTypes(types.slice(0, -2));
		}
		fetchTypes();
	}, []);

	const handleSearch = (event) => {
		const value = event.target.value;
		const lowerCaseValue = value.toLowerCase();
		lowerCaseValue ? setDisableSearch(false) : setDisableSearch(true);
		setInput(lowerCaseValue);
	};

	const handleSubmit = () => {
		handleClick(input);
	};

	const handleChange = (event) => {
		const type = event.target.value;
		setSelected(type);
		handleFilter(type);
	};

	const handleReset = () => {
		reset();
		setInput("");
		setSelected("select an option");
	};

	return (
		<nav className="mainnav">
			<Link to="/home/1">
				<p>PokéDB</p>
			</Link>
			<div className="searchfield">
				<input
					required
					name="search-field"
					value={input}
					className="search"
					type="search"
					onChange={handleSearch}
					onKeyDown={(event) => {
						if (event.key === "Enter") {
							handleSubmit();
						}
					}}
				/>
				<button
					disabled={isLoading || disableSearch}
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
					onClick={handleReset}
				>
					Reset
				</button>
				<span
					style={{ borderRight: "3px solid rgba(0,0,0,0.5)", height: "20px" }}
				></span>
				<label htmlFor="type-filter">Filter by Type:</label>
				<select
					onChange={handleChange}
					name="filter"
					id="type-filter"
					value={selected}
					disabled={isLoading}
				>
					<option disabled value={null}>
						select an option
					</option>
					{types.map((type) => (
						<option key={type.name} value={type.name}>
							{type.name}
						</option>
					))}
				</select>
			</div>
			<Link to="/favorites">
				<button disabled={isLoading} className="fav-btn">
					Favorites
				</button>
			</Link>
		</nav>
	);
}
