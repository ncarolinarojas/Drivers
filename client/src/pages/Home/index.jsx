import Cards from "../../components/Cards";

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

      </div>

      <div>
        <Cards />
      </div>
    </>
  );
};

export default Home;