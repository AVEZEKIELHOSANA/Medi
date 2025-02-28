import React, { useState, useEffect } from "react";

function MedicalUnits() {
  const [units, setUnits] = useState([]); // Stores the list of medical units
  const [currentPage, setCurrentPage] = useState(1); // Tracks current page
  const [totalPages, setTotalPages] = useState(1); // Tracks total pages
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Base API URL
  const API_URL = "http://rrn24.techchantier.site/Medi-finder/public/api/units";

  // Fetch medical units from the API
  const fetchUnits = async (page = 1) => {
    setIsLoading(true); // Start loading
    setError(null); // Clear previous errors

    try {
      const response = await fetch(`${API_URL}?page=${page}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.status === 401) {
        throw new Error("Unauthenticated. Please log in.");
      }

      const data = await response.json();

      // Ensure the response contains expected data
      if (response.ok) {
        setUnits(data.data || []); // Set the list of units
        setCurrentPage(data.current_page || 1); // Set current page
        setTotalPages(data.last_page || 1); // Set total pages
      } else {
        throw new Error(data.message || "Failed to fetch units.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    fetchUnits(page);
  };

  // Fetch units on component mount or when the page changes
  useEffect(() => {
    fetchUnits(currentPage);
  }, [currentPage]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Medical Units</h1>

      {/* Display loading spinner */}
      {isLoading && <p>Loading...</p>}

      {/* Display error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display medical units */}
      {!isLoading && !error && units.length > 0 && (
        <ul className="list-disc pl-5 mb-4">
          {units.map((unit) => (
            <li key={unit.id} className="mb-2">
              {unit.name}
            </li>
          ))}
        </ul>
      )}

      {/* Display pagination */}
      {!isLoading && !error && totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          {/* Previous Page Button */}
          <button
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* Current Page Indicator */}
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>

          {/* Next Page Button */}
          <button
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* No units found */}
      {!isLoading && !error && units.length === 0 && (
        <p>No medical units found.</p>
      )}
    </div>
  );
}

export default MedicalUnits;