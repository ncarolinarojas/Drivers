import { useState } from "react";
import { useDispatch } from "react-redux";
import { restart, searchDriver } from "../../redux/action/index";


export default function SearchBar({ onSearch }) {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchDriver(input));
  };

  const reset = (event) => {
    dispatch(restart());
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          onChange={handleChange}
        />
        <button
          onClick={handleSubmit}
          type="submit"
        >
          Search
        </button>

        <button onClick={reset}>
          Restart
        </button>
      </form>
    </div>
  );
}