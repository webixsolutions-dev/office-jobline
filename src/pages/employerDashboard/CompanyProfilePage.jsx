import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner'
import CompanyProfileForm from '../../components/employerDashboard/CompanyProfileForm'
import { useEmployerData } from '../../lib/EmployerDataContext'

export default function CompanyProfilePage() {
  const { companyProfile, updateCompanyProfile } = useEmployerData()

  return (
    <>
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title="Company Profile"
        subtitle="How your company appears to job seekers across Newcomer Jobline."
      />

      <div className="max-w-2xl rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] sm:p-6">
        <CompanyProfileForm
          initialValues={companyProfile}
          onSubmit={updateCompanyProfile}
        />
      </div>
    </>
  )
}
