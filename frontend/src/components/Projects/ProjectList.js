import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProjects, createProject, deleteProject } from '../../store/features/projects/projectSlice';
import { getClients } from '../../store/features/clients/clientSlice';
import './Projects.css';

const ProjectList = () => {
  const dispatch = useDispatch();
  const { projects, isLoading } = useSelector((state) => state.projects);
  const { clients } = useSelector((state) => state.clients);
  const { user } = useSelector((state) => state.auth);
  
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    clientId: '',
    status: 'planning',
    startDate: '',
    targetDate: ''
  });

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getClients());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProject(formData));
    setShowModal(false);
    setFormData({
      name: '',
      description: '',
      clientId: '',
      status: 'planning',
      startDate: '',
      targetDate: ''
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      dispatch(deleteProject(id));
    }
  };

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

  const canManageProjects = user?.role === 'admin' || user?.role === 'project_manager';

  if (isLoading) {
    return <div className="loading">Loading projects...</div>;
  }

  return (
    <div className="projects-page">
      <div className="page-header">
        <h1>Projects</h1>
        {canManageProjects && (
          <button onClick={() => setShowModal(true)} className="btn btn-primary">
            Create Project
          </button>
        )}
      </div>

      <div className="card">
        {projects.length === 0 ? (
          <p className="empty-state">No projects yet. Create your first project!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Client</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>Target Date</th>
                <th>Parts</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.name}</td>
                  <td>{project.client?.name || 'N/A'}</td>
                  <td>
                    <span className={getStatusBadge(project.status)}>
                      {project.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>{project.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'}</td>
                  <td>{project.targetDate ? new Date(project.targetDate).toLocaleDateString() : 'N/A'}</td>
                  <td>{project.parts?.length || 0}</td>
                  <td>
                    <Link to={`/projects/${project.id}`} className="btn btn-primary">
                      View
                    </Link>
                    {canManageProjects && (
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="btn btn-danger"
                        style={{ marginLeft: '10px' }}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Create New Project</h2>
              <button onClick={() => setShowModal(false)} className="close-btn">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Project Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Client *</label>
                <select
                  name="clientId"
                  value={formData.clientId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="planning">Planning</option>
                  <option value="in_progress">In Progress</option>
                  <option value="on_hold">On Hold</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Target Date</label>
                <input
                  type="date"
                  name="targetDate"
                  value={formData.targetDate}
                  onChange={handleChange}
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
