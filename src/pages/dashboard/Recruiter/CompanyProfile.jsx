import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageHeader,
  DataState,
  ConfirmModal,
} from '../../../components/dashboard/common';
import { 
  FiSave, 
  FiEdit2, 
  FiTrash2, 
  FiUpload, 
  FiGlobe, 
  FiHome,
  FiBriefcase,
  FiX,
  FiCheckCircle,
  FiClock,
  FiAlertCircle
} from 'react-icons/fi';

const MOCK_COMPANY = {
  id: '1',
  name: 'TechCorp Inc.',
  website: 'https://techcorp.com',
  registration_number: 'REG-12345',
  logo_path: null,
  description: 'Leading provider of innovative technology solutions.',
  verification_status: 'verified',
  rejection_reason: null,
  status: 'active',
  created_at: '2024-01-15T10:30:00Z',
};

export default function CompanyProfile() {
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
    } catch (error) {
      console.error('Error deleting account:', error);
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

  const getVerificationBadge = () => {
    if (isVerified) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          <FiCheckCircle className="h-3.5 w-3.5" />
          Verified
        </span>
      );
    }
    if (isPending) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
          <FiClock className="h-3.5 w-3.5" />
          Pending Verification
        </span>
      );
    }
    if (isRejected) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
          <FiAlertCircle className="h-3.5 w-3.5" />
          Rejected
        </span>
      );
    }
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader 
        title="Company Profile" 
        subtitle="Manage your company information and settings"
      >
        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-2 rounded-md bg-navy-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-800"
          >
            <FiEdit2 className="h-4 w-4" />
            Edit Profile
          </button>
        )}
      </PageHeader>

      {isPending && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
          <div className="flex items-start gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
              <FiClock className="h-3.5 w-3.5" />
              Pending
            </span>
            <p className="text-sm text-amber-800">
              <span className="font-semibold">Your company is pending verification.</span>
              {' '}You can edit your profile, but some features may be limited until verification is complete.
            </p>
          </div>
        </div>
      )}

      {isRejected && (
        <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-5 py-4">
          <div className="flex items-start gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">
              <FiAlertCircle className="h-3.5 w-3.5" />
              Rejected
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-rose-800">Verification was rejected</p>
              <p className="mt-1 text-sm text-rose-700">
                {company.rejection_reason || 'Please update your company details and resubmit for verification.'}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="space-y-6">
          <div className="flex items-start gap-4 pb-6 border-b border-slate-200">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-navy-950 text-xl font-bold text-white">
              {company.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="font-display text-lg font-semibold text-navy-950">
                  {company.name}
                </h3>
                {getVerificationBadge()}
              </div>
              <p className="text-sm text-slate-500">
                Member since {formatDate(company.created_at)}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                <FiBriefcase className="inline mr-1.5 h-4 w-4" />
                Company Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                <FiGlobe className="inline mr-1.5 h-4 w-4" />
                Website *
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Registration Number
              </label>
              <input
                type="text"
                name="registration_number"
                value={formData.registration_number}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Verification Status
              </label>
              <div className="pt-1.5">
                {getVerificationBadge()}
                {isRejected && isEditing && (
                  <button
                    type="button"
                    className="ml-2 rounded-md bg-navy-950 px-3 py-1 text-xs font-semibold text-white hover:bg-navy-800"
                  >
                    Resubmit
                  </button>
                )}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Company Description
              </label>
              <textarea
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm disabled:bg-slate-50 disabled:text-slate-500"
                placeholder="Tell us about your company..."
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-md bg-navy-950 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FiSave className="h-4 w-4" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-6 py-2.5 text-sm font-semibold text-navy-900 transition hover:bg-slate-50"
              >
                <FiX className="h-4 w-4" />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50/50 p-6">
        <h4 className="font-display text-base font-semibold text-rose-800">
          Danger Zone
        </h4>
        <p className="mt-1 text-sm text-rose-600">
          Permanently delete your account and all associated data.
        </p>
        <p className="mt-2 text-xs text-rose-500">
          Note: If you solely own an active company, please transfer or close it first.
        </p>
        <button
          type="button"
          onClick={() => setShowDeleteConfirm(true)}
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
        >
          <FiTrash2 className="h-4 w-4" />
          Delete Account
        </button>
      </div>

      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Delete Account?"
        description="This action is permanent and cannot be undone. Your profile, company data, job posts, and all associated data will be permanently removed."
        confirmLabel="Delete Account"
        danger
        isSubmitting={isLoading}
        onConfirm={handleDeleteAccount}
        onClose={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
}