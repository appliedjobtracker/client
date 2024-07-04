import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { CSVLink } from 'react-csv';
import api from '../../helpers/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/views/Statistics.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Statistics = () => {
  const [jobApplications, setJobApplications] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [filteredJobs, setFilteredJobs] = useState([]);

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
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterJobs = jobApplications.filter(job => {
      const jobDate = new Date(job.created_date);
      return jobDate >= startDate && jobDate <= endDate;
    });
    setFilteredJobs(filterJobs);
  }, [startDate, endDate, jobApplications]);

  const getStatusData = () => {
    const statusCounts = filteredJobs.reduce((acc, job) => {
      acc[job.status] = (acc[job.status] || 0) + 1;
      return acc;
    }, {});
    return {
      labels: Object.keys(statusCounts),
      datasets: [
        {
          label: 'Applications by Status',
          data: Object.values(statusCounts),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
          ],
        },
      ],
    };
  };

  const getJobTypeData = () => {
    const jobTypeCounts = filteredJobs.reduce((acc, job) => {
      acc[job.job_type] = (acc[job.job_type] || 0) + 1;
      return acc;
    }, {});
    return {
      labels: Object.keys(jobTypeCounts),
      datasets: [
        {
          label: 'Applications by Job Type',
          data: Object.values(jobTypeCounts),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
          ],
        },
      ],
    };
  };

  const getTrendData = () => {
    const dates = {};
    filteredJobs.forEach(job => {
      const date = new Date(job.created_date).toLocaleDateString();
      dates[date] = (dates[date] || 0) + 1;
    });
    return {
      labels: Object.keys(dates),
      datasets: [
        {
          label: 'Applications Over Time',
          data: Object.values(dates),
          borderColor: '#36A2EB',
          fill: false,
        },
      ],
    };
  };

  const getAverageResponseTime = () => {
    const responseTimes = filteredJobs
      .filter(job => job.status !== 'Applied')
      .map(job => (new Date(job.follow_up_date) - new Date(job.created_date)) / (1000 * 60 * 60 * 24)); // Convert to days
    if (responseTimes.length === 0) return 0;
    const averageResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    return averageResponseTime.toFixed(2);
  };

  const getSourceData = () => {
    const sourceCounts = filteredJobs.reduce((acc, job) => {
      acc[job.application_source] = (acc[job.application_source] || 0) + 1;
      return acc;
    }, {});
    return {
      labels: Object.keys(sourceCounts),
      datasets: [
        {
          label: 'Applications by Source',
          data: Object.values(sourceCounts),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
          ],
        },
      ],
    };
  };

  const getTotalApplications = () => filteredJobs.length;

  return (
    <div className="statistics-container">
      <h2>Job Application Statistics</h2>
      <div className="date-filter">
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>
      <div className="total-applications">
        <h3>Total Applications: {getTotalApplications()}</h3>
      </div>
      <div className="average-response-time">
        <h3>Average Response Time: {getAverageResponseTime()} days</h3>
      </div>
      <div className="charts">
        <div className="chart">
          <Bar data={getStatusData()} options={{ maintainAspectRatio: false }} />
        </div>
        <div className="chart">
          <Pie data={getJobTypeData()} options={{ maintainAspectRatio: false }} />
        </div>
        <div className="chart">
          <Line data={getTrendData()} options={{ maintainAspectRatio: false }} />
        </div>
        <div className="chart">
          <Bar data={getSourceData()} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
      <div className="export-data">
        <CSVLink data={filteredJobs} filename={"job-applications.csv"} className="btn-export">
          Export Data
        </CSVLink>
      </div>
    </div>
  );
};

export default Statistics;