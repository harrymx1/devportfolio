import React, { useState, useEffect } from 'react';
import AdminToast from '../../components/admin/AdminToast';
import api from '../../lib/axios';

const AdminProfile = () => {
  const [formData, setFormData] = useState({
    about_name: '',
    about_role: '',
    about_focus: '',
    about_description: '',
    about_cv_url: '',
    about_image_url: '',
    contact_email: '',
    contact_github: '',
    contact_linkedin: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data } = await api.get('/settings');
      if (data.success && data.data) {
        setFormData(prev => ({
          ...prev,
          ...data.data
        }));
      }
    } catch (error) {
      setToast({ show: true, message: 'Failed to fetch settings', type: 'error' });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await api.post('/settings', formData);
      setToast({ show: true, message: 'Profile updated successfully!', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: 'Failed to update profile', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-content">
      <div className="content-header">
        <div>
          <h1>Profile & Contact</h1>
          <p>Manage your public profile information, bio, and contact links.</p>
        </div>
      </div>

      <div style={{ maxWidth: '800px', backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '2rem' }}>
        <form onSubmit={handleSubmit}>
          
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>About Me</h3>
          
          <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="field">
              <label>Full Name</label>
              <input type="text" name="about_name" value={formData.about_name} onChange={handleChange} required />
            </div>
            
            <div className="field">
              <label>Role</label>
              <input type="text" name="about_role" value={formData.about_role} onChange={handleChange} required placeholder="e.g. Fullstack Engineer" />
            </div>
          </div>

          <div className="field">
            <label>Focus Areas (Comma separated)</label>
            <input type="text" name="about_focus" value={formData.about_focus} onChange={handleChange} placeholder="e.g. Frontend, Backend, UI/UX" />
          </div>

          <div className="field">
            <label>Bio / Description</label>
            <textarea name="about_description" value={formData.about_description} onChange={handleChange} required rows="4" />
          </div>

          <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="field">
              <label>Profile Image URL</label>
              <input type="text" name="about_image_url" value={formData.about_image_url} onChange={handleChange} placeholder="https://..." />
            </div>
            
            <div className="field">
              <label>CV PDF URL</label>
              <input type="text" name="about_cv_url" value={formData.about_cv_url} onChange={handleChange} placeholder="Link to Google Drive / DropBox" />
            </div>
          </div>

          <h3 style={{ marginTop: '2rem', marginBottom: '1.5rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Contact Information</h3>

          <div className="field">
            <label>Email Address</label>
            <input type="email" name="contact_email" value={formData.contact_email} onChange={handleChange} />
          </div>

          <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="field">
              <label>GitHub URL</label>
              <input type="text" name="contact_github" value={formData.contact_github} onChange={handleChange} />
            </div>
            
            <div className="field">
              <label>LinkedIn URL</label>
              <input type="text" name="contact_linkedin" value={formData.contact_linkedin} onChange={handleChange} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      <AdminToast show={toast.show} type={toast.type} message={toast.message} onClose={() => setToast({...toast, show: false})} />
    </div>
  );
};

export default AdminProfile;
