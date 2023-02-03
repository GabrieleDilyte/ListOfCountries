import "./index.css";

function SingleCountry({ name, region, area }) {
  return (
    <div className="singleCounty">
      <h2>{name}</h2>
      <p>Region: {region}</p>
      <p>Area: {area}</p>
    </div>
  );
}

export default SingleCountry;
