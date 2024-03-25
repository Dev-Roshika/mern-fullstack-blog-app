import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      axios.defaults.withCredentials = true; // Pass the cookies with requests to the server
      await login(formData); // Call the login function from the context
      navigate('/');
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className='auth'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Username'
          name='username'
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          value={formData.password}
          onChange={handleChange}
        />
        <button type='submit'>Login</button>
        {error && <p>{error}</p>}
        <span>
          Don't you have an account? <Link to='/auth/register'>Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
