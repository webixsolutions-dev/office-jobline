import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_COMPANY } from '../../../data/recruiter/company';

export function useCompanyProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [company, setCompany] = useState(MOCK_COMPANY);
  const [formData, setFormData] = useState({ ...MOCK_COMPANY });

  const isVerified = company.verification_status === 'verified';
  const isPending = company.verification_status === 'pending';
  const isRejected = company.verification_status === 'rejected';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCompany({ ...formData });
      setIsEditing(false);
      alert('Company profile updated successfully!');
    } catch (error) {
      console.error('Error saving company:', error);
      alert('Failed to save company profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...company });
    setIsEditing(false);
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

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return {
    company,
    formData,
    isEditing,
    setIsEditing,
    isSaving,
    showDeleteConfirm,
    setShowDeleteConfirm,
    isLoading,
    isVerified,
    isPending,
    isRejected,
    handleChange,
    handleSave,
    handleCancel,
    handleDeleteAccount,
    formatDate,
  };
}