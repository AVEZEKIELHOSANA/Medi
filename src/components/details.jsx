import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MedicalFacilityDetails = ({ facilityId }) => {
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFacilityDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://rrn24.techchantier.com/Medi-finder/public/api/medical-facilities/${facilityId}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        );
        
        // Assuming your API returns the data in a 'data' property
        setFacility(response.data.data || response.data);
        setError(null);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('Medical facility not found');
        } else {
          setError('Failed to fetch facility details. Please try again.');
        }
        console.error('Error fetching facility details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (facilityId) {
      fetchFacilityDetails();
    }
  }, [facilityId]);

  const formatPhoneForWhatsApp = (phone) => {
    if (!phone) return '';
    
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, '');
    
    // If number starts with '0', replace with country code (Nigeria +234)
    if (digitsOnly.startsWith('0')) {
      return '234' + digitsOnly.substring(1);
    }
    
    // If number starts with country code, remove the '+'
    if (digitsOnly.startsWith('234')) {
      return digitsOnly;
    }
    
    return digitsOnly;
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <p>Loading facility details...</p>
        {/* You can add a spinner here */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!facility) {
    return <div className="no-data">No facility data available</div>;
  }

  const whatsappNumber = formatPhoneForWhatsApp(facility.phone);
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="medical-facility-details">
      <h2>Medical Facility Details</h2>
      <div className="facility-info">
        <div className="info-row">
          <span className="label">ID:</span>
          <span className="value">{facility.id}</span>
        </div>
        <div className="info-row">
          <span className="label">Name:</span>
          <span className="value">{facility.name || 'N/A'}</span>
        </div>
        <div className="info-row">
          <span className="label">Address:</span>
          <span className="value">{facility.address || 'N/A'}</span>
        </div>
        <div className="info-row">
          <span className="label">Phone:</span>
          <span className="value">
            {facility.phone ? (
              <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="whatsapp-link"
              >
                {facility.phone}
              </a>
            ) : 'N/A'}
          </span>
        </div>
        {/* Add more fields as needed from your API response */}
      </div>
    </div>
  );
};

export default MedicalFacilityDetails;