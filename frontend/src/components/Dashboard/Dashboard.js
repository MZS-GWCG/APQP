import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProjects } from '../../store/features/projects/projectSlice';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { projects, isLoading } = useSelector((state) => state.projects);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const getStatusBadge = (status) => {
    const statusClasses = {
      planning: 'badge-secondary',
      in_progress: 'badge-info',
      on_hold: 'badge-warning',
      completed: 'badge-success',
      cancelled: 'badge-danger'
    };
    return `badge ${statusClasses[status] || 'badge-secondary'}`;
  };

  const statusCounts = projects.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {});

  if (isLoading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user?.firstName || user?.username}!</h1>
        <p>Manage your APQP projects and track deliverables</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{projects.length}</h3>
          <p>Total Projects</p>
        </div>
        <div className="stat-card">
          <h3>{statusCounts.in_progress || 0}</h3>
          <p>In Progress</p>
        </div>
        <div className="stat-card">
          <h3>{statusCounts.completed || 0}</h3>
          <p>Completed</p>
        </div>
        <div className="stat-card">
          <h3>{statusCounts.planning || 0}</h3>
          <p>Planning</p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Recent Projects</h2>
          <Link to="/projects" className="btn btn-primary">View All Projects</Link>
        </div>

        {projects.length === 0 ? (
          <p className="empty-state">No projects yet. Create your first project!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Client</th>
                <th>Status</th>
                <th>Parts</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.slice(0, 5).map((project) => (
                <tr key={project.id}>
                  <td>{project.name}</td>
                  <td>{project.client?.name || 'N/A'}</td>
                  <td>
                    <span className={getStatusBadge(project.status)}>
                      {project.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>{project.parts?.length || 0}</td>
                  <td>
                    <Link to={`/projects/${project.id}`} className="btn btn-primary">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
