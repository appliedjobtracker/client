import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../helpers/api';
import Modal from '../views/Modal';
import '../../styles/views/Dashboard.scss';

const Dashboard = () => {
  const [jobApplications, setJobApplications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobApplicationsResponse = await api.get('jobapplications/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        const jobs = jobApplicationsResponse.data.results;
        setJobApplications(Array.isArray(jobs) ? jobs : []);

        const notificationsResponse = await api.get('notificationpreferences/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        const notifications = notificationsResponse.data.results;
        setNotifications(Array.isArray(notifications) ? notifications : []);
      } catch (error) {
        console.error('Error fetching data', error);
        setJobApplications([]);
        setNotifications([]);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`jobapplications/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      setJobApplications(jobApplications.filter(job => job.id !== id));
    } catch (error) {
      console.error('Error deleting job application', error);
    }
  };

  const handleViewMore = (job) => {
    setSelectedJob(job);
  };

  const closeModal = () => {
    setSelectedJob(null);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome to AppliedJobTracker</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <main className="dashboard-main">
        <section className="quick-actions">
          <h2>Quick Actions</h2>
          <button onClick={() => navigate('/add-job')}>Add New Job To Track</button>
          <button onClick={() => navigate('/statistics')}>View Statistics</button>
          <button onClick={() => navigate('/profile')}>Update Profile</button>
          <button onClick={() => navigate('/notification-preferences')}>Notification Preferences</button>
        </section>
        <section className="job-summary">
          <h2>Your Job Applications</h2>
          <table className="job-table">
            <thead>
              <tr>
                <th>Job Position</th>
                <th>Company</th>
                <th>Job Status</th>
                <th>Location</th>
                <th>Job Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobApplications.map((job) => (
                <tr key={job.id}>
                  <td>{job.position_title}</td>
                  <td>{job.company_title}</td>
                  <td>{job.status}</td>
                  <td>{job.location}</td>
                  <td>{job.job_type}</td>
                  <td>
                    <button className="view-more-btn" onClick={() => handleViewMore(job)}>View More</button>
                    <button className="update-btn" onClick={() => navigate(`/update-job/${job.id}`)}>Update</button>
                    <button className="delete-btn" onClick={() => handleDelete(job.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="notifications">
          <h2>Notifications</h2>
          <ul>
            {notifications.map((notification) => (
                <li key={notification.id}>
                    <p>Email Notifications: {notification.email_notifications ? 'Enabled' : 'Disabled'}</p>
                    <p>Reminder Timing: {notification.reminder_timing}</p>
                    <p>Job Application Updates: {notification.job_application_updates ? 'Enabled' : 'Disabled'}</p>
                    <p>Interview Reminders: {notification.interview_reminders ? 'Enabled' : 'Disabled'}</p>
                </li>
            ))}
          </ul>
        </section>
      </main>
      <Modal isOpen={!!selectedJob} onClose={closeModal}>
        {selectedJob && (
          <div>
            <h2>{selectedJob.company_title} - {selectedJob.position_title}</h2>
            <p><strong>Job Link:</strong> <a href={selectedJob.job_link} target="_blank" rel="noopener noreferrer">{selectedJob.job_link}</a></p>
            <p><strong>Job Type:</strong> {selectedJob.job_type}</p>
            <p><strong>Status:</strong> {selectedJob.status}</p>
            <p><strong>Scheduled Interview Date:</strong> {new Date(selectedJob.scheduled_interview_date).toLocaleString()}</p>
            <p><strong>Application Deadline:</strong> {new Date(selectedJob.application_deadline).toLocaleString()}</p>
            <p><strong>Follow Up Date:</strong> {new Date(selectedJob.follow_up_date).toLocaleString()}</p>
            <p><strong>Interview Team:</strong> {selectedJob.interview_team}</p>
            <p><strong>Location:</strong> {selectedJob.location}</p>
            <p><strong>Salary Range:</strong> {selectedJob.salary_range}</p>
            <p><strong>Application Method:</strong> {selectedJob.application_method}</p>
            <p><strong>Contact Person:</strong> {selectedJob.contact_person}</p>
            <p><strong>Contact Email:</strong> {selectedJob.contact_email}</p>
            <p><strong>Contact Phone:</strong> {selectedJob.contact_phone}</p>
            <p><strong>Company Address:</strong> {selectedJob.company_address}</p>
            <p><strong>Application Source:</strong> {selectedJob.application_source}</p>
            <p><strong>Resume Used:</strong> {selectedJob.resume_used}</p>
            <p><strong>Cover Letter Used:</strong> {selectedJob.cover_letter_used}</p>
            <p><strong>Additional Notes:</strong> {selectedJob.additional_notes}</p>
            <p><strong>Application Status History:</strong> {selectedJob.application_status_history}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
