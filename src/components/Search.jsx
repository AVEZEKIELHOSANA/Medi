import React, { useState } from 'react';

function MedicalFacilitySearch() {
    // State for the search query
    const [query, setQuery] = useState('');
    // State for the search results
    const [results, setResults] = useState([]);
    // State for loading and error handling
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Function to handle the search
    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page

        if (query.length < 2) {
            setError('Query must be at least 2 characters long.');
            return;
        }

        setIsLoading(true);
        setError('');
        setCurrentPage(1); // Reset to the first page when performing a new search

        try {
            const response = await fetch(
                `http://rrn24.techchantier.site/Medi-finder/public/api/medical-facilities/search?query=${query}&page=${currentPage}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            setResults(data.data); // Update the results state with the fetched data
            setTotalPages(data.meta.last_page); // Update the total number of pages
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Function to handle pagination (fetch data for a specific page)
    const handlePageChange = async (page) => {
        if (page < 1 || page > totalPages) return; // Prevent invalid page numbers

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(
                `http://rrn24.techchantier.site/Medi-finder/public/api/medical-facilities/search?query=${query}&page=${page}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            setResults(data.data); // Update the results state with the fetched data
            setCurrentPage(page); // Update the current page
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Medical Facility Search</h1>

            {/* Search Form */}
            <form onSubmit={handleSearch} style={styles.form}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search medical facilities..."
                    style={styles.input}
                    disabled={isLoading} // Disable input while loading
                />
                <button type="submit" style={styles.button} disabled={isLoading}>
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {/* Error Message */}
            {error && <p style={styles.error}>{error}</p>}

            {/* Loading State */}
            {isLoading && <p style={styles.loading}>Searching...</p>}

            {/* Results */}
            {!isLoading && (
                <div style={styles.results}>
                    {results.length > 0 ? (
                        results.map((item, index) => (
                            <div key={index} style={styles.item}>
                                <h3>{item.name}</h3>
                                <p>{item.location}</p>
                            </div>
                        ))
                    ) : (
                        <p>No results found.</p>
                    )}
                </div>
            )}

            {/* Pagination Controls */}
            {!isLoading && totalPages > 1 && (
                <div style={styles.pagination}>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1 || isLoading}
                        style={styles.paginationButton}
                    >
                        Previous
                    </button>
                    <span style={styles.pageInfo}>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || isLoading}
                        style={styles.paginationButton}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

// Styles
const styles = {
    container: {
        padding: '20px',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto',
    },
    title: {
        marginBottom: '20px',
        fontSize: '24px',
        color: '#333',
    },
    form: {
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
    },
    input: {
        width: '300px',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        marginBottom: '20px',
    },
    loading: {
        marginTop: '20px',
        fontSize: '18px',
        color: '#007bff',
    },
    results: {
        marginTop: '20px',
        textAlign: 'left',
    },
    item: {
        padding: '10px',
        borderBottom: '1px solid #eee',
    },
    pagination: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
    },
    paginationButton: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    pageInfo: {
        fontSize: '16px',
        color: '#333',
    },
};

export default MedicalFacilitySearch;