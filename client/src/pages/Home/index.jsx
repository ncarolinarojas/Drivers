import Cards from "../../components/Cards";
import SearchBar from "../../components/Searchbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDrivers, getTeams } from '../../redux/action/index';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDrivers());
    dispatch(getTeams());
  }, []);


  return (
    <>
      <div>
        <SearchBar />
      </div>

      <div>
        <Cards />
      </div>
    </>
  );
};

export default Home;