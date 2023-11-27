import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
// import Head from "next/head";
import axios from "axios";
// import Card from "@/components/Card";
import Cardd from "@/components/Cardd";
import Spinner from "@/components/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchBar from "@/components/SearchBar";

export default function Home({ results }) {
  const [data, setData] = useState(results.results);
  console.log(data);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(12);
  const [totalResults, setTotalResults] = useState(0);
  const [value, setValue] = useState("");
  const onChange = (e) => setValue(e.target.value);

  const fetchMoreData = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${limit}&limit=6`;
    try {
      let response = await fetch(url);
      let parsedData = await response.json();
      setLimit(limit + 6);
      console.log(data);
      console.log(parsedData.results);
      setData([...data, ...parsedData.results]);
      setTotalResults(parsedData.count);
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase(); // Convert input to lowercase for case-insensitive search
    setValue(searchValue); // Update the value state

    // Filter the results based on the search value
    const filteredData = results.results.filter((item) =>
      item.name.toLowerCase().includes(searchValue)
    );

    // Set the filtered data to be displayed
    setData(filteredData);
  };

  useEffect(() => {
    // document.body.style.backgroundColor = "#FDD835";
    // Reset data to original results when the search value is empty
    if (value === "") {
      setData(results.results);
    }
  }, [value, results.results]);

  return (
    <>
      <NavBar />
      <div className=" items-center bg-yellow-500 justify-between ">
        {/* {loading && <Spinner />} */}

        <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={data.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container mt-20">
            <SearchBar value={value} onChange={handleSearch} />
            <div className="row ">
              {data.map((item, index) => (
                <div className="col-md-4 my-4" key={index}>
                  <Cardd title={item.name} url={item.url} id={index + 1} />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?offset=6&limit=6`
    );
    const results = response.data;
    // console.log(results);

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
