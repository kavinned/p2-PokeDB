export default function Pagination({
	pokemonData,
	prevPage,
	nextPage,
	count,
	filter,
}) {
	return (
		pokemonData.length > 8 && (
			<div className="pagination">
				<button disabled={filter} className="prev" onClick={prevPage}>
					Previous Page
				</button>
				<h4 className="count">{filter ? `END OF RESULTS` : `PAGE ${count}`}</h4>
				<button disabled={filter} className="next" onClick={nextPage}>
					Next Page
				</button>
			</div>
		)
	);
}
