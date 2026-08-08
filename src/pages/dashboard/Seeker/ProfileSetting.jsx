import React from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { PageHeader, ConfirmModal } from '../../../components/dashboard/common';
import { useProfile } from '../../../hooks/seeker/useProfile';
import {
  ProfileHeader,
  ProfileForm,
  SkillsSection,
  ResumeSection,
  DangerZone,
  ActionButtons,
} from '../../../components/dashboard/ProfileSetting';

export default function ProfileSettings() {
  const {
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
  } = useProfile();

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader 
        title="Profile & Settings" 
        subtitle="Manage your personal profile and account settings"
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

      <div className="space-y-6">
        <ProfileHeader
          fullName={formData.full_name}
          initials={getInitials(formData.full_name)}
          isRecruiter={false}
          formatDate={formatDate}
          created_at={profile.created_at}
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          verificationStatus={null}
        />

        <ProfileForm
          formData={formData}
          isEditing={isEditing}
          onChange={handleChange}
        />

        <SkillsSection
          skills={formData.skills}
          isEditing={isEditing}
          skillInput={skillInput}
          onSkillInputChange={setSkillInput}
          onAddSkill={handleAddSkill}
          onRemoveSkill={handleRemoveSkill}
          onKeyDown={handleKeyDown}
        />

        <ResumeSection
          resumePath={formData.default_resume_path}
          uploadDate={formData.resume_upload_date}
          isEditing={isEditing}
          onUpload={handleResumeUpload}
          fileInputRef={fileInputRef}
          formatDate={formatDate}
        />

        {isEditing && (
          <ActionButtons
            isSaving={isSaving}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}

        <DangerZone onDelete={() => setShowDeleteConfirm(true)} />
      </div>

      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Delete Account?"
        description="This action is permanent and cannot be undone. Your profile, resume, applications, and all associated data will be permanently removed."
        confirmLabel="Delete Account"
        danger
        isSubmitting={isLoading}
        onConfirm={handleDeleteAccount}
        onClose={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
}