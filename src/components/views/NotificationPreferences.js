import React, { useState, useEffect } from 'react';
import api from '../../helpers/api';
import '../../styles/views/NotificationPreferences.scss';

const NotificationPreferences = () => {
  const [formData, setFormData] = useState({
    email_notifications: true,
    reminder_timing: '1 day before'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await api.get('notificationpreferences/preferences/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching preferences', error);
      }
    };

    fetchPreferences();
  }, []);

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
      await api.put('notificationpreferences/preferences/', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      setSuccess('Preferences updated successfully');
      setError('');
    } catch (error) {
      setError('Failed to update preferences. Please try again.');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="notification-preferences-container">
      <h2>Notification Preferences</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Notifications</label>
          <select name="email_notifications" value={formData.email_notifications} onChange={handleChange}>
            <option value="true">Enabled</option>
            <option value="false">Disabled</option>
          </select>
        </div>
        <div className="form-group">
          <label>Reminder Timing</label>
          <input type="text" name="reminder_timing" value={formData.reminder_timing} onChange={handleChange} />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Saving...' : 'Save Preferences'}
        </button>
      </form>
    </div>
  );
};

export default NotificationPreferences;