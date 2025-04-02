import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { FiSearch, FiMapPin, FiUsers, FiLock, FiLogIn, FiUserPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    
    if (token) {
      setIsAuthenticated(true);
      setUserRole(role || null);
      if (!role) {
        setIsOpen(true); // Only show role selection if authenticated but no role selected
      }
    }
    setLoading(false);
  }, []);

  const handleSelection = (role) => {
    setUserRole(role);
    setIsOpen(false);
    localStorage.setItem('userRole', role);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show login/signup ONLY if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FiLock className="text-blue-600 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Required</h2>
          <p className="text-gray-600 mb-6">
            Please login or sign up to access the medical finder platform
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/login')}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
            >
              <FiLogIn className="mr-2" />
              Login to Your Account
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="w-full px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition flex items-center justify-center"
            >
              <FiUserPlus className="mr-2" />
              Create New Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Only authenticated users see this part
  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Role Selection Modal (only shows if no role selected) */}
      <Dialog open={isOpen} onClose={() => {}} className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black bg-opacity-40" aria-hidden="true" />
        <Dialog.Panel className="z-50 bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 space-y-6">
          <Dialog.Title className="text-2xl font-bold text-gray-800 text-center">
            Welcome to MediFinder!
          </Dialog.Title>
          <p className="text-gray-600 text-center">
            Please select your role to continue
          </p>
          <div className="space-y-4">
            <button
              onClick={() => handleSelection('finder')}
              className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
            >
              <FiSearch className="mr-3" />
              <div className="text-left">
                <div className="font-medium">I'm a Patient</div>
                <div className="text-sm opacity-80">Looking for medical facilities</div>
              </div>
            </button>
            <button
              onClick={() => handleSelection('facility')}
              className="w-full px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center"
            >
              <FiUsers className="mr-3" />
              <div className="text-left">
                <div className="font-medium">I'm a Healthcare Provider</div>
                <div className="text-sm opacity-80">Managing a medical facility</div>
              </div>
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>

      {/* Main Content (only shows after role selection) */}
      {!isOpen && (
        <div className="w-full">
          {userRole === 'finder' && (
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome Back!</h1>
              <p className="text-xl text-gray-600">Start exploring medical facilities near you</p>
            </div>
          )}
          {userRole === 'facility' && (
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold text-green-600 mb-4">Manage Your Facility</h1>
              <p className="text-xl text-gray-600">Connect with patients and grow your practice</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default LandingPage;