import React from "react";
import Card from '../Card/index';
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Pagination } from '../Paginate/index';
import { orderCards, filterCards } from '../../redux/action';
import '../Cards/cards.css';
import image from '../../assets/DriverNotFound.png'

const Cards = () => {
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.drivers);
  const totalDrivers = drivers.length;

  const allTeams = useSelector((state) => state.allTeams);

  const [driversPerPage, setDriversPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * driversPerPage;
  const firstIndex = lastIndex - driversPerPage;

  const handleOrder = (event) => {
    dispatch(orderCards(event.target.value));
    setCurrentPage(1);
  };

  const filterByTeam = (event) => {
    dispatch(filterCards(event.target.value));
    setCurrentPage(1);
  };

  return (
    <>
      <div>
        <label>Order: </label>
        <select name="driversOrder" onChange={handleOrder}>
          <option value="none">None</option>
          <option value="ascendant">LasName: Ascendant</option>
          <option value="decendent">LasName: Decendent</option>
          <option value="younger">Age: Younger</option>
          <option value="older">Age: Older</option>
        </select>
      </div>

      <div>
        <label>Filter: </label>
        <select name="driversFilter" onChange={filterByTeam}>
          <option value="allDrivers">All drivers</option>
          <option value="bdd">drivers created</option>
          <option value="api">API drivers</option>
          {allTeams.map((team) => (
            <option key={team.id} value={team.teamName}>
              {team.teamName}
            </option>
          ))}
        </select>
      </div>

      <div className='general'>
        {drivers
          .map((driver) => {
            return (
              <Card
                key={driver.id}
                id={driver.id}
                forename={driver.forename}
                surname={driver.surname}
                image={driver.image? driver.image : image }
                nationality={driver.nationality}
                dob={driver.dob}
                description={driver.description}
                teams={driver.teams}
              />
            );
          })
          .slice(firstIndex, lastIndex)}
      </div>
      <div>
        <Pagination
          driversPerPage={driversPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalDrivers={totalDrivers}
        />
      </div>
    </>
  );
};

export default Cards;