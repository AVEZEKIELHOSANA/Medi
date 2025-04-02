import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MedicalFacilitySearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [searchPerformed, setSearchPerformed] = useState(false);

    const API_BASE_URL = "https://rrn24.techchantier.com/Medi-finder/public/api/medical-facilities/search";

    const searchFacilities = async (searchQuery, page = 1) => {
        if (!searchQuery || searchQuery.trim().length < 2) {
            setError('Please enter at least 2 characters to search');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await axios.get(
                `${API_BASE_URL}/medical-facilities/search`,
                {
                    params: {
                        query: searchQuery.trim(),
                        page: page
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    timeout: 10000
                }
            );

            if (!response.data || !response.data.data) {
                throw new Error('Invalid response structure from server');
            }

            setResults(response.data.data);
            setTotalPages(response.data.meta?.last_page || 1);
            setTotalResults(response.data.meta?.total || 0);
            setCurrentPage(page);
            setSearchPerformed(true);
        } catch (error) {
            console.error('API Error:', error);
            setError(error.response?.data?.message || 
                    error.message || 
                    'Failed to search facilities. Please try again.');
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        searchFacilities(query, 1);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchFacilities(query, 1);
        }
    };

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        searchFacilities(query, page);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Medical Facility Search</h1>

            <form onSubmit={handleSearch} style={styles.form}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search facilities by name or location..."
                    style={styles.input}
                    disabled={isLoading}
                />
                <button 
                    type="submit" 
                    style={{ 
                        ...styles.button, 
                        ...(isLoading || query.length < 2 ? styles.buttonDisabled : {}) 
                    }}
                    disabled={isLoading || query.length < 2}
                >
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {/* Rest of your component remains the same */}
            {error && (
                <div style={styles.errorContainer}>
                    <p style={styles.errorText}>
                        ⚠️ {error}
                        {error.includes('Network') && (
                            <span style={styles.errorHelp}>
                                <br />Please check your internet connection or try again later.
                            </span>
                        )}
                    </p>
                </div>
            )}

            {isLoading && <div style={styles.loadingIndicator}>🔍 Searching facilities...</div>}

            {!isLoading && searchPerformed && (
                <div style={styles.resultsContainer}>
                    {results.length > 0 ? (
                        <>
                            <p style={styles.resultsSummary}>
                                Found {totalResults} result{totalResults !== 1 ? 's' : ''}
                            </p>
                            <div style={styles.resultsList}>
                                {results.map((facility) => (
                                    <div key={facility.id} style={styles.facilityCard}>
                                        <h3 style={styles.facilityName}>{facility.name}</h3>
                                        <p style={styles.facilityInfo}>
                                            <strong>Location:</strong> {facility.location || 'Not specified'}
                                        </p>
                                        {facility.specialty && (
                                            <p style={styles.facilityInfo}>
                                                <strong>Specialty:</strong> {facility.specialty}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p style={styles.noResults}>
                            No facilities found matching "{query}"
                        </p>
                    )}
                </div>
            )}

            {!isLoading && totalPages > 1 && results.length > 0 && (
                <div style={styles.pagination}>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={styles.paginationButton}
                    >
                        Previous
                    </button>
                    <span style={styles.pageInfo}>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        style={styles.paginationButton}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

// Styles remain the same as in previous example
const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        textAlign: 'center',
        color: '#2c3e50',
        marginBottom: '30px',
    },
    form: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        maxWidth: '500px',
        padding: '12px 15px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        outline: 'none',
        transition: 'border 0.3s',
    },
    inputFocus: {
        borderColor: '#3498db',
    },
    button: {
        padding: '12px 20px',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s',
    },
    buttonDisabled: {
        backgroundColor: '#95a5a6',
        cursor: 'not-allowed',
    },
    errorContainer: {
        backgroundColor: '#fdecea',
        padding: '15px',
        borderRadius: '4px',
        marginBottom: '20px',
        borderLeft: '4px solid #f44336',
    },
    errorText: {
        color: '#f44336',
        margin: 0,
    },
    errorHelp: {
        fontSize: '14px',
        color: '#666',
    },
    loadingIndicator: {
        textAlign: 'center',
        padding: '20px',
        color: '#3498db',
        fontSize: '18px',
    },
    resultsContainer: {
        marginTop: '20px',
    },
    resultsSummary: {
        color: '#7f8c8d',
        marginBottom: '15px',
    },
    resultsList: {
        display: 'grid',
        gap: '15px',
    },
    facilityCard: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    facilityName: {
        marginTop: 0,
        marginBottom: '10px',
        color: '#2c3e50',
    },
    facilityInfo: {
        margin: '5px 0',
        color: '#34495e',
    },
    noResults: {
        textAlign: 'center',
        padding: '30px',
        color: '#7f8c8d',
        fontSize: '16px',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '15px',
        marginTop: '30px',
    },
    paginationButton: {
        padding: '8px 16px',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    pageInfo: {
        color: '#34495e',
    },
};

export default MedicalFacilitySearch;