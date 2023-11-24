import React from "react";

const DetailsCard = (props) => {
  const cardStyle = {
    width: "18rem",
    margin: "100px auto", // Adjust margin top as needed
    textAlign: "center",
    backgroundColor: "green",
  };

  return (
    <div className="card" style={cardStyle}>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Pokemon Id : {props.id}</li>
        <li className="list-group-item">
          Base Experience : {props.baseExperience}
        </li>
        <li className="list-group-item">Height: {props.height}</li>
        <li className="list-group-item">Weight: {props.weight}</li>
        <li className="list-group-item">Moves: {props.moves}</li>
        <li className="list-group-item">Order: {props.order}</li>
      </ul>
    </div>
  );
};

export default DetailsCard;
