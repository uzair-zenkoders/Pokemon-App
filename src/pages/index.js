import NavBar from "@/components/NavBar";
import Head from "next/head";
import axios from "axios";
import Card from "@/components/Card";

export default function Home({ results }) {
  return (
    <>
      <NavBar />
      <div className="container my-5">
        <div className="row">
          {results.map((item, index) => (
            <div className="col-md-4" key={index}>
              <Card title={item.name} url={item.url} id={index + 1} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/`);
    const results = response.data.results;
    console.log(results);

    return {
      props: { results },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: { data: [] },
    };
  }
}

// export async function getServerSideProps(context) {
//   try {
//     const res = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
//     const data = await res.json();
//     const results = data.results;
//     console.log(results);

//     return {
//       props: { results }, // Pass the fetched data directly to props
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return {
//       props: { data: [] }, // Return null or handle error accordingly
//     };
//   }
// }
