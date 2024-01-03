import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <Link to={`/details/${props.id}`}>
      <div>
        <h2>
          {props.forename} {props.surname}
        </h2>
        <img
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