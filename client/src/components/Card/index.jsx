import React from "react";
import { Link } from "react-router-dom";
import '../Card/card.css'

const Card = (props) => {
  return (
    <Link to={`/details/${props.id}`}>
      <div className='container-card'>
        <h2>
          {props.forename} {props.surname}
        </h2>
        <img
          className='img'
          src={props?.image}
          alt={props.forename}
        />
        <h3>Teams:</h3>
        <h4>{props.teams}</h4>
      </div>
    </Link>
  );
};

export default Card;