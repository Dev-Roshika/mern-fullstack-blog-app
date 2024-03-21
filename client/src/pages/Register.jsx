import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Only handle the first file if multiple files are selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('img', file); 

      // Send POST request to server to register user
      await axios.post('http://localhost:8081/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });

      // Redirect to login page after successful registration
      window.location.href = '/login';
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className='auth'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          type='text'
          placeholder='Username'
          name='username'
          value={formData.username}
          onChange={handleChange}
        />
        <input
          required
          type='email'
          placeholder='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
        />
        <input
          required
          type='password'
          placeholder='Password'
          name='password'
          value={formData.password}
          onChange={handleChange}
        />
        <input
          required
          type='file'
          accept='image/*' // Accept only image files
          onChange={handleFileChange}
        />
        <button type='submit'>Register</button>
        {error && <p>{error}</p>}
        <span>
          Do you have an account? <Link to='/login'>Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
