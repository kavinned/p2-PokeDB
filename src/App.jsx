import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/MainPage/Home";
import PokeDetails from "./components/PokeDetailsPage/PokeDetails";
import Favorites from "./components/FavoritesPage/Favorites.jsx";

function App() {
	return (
		<Routes>
			<Route index element={<Navigate to="/home/1" replace />} />
			<Route path="/home/1" element={<Home />} />
			<Route path="/pokemon/:name" element={<PokeDetails />} />
			<Route path="/favorites" element={<Favorites />} />
			<Route path="/home/filter/:pokeType" element={<Home />} />
			<Route path="/home/search/:searchedPokemon" element={<Home />} />
			<Route path="/home/:pageNum" element={<Home />} />
		</Routes>
	);
}

export default App;
