import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../../components/dashboard/common';
import { 
  HiUpload, 
  HiOfficeBuilding, 
  HiGlobe, 
  HiDocumentText,
  HiX,
  HiCheck
} from 'react-icons/hi';

export default function CompanySetup() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    registration_number: '',
    description: '',
    logo: null,
    verification_document: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Company submitted:', formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting company:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader 
        title="Set Up Your Company" 
        subtitle="Before you can start posting jobs, we need some information about your company."
      />

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              <HiOfficeBuilding className="inline mr-1.5 h-4 w-4" />
              Company Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your company name"
              className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              <HiGlobe className="inline mr-1.5 h-4 w-4" />
              Website *
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              required
              placeholder="https://example.com"
              className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              <HiDocumentText className="inline mr-1.5 h-4 w-4" />
              Business Registration Number *
            </label>
            <input
              type="text"
              name="registration_number"
              value={formData.registration_number}
              onChange={handleChange}
              required
              placeholder="Enter your business registration number"
              className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Company Logo (Optional)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                name="logo"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-navy-50 file:text-navy-700 hover:file:bg-navy-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Company Description (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about your company..."
              className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              <HiDocumentText className="inline mr-1.5 h-4 w-4" />
              Verification Document (Optional)
            </label>
            <input
              type="file"
              name="verification_document"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-navy-50 file:text-navy-700 hover:file:bg-navy-100"
            />
            <p className="mt-1 text-xs text-slate-400">Upload PDF, JPG, or PNG (Max 5MB)</p>
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-md bg-navy-950 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Submitting...
                </>
              ) : (
                <>
                  <HiCheck className="h-4 w-4" />
                  Submit for Verification
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-6 py-2.5 text-sm font-semibold text-navy-900 transition hover:bg-slate-50"
            >
              <HiX className="h-4 w-4" />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}