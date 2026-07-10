import React, { useState, useEffect } from 'react';
import AdminToast from '../../components/admin/AdminToast';
import api from '../../lib/axios';

const AdminExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentExp, setCurrentExp] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    date_range: '',
    organization: '',
    description: '',
    type: 'work',
    tags: '',
    order_index: 0
  });
  
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const { data } = await api.get('/experiences');
      if (data.success) {
        setExperiences(data.data);
      }
    } catch (error) {
      setToast({ show: true, message: 'Failed to fetch experiences', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const openForm = (exp = null) => {
    if (exp) {
      setCurrentExp(exp);
      setFormData({
        title: exp.title,
        date_range: exp.date_range,
        organization: exp.organization,
        description: exp.description,
        type: exp.type || 'work',
        tags: exp.tags || '',
        order_index: exp.order_index || 0
      });
    } else {
      setCurrentExp(null);
      setFormData({
        title: '',
        date_range: '',
        organization: '',
        description: '',
        type: 'work',
        tags: '',
        order_index: experiences.length * 10
      });
    }
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setCurrentExp(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentExp) {
        await api.put(`/experiences/${currentExp.id}`, formData);
        setToast({ show: true, message: 'Experience updated successfully!', type: 'success' });
      } else {
        await api.post('/experiences', formData);
        setToast({ show: true, message: 'Experience added successfully!', type: 'success' });
      }
      fetchExperiences();
      closeForm();
    } catch (error) {
      setToast({ show: true, message: error.response?.data?.message || 'Action failed', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this experience?')) return;
    try {
      await api.delete(`/experiences/${id}`);
      setToast({ show: true, message: 'Experience deleted', type: 'success' });
      fetchExperiences();
    } catch (error) {
      setToast({ show: true, message: 'Failed to delete', type: 'error' });
    }
  };

  return (
    <div className="admin-content">
      <div className="content-header">
        <div>
          <h1>Experiences</h1>
          <p>Manage your work history, education, and organization timeline.</p>
        </div>
        <button className="btn btn-primary" onClick={() => openForm()}>+ Add Experience</button>
      </div>

      {isLoading ? (
        <div className="loading-state">Loading experiences...</div>
      ) : experiences.length === 0 ? (
        <div className="empty-state">
          <p>No experiences found. Add your first one!</p>
        </div>
      ) : (
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Organization</th>
                <th>Date</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map(exp => (
                <tr key={exp.id}>
                  <td><strong>{exp.title}</strong></td>
                  <td>{exp.organization}</td>
                  <td>{exp.date_range}</td>
                  <td style={{ textTransform: 'capitalize' }}>{exp.type}</td>
                  <td>
                    <div className="table-actions">
                      <button className="icon-btn edit" onClick={() => openForm(exp)} aria-label="Edit">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button className="icon-btn delete" onClick={() => handleDelete(exp.id)} aria-label="Delete">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isFormOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h2>{currentExp ? 'Edit Experience' : 'Add Experience'}</h2>
              <button className="close-btn" onClick={closeForm}>×</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label>Title / Role</label>
                <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required placeholder="e.g. Fullstack Developer" />
              </div>
              
              <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="field">
                  <label>Organization / Company</label>
                  <input type="text" value={formData.organization} onChange={e => setFormData({...formData, organization: e.target.value})} required />
                </div>
                
                <div className="field">
                  <label>Date Range</label>
                  <input type="text" value={formData.date_range} onChange={e => setFormData({...formData, date_range: e.target.value})} required placeholder="e.g. Jan 2024 - Present" />
                </div>
              </div>

              <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="field">
                  <label>Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                    <option value="work">Work Experience</option>
                    <option value="education">Education</option>
                    <option value="organization">Organization / Volunteering</option>
                  </select>
                </div>

                <div className="field">
                  <label>Order (Lower appears first)</label>
                  <input type="number" value={formData.order_index} onChange={e => setFormData({...formData, order_index: e.target.value})} />
                </div>
              </div>

              <div className="field">
                <label>Tags / Tech (Comma separated)</label>
                <input type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} placeholder="e.g. React, Node.js, SQL" />
              </div>

              <div className="field">
                <label>Description</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows="4" required />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={closeForm}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Experience</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AdminToast show={toast.show} type={toast.type} message={toast.message} onClose={() => setToast({...toast, show: false})} />
    </div>
  );
};

export default AdminExperiences;
