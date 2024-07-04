import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../helpers/api';
import '../../styles/views/Login.scss';
import { BeatLoader } from 'react-spinners';
import { useUser } from '../../contexts/UserContext';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '', 
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('login/', {
        username: formData.username, 
        password: formData.password
      });

      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);


    //   const userResponse = await api.get('profile/', {
    //     headers: {
    //       Authorization: `Bearer ${response.data.access}`
    //     }
    //   });
    //   setUser(userResponse.data);

      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>  {/* Change label to Username */}
          <input type="text" name="username" value={formData.username} onChange={handleChange} required /> 
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? <BeatLoader size={10} color={"#fff"} /> : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;