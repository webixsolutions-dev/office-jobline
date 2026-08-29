import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useAuth } from '../../hooks/useAuth'

function ToggleSwitch({ id, label, description, checked, onChange }) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-[var(--color-border)] last:border-0">
      <div>
        <label htmlFor={id} className="text-sm font-semibold text-[var(--color-text-primary)]">
          {label}
        </label>
        {description && <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">{description}</p>}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? 'bg-[var(--color-teal)]' : 'bg-[var(--color-border)]'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}

export default function SettingsPage() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const [email, setEmail] = useState(user?.email || '')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [accountSaved, setAccountSaved] = useState(false)
  const [notifyMatches, setNotifyMatches] = useState(true)
  const [notifyStatus, setNotifyStatus] = useState(true)

  const handleAccountSave = (e) => {
    e.preventDefault()
    if (password && password !== confirmPassword) return
    setAccountSaved(true)
    setPassword('')
    setConfirmPassword('')
    setTimeout(() => setAccountSaved(false), 3000)
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <>
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title="Settings"
        subtitle="Manage your account and notification preferences."
      />

      <div className="max-w-2xl space-y-6">
        <section className="rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] sm:p-6">
          <h2 className="font-display text-lg font-bold text-[var(--color-text-primary)]">Account</h2>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Update your email or password.</p>
          <form onSubmit={handleAccountSave} className="mt-5 space-y-4">
            <Input
              label="Email address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <Input
              label="New password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep current password"
            />
            <Input
              label="Confirm new password"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
            {password && password !== confirmPassword && (
              <p className="text-sm text-[var(--status-error)]">Passwords do not match.</p>
            )}
            <div className="flex items-center gap-3">
              <Button type="submit" variant="teal">
                Save Account Changes
              </Button>
              {accountSaved && (
                <p className="text-sm font-medium text-[var(--status-success-text)]" role="status">
                  Account settings saved.
                </p>
              )}
            </div>
          </form>
        </section>

        <section className="rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] sm:p-6">
          <h2 className="font-display text-lg font-bold text-[var(--color-text-primary)]">Notifications</h2>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Choose what emails you'd like to receive.</p>
          <div className="mt-4">
            <ToggleSwitch
              id="notify-matches"
              label="Email me about new job matches"
              description="Get notified when jobs match your skills and location."
              checked={notifyMatches}
              onChange={setNotifyMatches}
            />
            <ToggleSwitch
              id="notify-status"
              label="Email me application status updates"
              description="Hear when an employer views or updates your application."
              checked={notifyStatus}
              onChange={setNotifyStatus}
            />
          </div>
        </section>

        <section className="rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] sm:p-6">
          <h2 className="font-display text-lg font-bold text-[var(--color-text-primary)]">Sign Out</h2>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Sign out of your account on this device.
          </p>
          <Button
            variant="outline-teal"
            icon={FiLogOut}
            onClick={handleSignOut}
            className="mt-4"
          >
            Sign Out
          </Button>
        </section>
      </div>
    </>
  )
}
