export default function Pagination({ pokemonData, prevPage, nextPage, count }) {
	return (
		pokemonData.length > 8 && (
			<div className="pagination">
				<button className="prev" onClick={prevPage}>
					Previous Page
				</button>
				<h4 className="count">PAGE {count}</h4>
				<button className="next" onClick={nextPage}>
					Next Page
				</button>
			</div>
		)
	);
}
