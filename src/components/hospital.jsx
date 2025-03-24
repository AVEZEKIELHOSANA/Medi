import React, { useState, useEffect } from "react";
import axios from "axios";
import MedicalFacilitySearch from "./search";
import Navbar from "./navbar";

function MedicalFacilitiesList() {
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
    <div className="p-8 bg-gray-100 min-h-screen">
<Navbar/>
    <MedicalFacilitySearch/>
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Medical Facilities</h1>
      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {facilities.map((facility) => (
          <div
            key={facility.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow transform hover:scale-105 hover:bg-gray-50 transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              {/* Profile Photo */}
              {facility.user.photo && (
                <img
                  src={facility.user.photo}
                  alt={`${facility.user.name}'s profile`}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{facility.user.name}</h2>
                <p className="text-gray-600 mt-2">{facility.description}</p>
                <p className="text-sm text-gray-500 mt-1">Status: {facility.status}</p>
              </div>
            </div>
            <button
              onClick={() => handleViewDetails(facility.id)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {pagination.currentPage} of {pagination.lastPage}
        </span>
        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.lastPage}
          className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      </div>

      {/* Display selected facility details */}
      {selectedFacility && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            {/* Profile Photo */}
            {selectedFacility.user.photo && (
              <img
                src={selectedFacility.user.photo}
                alt={`${selectedFacility.user.name}'s profile`}
                className="w-20 h-20 rounded-full object-cover"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Details for {selectedFacility.user.name}</h2>
              <p className="text-gray-600 mt-2">Address: {selectedFacility.address}</p>
              <p className="text-gray-600 mt-1">Description: {selectedFacility.description}</p>
              <p className="text-gray-600 mt-1">Status: {selectedFacility.status}</p>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mt-4">Operating Hours:</h3>
          <ul className="mt-2 space-y-1">
            {selectedFacility.operating_hours.map((hour, index) => (
              <li key={index} className="text-gray-600">
                {hour.day}: {hour.open ? "Open" : "Closed"}
              </li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold text-gray-800 mt-4">Units:</h3>
          <ul className="mt-2 space-y-1">
            {selectedFacility.units.map((unit, index) => (
              <li key={index} className="text-gray-600">{unit}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MedicalFacilitiesList;