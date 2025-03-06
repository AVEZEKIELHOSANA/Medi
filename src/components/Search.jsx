import React, { useState, useEffect } from "react";
import axios from "axios";

const MedicalFacilitySearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    perPage: 15,
    currentPage: 1,
    lastPage: 1,
  });

  const fetchMedicalFacilities = async () => {
    if (query.length < 2) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "http://rrn24.techchantier.site/Medi-finder/public/api/medical-facilities/search",
        {
          params: {
            query: query,
            page: pagination.currentPage,
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      setResults(response.data.data);
      setPagination({
        total: response.data.meta.total,
        perPage: response.data.meta.per_page,
        currentPage: response.data.meta.current_page,
        lastPage: response.data.meta.last_page,
      });
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        setError("Network error: Unable to connect to the server. Please check your internet connection or API URL.");
      } else {
        setError("An error occurred while fetching data. Please try again.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicalFacilities();
  }, [query, pagination.currentPage]);

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
  };

  return (
    <div>
      <h1>Medical Facility Search</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        placeholder="Search for medical facilities..."
        minLength={2}
      />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {results.map((facility, index) => (
          <li key={index}>{facility.name}</li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {pagination.currentPage} of {pagination.lastPage}
        </span>
        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.lastPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MedicalFacilitySearch;