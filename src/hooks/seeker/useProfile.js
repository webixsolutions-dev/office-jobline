// src/pages/seeker/hooks/useProfile.js
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_PROFILE = {
  full_name: 'Sarah Khan',
  email: 'sarah@example.com',
  phone: '+1 (555) 123-4567',
  headline: 'Experienced Office Administrator',
  location_province: 'Ontario',
  location_city: 'Toronto',
  skills: ['Microsoft Office', 'Customer Service', 'Scheduling', 'Data Entry'],
  role: 'job_seeker',
  created_at: '2024-01-15T10:30:00Z',
  default_resume_path: 'Sarah_Khan_Resume_2024.pdf',
  resume_upload_date: '2024-01-20T14:30:00Z',
};

export function useProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(MOCK_PROFILE);
  const [formData, setFormData] = useState({ ...MOCK_PROFILE });
  const [skillInput, setSkillInput] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        default_resume_path: file.name,
        resume_upload_date: new Date().toISOString()
      }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfile({ ...formData });
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...profile });
    setIsEditing(false);
    setSkillInput('');
  };

  const handleDeleteAccount = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Account deleted');
      navigate('/');
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return {
    profile,
    formData,
    skillInput,
    setSkillInput,
    isEditing,
    setIsEditing,
    isLoading,
    isSaving,
    showDeleteConfirm,
    setShowDeleteConfirm,
    fileInputRef,
    handleChange,
    handleAddSkill,
    handleRemoveSkill,
    handleKeyDown,
    handleResumeUpload,
    handleSave,
    handleCancel,
    handleDeleteAccount,
    getInitials,
    formatDate,
  };
}