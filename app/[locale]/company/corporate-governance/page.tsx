import CompanyPageLayout from '@/components/company/CompanyPageLayout'

export const revalidate = 3600 // Revalidate every hour

export default function CorporateGovernance() {
  return <CompanyPageLayout slug="corporate-governance" />
}

