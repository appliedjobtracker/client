import React, { useState } from 'react';
import api from '../../helpers/api';
import '../../styles/views/Register.scss';
import { BeatLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await api.post('register/', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      setSuccess("Registration successful! Please login.");
      setError('');

      await loginUser();
    } catch (error) {
      setError(error.response?.data?.detail || "Registration failed");
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async () => {
    try {
      const response = await api.post('login/', {
        username: formData.username,
        password: formData.password
      });

      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      const userResponse = await api.get("profile/", {
        headers: {
          Authorization: `Bearer ${response.data.access}`
        }
      });
      // Assuming you have a setUser function from a context or prop
      setUser(userResponse.data);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try logging in manually.");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <button type="submit" className="register-btn" disabled={loading}>
          {loading ? <BeatLoader size={10} color={"#fff"} /> : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;