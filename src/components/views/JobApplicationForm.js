import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import api from '../../helpers/api';
import '../../styles/views/JobApplicationForm.scss';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    company_title: '',
    position_title: '',
    job_link: '',
    job_type: 'Full-Time',
    status: 'Applied',
    scheduled_interview_date: '',
    interview_team: '',
    location: '',
    salary_range: '',
    application_deadline: '',
    application_method: '',
    contact_person: '',
    contact_email: '',
    contact_phone: '',
    company_address: '',
    application_source: '',
    resume_used: '',
    cover_letter_used: '',
    additional_notes: '',
    follow_up_date: '',
    application_status_history: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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
    const token = localStorage.getItem('access_token');

    console.log("deadline", formData.application_deadline)
    console.log("interview", formData.scheduled_interview_date)

    try {
      await api.post('jobapplications/', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to create job application. Please try again.');
      console.error('Failed to create job application:', error.response?.data?.detail || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-application-form-container">
      <h2>Create Job Application</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Company Title</label>
          <input type="text" name="company_title" value={formData.company_title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Position Title</label>
          <input type="text" name="position_title" value={formData.position_title} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Job Link</label>
          <input type="url" name="job_link" value={formData.job_link} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Job Type</label>
          <select name="job_type" value={formData.job_type} onChange={handleChange}>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Freelance">Freelance</option>
            <option value="Temporary">Temporary</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Apprenticeship">Apprenticeship</option>
            <option value="Seasonal">Seasonal</option>
            <option value="Co-op">Co-op</option>
          </select>
        </div>
        <div className="form-group">
          <label>Scheduled Interview Date</label>
          <input type="datetime-local" name="scheduled_interview_date" value={formData.scheduled_interview_date} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Interview Team</label>
          <input type="text" name="interview_team" value={formData.interview_team} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Salary Range</label>
          <input type="text" name="salary_range" value={formData.salary_range} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Application Deadline</label>
          <input type="datetime-local" name="application_deadline" value={formData.application_deadline} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Application Method</label>
          <input type="text" name="application_method" value={formData.application_method} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Contact Person</label>
          <input type="text" name="contact_person" value={formData.contact_person} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Contact Email</label>
          <input type="email" name="contact_email" value={formData.contact_email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Contact Phone</label>
          <input type="text" name="contact_phone" value={formData.contact_phone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Company Address</label>
          <textarea name="company_address" value={formData.company_address} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Application Source</label>
          <input type="text" name="application_source" value={formData.application_source} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Resume Used</label>
          <input type="text" name="resume_used" value={formData.resume_used} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Cover Letter Used</label>
          <input type="text" name="cover_letter_used" value={formData.cover_letter_used} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Additional Notes</label>
          <textarea name="additional_notes" value={formData.additional_notes} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Follow-Up Date</label>
          <input type="datetime-local" name="follow_up_date" value={formData.follow_up_date} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Application Status History</label>
          <textarea name="application_status_history" value={formData.application_status_history} onChange={handleChange} />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? <BeatLoader size={10} color={"#fff"} /> : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default JobApplicationForm;