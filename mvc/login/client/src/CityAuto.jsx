import { useState, useEffect } from "react";
import axios from "axios";

function CityAuto() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchCities = async () => {
      try {
        const response = await axios.get(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}`,
          {
            headers: {
              "X-RapidAPI-Key":
                "aabdc236a2msh82683bc639ec827p1c6f18jsn33d03b641054",
              "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
            },
          }
        );
        setSuggestions(response.data.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, [query]);

  const handleSelect = (city) => {
    setSelectedCity(city);
    setQuery(city.city);
    setSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Type city name"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedCity(null);
        }}
      />

      <ul>
        {suggestions.map((city) => (
          <li key={city.id} onClick={() => handleSelect(city)}>
            {city.city}, {city.region}, {city.country}
          </li>
        ))}
      </ul>

      {selectedCity && (
        <div>
          <p>City: {selectedCity.city}</p>
          <p>State: {selectedCity.region}</p>
          <p>Country: {selectedCity.country}</p>
        </div>
      )}
    </div>
  );
}

export default CityAuto;
