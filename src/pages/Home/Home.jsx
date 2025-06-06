import React, { useEffect, useState } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../../features/countries/countrySlice";
import { Carousel } from "react-bootstrap";


const Home = () => {
  const dispatch = useDispatch();
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);
  const [showFilters, setShowFilters] = useState(true);

  const {
    data: countries,
    loading,
    error,
  } = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

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
  return (
    <div className="home-container">
      <div className="top-bar d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div className="d-flex justify-content-between w-100 align-items-center">
          <h2 className="page-title">Countries</h2>

          <button
            className="filter-toggle d-md-none"
            onClick={() => setShowFilters(!showFilters)}
          >
            ☰
          </button>
        </div>

        <div className={`filter-nav ${showFilters ? "show" : ""}`}>
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

      {(loading || error) && (
        <div className="status-message-wrapper">
          {loading && <p className="status-message">Loading countries...</p>}
          {error && <p className="status-message error">Error: {error}</p>}
        </div>
      )}

      {!loading && !error && filteredCountries.length > 0 && (
        <>
          <div className="country-carousel">
            <Carousel indicators={true} interval={3000} data-bs-theme="dark">
              {filteredCountries.slice(0, visibleCount).map((country) => (
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
          <div className="social-icons">
              <button className="social-btn">
                <i className="bi bi-facebook"></i>
              </button>
              <button className="social-btn">
                <i className="bi bi-google"></i>
              </button>
              <button className="social-btn">
                <i className="bi bi-instagram"></i>
              </button>
              <button className="social-btn">
                <i className="bi bi-discord"></i>
              </button>
            </div>
        </>
      )}
    </div>
  );
};

export default Home;
