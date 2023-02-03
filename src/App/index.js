import "./index.css";
import React, { useEffect, useState } from "react";
import Button from "./Components/Button";
import SingleCountry from "./Components/SingleCountry";
import Select from "./Components/Select";

function App() {
  //originally fetched list
  const [countries, setCountries] = useState([]);

  const [filteredCountries, filterCountries] = useState([]);
  const [filterValue, updateFilterValue] = useState("A");
  const optionList = [
    { id: "A", name: "All" },
    { id: "S", name: "Smaler than Lithuania" },
    { id: "O", name: "Oceania region" },
  ];

  const [currentPageCountries, setPageCountries] = useState([]);
  const [currentPage, setPage] = useState(1);
  const pageSize = 5;

  const [sortValue, updateSortValue] = useState(1);

  //fetching data from API
  useEffect(() => {
    fetch("https://restcountries.com/v2/all?fields=name,region,area")
      .then((res) => res.json())
      .then((result) => {
        setCountries(result);
      })
      .catch((err) => console.log(err));
  }, []);

  //updating sort order
  useEffect(() => {
    const newCountries = [...countries];

    newCountries.sort((a, b) => (a.name < b.name ? sortValue : sortValue * -1));
    setCountries(newCountries);
  }, [sortValue]);

  //filtering based on selected option
  useEffect(() => {
    const newList = [...countries];

    switch (filterValue) {
      case "A":
        filterCountries(newList);
        setPage(1);

        break;
      case "S":
        const lithuania = countries.find((country) => {
          return country.name.toUpperCase() === "LITHUANIA";
        });

        filterCountries(
          newList.filter((country) => {
            return country.area < lithuania.area;
          })
        );
        setPage(1);

        break;
      case "O":
        filterCountries(
          newList.filter((country) => {
            return country.region.toUpperCase() === "OCEANIA";
          })
        );
        setPage(1);

        break;
    }
  }, [filterValue, countries]);

  //updating list based on page and current filtered list
  useEffect(() => {
    const newList = [...filteredCountries];
    const from = (currentPage - 1) * pageSize;

    setPageCountries(newList.splice(from, pageSize));
  }, [currentPage, filteredCountries]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>List of Countries</h1>
      </header>
      <main>
        <section className="Section">
          <Button
            onClick={() => {
              updateSortValue(sortValue * -1);
            }}
          >
            Sort by name {sortValue === 1 ? "⬇" : "⬆"}
          </Button>
          <div className="d-flex">
            <Select
              options={optionList}
              value={filterValue}
              setValue={updateFilterValue}
            />
          </div>
        </section>
        {currentPageCountries.map(({ name, region, area }, i) => (
          <SingleCountry
            key={i}
            name={name}
            region={region}
            area={area}
          ></SingleCountry>
        ))}
        <div className="Pagination">
          <p>{currentPage}</p>
          <Button
            onClick={() => {
              setPage(currentPage > 1 ? currentPage - 1 : currentPage);
            }}
          >
            ◀
          </Button>
          <Button
            onClick={() => {
              setPage(
                currentPage < filteredCountries.length / pageSize
                  ? currentPage + 1
                  : currentPage
              );
            }}
          >
            ▶
          </Button>
        </div>
      </main>
    </div>
  );
}

export default App;
