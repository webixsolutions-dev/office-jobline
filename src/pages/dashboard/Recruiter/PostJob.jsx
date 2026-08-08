import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../../../components/dashboard/common';
import { FiSave, FiX } from 'react-icons/fi';

const CATEGORIES = [
  'Technology',
  'Design',
  'Marketing',
  'Sales',
  'Finance',
  'Healthcare',
  'Hospitality',
  'Transportation',
  'Agriculture',
  'Construction',
];

const EMPLOYMENT_TYPES = [
  'full_time',
  'part_time',
  'contract',
  'temporary',
  'internship',
  'seasonal',
];

const PROVINCES = [
  'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
  'Newfoundland and Labrador', 'Nova Scotia', 'Ontario',
  'Prince Edward Island', 'Quebec', 'Saskatchewan',
];

const SALARY_PERIODS = ['hourly', 'weekly', 'monthly', 'yearly'];

export default function PostJob() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    employment_type: '',
    location_province: '',
    location_city: '',
    is_remote: false,
    salary_min: '',
    salary_max: '',
    salary_period: 'yearly',
    skills: [],
  });

  const [skillInput, setSkillInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill),
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Job submitted:', formData);
      navigate('/dashboard/jobs');
    } catch (error) {
      console.error('Error submitting job:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader 
        title={isEditing ? 'Edit Job' : 'Post a New Job'} 
        subtitle={isEditing ? 'Update your job posting' : 'Fill in the details to post a new job'}
      >
        <button
          type="button"
          onClick={() => navigate('/dashboard/jobs')}
          className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-navy-900 transition hover:bg-slate-50"
        >
          <FiX className="h-4 w-4" />
          Cancel
        </button>
      </PageHeader>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Job Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g. Senior React Developer"
              className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Describe the job responsibilities, requirements, and benefits..."
              className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Employment Type *
              </label>
              <select
                name="employment_type"
                value={formData.employment_type}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              >
                <option value="">Select type</option>
                {EMPLOYMENT_TYPES.map(type => (
                  <option key={type} value={type}>
                    {type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  name="is_remote"
                  checked={formData.is_remote}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-slate-300 text-gold-500 focus:ring-gold-500"
                />
                Remote
              </label>
            </div>
          </div>

          {!formData.is_remote && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Province *
                </label>
                <select
                  name="location_province"
                  value={formData.location_province}
                  onChange={handleChange}
                  required={!formData.is_remote}
                  className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                >
                  <option value="">Select province</option>
                  {PROVINCES.map(province => (
                    <option key={province} value={province}>{province}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="location_city"
                  value={formData.location_city}
                  onChange={handleChange}
                  placeholder="e.g. Toronto"
                  className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Salary Range
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <input
                  type="number"
                  name="salary_min"
                  value={formData.salary_min}
                  onChange={handleChange}
                  placeholder="Min"
                  className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="number"
                  name="salary_max"
                  value={formData.salary_max}
                  onChange={handleChange}
                  placeholder="Max"
                  className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>
              <div>
                <select
                  name="salary_period"
                  value={formData.salary_period}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                >
                  {SALARY_PERIODS.map(period => (
                    <option key={period} value={period}>
                      {period.charAt(0).toUpperCase() + period.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Skills
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a skill and press Enter"
                className="flex-1 rounded-md border border-slate-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="rounded-md bg-navy-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-800"
              >
                Add
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {formData.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 rounded-full bg-navy-100 px-3 py-1.5 text-sm font-medium text-navy-800"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-navy-400 hover:text-rose-600"
                  >
                    <FiX className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-md bg-navy-950 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiSave className="h-4 w-4" />
              {isSubmitting ? 'Saving...' : isEditing ? 'Update Job' : 'Post Job'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/recruiter/dashboard/jobs')}
              className="rounded-md border border-slate-200 px-6 py-2.5 text-sm font-semibold text-navy-900 transition hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}