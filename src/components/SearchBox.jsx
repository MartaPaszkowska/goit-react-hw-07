import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/filtersSlice";
import css from "../css/SearchBox.module.css";

export default function SearchBox() {
	const dispatch = useDispatch();
	const filter = useSelector((state) => state.filters.name);

	return (
		<div className={css.sContainer}>
			<label>Find contacts by name:</label>
			<input
				type="text"
				value={filter}
				onChange={(e) => dispatch(setFilter(e.target.value))}
			/>
		</div>
	);
}
