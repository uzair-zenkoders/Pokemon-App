// import { useRouter } from "next/router";
import DetailsCard from "@/components/DetailsCard";
import axios from "axios";
import React from "react";

const detailsPage = (props) => {
  console.log(props);
  return (
    <>
      <h1 style={{ margin: "100px auto", textAlign: "center" }}>
        {" "}
        Pokemon Details
      </h1>
      <DetailsCard
        id={props.id}
        baseExperience={props.base_experience}
        height={props.height}
        weight={props.weight}
        moves={props.moves.length}
        order={props.order}
      />
    </>
  );
};

export default detailsPage;

export async function getServerSideProps(context) {
  const id = context.query.id;
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}/`
    );
    return {
      props: response.data,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {},
    };
  }
}
