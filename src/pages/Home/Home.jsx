import React, { useEffect, useState } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../../features/countries/countrySlice";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Home = () => {
  const dispatch = useDispatch();
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8); // show first 8 by default
  const [carouselCountries, setCarouselCountries] = useState([]);

  const {
    data: countries,
    loading,
    error,
  } = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    if (countries.length > 0) {
      setCarouselCountries(countries.slice(0, 5)); 
    }
  }, [countries]);

  const handleRegionFilter = (region) => {
    setSelectedRegion(region);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };
  const filteredCountries =
    selectedRegion === "All"
      ? countries
      : countries.filter((country) => country.region === selectedRegion);
  console.log(filteredCountries, "cc");
  return (
    <div className="home-container">
      {/* Header */}
      <div className="top-bar d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">Countries</h2>
        <div className="filter-nav">
          {["All", "Asia", "Europe"].map((region) => (
            <span
              key={region}
              className={selectedRegion === region ? "active" : ""}
              onClick={() => handleRegionFilter(region)}
            >
              {region}
            </span>
          ))}
        </div>
      </div>
      <div className="welcome-wrapper">
        <div className="welcome-line line-left" />
        <h1 className="welcome-text">Welcome</h1>
        <div className="welcome-line line-right" />
      </div>

      {!loading && !error && carouselCountries.length > 0 && (
        <div className="country-carousel">
          <Carousel indicators={true} interval={3000} data-bs-theme="dark">
            {carouselCountries.map((country) => (
              <Carousel.Item key={country.name}>
                <div className="carousel-flag-container">
                  <img
                    src={country.flag}
                    alt={country.name}
                    className="carousel-flag"
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      )}

      {loading && <p>Loading countries...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <div className="country-grid">
        {filteredCountries.slice(0, visibleCount).map((country, i) => (
          <div key={country.name} className="country-card">
            <img
              src={country.flag}
              alt={country.name}
              className="country-flag"
            />
            <div className="country-info">
              <div className="country-name">{country.name}</div>
              <div className="country-region">{country.region}</div>
            </div>
          </div>
        ))}
      </div>

      <button className="load-more-btn" onClick={handleLoadMore}>
        Load More
      </button>
    </div>
  );
};

export default Home;
