import React, { useState, useEffect } from "react";
import axios from "axios";

function MedicalFacilitiesList(){
  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    perPage: 15,
    currentPage: 1,
    lastPage: 1,
  });

  // Fetch all medical facilities
  const fetchMedicalFacilities = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "http://rrn24.techchantier.site/Medi-finder/public/api/medical-facilities",
        {
          params: {
            page: pagination.currentPage,
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      setFacilities(response.data.data);
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

  // Fetch details of a single facility
  const fetchFacilityDetails = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://rrn24.techchantier.site/Medi-finder/public/api/medical-facility/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      setSelectedFacility(response.data.data);
    } catch (err) {
      setError("Failed to fetch facility details. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle "View Details" button click
  const handleViewDetails = (id) => {
    console.log("View Details clicked for ID:", id); // Debugging
    fetchFacilityDetails(id);
  };

  // Fetch data when the page changes
  useEffect(() => {
    fetchMedicalFacilities();
  }, [pagination.currentPage]);

  // Handle pagination navigation
  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
  };

  return (
    <div>
      <h1>Medical Facilities</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {facilities.map((facility) => (
          <li key={facility.id}>
            <h2>{facility.user.name}</h2>
            <p>{facility.description}</p>
            <p>Status: {facility.status}</p>
            <button onClick={() => handleViewDetails(facility.id)}>
              View Details
            </button>
          </li>
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

      {/* Display selected facility details */}
      {selectedFacility && (
        <div>
          <h2>Details for {selectedFacility.user.name}</h2>
          <p>Address: {selectedFacility.address}</p>
          <p>Description: {selectedFacility.description}</p>
          <p>Status: {selectedFacility.status}</p>
          <h3>Operating Hours:</h3>
          <ul>
            {selectedFacility.operating_hours.map((hour, index) => (
              <li key={index}>
                {hour.day}: {hour.open ? "Open" : "Closed"}
              </li>
            ))}
          </ul>
          <h3>Units:</h3>
          <ul>
            {selectedFacility.units.map((unit, index) => (
              <li key={index}>{unit}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MedicalFacilitiesList;