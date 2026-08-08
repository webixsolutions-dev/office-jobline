import { FiTrash2 } from 'react-icons/fi';

export default function SkillsSection({
  skills,
  isEditing,
  skillInput,
  onSkillInputChange,
  onAddSkill,
  onRemoveSkill,
  onKeyDown,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <h4 className="mb-4 font-display text-base font-semibold text-navy-950">
        Skills
      </h4>
      {isEditing ? (
        <div>
          <div className="flex gap-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => onSkillInputChange(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Add a skill and press Enter"
              className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={onAddSkill}
              className="rounded-md bg-navy-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-800"
            >
              Add
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 rounded-full bg-navy-100 px-3 py-1.5 text-sm font-medium text-navy-800"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => onRemoveSkill(skill)}
                  className="text-navy-400 hover:text-rose-600"
                >
                  <FiTrash2 className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}