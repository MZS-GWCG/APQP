import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectById } from '../../store/features/projects/projectSlice';
import './Projects.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProject, isLoading } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getProjectById(id));
  }, [dispatch, id]);

  const getStatusBadge = (status) => {
    const statusClasses = {
      planning: 'badge-secondary',
      in_progress: 'badge-info',
      on_hold: 'badge-warning',
      completed: 'badge-success',
      cancelled: 'badge-danger',
      draft: 'badge-secondary',
      active: 'badge-success',
      under_review: 'badge-warning',
      approved: 'badge-success',
      obsolete: 'badge-danger',
      not_started: 'badge-secondary',
      blocked: 'badge-danger',
      pending: 'badge-warning'
    };
    return `badge ${statusClasses[status] || 'badge-secondary'}`;
  };

  if (isLoading || !currentProject) {
    return <div className="loading">Loading project details...</div>;
  }

  return (
    <div className="project-detail">
      <div className="page-header">
        <div>
          <Link to="/projects" className="back-link">← Back to Projects</Link>
          <h1>{currentProject.name}</h1>
        </div>
      </div>

      <div className="detail-grid">
        <div className="card">
          <h2>Project Information</h2>
          <div className="detail-row">
            <strong>Status:</strong>
            <span className={getStatusBadge(currentProject.status)}>
              {currentProject.status.replace('_', ' ')}
            </span>
          </div>
          <div className="detail-row">
            <strong>Client:</strong>
            <span>{currentProject.client?.name || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <strong>Description:</strong>
            <span>{currentProject.description || 'No description'}</span>
          </div>
          <div className="detail-row">
            <strong>Start Date:</strong>
            <span>
              {currentProject.startDate 
                ? new Date(currentProject.startDate).toLocaleDateString() 
                : 'Not set'}
            </span>
          </div>
          <div className="detail-row">
            <strong>Target Date:</strong>
            <span>
              {currentProject.targetDate 
                ? new Date(currentProject.targetDate).toLocaleDateString() 
                : 'Not set'}
            </span>
          </div>
        </div>

        <div className="card">
          <h2>Parts ({currentProject.parts?.length || 0})</h2>
          {currentProject.parts && currentProject.parts.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Part Name</th>
                  <th>Part Number</th>
                  <th>Status</th>
                  <th>Revision</th>
                </tr>
              </thead>
              <tbody>
                {currentProject.parts.map((part) => (
                  <tr key={part.id}>
                    <td>{part.name}</td>
                    <td>{part.partNumber || 'N/A'}</td>
                    <td>
                      <span className={getStatusBadge(part.status)}>
                        {part.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td>{part.revision || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="empty-state">No parts added yet</p>
          )}
        </div>

        <div className="card">
          <h2>APQP Phases (Epics) ({currentProject.epics?.length || 0})</h2>
          {currentProject.epics && currentProject.epics.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Epic Name</th>
                  <th>Phase</th>
                  <th>Status</th>
                  <th>Items</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {currentProject.epics.map((epic) => (
                  <tr key={epic.id}>
                    <td>{epic.name}</td>
                    <td>
                      <span className="badge badge-info">
                        {epic.phase}
                      </span>
                    </td>
                    <td>
                      <span className={getStatusBadge(epic.status)}>
                        {epic.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td>{epic.items?.length || 0}</td>
                    <td>
                      {epic.dueDate 
                        ? new Date(epic.dueDate).toLocaleDateString() 
                        : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="empty-state">No epics created yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
