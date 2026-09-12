import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiTag 
} from 'react-icons/fi';

function inputClass(disabled, hasError) {
  return `w-full rounded-md border px-3 py-2 text-sm disabled:bg-slate-50 disabled:text-slate-500 ${
    hasError ? 'border-red-400' : 'border-slate-200'
  }`
}

function FieldError({ message }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-red-700">{message}</p>
}

export default function ProfileForm({
  formData,
  isEditing,
  onChange,
  fieldErrors = {},
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <h4 className="mb-4 font-display text-base font-semibold text-navy-950">
        Personal Information
      </h4>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            <FiUser className="inline mr-1.5 h-4 w-4" />
            Full Name *
          </label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={onChange}
            disabled={!isEditing}
            className={inputClass(!isEditing, fieldErrors.full_name)}
            aria-invalid={fieldErrors.full_name ? 'true' : undefined}
            required
          />
          <FieldError message={fieldErrors.full_name} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            <FiMail className="inline mr-1.5 h-4 w-4" />
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            disabled
            className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500"
          />
          <p className="mt-1 text-xs text-slate-400">Email cannot be changed</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            <FiPhone className="inline mr-1.5 h-4 w-4" />
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone || ''}
            onChange={onChange}
            disabled={!isEditing}
            className={inputClass(!isEditing, fieldErrors.phone)}
            aria-invalid={fieldErrors.phone ? 'true' : undefined}
          />
          <FieldError message={fieldErrors.phone} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            <FiTag className="inline mr-1.5 h-4 w-4" />
            Headline
          </label>
          <input
            type="text"
            name="headline"
            value={formData.headline || ''}
            onChange={onChange}
            disabled={!isEditing}
            placeholder="e.g. Senior React Developer"
            className={inputClass(!isEditing, fieldErrors.headline)}
            aria-invalid={fieldErrors.headline ? 'true' : undefined}
          />
          <FieldError message={fieldErrors.headline} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            <FiMapPin className="inline mr-1.5 h-4 w-4" />
            Province
          </label>
          <input
            type="text"
            name="location_province"
            value={formData.location_province || ''}
            onChange={onChange}
            disabled={!isEditing}
            className={inputClass(!isEditing, fieldErrors.location_province)}
            aria-invalid={fieldErrors.location_province ? 'true' : undefined}
          />
          <FieldError message={fieldErrors.location_province} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            <FiMapPin className="inline mr-1.5 h-4 w-4" />
            City
          </label>
          <input
            type="text"
            name="location_city"
            value={formData.location_city || ''}
            onChange={onChange}
            disabled={!isEditing}
            className={inputClass(!isEditing, fieldErrors.location_city)}
            aria-invalid={fieldErrors.location_city ? 'true' : undefined}
          />
          <FieldError message={fieldErrors.location_city} />
        </div>
      </div>
    </div>
  );
}