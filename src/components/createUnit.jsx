import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UnitCreationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'active'
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    
    const API_BASE_URL = 'https://rrn24.techchantier.com/Medi-finder/public/api';

    useEffect(() => {
        // Get token from localStorage or redirect to login
        const storedToken = localStorage.getItem('authToken');
        if (!storedToken) {
            navigate('/login');
        } else {
            setToken(storedToken);
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length > 255) {
            newErrors.name = 'Name must not exceed 255 characters';
        }
        
        if (!['active', 'inactive'].includes(formData.status)) {
            newErrors.status = 'Invalid status value';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        if (!token) {
            setErrors({ general: 'Authentication required. Please login.' });
            return;
        }
        
        setIsSubmitting(true);
        setSuccessMessage('');
        setErrors({});
        
        try {
            const response = await axios.post(`${API_BASE_URL}/units`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            
            setSuccessMessage('Unit created successfully!');
            setFormData({
                name: '',
                description: '',
                status: 'active'
            });
        } catch (error) {
            console.error('Error creating unit:', error);
            
            if (error.response?.status === 401) {
                // Token expired or invalid
                localStorage.removeItem('authToken');
                setErrors({ general: 'Session expired. Please login again.' });
                navigate('/login');
            } else if (error.response?.status === 405) {
                setErrors({ general: 'Invalid endpoint or method.' });
            } else if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ 
                    general: error.response?.data?.message || 
                           'Failed to create unit. Please try again.' 
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!token) {
        return (
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
                    <p>Loading authentication...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create New Medical Unit</h2>
            
            {errors.general && (
                <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
                    <p>{errors.general}</p>
                </div>
            )}
            
            {successMessage && (
                <div className="mb-4 p-3 bg-green-100 border-l-4 border-green-500 text-green-700">
                    <p>{successMessage}</p>
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Unit Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        maxLength={255}
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                </div>
                
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                    />
                </div>
                
                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                        Status <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.status ? 'border-red-500' : 'border-gray-300'
                        }`}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    {errors.status && (
                        <p className="mt-1 text-sm text-red-600">{errors.status}</p>
                    )}
                </div>
                
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                            isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating...
                            </>
                        ) : 'Create Unit'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UnitCreationForm;