import CompanyPageLayout from '@/components/company/CompanyPageLayout'

export const revalidate = 3600 // Revalidate every hour

export default function CorporateDirectory() {
  return <CompanyPageLayout slug="corporate-directory" />
}

