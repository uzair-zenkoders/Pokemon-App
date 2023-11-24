import React from "react";
import { Link } from "next/link";
import { useRouter } from "next/router";

const Card = (props) => {
  const { id, title, url } = props;
  const router = useRouter();

  const onClick = () => {
    console.log(props.url);
    router.push(`/pokemon/${id}/`);
    console.log(id);
    // window.open(url);
  };

  return (
    <div>
      <div id="card" className="card my-3">
        <img
          src="https://www.freepnglogos.com/uploads/pokemon-symbol-logo-png-31.png"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">
            Pokemon Title: <span style={{ color: "red" }}>{title}</span>
          </h5>
          <button
            type="button"
            className="btn btn-primary my-3 "
            onClick={onClick}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
