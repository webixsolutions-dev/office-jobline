import { useState } from 'react';
import { FiFileText, FiUpload, FiX, FiCheck, FiFile } from 'react-icons/fi';

export default function ResumeSection({
  resumePath,
  uploadDate,
  isEditing,
  onUpload,
  fileInputRef,
  formatDate,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file) => {
    setSelectedFile(file);
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          onUpload(file);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileIcon = (fileName) => {
    if (!fileName) return FiFile;
    const ext = fileName.split('.').pop().toLowerCase();
    if (ext === 'pdf') return FiFileText;
    if (['doc', 'docx'].includes(ext)) return FiFileText;
    return FiFile;
  };

  const FileIcon = getFileIcon(resumePath);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <h4 className="mb-4 font-display text-base font-semibold text-navy-950">
        <FiFileText className="inline mr-2 h-5 w-5" />
        Resume Management
      </h4>

      <div className="space-y-4">
        {/* Current Resume Display */}
        {resumePath && !isUploading && (
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-100 text-navy-600">
              <FileIcon className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-navy-900 truncate">
                {resumePath}
              </p>
              <p className="text-xs text-slate-500">
                Uploaded {formatDate(uploadDate)}
              </p>
            </div>
            {isEditing && (
              <button
                type="button"
                onClick={handleRemoveFile}
                className="text-slate-400 hover:text-rose-600 transition-colors"
                aria-label="Remove resume"
              >
                <FiX className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        {/* Upload Progress */}
        {isUploading && (
          <div className="p-4 bg-navy-50 rounded-lg border border-navy-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-100 text-navy-600">
                  <FiUpload className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-navy-900">
                    {selectedFile?.name || 'Uploading...'}
                  </p>
                  <p className="text-xs text-slate-500">
                    {selectedFile && formatFileSize(selectedFile.size)}
                  </p>
                </div>
              </div>
              <span className="text-sm font-semibold text-navy-700">
                {uploadProgress}%
              </span>
            </div>
            <div className="w-full h-2 bg-navy-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-navy-600 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Upload Area */}
        {isEditing && !isUploading && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging
                ? 'border-gold-500 bg-gold-50'
                : 'border-slate-300 hover:border-slate-400 bg-slate-50/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-100 text-navy-600">
                <FiUpload className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy-900">
                  Drag & drop your resume here
                </p>
                <p className="text-xs text-slate-500">
                  or click to browse files (PDF, DOC, DOCX)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Upload Button (Alternative) */}
        {isEditing && !isUploading && !resumePath && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-md bg-navy-950 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-800"
            >
              <FiUpload className="h-4 w-4" />
              Upload Resume
            </button>
          </div>
        )}

        {isEditing && !isUploading && resumePath && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-navy-900 transition hover:bg-slate-50"
            >
              <FiUpload className="h-4 w-4" />
              Replace Resume
            </button>
          </div>
        )}

        {/* Supported Formats Info */}
        <p className="text-xs text-slate-400">
          Supported formats: PDF, DOC, DOCX (Max size: 5MB)
        </p>
      </div>
    </div>
  );
}