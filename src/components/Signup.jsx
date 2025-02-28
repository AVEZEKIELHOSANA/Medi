import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [userType, setUserType] = useState('medical_facility');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
            setImage(file);
        } else {
            setError('Invalid image format. Please upload a JPG or PNG image.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== passwordConfirmation) {
            setError('Passwords do not match!');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', passwordConfirmation);
        formData.append('user_type', userType);
        formData.append('whatsapp_number', whatsappNumber);
        if (image) formData.append('image', image);

        try {
            const response = await axios.post(
                'http://rrn24.techchantier.site/Medi-finder/public/api/auth/register',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'application/json',
                    },
                }
            );

            if (response.status === 201 || response.status === 200) {
                console.log('Registration successful:', response.data);
                navigate('/Home');
            }
        } catch (err) {
            console.error('Registration failed:', err.response?.data || err.message);
            const validationErrors = err.response?.data?.errors;
            setError(validationErrors ? Object.values(validationErrors).flat().join(' ') : 'Registration failed. Please try again.');
        }
    };

    return (
        <div className='signup-container'>

            <h2 className='Register'>Register Medical Facility</h2>
            {error && <div className='error'>{error}</div>}


            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Name' value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='validate-input' required /><br /><br />
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='validate-input' required />
                <input
                    type='password'
                    placeholder='Password'
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    className='validate-input' required />
                <input
                    type='password'
                    placeholder='Confirm Password'
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    className='validate-input' required />
                <select value={userType} onChange={(e) => setUserType(e.target.value)} className='w-full p-2 mb-4 border rounded' required>
                    <option value='medical_facility'>Medical Facility</option>
                    <option value='finder'>Finder</option>
                </select>
                <input
                    type='text'
                    placeholder='WhatsApp Number'
                    value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)}
                    className='validate-input' required />
                <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    className='profile-image' />
                <button
                    type='submit'
                    className='btn-signup'>Register</button>
            </form>
            <div className='Linktologin'>
                <p>Already have an account?</p><Link to="/Login">Login</Link>
            </div>
        </div>
    );
};

export default Signup;
