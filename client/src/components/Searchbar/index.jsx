import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchDriver } from "../../redux/action/index";
import '../Searchbar/search.css'


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


  return (
    <div>
      <form onSubmit={handleSubmit} className='search'>
        <div className='inputbox'>
        <input
          type="search"
          onChange={handleChange}
          placeholder='Write a driver name here!'
        />
        </div>
        <button
        className='button'
          onClick={handleSubmit}
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
}