import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClients, createClient, deleteClient } from '../../store/features/clients/clientSlice';
import './Clients.css';

const ClientList = () => {
  const dispatch = useDispatch();
  const { clients, isLoading } = useSelector((state) => state.clients);
  const { user } = useSelector((state) => state.auth);
  
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    ppapLevel: '',
    contactPerson: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
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
    dispatch(createClient(formData));
    setShowModal(false);
    setFormData({
      name: '',
      email: '',
      ppapLevel: '',
      contactPerson: '',
      phone: '',
      address: ''
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      dispatch(deleteClient(id));
    }
  };

  const canManageClients = user?.role === 'admin' || user?.role === 'project_manager';

  if (isLoading) {
    return <div className="loading">Loading clients...</div>;
  }

  return (
    <div className="clients-page">
      <div className="page-header">
        <h1>Clients</h1>
        {canManageClients && (
          <button onClick={() => setShowModal(true)} className="btn btn-primary">
            Create Client
          </button>
        )}
      </div>

      <div className="card">
        {clients.length === 0 ? (
          <p className="empty-state">No clients yet. Create your first client!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Email</th>
                <th>Contact Person</th>
                <th>Phone</th>
                <th>PPAP Level</th>
                <th>Projects</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.email || 'N/A'}</td>
                  <td>{client.contactPerson || 'N/A'}</td>
                  <td>{client.phone || 'N/A'}</td>
                  <td>{client.ppapLevel || 'N/A'}</td>
                  <td>{client.projects?.length || 0}</td>
                  <td>
                    {canManageClients && (
                      <button
                        onClick={() => handleDelete(client.id)}
                        className="btn btn-danger"
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
              <h2>Create New Client</h2>
              <button onClick={() => setShowModal(false)} className="close-btn">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Client Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Contact Person</label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>PPAP Level</label>
                <select
                  name="ppapLevel"
                  value={formData.ppapLevel}
                  onChange={handleChange}
                >
                  <option value="">Select PPAP Level</option>
                  <option value="1">Level 1</option>
                  <option value="2">Level 2</option>
                  <option value="3">Level 3</option>
                  <option value="4">Level 4</option>
                  <option value="5">Level 5</option>
                </select>
              </div>

              <div className="form-group">
                <label>Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientList;
