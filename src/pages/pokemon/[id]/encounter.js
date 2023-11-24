import EncounterCard from "@/components/EncounterCard";
import axios from "axios";
import React from "react";

const EncounterDetails = (props) => {
  const n = props.data.length;
  const data = props.data;
  console.log(props.data);
  return (
    <>
      <EncounterCard n={n} data={data} />
    </>
  );
};

export default EncounterDetails;

export async function getServerSideProps(context) {
  const id = context.query.id;
  // console.log("Encounter Sever side id", id);

  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}/encounters`
    );
    console.log(response.data);

    return {
      props: { data: response.data },
    };
  } catch (error) {
    // console.error("Error fetching data:", error);
    return {
      props: {},
    };
  }
}
