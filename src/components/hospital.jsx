import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MedicalFacilitiesList = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    perPage: 15,
    total: 0
  });

  const navigate = useNavigate();
  const API_BASE_URL = 'https://rrn24.techchantier.com/Medi-finder/public/api';

  const fetchMedicalFacilities = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/medical-facilities`, {
        params: { page },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      // Validate and ensure each facility has a unique ID
      const validatedData = response.data.data.map(facility => {
        if (!facility.id) {
          console.warn('Facility missing ID:', facility);
          return { 
            ...facility, 
            id: `temp-${Math.random().toString(36).substr(2, 9)}`
          };
        }
        return facility;
      });

      setFacilities(validatedData);
      setPagination({
        currentPage: response.data.meta.current_page,
        lastPage: response.data.meta.last_page,
        perPage: response.data.meta.per_page,
        total: response.data.meta.total
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch medical facilities');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicalFacilities(pagination.currentPage);
  }, [pagination.currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.lastPage) {
      setPagination(prev => ({ ...prev, currentPage: newPage }));
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      active: { class: 'bg-green-100 text-green-800', text: 'ACTIVE' },
      inactive: { class: 'bg-gray-100 text-gray-800', text: 'INACTIVE' },
      pending: { class: 'bg-yellow-100 text-yellow-800', text: 'PENDING' },
      closed: { class: 'bg-red-100 text-red-800', text: 'CLOSED' }
    };
    
    const statusInfo = statusMap[status?.toLowerCase()] || { class: 'bg-blue-100 text-blue-800', text: 'UNKNOWN' };
    
    return (
      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusInfo.class}`}>
        {statusInfo.text}
      </span>
    );
  };

  if (loading && pagination.currentPage === 1) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 max-w-7xl mx-auto">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
            <button 
              onClick={() => fetchMedicalFacilities()} 
              className="mt-2 text-sm text-red-500 hover:text-red-700 font-medium"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Medical Facilities</h1>
        
        {facilities.length === 0 && !loading ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No facilities found</h3>
            <p className="mt-1 text-sm text-gray-500">There are currently no medical facilities available.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilities.map((facility) => {
                const facilityName = facility.user?.name || 'Unnamed Facility';
                const facilityDescription = facility.description || 'No description available';
                const facilityImage = facility.user?.photo || '/default-avatar.png';

                return (
                  <div 
                    key={`facility-${facility.id}`}
                    className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <img
                            className="h-16 w-16 rounded-full object-cover border-2 border-gray-200"
                            src={facilityImage}
                            alt={`${facilityName}'s profile`}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/default-avatar.png';
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">{facilityName}</h3>
                          <div className="mt-1">
                            {getStatusBadge(facility.status)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {facilityDescription}
                        </p>
                      </div>
                      
                      <div className="mt-6">
                        <button
                          onClick={() => navigate(`/details/${facility.id}`)}
                          className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {pagination.total > 0 && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(pagination.currentPage - 1) * pagination.perPage + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(pagination.currentPage * pagination.perPage, pagination.total)}
                  </span>{' '}
                  of <span className="font-medium">{pagination.total}</span> facilities
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.lastPage}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MedicalFacilitiesList;